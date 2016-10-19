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
        aurelia.use.plugin('aurelia-dialog');
        aurelia.use.plugin('aurelia-animator-velocity');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsInBsdWdpbiIsImNvbmZpZyIsInJlZ2lzdGVyRW5kcG9pbnQiLCJiYXNlQ29uZmlnIiwiZmVhdHVyZSIsImNvbnZlcnRlclBhdGgiLCJnbG9iYWxSZXNvdXJjZXMiLCJzdGFydCIsInRoZW4iLCJhIiwic2V0Um9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDL0JBLGdCQUFRQyxHQUFSLENBQ0dDLHFCQURILEdBRUdDLE1BRkgsQ0FFVSxhQUZWLEVBRXlCLGtCQUFVO0FBQzdCQyxtQkFDR0MsZ0JBREgsQ0FDb0IsTUFEcEIsRUFDNEJBLGdCQUQ1QixDQUM2QyxLQUQ3QztBQUVILFNBTEgsRUFNR0YsTUFOSCxDQU1VLHdCQU5WLEVBTW9DLFVBQUNHLFVBQUQsRUFBYztBQUM1Q0EsdUJBQVdQLFNBQVgsQ0FBcUJLLE1BQXJCO0FBQ0gsU0FSSDs7QUFVQUosZ0JBQVFDLEdBQVIsQ0FBWU0sT0FBWixDQUFvQixTQUFwQjs7QUFHQVAsZ0JBQVFDLEdBQVIsQ0FBWUUsTUFBWixDQUFtQixvQkFBbkI7QUFDQUgsZ0JBQVFDLEdBQVIsQ0FBWUUsTUFBWixDQUFtQixnQkFBbkI7QUFDQUgsZ0JBQVFDLEdBQVIsQ0FBWUUsTUFBWixDQUFtQiwyQkFBbkI7O0FBRUEsWUFBSUssZ0JBQWdCLHVCQUFwQjtBQUNBUixnQkFBUUMsR0FBUixDQUFZUSxlQUFaLENBQ0csc0JBREgsRUFFSUQsZ0JBQWdCLE1BRnBCLEVBR0lBLGdCQUFnQixPQUhwQixFQUlJQSxnQkFBZ0IsT0FKcEIsRUFLSUEsZ0JBQWdCLGFBTHBCLEVBTUlBLGdCQUFnQixlQU5wQixFQU9JQSxnQkFBZ0IsTUFQcEIsRUFRSUEsZ0JBQWdCLE1BUnBCLEVBU0lBLGdCQUFnQixhQVRwQixFQVVJQSxnQkFBZ0IsUUFWcEIsRUFXSUEsZ0JBQWdCLG1CQVhwQixFQVlJQSxnQkFBZ0IsYUFacEIsRUFhSUEsZ0JBQWdCLFVBYnBCOztBQWdCQVIsZ0JBQVFVLEtBQVIsR0FBZ0JDLElBQWhCLENBQXFCO0FBQUEsbUJBQUtDLEVBQUVDLE9BQUYsRUFBTDtBQUFBLFNBQXJCO0FBQ0g7O3lCQXBDZWQsUzs7OztBQUZUSyxrQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
