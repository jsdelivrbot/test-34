/* */ 
(function(process) {
  var path = require('path'),
      clonedeep = require('lodash.clonedeep'),
      errors = require('./errors'),
      assign = require('lodash.assign'),
      sass = require('./extensions');
  if (!sass.hasBinary(sass.getBinaryPath())) {
    if (!sass.isSupportedEnvironment()) {
      throw new Error(errors.unsupportedEnvironment());
    } else {
      throw new Error(errors.missingBinary());
    }
  }
  var binding = require(sass.getBinaryPath());
  function getInputFile(options) {
    return options.file ? path.resolve(options.file) : null;
  }
  function getOutputFile(options) {
    var outFile = options.outFile;
    if (!outFile || typeof outFile !== 'string' || (!options.data && !options.file)) {
      return null;
    }
    return path.resolve(outFile);
  }
  function getSourceMap(options) {
    var sourceMap = options.sourceMap;
    if (sourceMap && typeof sourceMap !== 'string' && options.outFile) {
      sourceMap = options.outFile + '.map';
    }
    return sourceMap && typeof sourceMap === 'string' ? path.resolve(sourceMap) : null;
  }
  function getStats(options) {
    var stats = {};
    stats.entry = options.file || 'data';
    stats.start = Date.now();
    return stats;
  }
  function endStats(stats) {
    stats.end = Date.now();
    stats.duration = stats.end - stats.start;
    return stats;
  }
  function getStyle(options) {
    var styles = {
      nested: 0,
      expanded: 1,
      compact: 2,
      compressed: 3
    };
    return styles[options.outputStyle] || 0;
  }
  function getIndentWidth(options) {
    var width = parseInt(options.indentWidth) || 2;
    return width > 10 ? 2 : width;
  }
  function getIndentType(options) {
    var types = {
      space: 0,
      tab: 1
    };
    return types[options.indentType] || 0;
  }
  function getLinefeed(options) {
    var feeds = {
      cr: '\r',
      crlf: '\r\n',
      lf: '\n',
      lfcr: '\n\r'
    };
    return feeds[options.linefeed] || '\n';
  }
  function buildIncludePaths(options) {
    options.includePaths = options.includePaths || [];
    if (process.env.hasOwnProperty('SASS_PATH')) {
      options.includePaths = options.includePaths.concat(process.env.SASS_PATH.split(path.delimiter));
    }
    return options.includePaths.join(path.delimiter);
  }
  function getOptions(opts, cb) {
    var options = clonedeep(opts || {});
    options.sourceComments = options.sourceComments || false;
    if (options.hasOwnProperty('file')) {
      options.file = getInputFile(options);
    }
    options.outFile = getOutputFile(options);
    options.includePaths = buildIncludePaths(options);
    options.precision = parseInt(options.precision) || 5;
    options.sourceMap = getSourceMap(options);
    options.style = getStyle(options);
    options.indentWidth = getIndentWidth(options);
    options.indentType = getIndentType(options);
    options.linefeed = getLinefeed(options);
    options.context = {
      options: options,
      callback: cb
    };
    options.result = {stats: getStats(options)};
    return options;
  }
  function tryCallback(callback, args) {
    try {
      return callback.apply(this, args);
    } catch (e) {
      if (typeof e === 'string') {
        return new binding.types.Error(e);
      } else if (e instanceof Error) {
        return new binding.types.Error(e.message);
      } else {
        return new binding.types.Error('An unexpected error occurred');
      }
    }
  }
  function normalizeFunctionSignature(signature, callback) {
    if (!/^\*|@warn|@error|@debug|\w+\(.*\)$/.test(signature)) {
      if (!/\w+/.test(signature)) {
        throw new Error('Invalid function signature format "' + signature + '"');
      }
      return {
        signature: signature + '(...)',
        callback: function() {
          var args = Array.prototype.slice.call(arguments),
              list = args.shift(),
              i;
          for (i = list.getLength() - 1; i >= 0; i--) {
            args.unshift(list.getValue(i));
          }
          return callback.apply(this, args);
        }
      };
    }
    return {
      signature: signature,
      callback: callback
    };
  }
  module.exports.render = function(opts, cb) {
    var options = getOptions(opts, cb);
    options.error = function(err) {
      var payload = assign(new Error(), JSON.parse(err));
      if (cb) {
        options.context.callback.call(options.context, payload, null);
      }
    };
    options.success = function() {
      var result = options.result;
      var stats = endStats(result.stats);
      var payload = {
        css: result.css,
        map: result.map,
        stats: stats
      };
      if (cb) {
        options.context.callback.call(options.context, null, payload);
      }
    };
    var importer = options.importer;
    if (importer) {
      if (Array.isArray(importer)) {
        options.importer = [];
        importer.forEach(function(subject, index) {
          options.importer[index] = function(file, prev, bridge) {
            function done(result) {
              bridge.success(result === module.exports.NULL ? null : result);
            }
            var result = subject.call(options.context, file, prev, done);
            if (result !== undefined) {
              done(result);
            }
          };
        });
      } else {
        options.importer = function(file, prev, bridge) {
          function done(result) {
            bridge.success(result === module.exports.NULL ? null : result);
          }
          var result = importer.call(options.context, file, prev, done);
          if (result !== undefined) {
            done(result);
          }
        };
      }
    }
    var functions = clonedeep(options.functions);
    if (functions) {
      options.functions = {};
      Object.keys(functions).forEach(function(subject) {
        var cb = normalizeFunctionSignature(subject, functions[subject]);
        options.functions[cb.signature] = function() {
          var args = Array.prototype.slice.call(arguments),
              bridge = args.pop();
          function done(data) {
            bridge.success(data);
          }
          var result = tryCallback(cb.callback.bind(options.context), args.concat(done));
          if (result) {
            done(result);
          }
        };
      });
    }
    if (options.data) {
      binding.render(options);
    } else if (options.file) {
      binding.renderFile(options);
    } else {
      cb({
        status: 3,
        message: 'No input specified: provide a file name or a source string to process'
      });
    }
  };
  module.exports.renderSync = function(opts) {
    var options = getOptions(opts);
    var importer = options.importer;
    if (importer) {
      if (Array.isArray(importer)) {
        options.importer = [];
        importer.forEach(function(subject, index) {
          options.importer[index] = function(file, prev) {
            var result = subject.call(options.context, file, prev);
            return result === module.exports.NULL ? null : result;
          };
        });
      } else {
        options.importer = function(file, prev) {
          var result = importer.call(options.context, file, prev);
          return result === module.exports.NULL ? null : result;
        };
      }
    }
    var functions = clonedeep(options.functions);
    if (options.functions) {
      options.functions = {};
      Object.keys(functions).forEach(function(signature) {
        var cb = normalizeFunctionSignature(signature, functions[signature]);
        options.functions[cb.signature] = function() {
          return tryCallback(cb.callback.bind(options.context), arguments);
        };
      });
    }
    var status;
    if (options.data) {
      status = binding.renderSync(options);
    } else if (options.file) {
      status = binding.renderFileSync(options);
    } else {
      throw new Error('No input specified: provide a file name or a source string to process');
    }
    var result = options.result;
    if (status) {
      result.stats = endStats(result.stats);
      return result;
    }
    throw assign(new Error(), JSON.parse(result.error));
  };
  module.exports.info = sass.getVersionInfo(binding);
  module.exports.types = binding.types;
  module.exports.TRUE = binding.types.Boolean.TRUE;
  module.exports.FALSE = binding.types.Boolean.FALSE;
  module.exports.NULL = binding.types.Null.NULL;
  function processSassDeprecationMessage() {
    console.log('Deprecation warning: `process.sass` is an undocumented internal that will be removed in future versions of Node Sass.');
  }
  process.sass = process.sass || {
    get versionInfo() {
      processSassDeprecationMessage();
      return module.exports.info;
    },
    get binaryName() {
      processSassDeprecationMessage();
      return sass.getBinaryName();
    },
    get binaryUrl() {
      processSassDeprecationMessage();
      return sass.getBinaryUrl();
    },
    get binaryPath() {
      processSassDeprecationMessage();
      return sass.getBinaryPath();
    },
    get getBinaryPath() {
      processSassDeprecationMessage();
      return sass.getBinaryPath;
    }
  };
})(require('process'));
