'use strict';

System.register(['aurelia-framework', 'aurelia-authentication', 'aurelia-router', 'toastr'], function (_export, _context) {
    "use strict";

    var inject, AuthService, Router, log, _dec, _class, Signup;

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
        }, function (_toastr) {
            log = _toastr;
        }],
        execute: function () {
            _export('Signup', Signup = (_dec = inject(AuthService, Router), _dec(_class = function () {
                function Signup(auth, router) {
                    _classCallCheck(this, Signup);

                    this.heading = 'Sign Up';
                    this.signUpComplete = true;
                    this.signupError = '';

                    this.auth = auth;
                    this.router = router;
                }

                Signup.prototype.login = function login() {
                    this.router.navigate("login");
                };

                Signup.prototype.signup = function signup() {
                    var _this = this;

                    if (!this.email || !this.password) {
                        log.error("Please enter an email address and a password!");
                        return;
                    }

                    this.signUpComplete = false;

                    return this.auth.signup({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.userName,
                        email: this.email,
                        password: this.password
                    }).then(function (response) {
                        _this.signUpComplete = true;
                        _this.router.navigate("login");
                    }).catch(function (response) {
                        _this.signUpComplete = true;
                        console.log(response);
                        _this.router.navigate("login");
                    });
                };

                return Signup;
            }()) || _class));

            _export('Signup', Signup);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ251cC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJBdXRoU2VydmljZSIsIlJvdXRlciIsImxvZyIsIlNpZ251cCIsImF1dGgiLCJyb3V0ZXIiLCJoZWFkaW5nIiwic2lnblVwQ29tcGxldGUiLCJzaWdudXBFcnJvciIsImxvZ2luIiwibmF2aWdhdGUiLCJzaWdudXAiLCJlbWFpbCIsInBhc3N3b3JkIiwiZXJyb3IiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInVzZXJOYW1lIiwidGhlbiIsInJlc3BvbnNlIiwiY2F0Y2giLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLHVCLDBCQUFBQSxXOztBQUNBQyxrQixrQkFBQUEsTTs7QUFDSUMsZTs7OzhCQUtDQyxNLFdBRFpKLE9BQU9DLFdBQVAsRUFBb0JDLE1BQXBCLEM7QUFhRyxnQ0FBWUcsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEI7QUFBQTs7QUFBQSx5QkFWMUJDLE9BVTBCLEdBVmhCLFNBVWdCO0FBQUEseUJBTjFCQyxjQU0wQixHQU5ULElBTVM7QUFBQSx5QkFGMUJDLFdBRTBCLEdBRlosRUFFWTs7QUFDdEIseUJBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDSDs7aUNBQ0RJLEssb0JBQU87QUFDSCx5QkFBS0osTUFBTCxDQUFZSyxRQUFaLENBQXFCLE9BQXJCO0FBQ0gsaUI7O2lDQUNEQyxNLHFCQUFTO0FBQUE7O0FBRUwsd0JBQUcsQ0FBQyxLQUFLQyxLQUFOLElBQWUsQ0FBQyxLQUFLQyxRQUF4QixFQUNBO0FBQ0lYLDRCQUFJWSxLQUFKLENBQVUsK0NBQVY7QUFDQTtBQUNIOztBQUVELHlCQUFLUCxjQUFMLEdBQXNCLEtBQXRCOztBQUVBLDJCQUFPLEtBQUtILElBQUwsQ0FBVU8sTUFBVixDQUFpQjtBQUNwQkksbUNBQVcsS0FBS0EsU0FESTtBQUVwQkMsa0NBQVUsS0FBS0EsUUFGSztBQUdwQkMsa0NBQVUsS0FBS0EsUUFISztBQUlwQkwsK0JBQU8sS0FBS0EsS0FKUTtBQUtwQkMsa0NBQVUsS0FBS0E7QUFMSyxxQkFBakIsRUFPTkssSUFQTSxDQU9ELFVBQUNDLFFBQUQsRUFBYztBQUNoQiw4QkFBS1osY0FBTCxHQUFzQixJQUF0QjtBQUNBLDhCQUFLRixNQUFMLENBQVlLLFFBQVosQ0FBcUIsT0FBckI7QUFDSCxxQkFWTSxFQVdOVSxLQVhNLENBV0Esb0JBQVk7QUFDZiw4QkFBS2IsY0FBTCxHQUFzQixJQUF0QjtBQUNBYyxnQ0FBUW5CLEdBQVIsQ0FBWWlCLFFBQVo7QUFDQSw4QkFBS2QsTUFBTCxDQUFZSyxRQUFaLENBQXFCLE9BQXJCO0FBQ0gscUJBZk0sQ0FBUDtBQWlCSCxpQiIsImZpbGUiOiJzaWdudXAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
