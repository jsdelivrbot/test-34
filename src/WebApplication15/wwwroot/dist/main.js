'use strict';

System.register(['./authConfig'], function (_export, _context) {
    "use strict";

    var config;
    function configure(aurelia) {
        aurelia.use.standardConfiguration().plugin('aurelia-api', function (config) {
            config.registerEndpoint('auth').registerEndpoint('api');
        }).plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(config);
        });

        aurelia.use.feature('configs');

        aurelia.use.plugin('aurelia-validatejs');
        aurelia.use.plugin('aurelia-dialog', function (config) {
            config.useDefaults();
            config.settings.lock = false;
            config.settings.centerHorizontalOnly = false;
        });
        aurelia.use.plugin('velocity-animate');

        var converterPath = 'resources/converters/';
        aurelia.use.globalResources('schedule/match-modal', converterPath + 'json', converterPath + 'upper', converterPath + 'lower', converterPath + 'date-format', converterPath + 'number-format', converterPath + 'sort', converterPath + 'take', converterPath + 'object-keys', converterPath + 'filter', converterPath + 'filelist-to-array', converterPath + 'blob-to-url', converterPath + 'group-by');

        aurelia.start().then(function (a) {
            return a.setRoot();
        });
    }

    _export('configure', configure);

    return {
        setters: [function (_authConfig) {
            config = _authConfig.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsInBsdWdpbiIsImNvbmZpZyIsInJlZ2lzdGVyRW5kcG9pbnQiLCJiYXNlQ29uZmlnIiwiZmVhdHVyZSIsInVzZURlZmF1bHRzIiwic2V0dGluZ3MiLCJsb2NrIiwiY2VudGVySG9yaXpvbnRhbE9ubHkiLCJjb252ZXJ0ZXJQYXRoIiwiZ2xvYmFsUmVzb3VyY2VzIiwic3RhcnQiLCJ0aGVuIiwiYSIsInNldFJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdPLGFBQVNBLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQy9CQSxnQkFBUUMsR0FBUixDQUNHQyxxQkFESCxHQUVHQyxNQUZILENBRVUsYUFGVixFQUV5QixrQkFBVTtBQUM3QkMsbUJBQ0dDLGdCQURILENBQ29CLE1BRHBCLEVBQzRCQSxnQkFENUIsQ0FDNkMsS0FEN0M7QUFFSCxTQUxILEVBTUdGLE1BTkgsQ0FNVSx3QkFOVixFQU1vQyxVQUFDRyxVQUFELEVBQWM7QUFDNUNBLHVCQUFXUCxTQUFYLENBQXFCSyxNQUFyQjtBQUNILFNBUkg7O0FBVUFKLGdCQUFRQyxHQUFSLENBQVlNLE9BQVosQ0FBb0IsU0FBcEI7O0FBR0FQLGdCQUFRQyxHQUFSLENBQVlFLE1BQVosQ0FBbUIsb0JBQW5CO0FBQ0FILGdCQUFRQyxHQUFSLENBQVlFLE1BQVosQ0FBbUIsZ0JBQW5CLEVBQXFDLGtCQUFVO0FBQzNDQyxtQkFBT0ksV0FBUDtBQUNBSixtQkFBT0ssUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsS0FBdkI7QUFDQU4sbUJBQU9LLFFBQVAsQ0FBZ0JFLG9CQUFoQixHQUF1QyxLQUF2QztBQUVILFNBTEQ7QUFNQVgsZ0JBQVFDLEdBQVIsQ0FBWUUsTUFBWixDQUFtQixrQkFBbkI7O0FBRUEsWUFBSVMsZ0JBQWdCLHVCQUFwQjtBQUNBWixnQkFBUUMsR0FBUixDQUFZWSxlQUFaLENBQ0csc0JBREgsRUFFSUQsZ0JBQWdCLE1BRnBCLEVBR0lBLGdCQUFnQixPQUhwQixFQUlJQSxnQkFBZ0IsT0FKcEIsRUFLSUEsZ0JBQWdCLGFBTHBCLEVBTUlBLGdCQUFnQixlQU5wQixFQU9JQSxnQkFBZ0IsTUFQcEIsRUFRSUEsZ0JBQWdCLE1BUnBCLEVBU0lBLGdCQUFnQixhQVRwQixFQVVJQSxnQkFBZ0IsUUFWcEIsRUFXSUEsZ0JBQWdCLG1CQVhwQixFQVlJQSxnQkFBZ0IsYUFacEIsRUFhSUEsZ0JBQWdCLFVBYnBCOztBQWdCQVosZ0JBQVFjLEtBQVIsR0FBZ0JDLElBQWhCLENBQXFCO0FBQUEsbUJBQUtDLEVBQUVDLE9BQUYsRUFBTDtBQUFBLFNBQXJCO0FBQ0g7O3lCQXpDZWxCLFM7Ozs7QUFGVEssa0IiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
