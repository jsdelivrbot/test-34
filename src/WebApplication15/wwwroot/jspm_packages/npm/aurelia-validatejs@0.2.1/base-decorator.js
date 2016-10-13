/* */ 
define(['exports', 'aurelia-metadata', './validation-config', './validation-engine', 'aurelia-validation'], function (exports, _aureliaMetadata, _validationConfig, _validationEngine, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.base = base;
  function base(targetOrConfig, key, descriptor, Rule) {
    var deco = function deco(target, key2, descriptor2) {
      var config = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaValidation.validationMetadataKey, _validationConfig.ValidationConfig, target);
      config.addRule(key2, new Rule(targetOrConfig));

      var innerPropertyName = '_' + key2;

      if (descriptor2.initializer) {
        target[innerPropertyName] = descriptor2.initializer();
      }

      delete descriptor2.writable;
      delete descriptor2.initializer;

      descriptor2.get = function () {
        return this[innerPropertyName];
      };
      descriptor2.set = function (newValue) {
        var reporter = _validationEngine.ValidationEngine.getValidationReporter(this);

        this[innerPropertyName] = newValue;

        config.validate(this, reporter);
      };

      descriptor2.get.dependencies = [innerPropertyName];
    };

    if (key) {
      var target = targetOrConfig;
      targetOrConfig = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
});