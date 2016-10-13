/* */ 
(function(process) {
  var argv = require('../../minimist@1.2.0')(process.argv.slice(2));
  console.dir(argv);
})(require('process'));
