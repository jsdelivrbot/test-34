/* */ 
const path = require('path');
const inspect = require('util').inspect;
const requireDirectory = require('require-directory');
const whichModule = require('which-module');
module.exports = function(yargs, usage, validation) {
  const self = {};
  var handlers = {};
  self.addHandler = function(cmd, description, builder, handler) {
    if (typeof cmd === 'object') {
      const commandString = typeof cmd.command === 'string' ? cmd.command : moduleName(cmd);
      self.addHandler(commandString, extractDesc(cmd), cmd.builder, cmd.handler);
      return;
    }
    if (typeof builder === 'object' && builder.builder && typeof builder.handler === 'function') {
      self.addHandler(cmd, description, builder.builder, builder.handler);
      return;
    }
    if (description !== false) {
      usage.command(cmd, description);
    }
    var parsedCommand = parseCommand(cmd);
    handlers[parsedCommand.cmd] = {
      original: cmd,
      handler: handler,
      builder: builder,
      demanded: parsedCommand.demanded,
      optional: parsedCommand.optional
    };
  };
  self.addDirectory = function(dir, context, req, callerFile, opts) {
    opts = opts || {};
    if (typeof opts.recurse !== 'boolean')
      opts.recurse = false;
    if (!Array.isArray(opts.extensions))
      opts.extensions = ['js'];
    const parentVisit = typeof opts.visit === 'function' ? opts.visit : function(o) {
      return o;
    };
    opts.visit = function(obj, joined, filename) {
      const visited = parentVisit(obj, joined, filename);
      if (visited) {
        if (~context.files.indexOf(joined))
          return visited;
        context.files.push(joined);
        self.addHandler(visited);
      }
      return visited;
    };
    requireDirectory({
      require: req,
      filename: callerFile
    }, dir, opts);
  };
  function moduleName(obj) {
    const mod = whichModule(obj);
    if (!mod)
      throw new Error('No command name given for module: ' + inspect(obj));
    return commandFromFilename(mod.filename);
  }
  function commandFromFilename(filename) {
    return path.basename(filename, path.extname(filename));
  }
  function extractDesc(obj) {
    for (var keys = ['describe', 'description', 'desc'],
        i = 0,
        l = keys.length,
        test; i < l; i++) {
      test = obj[keys[i]];
      if (typeof test === 'string' || typeof test === 'boolean')
        return test;
    }
    return false;
  }
  function parseCommand(cmd) {
    var splitCommand = cmd.split(/\s/);
    var bregex = /\.*[\][<>]/g;
    var parsedCommand = {
      cmd: (splitCommand.shift()).replace(bregex, ''),
      demanded: [],
      optional: []
    };
    splitCommand.forEach(function(cmd, i) {
      var variadic = false;
      if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1)
        variadic = true;
      if (/^\[/.test(cmd)) {
        parsedCommand.optional.push({
          cmd: cmd.replace(bregex, ''),
          variadic: variadic
        });
      } else {
        parsedCommand.demanded.push({
          cmd: cmd.replace(bregex, ''),
          variadic: variadic
        });
      }
    });
    return parsedCommand;
  }
  self.getCommands = function() {
    return Object.keys(handlers);
  };
  self.getCommandHandlers = function() {
    return handlers;
  };
  self.runCommand = function(command, yargs, parsed) {
    var argv = parsed.argv;
    var commandHandler = handlers[command];
    var innerArgv = argv;
    var currentContext = yargs.getContext();
    var parentCommands = currentContext.commands.slice();
    currentContext.commands.push(command);
    if (commandHandler.builder && typeof commandHandler.builder === 'function') {
      innerArgv = commandHandler.builder(yargs.reset(parsed.aliases));
      if (yargs.parsed === false && typeof yargs.getUsageInstance().getUsage() === 'undefined') {
        yargs.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original);
      }
      innerArgv = innerArgv ? innerArgv.argv : argv;
    } else if (commandHandler.builder && typeof commandHandler.builder === 'object') {
      innerArgv = yargs.reset(parsed.aliases);
      innerArgv.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original);
      Object.keys(commandHandler.builder).forEach(function(key) {
        innerArgv.option(key, commandHandler.builder[key]);
      });
      innerArgv = innerArgv.argv;
    }
    populatePositional(commandHandler, innerArgv, currentContext);
    if (commandHandler.handler) {
      commandHandler.handler(innerArgv);
    }
    currentContext.commands.pop();
    return innerArgv;
  };
  function populatePositional(commandHandler, argv, context) {
    argv._ = argv._.slice(context.commands.length);
    var demanded = commandHandler.demanded.slice(0);
    var optional = commandHandler.optional.slice(0);
    validation.positionalCount(demanded.length, argv._.length);
    while (demanded.length) {
      var demand = demanded.shift();
      if (demand.variadic)
        argv[demand.cmd] = [];
      if (!argv._.length)
        break;
      if (demand.variadic)
        argv[demand.cmd] = argv._.splice(0);
      else
        argv[demand.cmd] = argv._.shift();
    }
    while (optional.length) {
      var maybe = optional.shift();
      if (maybe.variadic)
        argv[maybe.cmd] = [];
      if (!argv._.length)
        break;
      if (maybe.variadic)
        argv[maybe.cmd] = argv._.splice(0);
      else
        argv[maybe.cmd] = argv._.shift();
    }
    argv._ = context.commands.concat(argv._);
  }
  self.reset = function() {
    handlers = {};
    return self;
  };
  return self;
};
