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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsInBsdWdpbiIsImNvbmZpZyIsInJlZ2lzdGVyRW5kcG9pbnQiLCJiYXNlQ29uZmlnIiwiZmVhdHVyZSIsInVzZURlZmF1bHRzIiwiY29udmVydGVyUGF0aCIsImdsb2JhbFJlc291cmNlcyIsInN0YXJ0IiwidGhlbiIsImEiLCJzZXRSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHTyxhQUFTQSxTQUFULENBQW1CQyxPQUFuQixFQUE0QjtBQUMvQkEsZ0JBQVFDLEdBQVIsQ0FDR0MscUJBREgsR0FFR0MsTUFGSCxDQUVVLGFBRlYsRUFFeUIsa0JBQVU7QUFDN0JDLG1CQUNHQyxnQkFESCxDQUNvQixNQURwQixFQUM0QkEsZ0JBRDVCLENBQzZDLEtBRDdDO0FBRUgsU0FMSCxFQU1HRixNQU5ILENBTVUsd0JBTlYsRUFNb0MsVUFBQ0csVUFBRCxFQUFjO0FBQzVDQSx1QkFBV1AsU0FBWCxDQUFxQkssTUFBckI7QUFDSCxTQVJIOztBQVVBSixnQkFBUUMsR0FBUixDQUFZTSxPQUFaLENBQW9CLFNBQXBCOztBQUdBUCxnQkFBUUMsR0FBUixDQUFZRSxNQUFaLENBQW1CLG9CQUFuQjtBQUNBSCxnQkFBUUMsR0FBUixDQUFZRSxNQUFaLENBQW1CLGdCQUFuQixFQUFxQyxrQkFBVTtBQUMzQ0MsbUJBQU9JLFdBQVA7QUFJSCxTQUxEO0FBTUFSLGdCQUFRQyxHQUFSLENBQVlFLE1BQVosQ0FBbUIsa0JBQW5COztBQUVBLFlBQUlNLGdCQUFnQix1QkFBcEI7QUFDQVQsZ0JBQVFDLEdBQVIsQ0FBWVMsZUFBWixDQUNHLHNCQURILEVBR0lELGdCQUFnQixNQUhwQixFQUlJQSxnQkFBZ0IsT0FKcEIsRUFLSUEsZ0JBQWdCLE9BTHBCLEVBTUlBLGdCQUFnQixhQU5wQixFQU9JQSxnQkFBZ0IsZUFQcEIsRUFRSUEsZ0JBQWdCLE1BUnBCLEVBU0lBLGdCQUFnQixNQVRwQixFQVVJQSxnQkFBZ0IsYUFWcEIsRUFXSUEsZ0JBQWdCLFFBWHBCLEVBWUlBLGdCQUFnQixtQkFacEIsRUFhSUEsZ0JBQWdCLGFBYnBCLEVBY0lBLGdCQUFnQixVQWRwQjs7QUFpQkFULGdCQUFRVyxLQUFSLEdBQWdCQyxJQUFoQixDQUFxQjtBQUFBLG1CQUFLQyxFQUFFQyxPQUFGLEVBQUw7QUFBQSxTQUFyQjtBQUNIOzt5QkExQ2VmLFM7Ozs7QUFGVEssa0IiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
