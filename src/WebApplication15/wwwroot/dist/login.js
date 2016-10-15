'use strict';

System.register(['aurelia-framework', 'aurelia-authentication', 'aurelia-router', 'services/session', 'toastr'], function (_export, _context) {
    "use strict";

    var inject, AuthService, Router, Session, log, _dec, _class, Login;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaAuthentication) {
            AuthService = _aureliaAuthentication.AuthService;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_servicesSession) {
            Session = _servicesSession.Session;
        }, function (_toastr) {
            log = _toastr;
        }],
        execute: function () {
            _export('Login', Login = (_dec = inject(AuthService, Router, Session), _dec(_class = function () {
                function Login(authService, router, session) {
                    _classCallCheck(this, Login);

                    this.heading = 'Login';
                    this.userName = '';
                    this.password = '';
                    this.loginError = '';
                    this.emailConfirmed = false;

                    this.authService = authService;
                    this.authenticated = false;
                    this.router = router;
                    this.session = session;
                }

                Login.prototype.activate = function activate(params) {
                    if (params.c == 1) {
                        this.emailConfirmed = true;
                        this.userName = params.userName;
                        log.success("Thank you for confirming your email!");
                    }
                    if (this.authService.isAuthenticated()) {
                        location.href = '/#';
                    }
                };

                Login.prototype.forgotPassword = function forgotPassword() {
                    this.router.navigate("forgotPassword");
                };

                Login.prototype.signup = function signup() {
                    log.success('signup');
                    this.router.navigate("signup");
                };

                Login.prototype.login = function login() {
                    var _this = this;

                    return this.authService.login({
                        login: this.userName,
                        password: this.password
                    }).then(function (response) {
                        log.success('Welcome ' + _this.userName + "!");
                        _this.authenticated = _this.authService.isAuthenticated();

                        _this.currentUser = _this.session.getCurrentUser(response);
                    }).catch(function (response) {

                        if (response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false}') {
                            _this.loginError = "Your username or password was incorrect.";
                            return;
                        }
                        if (response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false, "email_verified":false}') {
                            _this.loginError = "Please verify your email before logging in! (Check your email address @ ";
                            return;
                        }
                    });
                };

                return Login;
            }()) || _class));

            _export('Login', Login);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkF1dGhTZXJ2aWNlIiwiUm91dGVyIiwiU2Vzc2lvbiIsImxvZyIsIkxvZ2luIiwiYXV0aFNlcnZpY2UiLCJyb3V0ZXIiLCJzZXNzaW9uIiwiaGVhZGluZyIsInVzZXJOYW1lIiwicGFzc3dvcmQiLCJsb2dpbkVycm9yIiwiZW1haWxDb25maXJtZWQiLCJhdXRoZW50aWNhdGVkIiwiYWN0aXZhdGUiLCJwYXJhbXMiLCJjIiwic3VjY2VzcyIsImlzQXV0aGVudGljYXRlZCIsImxvY2F0aW9uIiwiaHJlZiIsImZvcmdvdFBhc3N3b3JkIiwibmF2aWdhdGUiLCJzaWdudXAiLCJsb2dpbiIsInRoZW4iLCJjdXJyZW50VXNlciIsImdldEN1cnJlbnRVc2VyIiwicmVzcG9uc2UiLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyx1QiwwQkFBQUEsVzs7QUFDQUMsa0Isa0JBQUFBLE07O0FBQ0FDLG1CLG9CQUFBQSxPOztBQUNJQyxlOzs7NkJBR0NDLEssV0FEWkwsT0FBT0MsV0FBUCxFQUFvQkMsTUFBcEIsRUFBNEJDLE9BQTVCLEM7QUFHRywrQkFBWUcsV0FBWixFQUF5QkMsTUFBekIsRUFBaUNDLE9BQWpDLEVBQTBDO0FBQUE7O0FBQUEseUJBa0IxQ0MsT0FsQjBDLEdBa0JoQyxPQWxCZ0M7QUFBQSx5QkFvQjFDQyxRQXBCMEMsR0FvQi9CLEVBcEIrQjtBQUFBLHlCQXFCMUNDLFFBckIwQyxHQXFCL0IsRUFyQitCO0FBQUEseUJBc0IxQ0MsVUF0QjBDLEdBc0I3QixFQXRCNkI7QUFBQSx5QkF1QjFDQyxjQXZCMEMsR0F1QnpCLEtBdkJ5Qjs7QUFDdEMseUJBQUtQLFdBQUwsR0FBcUJBLFdBQXJCO0FBQ0EseUJBQUtRLGFBQUwsR0FBcUIsS0FBckI7QUFDQSx5QkFBS1AsTUFBTCxHQUFjQSxNQUFkO0FBQ0EseUJBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNIOztnQ0FFRE8sUSxxQkFBU0MsTSxFQUFPO0FBQ1osd0JBQUdBLE9BQU9DLENBQVAsSUFBWSxDQUFmLEVBQWlCO0FBQ2IsNkJBQUtKLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSw2QkFBS0gsUUFBTCxHQUFnQk0sT0FBT04sUUFBdkI7QUFDQU4sNEJBQUljLE9BQUosQ0FBWSxzQ0FBWjtBQUNIO0FBQ0Qsd0JBQUcsS0FBS1osV0FBTCxDQUFpQmEsZUFBakIsRUFBSCxFQUFzQztBQUNsQ0MsaUNBQVNDLElBQVQsR0FBYyxJQUFkO0FBQ0g7QUFDSixpQjs7Z0NBU0RDLGMsNkJBQWdCO0FBQ1oseUJBQUtmLE1BQUwsQ0FBWWdCLFFBQVosQ0FBcUIsZ0JBQXJCO0FBQ0gsaUI7O2dDQUNEQyxNLHFCQUFRO0FBQ0pwQix3QkFBSWMsT0FBSixDQUFZLFFBQVo7QUFDQSx5QkFBS1gsTUFBTCxDQUFZZ0IsUUFBWixDQUFxQixRQUFyQjtBQUNILGlCOztnQ0FXREUsSyxvQkFBUTtBQUFBOztBQUdKLDJCQUFPLEtBQUtuQixXQUFMLENBQWlCbUIsS0FBakIsQ0FBdUI7QUFDMUJBLCtCQUFPLEtBQUtmLFFBRGM7QUFFMUJDLGtDQUFVLEtBQUtBO0FBRlcscUJBQXZCLEVBSU5lLElBSk0sQ0FJRCxvQkFBWTtBQUNkdEIsNEJBQUljLE9BQUosQ0FBWSxhQUFhLE1BQUtSLFFBQWxCLEdBQTZCLEdBQXpDO0FBQ0EsOEJBQUtJLGFBQUwsR0FBcUIsTUFBS1IsV0FBTCxDQUFpQmEsZUFBakIsRUFBckI7O0FBRUEsOEJBQUtRLFdBQUwsR0FBbUIsTUFBS25CLE9BQUwsQ0FBYW9CLGNBQWIsQ0FBNEJDLFFBQTVCLENBQW5CO0FBQ0gscUJBVE0sRUFVTkMsS0FWTSxDQVVBLG9CQUFZOztBQUVmLDRCQUFHRCxXQUFXLG9GQUFkLEVBQW1HO0FBQy9GLGtDQUFLakIsVUFBTCxHQUFrQiwwQ0FBbEI7QUFDQTtBQUNIO0FBQ0QsNEJBQUdpQixXQUFXLDRHQUFkLEVBQTJIO0FBQ3ZILGtDQUFLakIsVUFBTCxHQUFrQiwwRUFBbEI7QUFDQTtBQUNIO0FBRUoscUJBckJNLENBQVA7QUFzQkgsaUIiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
