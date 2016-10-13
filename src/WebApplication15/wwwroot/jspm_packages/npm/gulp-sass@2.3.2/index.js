/* */ 
(function(process) {
  'use strict';
  var gutil = require('gulp-util');
  var through = require('through2');
  var clonedeep = require('lodash.clonedeep');
  var path = require('path');
  var applySourceMap = require('vinyl-sourcemaps-apply');
  var PLUGIN_NAME = 'gulp-sass';
  var gulpSass = function gulpSass(options, sync) {
    return through.obj(function(file, enc, cb) {
      var opts,
          filePush,
          errorM,
          callback,
          result;
      if (file.isNull()) {
        return cb(null, file);
      }
      if (file.isStream()) {
        return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      }
      if (path.basename(file.path).indexOf('_') === 0) {
        return cb();
      }
      if (!file.contents.length) {
        file.path = gutil.replaceExtension(file.path, '.css');
        return cb(null, file);
      }
      opts = clonedeep(options || {});
      opts.data = file.contents.toString();
      opts.file = file.path;
      if (path.extname(file.path) === '.sass') {
        opts.indentedSyntax = true;
      }
      if (opts.includePaths) {
        if (typeof opts.includePaths === 'string') {
          opts.includePaths = [opts.includePaths];
        }
      } else {
        opts.includePaths = [];
      }
      opts.includePaths.unshift(path.dirname(file.path));
      if (file.sourceMap) {
        opts.sourceMap = file.path;
        opts.omitSourceMapUrl = true;
        opts.sourceMapContents = true;
      }
      filePush = function filePush(sassObj) {
        var sassMap,
            sassMapFile,
            sassFileSrc,
            sassFileSrcPath,
            sourceFileIndex;
        if (sassObj.map) {
          sassMap = JSON.parse(sassObj.map.toString());
          sassMapFile = sassMap.file.replace(/^stdout$/, 'stdin');
          sassFileSrc = file.relative;
          sassFileSrcPath = path.dirname(sassFileSrc);
          if (sassFileSrcPath) {
            sourceFileIndex = sassMap.sources.indexOf(sassMapFile);
            sassMap.sources = sassMap.sources.map(function(source, index) {
              return (index === sourceFileIndex) ? source : path.join(sassFileSrcPath, source);
            });
          }
          sassMap.sources = sassMap.sources.filter(function(src) {
            if (src !== 'stdin') {
              return src;
            }
          });
          sassMap.file = gutil.replaceExtension(sassFileSrc, '.css');
          applySourceMap(file, sassMap);
        }
        file.contents = sassObj.css;
        file.path = gutil.replaceExtension(file.path, '.css');
        cb(null, file);
      };
      errorM = function errorM(error) {
        var relativePath = '',
            filePath = error.file === 'stdin' ? file.path : error.file,
            message = '';
        filePath = filePath ? filePath : file.path;
        relativePath = path.relative(process.cwd(), filePath);
        message += gutil.colors.underline(relativePath) + '\n';
        message += error.formatted;
        error.messageFormatted = message;
        error.messageOriginal = error.message;
        error.message = gutil.colors.stripColor(message);
        error.relativePath = relativePath;
        return cb(new gutil.PluginError(PLUGIN_NAME, error));
      };
      if (sync !== true) {
        callback = function(error, obj) {
          if (error) {
            return errorM(error);
          }
          filePush(obj);
        };
        gulpSass.compiler.render(opts, callback);
      } else {
        try {
          result = gulpSass.compiler.renderSync(opts);
          filePush(result);
        } catch (error) {
          return errorM(error);
        }
      }
    });
  };
  gulpSass.sync = function sync(options) {
    return gulpSass(options, true);
  };
  gulpSass.logError = function logError(error) {
    var message = new gutil.PluginError('sass', error.messageFormatted).toString();
    process.stderr.write(message + '\n');
    this.emit('end');
  };
  gulpSass.compiler = require('node-sass');
  module.exports = gulpSass;
})(require('process'));
