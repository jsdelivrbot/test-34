'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'configs/app.http', 'toastr', 'models/user'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, json, httpConfig, log, User, _dec, _class, ManageUserService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
            json = _aureliaFetchClient.json;
        }, function (_fetch) {}, function (_configsAppHttp) {
            httpConfig = _configsAppHttp.default;
        }, function (_toastr) {
            log = _toastr;
        }, function (_modelsUser) {
            User = _modelsUser.User;
        }],
        execute: function () {
            _export('ManageUserService', ManageUserService = (_dec = inject(HttpClient), _dec(_class = function () {
                function ManageUserService(http) {
                    _classCallCheck(this, ManageUserService);

                    this.user = null;


                    http.configure(httpConfig);
                    this.http = http;
                }

                ManageUserService.prototype.updateUserProfileImage = function updateUserProfileImage(selectFile) {

                    return this.http.fetch('/api/user/profile/image', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(selectFile)
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('Your profile has been updated!');
                    });
                };

                ManageUserService.prototype.updateUser = function updateUser(user) {
                    var _this = this;

                    return this.http.fetch('/api/user', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('Your profile has been updated!');
                    }).then(function () {
                        _this.refresh();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ManageUserService.prototype.resetPassword = function resetPassword(model) {

                    return this.http.fetch('/api/auth/resetPassword', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(model)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        return;
                    }).catch(function (ex) {
                        console.log('failed', ex);

                        return;
                    });
                };

                ManageUserService.prototype.forgotPassword = function forgotPassword(email) {
                    return this.http.fetch('/api/auth/forgotPassword', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(email)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        return;
                    }).catch(function (ex) {
                        console.log('failed', ex);

                        return;
                    });
                };

                return ManageUserService;
            }()) || _class));

            _export('ManageUserService', ManageUserService);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9tYW5hZ2UtdXNlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkh0dHBDbGllbnQiLCJqc29uIiwiaHR0cENvbmZpZyIsImxvZyIsIlVzZXIiLCJNYW5hZ2VVc2VyU2VydmljZSIsImh0dHAiLCJ1c2VyIiwiY29uZmlndXJlIiwidXBkYXRlVXNlclByb2ZpbGVJbWFnZSIsInNlbGVjdEZpbGUiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJkYXRhIiwic3RhdHVzIiwiZXJyb3IiLCJtZXNzYWdlIiwic3VjY2VzcyIsInVwZGF0ZVVzZXIiLCJyZWZyZXNoIiwiY2F0Y2giLCJleCIsImNvbnNvbGUiLCJzdGF0dXNUZXh0IiwicmVzZXRQYXNzd29yZCIsIm1vZGVsIiwicmVzcG9uc2UiLCJmb3Jnb3RQYXNzd29yZCIsImVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLHNCLHVCQUFBQSxVO0FBQVlDLGdCLHVCQUFBQSxJOztBQUViQyxzQjs7QUFDS0MsZTs7QUFDSkMsZ0IsZUFBQUEsSTs7O3lDQUdLQyxpQixXQURaTixPQUFPQyxVQUFQLEM7QUFLRywyQ0FBWU0sSUFBWixFQUFpQjtBQUFBOztBQUFBLHlCQUZqQkMsSUFFaUIsR0FGVixJQUVVOzs7QUFFYkQseUJBQUtFLFNBQUwsQ0FBZU4sVUFBZjtBQUNBLHlCQUFLSSxJQUFMLEdBQVlBLElBQVo7QUFFSDs7NENBR0RHLHNCLG1DQUF1QkMsVSxFQUFZOztBQUUvQiwyQkFBTyxLQUFLSixJQUFMLENBQVVLLEtBQVYsQ0FBZ0IseUJBQWhCLEVBQ0Q7QUFDSUMsZ0NBQVEsTUFEWjtBQUVJQyxpQ0FBUztBQUNMLHNDQUFVLGtCQURMO0FBRUwsNENBQWdCO0FBRlgseUJBRmI7QUFNSUMsOEJBQU9DLEtBQUtDLFNBQUwsQ0FBZU4sVUFBZjtBQU5YLHFCQURDLEVBUUVPLElBUkYsQ0FRTyxnQkFBUTtBQUNaQyw2QkFBS0MsTUFBTCxLQUFnQixPQUFoQixHQUEyQmhCLElBQUlpQixLQUFKLENBQVVGLEtBQUtHLE9BQWYsQ0FBM0IsR0FBcURsQixJQUFJbUIsT0FBSixDQUFZLGdDQUFaLENBQXJEO0FBR0gscUJBWkEsQ0FBUDtBQWVILGlCOzs0Q0FDREMsVSx1QkFBV2hCLEksRUFBTTtBQUFBOztBQUViLDJCQUFPLEtBQUtELElBQUwsQ0FBVUssS0FBVixDQUFnQixXQUFoQixFQUNEO0FBQ0lDLGdDQUFRLE1BRFo7QUFFSUMsaUNBQVM7QUFDTCxzQ0FBVSxrQkFETDtBQUVMLDRDQUFnQjtBQUZYLHlCQUZiO0FBTUlDLDhCQUFPQyxLQUFLQyxTQUFMLENBQWVULElBQWY7QUFOWCxxQkFEQyxFQVVEVSxJQVZDLENBVUksZ0JBQVE7QUFDVkMsNkJBQUtDLE1BQUwsS0FBZ0IsT0FBaEIsR0FBMkJoQixJQUFJaUIsS0FBSixDQUFVRixLQUFLRyxPQUFmLENBQTNCLEdBQXFEbEIsSUFBSW1CLE9BQUosQ0FBWSxnQ0FBWixDQUFyRDtBQUdILHFCQWRDLEVBZURMLElBZkMsQ0FlSSxZQUFNO0FBQ1IsOEJBQUtPLE9BQUw7QUFDSCxxQkFqQkMsRUFrQkRDLEtBbEJDLENBa0JLLFVBQUNDLEVBQUQsRUFBTztBQUNWQyxnQ0FBUXhCLEdBQVIsQ0FBWSxRQUFaLEVBQXNCdUIsRUFBdEI7QUFDQXZCLDRCQUFJaUIsS0FBSixDQUFVTSxHQUFHRSxVQUFiO0FBQ0E7QUFDSCxxQkF0QkMsQ0FBUDtBQXVCSCxpQjs7NENBQ0RDLGEsMEJBQWNDLEssRUFBTTs7QUFFaEIsMkJBQU8sS0FBS3hCLElBQUwsQ0FBVUssS0FBVixDQUFnQix5QkFBaEIsRUFDRDtBQUNJQyxnQ0FBUSxNQURaO0FBRUlDLGlDQUFTO0FBQ0wsc0NBQVUsa0JBREw7QUFFTCw0Q0FBZ0I7QUFGWCx5QkFGYjtBQU1JQyw4QkFBT0MsS0FBS0MsU0FBTCxDQUFlYyxLQUFmO0FBTlgscUJBREMsRUFTRGIsSUFUQyxDQVNJO0FBQUEsK0JBQVljLFNBQVM5QixJQUFULEVBQVo7QUFBQSxxQkFUSixFQVVEZ0IsSUFWQyxDQVVJLGdCQUFRO0FBRVY7QUFDSCxxQkFiQyxFQWNEUSxLQWRDLENBY0ssVUFBQ0MsRUFBRCxFQUFPO0FBQ1ZDLGdDQUFReEIsR0FBUixDQUFZLFFBQVosRUFBc0J1QixFQUF0Qjs7QUFFQTtBQUNILHFCQWxCQyxDQUFQO0FBbUJILGlCOzs0Q0FFRE0sYywyQkFBZUMsSyxFQUFNO0FBQ2pCLDJCQUFPLEtBQUszQixJQUFMLENBQVVLLEtBQVYsQ0FBZ0IsMEJBQWhCLEVBQ0Q7QUFDSUMsZ0NBQVEsTUFEWjtBQUVJQyxpQ0FBUztBQUNMLHNDQUFVLGtCQURMO0FBRUwsNENBQWdCO0FBRlgseUJBRmI7QUFNSUMsOEJBQU9DLEtBQUtDLFNBQUwsQ0FBZWlCLEtBQWY7QUFOWCxxQkFEQyxFQVNEaEIsSUFUQyxDQVNJO0FBQUEsK0JBQVljLFNBQVM5QixJQUFULEVBQVo7QUFBQSxxQkFUSixFQVVEZ0IsSUFWQyxDQVVJLGdCQUFRO0FBRVY7QUFDSCxxQkFiQyxFQWNEUSxLQWRDLENBY0ssVUFBQ0MsRUFBRCxFQUFPO0FBQ1ZDLGdDQUFReEIsR0FBUixDQUFZLFFBQVosRUFBc0J1QixFQUF0Qjs7QUFFQTtBQUNILHFCQWxCQyxDQUFQO0FBbUJILGlCIiwiZmlsZSI6InNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9tYW5hZ2UtdXNlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
