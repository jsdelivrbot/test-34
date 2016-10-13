/* */ 
var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseFlatten = require('./_baseFlatten'),
    baseIteratee = require('./_baseIteratee'),
    isFlattenableIteratee = require('./_isFlattenableIteratee'),
    rest = require('./rest');
function createOver(arrayFunc) {
  return rest(function(iteratees) {
    iteratees = arrayMap(baseFlatten(iteratees, 1, isFlattenableIteratee), baseIteratee);
    return rest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}
module.exports = createOver;
