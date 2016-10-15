'use strict';

System.register(['aurelia-authentication', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var AuthService, inject, _dec, _class, Logout;

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
        }],
        execute: function () {
            _export('Logout', Logout = (_dec = inject(AuthService), _dec(_class = function () {
                function Logout(authService) {
                    _classCallCheck(this, Logout);

                    this.authService = authService;
                }

                Logout.prototype.activate = function activate() {
                    var _this = this;

                    this.authService.logout().then(function () {
                        _this.authenticated = _this.authService.isAuthenticated();
                    });
                };

                return Logout;
            }()) || _class));

            _export('Logout', Logout);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC5qcyJdLCJuYW1lcyI6WyJBdXRoU2VydmljZSIsImluamVjdCIsIkxvZ291dCIsImF1dGhTZXJ2aWNlIiwiYWN0aXZhdGUiLCJsb2dvdXQiLCJ0aGVuIiwiYXV0aGVudGljYXRlZCIsImlzQXV0aGVudGljYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLHVCLDBCQUFBQSxXOztBQUNBQyxrQixxQkFBQUEsTTs7OzhCQU1LQyxNLFdBRlpELE9BQU9ELFdBQVAsQztBQUlHLGdDQUFZRyxXQUFaLEVBQXlCO0FBQUE7O0FBQ3JCLHlCQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOztpQ0FFREMsUSx1QkFBVztBQUFBOztBQU1OLHlCQUFLRCxXQUFMLENBQWlCRSxNQUFqQixHQUNEQyxJQURDLENBQ0ksWUFBTTtBQUNSLDhCQUFLQyxhQUFMLEdBQXFCLE1BQUtKLFdBQUwsQ0FBaUJLLGVBQWpCLEVBQXJCO0FBQ0gscUJBSEM7QUFLSixpQiIsImZpbGUiOiJsb2dvdXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
