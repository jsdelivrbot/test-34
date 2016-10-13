/* */ 
(function(process) {
  var path = require('path');
  module.exports = function(file, prev, done) {
    done({file: path.resolve(path.join(process.cwd(), 'test/fixtures/include-files/', file + (path.extname(file) ? '' : '.scss')))});
  };
})(require('process'));
