'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var baseConfig, configForDevelopment, configForProduction, config;
    return {
        setters: [],
        execute: function () {
            baseConfig = {
                endpoint: 'auth',
                configureEndpoints: ['auth', 'api']
            };
            configForDevelopment = {
                profileUrl: '/auth/me',

                authHeader: 'Authorization',

                authTokenType: 'Bearer',
                accessTokenProp: 'id_token',
                signupRedirect: '/#/login',
                httpInterceptor: false,

                accessTokenName: 'id_token',

                loginRedirect: '#/schedule',
                logoutRedirect: '#/login',
                loginUrl: '/auth/login',

                loginRoute: '#/login',

                useRefreshToken: true,

                autoUpdateToken: true,

                clientId: false,

                refreshTokenProp: 'refresh_token',

                refreshTokenName: 'token',

                refreshTokenRoot: false,
                withCredentials: true,

                platform: 'browser',

                storage: 'localStorage',

                storageKey: 'aurelia_authentication'
            };
            configForProduction = {
                profileUrl: '/auth/me',

                authHeader: 'Authorization',

                authTokenType: 'Bearer',
                accessTokenProp: 'id_token',
                signupRedirect: '/#/login',
                httpInterceptor: false,

                accessTokenName: 'id_token',

                loginRedirect: '#/schedule',
                logoutRedirect: '#/login',
                loginUrl: '/auth/login',

                loginRoute: '#/login',

                useRefreshToken: true,

                autoUpdateToken: true,

                clientId: false,

                refreshTokenProp: 'refresh_token',

                refreshTokenName: 'token',

                refreshTokenRoot: false,
                withCredentials: true,

                platform: 'browser',

                storage: 'localStorage',

                storageKey: 'aurelia_authentication'
            };

            if (window.location.hostname === 'localhost') {
                config = Object.assign({}, baseConfig, configForDevelopment);
            } else {
                config = Object.assign({}, baseConfig, configForProduction);
            }

            _export('default', config);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhDb25maWcuanMiXSwibmFtZXMiOlsiYmFzZUNvbmZpZyIsImVuZHBvaW50IiwiY29uZmlndXJlRW5kcG9pbnRzIiwiY29uZmlnRm9yRGV2ZWxvcG1lbnQiLCJwcm9maWxlVXJsIiwiYXV0aEhlYWRlciIsImF1dGhUb2tlblR5cGUiLCJhY2Nlc3NUb2tlblByb3AiLCJzaWdudXBSZWRpcmVjdCIsImh0dHBJbnRlcmNlcHRvciIsImFjY2Vzc1Rva2VuTmFtZSIsImxvZ2luUmVkaXJlY3QiLCJsb2dvdXRSZWRpcmVjdCIsImxvZ2luVXJsIiwibG9naW5Sb3V0ZSIsInVzZVJlZnJlc2hUb2tlbiIsImF1dG9VcGRhdGVUb2tlbiIsImNsaWVudElkIiwicmVmcmVzaFRva2VuUHJvcCIsInJlZnJlc2hUb2tlbk5hbWUiLCJyZWZyZXNoVG9rZW5Sb290Iiwid2l0aENyZWRlbnRpYWxzIiwicGxhdGZvcm0iLCJzdG9yYWdlIiwic3RvcmFnZUtleSIsImNvbmZpZ0ZvclByb2R1Y3Rpb24iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiY29uZmlnIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBSUEsc0IsR0FBYTtBQUNiQywwQkFBVSxNQURHO0FBRWJDLG9DQUFvQixDQUFDLE1BQUQsRUFBUyxLQUFUO0FBRlAsYTtBQUtiQyxnQyxHQUF1QjtBQUd2QkMsNEJBQVksVUFIVzs7QUFNdkJDLDRCQUFZLGVBTlc7O0FBUXZCQywrQkFBZ0IsUUFSTztBQVN2QkMsaUNBQWtCLFVBVEs7QUFVdkJDLGdDQUFnQixVQVZPO0FBV3ZCQyxpQ0FBaUIsS0FYTTs7QUFjdkJDLGlDQUFrQixVQWRLOztBQWdCdkJDLCtCQUFlLFlBaEJRO0FBaUJ2QkMsZ0NBQWdCLFNBakJPO0FBa0J2QkMsMEJBQVUsYUFsQmE7O0FBb0J2QkMsNEJBQVksU0FwQlc7O0FBc0J2QkMsaUNBQWlCLElBdEJNOztBQXdCdkJDLGlDQUFpQixJQXhCTTs7QUEwQjNCQywwQkFBVSxLQTFCaUI7O0FBNEIzQkMsa0NBQWtCLGVBNUJTOztBQThCM0JDLGtDQUFrQixPQTlCUzs7QUFnQzNCQyxrQ0FBa0IsS0FoQ1M7QUFpQzNCQyxpQ0FBaUIsSUFqQ1U7O0FBbUMzQkMsMEJBQVUsU0FuQ2lCOztBQXFDM0JDLHlCQUFTLGNBckNrQjs7QUF1QzNCQyw0QkFBWTtBQXZDZSxhO0FBMEN2QkMsK0IsR0FBc0I7QUFHdEJyQiw0QkFBWSxVQUhVOztBQU10QkMsNEJBQVksZUFOVTs7QUFRdEJDLCtCQUFnQixRQVJNO0FBU3RCQyxpQ0FBa0IsVUFUSTtBQVV0QkMsZ0NBQWdCLFVBVk07QUFXdEJDLGlDQUFpQixLQVhLOztBQWN0QkMsaUNBQWtCLFVBZEk7O0FBZ0J0QkMsK0JBQWUsWUFoQk87QUFpQnRCQyxnQ0FBZ0IsU0FqQk07QUFrQnRCQywwQkFBVSxhQWxCWTs7QUFvQnRCQyw0QkFBWSxTQXBCVTs7QUFzQnRCQyxpQ0FBaUIsSUF0Qks7O0FBd0J0QkMsaUNBQWlCLElBeEJLOztBQTBCdEJDLDBCQUFVLEtBMUJZOztBQTRCdEJDLGtDQUFrQixlQTVCSTs7QUE4QnRCQyxrQ0FBa0IsT0E5Qkk7O0FBZ0N0QkMsa0NBQWtCLEtBaENJO0FBaUN0QkMsaUNBQWlCLElBakNLOztBQW1DdEJDLDBCQUFVLFNBbkNZOztBQXFDdEJDLHlCQUFTLGNBckNhOztBQXVDdEJDLDRCQUFZO0FBdkNVLGE7O0FBMEMxQixnQkFBSUUsT0FBT0MsUUFBUCxDQUFnQkMsUUFBaEIsS0FBNkIsV0FBakMsRUFBOEM7QUFDMUNDLHlCQUFTQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQi9CLFVBQWxCLEVBQThCRyxvQkFBOUIsQ0FBVDtBQUNILGFBRkQsTUFHSztBQUNEMEIseUJBQVNDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCL0IsVUFBbEIsRUFBOEJ5QixtQkFBOUIsQ0FBVDtBQUNIOzsrQkFFY0ksTSIsImZpbGUiOiJhdXRoQ29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
