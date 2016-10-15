'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'services/dataservices/manage-user-service', 'toastr', 'aurelia-router'], function (_export, _context) {
    "use strict";

    var AuthService, inject, ManageUserService, log, Router, _dec, _class, Login;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaAuthentication) {
            AuthService = _aureliaAuthentication.AuthService;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_servicesDataservicesManageUserService) {
            ManageUserService = _servicesDataservicesManageUserService.ManageUserService;
        }, function (_toastr) {
            log = _toastr;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }],
        execute: function () {
            _export('Login', Login = (_dec = inject(AuthService, ManageUserService, Router), _dec(_class = function () {
                function Login(auth, manage, router) {
                    _classCallCheck(this, Login);

                    this.heading = 'Forgot your password?';
                    this.email = '';
                    this.password = '';
                    this.loginError = '';

                    this.auth = auth;
                    this.manage = manage;
                    this.router = router;
                }

                Login.prototype.forgotPassword = function forgotPassword() {
                    var _this = this;

                    return this.manage.forgotPassword(this.email).then(function (response) {
                        _this.router.navigate("confirmationSent");
                    }).catch(function (error) {
                        _this.loginError = error.response;
                        console.log(error);
                        log.error(error.ErrorMessage);
                    });
                };

                return Login;
            }()) || _class));

            _export('Login', Login);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcmdvdFBhc3N3b3JkLmpzIl0sIm5hbWVzIjpbIkF1dGhTZXJ2aWNlIiwiaW5qZWN0IiwiTWFuYWdlVXNlclNlcnZpY2UiLCJsb2ciLCJSb3V0ZXIiLCJMb2dpbiIsImF1dGgiLCJtYW5hZ2UiLCJyb3V0ZXIiLCJoZWFkaW5nIiwiZW1haWwiLCJwYXNzd29yZCIsImxvZ2luRXJyb3IiLCJmb3Jnb3RQYXNzd29yZCIsInRoZW4iLCJuYXZpZ2F0ZSIsImNhdGNoIiwiZXJyb3IiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJFcnJvck1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSx1QiwwQkFBQUEsVzs7QUFDQUMsa0IscUJBQUFBLE07O0FBQ0FDLDZCLDBDQUFBQSxpQjs7QUFDSUMsZTs7QUFDSkMsa0Isa0JBQUFBLE07Ozs2QkFHS0MsSyxXQURaSixPQUFPRCxXQUFQLEVBQW9CRSxpQkFBcEIsRUFBdUNFLE1BQXZDLEM7QUFHRywrQkFBWUUsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQUE7O0FBQUEseUJBTWxDQyxPQU5rQyxHQU14Qix1QkFOd0I7QUFBQSx5QkFRbENDLEtBUmtDLEdBUTFCLEVBUjBCO0FBQUEseUJBU2xDQyxRQVRrQyxHQVN2QixFQVR1QjtBQUFBLHlCQVVsQ0MsVUFWa0MsR0FVckIsRUFWcUI7O0FBQzlCLHlCQUFLTixJQUFMLEdBQVlBLElBQVo7QUFDQSx5QkFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNIOztnQ0FRREssYyw2QkFBZ0I7QUFBQTs7QUFDWiwyQkFBTyxLQUFLTixNQUFMLENBQVlNLGNBQVosQ0FBMkIsS0FBS0gsS0FBaEMsRUFDRkksSUFERSxDQUNHLG9CQUFZO0FBQ2QsOEJBQUtOLE1BQUwsQ0FBWU8sUUFBWixDQUFxQixrQkFBckI7QUFDSCxxQkFIRSxFQUlOQyxLQUpNLENBSUEsaUJBQVM7QUFDWiw4QkFBS0osVUFBTCxHQUFrQkssTUFBTUMsUUFBeEI7QUFDQUMsZ0NBQVFoQixHQUFSLENBQVljLEtBQVo7QUFDQWQsNEJBQUljLEtBQUosQ0FBVUEsTUFBTUcsWUFBaEI7QUFDSCxxQkFSTSxDQUFQO0FBVUgsaUIiLCJmaWxlIjoiZm9yZ290UGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
