/* */ 
define(['exports', '../validation-rule'], function (exports, _validationRule) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EmailRule = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var EmailRule = exports.EmailRule = function EmailRule() {
    _classCallCheck(this, EmailRule);

    return new _validationRule.ValidationRule('email', true);
  };
});