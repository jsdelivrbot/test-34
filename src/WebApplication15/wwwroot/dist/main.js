'use strict';

System.register(['./authConfig'], function (_export, _context) {
    "use strict";

    var config;
    function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-api', function (config) {
            config.registerEndpoint('auth').registerEndpoint('api');
        }).plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(config);
        });

        aurelia.use.feature('configs');

        aurelia.use.plugin('aurelia-validatejs');
        aurelia.use.plugin('aurelia-dialog');
        aurelia.use.plugin('aurelia-animator-velocity');

        var converterPath = 'resources/converters/';
        aurelia.use.globalResources(converterPath + 'json', converterPath + 'upper', converterPath + 'lower', converterPath + 'date-format', converterPath + 'number-format', converterPath + 'sort', converterPath + 'take', converterPath + 'object-keys', converterPath + 'filter', converterPath + 'filelist-to-array', converterPath + 'blob-to-url', converterPath + 'group-by');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsImRldmVsb3BtZW50TG9nZ2luZyIsInBsdWdpbiIsImNvbmZpZyIsInJlZ2lzdGVyRW5kcG9pbnQiLCJiYXNlQ29uZmlnIiwiZmVhdHVyZSIsImNvbnZlcnRlclBhdGgiLCJnbG9iYWxSZXNvdXJjZXMiLCJzdGFydCIsInRoZW4iLCJhIiwic2V0Um9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDL0JBLGdCQUFRQyxHQUFSLENBQ0dDLHFCQURILEdBRUdDLGtCQUZILEdBRXdCQyxNQUZ4QixDQUUrQixhQUYvQixFQUU4QyxrQkFBVTtBQUNsREMsbUJBQ0dDLGdCQURILENBQ29CLE1BRHBCLEVBQzRCQSxnQkFENUIsQ0FDNkMsS0FEN0M7QUFFSCxTQUxILEVBTUdGLE1BTkgsQ0FNVSx3QkFOVixFQU1vQyxVQUFDRyxVQUFELEVBQWM7QUFDNUNBLHVCQUFXUixTQUFYLENBQXFCTSxNQUFyQjtBQUNILFNBUkg7O0FBVUFMLGdCQUFRQyxHQUFSLENBQVlPLE9BQVosQ0FBb0IsU0FBcEI7O0FBR0FSLGdCQUFRQyxHQUFSLENBQVlHLE1BQVosQ0FBbUIsb0JBQW5CO0FBQ0FKLGdCQUFRQyxHQUFSLENBQVlHLE1BQVosQ0FBbUIsZ0JBQW5CO0FBQ0FKLGdCQUFRQyxHQUFSLENBQVlHLE1BQVosQ0FBbUIsMkJBQW5COztBQUVBLFlBQUlLLGdCQUFnQix1QkFBcEI7QUFDQVQsZ0JBQVFDLEdBQVIsQ0FBWVMsZUFBWixDQUVJRCxnQkFBZ0IsTUFGcEIsRUFHSUEsZ0JBQWdCLE9BSHBCLEVBSUlBLGdCQUFnQixPQUpwQixFQUtJQSxnQkFBZ0IsYUFMcEIsRUFNSUEsZ0JBQWdCLGVBTnBCLEVBT0lBLGdCQUFnQixNQVBwQixFQVFJQSxnQkFBZ0IsTUFScEIsRUFTSUEsZ0JBQWdCLGFBVHBCLEVBVUlBLGdCQUFnQixRQVZwQixFQVdJQSxnQkFBZ0IsbUJBWHBCLEVBWUlBLGdCQUFnQixhQVpwQixFQWFJQSxnQkFBZ0IsVUFicEI7O0FBZ0JBVCxnQkFBUVcsS0FBUixHQUFnQkMsSUFBaEIsQ0FBcUI7QUFBQSxtQkFBS0MsRUFBRUMsT0FBRixFQUFMO0FBQUEsU0FBckI7QUFDSDs7eUJBcENlZixTOzs7O0FBRlRNLGtCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
