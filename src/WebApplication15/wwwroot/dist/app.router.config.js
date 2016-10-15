'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'aurelia-router'], function (_export, _context) {
  "use strict";

  var AuthorizeStep, inject, Router, _dec, _class, _default;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaAuthentication) {
      AuthorizeStep = _aureliaAuthentication.AuthorizeStep;
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
            config.addPipelineStep('authorize', AuthorizeStep);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5yb3V0ZXIuY29uZmlnLmpzIl0sIm5hbWVzIjpbIkF1dGhvcml6ZVN0ZXAiLCJpbmplY3QiLCJSb3V0ZXIiLCJyb3V0ZXIiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJiYXNlNjRVcmwiLCJzcGxpdCIsImJhc2U2NCIsInJlcGxhY2UiLCJjdXJyZW50VXNlciIsIkpTT04iLCJwYXJzZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIndpbmRvdyIsImF0b2IiLCJpbWFnZSIsInByb2ZpbGVJbWFnZSIsImUiLCJhY3RpdmF0ZSIsImNvbmZpZ3VyZSIsInNlbGYiLCJhcHBSb3V0ZXJDb25maWciLCJjb25maWciLCJ0aXRsZSIsImFkZFBpcGVsaW5lU3RlcCIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIiwibmF2IiwiYXV0aCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsbUIsMEJBQUFBLGE7O0FBQ0FDLFkscUJBQUFBLE07O0FBQ0FDLFksa0JBQUFBLE07Ozs0Q0FJUEQsT0FBT0MsTUFBUCxDO0FBR0MsMEJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsZUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsY0FBSTs7QUFHSixnQkFBSUMsUUFBUUMsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBWjtBQUNBLGdCQUFJQyxZQUFZSCxNQUFNSSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFoQjtBQUNBLGdCQUFJQyxTQUFhRixVQUFVRyxPQUFWLENBQWtCLElBQWxCLEVBQXdCLEdBQXhCLEVBQTZCQSxPQUE3QixDQUFxQyxJQUFyQyxFQUEyQyxHQUEzQyxDQUFqQjs7QUFFQSxpQkFBS0MsV0FBTCxHQUFtQkMsS0FBS0MsS0FBTCxDQUFXQyxtQkFBbUJDLE9BQU9DLE9BQU9DLElBQVAsQ0FBWVIsTUFBWixDQUFQLENBQW5CLENBQVgsQ0FBbkI7O0FBR0EsaUJBQUtFLFdBQUwsQ0FBaUJPLEtBQWpCLEdBQXlCYixhQUFhQyxPQUFiLENBQXFCLGVBQXJCLENBQXpCOztBQUdBLGlCQUFLYSxZQUFMLEdBQW9CLDRCQUE2QixLQUFLUixXQUFMLENBQWlCTyxLQUFsRTtBQUVDLFdBZkQsQ0FlRSxPQUFPRSxDQUFQLEVBQVUsQ0FFWDtBQUNKOzsyQkFDREMsUSx1QkFBVSxDQUVULEM7OzJCQUNIQyxTLHdCQUFZO0FBQ1IsY0FBSUMsT0FBTyxJQUFYO0FBQ0EsY0FBSUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxNQUFULEVBQWlCO0FBQ25DQSxtQkFBT0MsS0FBUCxHQUFlLGVBQWY7QUFDQUQsbUJBQU9FLGVBQVAsQ0FBdUIsV0FBdkIsRUFBb0MzQixhQUFwQzs7QUFLQXlCLG1CQUFPRyxHQUFQLENBQVcsQ0FFVCxFQUFFQyxPQUFPLENBQUMsRUFBRCxFQUFJLE1BQUosQ0FBVCxFQUFzQkMsTUFBTSxNQUE1QixFQUFvQ0MsVUFBVSxXQUE5QyxFQUEyREMsS0FBSyxDQUFoRSxFQUFtRU4sT0FBTyxNQUExRSxFQUFtRk8sTUFBTSxLQUF6RixFQUZTLEVBR1QsRUFBRUosT0FBTyxDQUFDLFVBQUQsQ0FBVCxFQUF1QkMsTUFBTSxVQUE3QixFQUF5Q0MsVUFBVSxtQkFBbkQsRUFBd0VDLEtBQUssQ0FBN0UsRUFBZ0ZOLE9BQU0sVUFBdEYsRUFBbUdPLE1BQU0sSUFBekcsRUFIUyxFQUtULEVBQUVKLE9BQU8sUUFBVCxFQUFtQkMsTUFBTSxRQUF6QixFQUFtQ0MsVUFBVSxVQUE3QyxFQUF5REMsS0FBSyxJQUE5RCxFQUFvRU4sT0FBTSxTQUExRSxFQUFzRk8sTUFBTSxLQUE1RixFQUxTLEVBT1QsRUFBRUosT0FBTyxPQUFULEVBQWtCQyxNQUFNLE9BQXhCLEVBQWlDQyxVQUFVLFNBQTNDLEVBQXNEQyxLQUFLLElBQTNELEVBQWlFTixPQUFNLE9BQXZFLEVBQWlGTyxNQUFNLEtBQXZGLEVBUFMsRUFRVCxFQUFFSixPQUFPLFFBQVQsRUFBbUJDLE1BQU0sUUFBekIsRUFBbUNDLFVBQVUsVUFBN0MsRUFBeURDLEtBQUssSUFBOUQsRUFBb0VOLE9BQU0sUUFBMUUsRUFBcUZPLE1BQU0sSUFBM0YsRUFSUyxFQVNULEVBQUVKLE9BQU8sa0JBQVQsRUFBNkJDLE1BQU0sa0JBQW5DLEVBQXVEQyxVQUFVLG9CQUFqRSxFQUF1RkMsS0FBSyxLQUE1RixFQUFtR04sT0FBTSxjQUF6RyxFQVRTLEVBVVQsRUFBRUcsT0FBTyxlQUFULEVBQTBCQyxNQUFNLGVBQWhDLEVBQWlEQyxVQUFVLGlCQUEzRCxFQUE4RUMsS0FBSyxLQUFuRixFQUEwRk4sT0FBTSxlQUFoRyxFQVZTLEVBV1QsRUFBRUcsT0FBTyxnQkFBVCxFQUEyQkMsTUFBTSxnQkFBakMsRUFBbURDLFVBQVUsa0JBQTdELEVBQWlGQyxLQUFLLEtBQXRGLEVBQTZGTixPQUFNLGdCQUFuRyxFQVhTLEVBWVQsRUFBRUcsT0FBTyxTQUFULEVBQW9CQyxNQUFNLFNBQTFCLEVBQXFDQyxVQUFVLGNBQS9DLEVBQStEQyxLQUFLLENBQXBFLEVBQXVFTixPQUFNLFNBQTdFLEVBQXdGUSxVQUFVWCxLQUFLSixZQUF2RyxFQUFxSGMsTUFBTSxJQUEzSCxFQVpTLENBQVg7QUFnQkgsV0F2QkQ7O0FBMEJBLGVBQUs5QixNQUFMLENBQVltQixTQUFaLENBQXNCRSxlQUF0QjtBQUNILFMiLCJmaWxlIjoiYXBwLnJvdXRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
