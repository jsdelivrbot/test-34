'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'aurelia-router'], function (_export, _context) {
  "use strict";

  var AuthenticateStep, inject, Router, _dec, _class, _default;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaAuthentication) {
      AuthenticateStep = _aureliaAuthentication.AuthenticateStep;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      _export('default', _default = (_dec = inject(Router), _dec(_class = function () {
        function _default(router) {
          _classCallCheck(this, _default);

          this.router = router;
          try {

            var token = localStorage.getItem('aurelia_id_token');
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

            this.currentUser.image = localStorage.getItem("profile-photo");

            this.profileImage = 'data:image/jpeg;base64,' + this.currentUser.image;
          } catch (e) {}
        }

        _default.prototype.activate = function activate() {};

        _default.prototype.configure = function configure() {
          var self = this;
          var appRouterConfig = function appRouterConfig(config) {
            config.title = 'GolfConnector';
            config.addPipelineStep('authorize', AuthenticateStep);

            config.map([{ route: ['', 'home'], name: 'home', moduleId: 'home/home', nav: 1, title: 'Home', auth: false }, { route: ['schedule'], name: 'schedule', moduleId: 'schedule/schedule', nav: 2, title: 'Schedule', auth: true }, { route: 'signup', name: 'signup', moduleId: './signup', nav: true, title: 'Sign up', auth: false }, { route: 'login', name: 'login', moduleId: './login', nav: true, title: 'Login', auth: false }, { route: 'logout', name: 'logout', moduleId: './logout', nav: true, title: 'Logout', auth: true }, { route: 'confirmationSent', name: 'confirmationSent', moduleId: './confirmationSent', nav: false, title: 'Confirmation' }, { route: 'resetPassword', name: 'resetPassword', moduleId: './resetPassword', nav: false, title: 'ResetPassword' }, { route: 'forgotPassword', name: 'forgotPassword', moduleId: './forgotPassword', nav: false, title: 'ForgotPassword' }, { route: 'profile', name: 'profile', moduleId: 'user/profile', nav: 4, title: 'Profile', settings: self.profileImage, auth: true }]);
          };

          this.router.configure(appRouterConfig);
        };

        return _default;
      }()) || _class));

      _export('default', _default);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5yb3V0ZXIuY29uZmlnLmpzIl0sIm5hbWVzIjpbIkF1dGhlbnRpY2F0ZVN0ZXAiLCJpbmplY3QiLCJSb3V0ZXIiLCJyb3V0ZXIiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJiYXNlNjRVcmwiLCJzcGxpdCIsImJhc2U2NCIsInJlcGxhY2UiLCJjdXJyZW50VXNlciIsIkpTT04iLCJwYXJzZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIndpbmRvdyIsImF0b2IiLCJpbWFnZSIsInByb2ZpbGVJbWFnZSIsImUiLCJhY3RpdmF0ZSIsImNvbmZpZ3VyZSIsInNlbGYiLCJhcHBSb3V0ZXJDb25maWciLCJjb25maWciLCJ0aXRsZSIsImFkZFBpcGVsaW5lU3RlcCIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIiwibmF2IiwiYXV0aCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsc0IsMEJBQUFBLGdCOztBQUNBQyxZLHFCQUFBQSxNOztBQUNBQyxZLGtCQUFBQSxNOzs7NENBSVBELE9BQU9DLE1BQVAsQztBQUdDLDBCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGVBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGNBQUk7O0FBR0osZ0JBQUlDLFFBQVFDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLENBQVo7QUFDQSxnQkFBSUMsWUFBWUgsTUFBTUksS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBaEI7QUFDQSxnQkFBSUMsU0FBYUYsVUFBVUcsT0FBVixDQUFrQixJQUFsQixFQUF3QixHQUF4QixFQUE2QkEsT0FBN0IsQ0FBcUMsSUFBckMsRUFBMkMsR0FBM0MsQ0FBakI7O0FBRUEsaUJBQUtDLFdBQUwsR0FBbUJDLEtBQUtDLEtBQUwsQ0FBV0MsbUJBQW1CQyxPQUFPQyxPQUFPQyxJQUFQLENBQVlSLE1BQVosQ0FBUCxDQUFuQixDQUFYLENBQW5COztBQUdBLGlCQUFL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
