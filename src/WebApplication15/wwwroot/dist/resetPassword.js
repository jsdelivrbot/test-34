'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'services/dataservices/manage-user-service', 'toastr', 'aurelia-router'], function (_export, _context) {
    "use strict";

    var AuthService, inject, ManageUserService, log, Router, _dec, _class, ResetPassword;

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
            _export('ResetPassword', ResetPassword = (_dec = inject(AuthService, ManageUserService, Router), _dec(_class = function () {
                function ResetPassword(auth, manage, router) {
                    _classCallCheck(this, ResetPassword);

                    this.heading = 'Reset Password';
                    this.userId = '';
                    this.email = '';
                    this.password = '';
                    this.loginError = '';
                    this.confirmPassword = '';
                    this.code = '';

                    this.auth = auth;
                    this.manage = manage;
                    this.router = router;
                }

                ResetPassword.prototype.activate = function activate(params) {
                    if (params.userId && params.code && params.email) {
                        this.userId = params.userId;
                        this.code = params.code;
                        this.email = params.email;
                    }
                };

                ResetPassword.prototype.resetPassword = function resetPassword() {
                    var _this = this;

                    var model = {
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmPassword,
                        code: decodeURIComponent(this.code)
                    };

                    return this.manage.resetPassword(model).then(function (response) {
                        log.success(response);
                        console.log("Reset password response: " + response);
                        _this.router.navigate("login");
                    }).catch(function (error) {
                        _this.loginError = error.response;
                        console.log(error);
                        log.error(error.ErrorMessage);
                    });
                };

                return ResetPassword;
            }()) || _class));

            _export('ResetPassword', ResetPassword);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0UGFzc3dvcmQuanMiXSwibmFtZXMiOlsiQXV0aFNlcnZpY2UiLCJpbmplY3QiLCJNYW5hZ2VVc2VyU2VydmljZSIsImxvZyIsIlJvdXRlciIsIlJlc2V0UGFzc3dvcmQiLCJhdXRoIiwibWFuYWdlIiwicm91dGVyIiwiaGVhZGluZyIsInVzZXJJZCIsImVtYWlsIiwicGFzc3dvcmQiLCJsb2dpbkVycm9yIiwiY29uZmlybVBhc3N3b3JkIiwiY29kZSIsImFjdGl2YXRlIiwicGFyYW1zIiwicmVzZXRQYXNzd29yZCIsIm1vZGVsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidGhlbiIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJuYXZpZ2F0ZSIsImNhdGNoIiwiZXJyb3IiLCJFcnJvck1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSx1QiwwQkFBQUEsVzs7QUFDQUMsa0IscUJBQUFBLE07O0FBQ0FDLDZCLDBDQUFBQSxpQjs7QUFDSUMsZTs7QUFDSkMsa0Isa0JBQUFBLE07OztxQ0FHS0MsYSxXQURaSixPQUFPRCxXQUFQLEVBQW9CRSxpQkFBcEIsRUFBdUNFLE1BQXZDLEM7QUFXRyx1Q0FBWUUsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQUE7O0FBQUEseUJBUmxDQyxPQVFrQyxHQVJ4QixnQkFRd0I7QUFBQSx5QkFQbENDLE1BT2tDLEdBUHpCLEVBT3lCO0FBQUEseUJBTmxDQyxLQU1rQyxHQU4xQixFQU0wQjtBQUFBLHlCQUxsQ0MsUUFLa0MsR0FMdkIsRUFLdUI7QUFBQSx5QkFKbENDLFVBSWtDLEdBSnJCLEVBSXFCO0FBQUEseUJBSGxDQyxlQUdrQyxHQUhoQixFQUdnQjtBQUFBLHlCQUZsQ0MsSUFFa0MsR0FGM0IsRUFFMkI7O0FBQzlCLHlCQUFLVCxJQUFMLEdBQVlBLElBQVo7QUFDQSx5QkFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNIOzt3Q0FFRFEsUSxxQkFBU0MsTSxFQUFPO0FBQ1osd0JBQUdBLE9BQU9QLE1BQVAsSUFBaUJPLE9BQU9GLElBQXhCLElBQWdDRSxPQUFPTixLQUExQyxFQUFnRDtBQUM1Qyw2QkFBS0QsTUFBTCxHQUFjTyxPQUFPUCxNQUFyQjtBQUNBLDZCQUFLSyxJQUFMLEdBQVlFLE9BQU9GLElBQW5CO0FBQ0EsNkJBQUtKLEtBQUwsR0FBYU0sT0FBT04sS0FBcEI7QUFDSDtBQUNKLGlCOzt3Q0FHRE8sYSw0QkFBZTtBQUFBOztBQUVYLHdCQUFJQyxRQUFRO0FBQ1JSLCtCQUFPLEtBQUtBLEtBREo7QUFFUkMsa0NBQVUsS0FBS0EsUUFGUDtBQUdSRSx5Q0FBaUIsS0FBS0EsZUFIZDtBQUlSQyw4QkFBT0ssbUJBQW1CLEtBQUtMLElBQXhCO0FBSkMscUJBQVo7O0FBT0EsMkJBQU8sS0FBS1IsTUFBTCxDQUFZVyxhQUFaLENBQTBCQyxLQUExQixFQUNGRSxJQURFLENBQ0csb0JBQVk7QUFDZGxCLDRCQUFJbUIsT0FBSixDQUFZQyxRQUFaO0FBQ0FDLGdDQUFRckIsR0FBUixDQUFZLDhCQUE4Qm9CLFFBQTFDO0FBQ0EsOEJBQUtmLE1BQUwsQ0FBWWlCLFFBQVosQ0FBcUIsT0FBckI7QUFDSCxxQkFMRSxFQU1OQyxLQU5NLENBTUEsaUJBQVM7QUFDWiw4QkFBS2IsVUFBTCxHQUFrQmMsTUFBTUosUUFBeEI7QUFDQUMsZ0NBQVFyQixHQUFSLENBQVl3QixLQUFaO0FBQ0F4Qiw0QkFBSXdCLEtBQUosQ0FBVUEsTUFBTUMsWUFBaEI7QUFDSCxxQkFWTSxDQUFQO0FBWUgsaUIiLCJmaWxlIjoicmVzZXRQYXNzd29yZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
