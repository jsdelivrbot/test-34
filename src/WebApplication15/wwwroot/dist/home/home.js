'use strict';

System.register(['aurelia-framework', 'aurelia-authentication', 'services/session', 'toastr', 'aurelia-router'], function (_export, _context) {
    "use strict";

    var inject, AuthService, Session, computedFrom, log, Router, _createClass, _dec, _class, Home;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            computedFrom = _aureliaFramework.computedFrom;
        }, function (_aureliaAuthentication) {
            AuthService = _aureliaAuthentication.AuthService;
        }, function (_servicesSession) {
            Session = _servicesSession.Session;
        }, function (_toastr) {
            log = _toastr;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('Home', Home = (_dec = inject(AuthService, Session, Router), _dec(_class = function () {
                function Home(auth, session, router) {
                    _classCallCheck(this, Home);

                    this.auth = auth;
                    this.session = session;
                    this.router = router;

                    this.currentUser = this.getCurrentUser();
                }

                Home.prototype.activate = function activate() {};

                Home.prototype.getCurrentUser = function getCurrentUser() {

                    try {

                        var token = localStorage.getItem('aurelia_id_token');
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

                        this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

                        return this.currentUser;
                    } catch (error) {}
                };

                _createClass(Home, [{
                    key: 'isAuthenticated',
                    get: function get() {
                        return this.auth.isAuthenticated();
                    }
                }]);

                return Home;
            }()) || _class));

            _export('Home', Home);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvaG9tZS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJjb21wdXRlZEZyb20iLCJBdXRoU2VydmljZSIsIlNlc3Npb24iLCJsb2ciLCJSb3V0ZXIiLCJIb21lIiwiYXV0aCIsInNlc3Npb24iLCJyb3V0ZXIiLCJjdXJyZW50VXNlciIsImdldEN1cnJlbnRVc2VyIiwiYWN0aXZhdGUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJiYXNlNjRVcmwiLCJzcGxpdCIsImJhc2U2NCIsInJlcGxhY2UiLCJKU09OIiwicGFyc2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiZXJyb3IiLCJpc0F1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTtBQUdBQyx3QixxQkFBQUEsWTs7QUFGQUMsdUIsMEJBQUFBLFc7O0FBQ0FDLG1CLG9CQUFBQSxPOztBQUVJQyxlOztBQUNKQyxrQixrQkFBQUEsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQUdLQyxJLFdBRFpOLE9BQU9FLFdBQVAsRUFBb0JDLE9BQXBCLEVBQTZCRSxNQUE3QixDO0FBR0csOEJBQVlFLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCQyxNQUEzQixFQUFrQztBQUFBOztBQUM5Qix5QkFBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLHlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7O0FBRUEseUJBQUtDLFdBQUwsR0FBbUIsS0FBS0MsY0FBTCxFQUFuQjtBQUNIOzsrQkFDREMsUSx1QkFBVSxDQUVULEM7OytCQUNERCxjLDZCQUFnQjs7QUFFWix3QkFBSTs7QUFFQSw0QkFBSUUsUUFBUUMsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBWjtBQUNBLDRCQUFJQyxZQUFZSCxNQUFNSSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFoQjtBQUNBLDRCQUFJQyxTQUFhRixVQUFVRyxPQUFWLENBQWtCLElBQWxCLEVBQXdCLEdBQXhCLEVBQTZCQSxPQUE3QixDQUFxQyxJQUFyQyxFQUEyQyxHQUEzQyxDQUFqQjs7QUFFQSw2QkFBS1QsV0FBTCxHQUFtQlUsS0FBS0MsS0FBTCxDQUFXQyxtQkFBbUJDLE9BQU9DLE9BQU9DLElBQVAsQ0FBWVAsTUFBWixDQUFQLENBQW5CLENBQVgsQ0FBbkI7O0FBRUEsK0JBQU8sS0FBS1IsV0FBWjtBQUVILHFCQVZELENBVUUsT0FBT2dCLEtBQVAsRUFBYyxDQUVmO0FBRUosaUI7Ozs7d0NBQ29CO0FBQ2pCLCtCQUFPLEtBQUtuQixJQUFMLENBQVVvQixlQUFWLEVBQVA7QUFDSCIsImZpbGUiOiJob21lL2hvbWUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
