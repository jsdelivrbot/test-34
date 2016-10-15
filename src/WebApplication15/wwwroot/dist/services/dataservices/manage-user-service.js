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

                ManageUserService.prototype.refresh = function refresh() {

                    var prevToken = localStorage.getItem('aurelia_id_token');
                    console.log('sending token');

                    this.http.fetch('/api/oauth/token/refresh', {
                        headers: {
                            'Authorization': 'Bearer ' + prevToken
                        },
                        method: 'post',
                        body: json(prevToken)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {

                        if (data.id_token) {

                            console.log('resetting token');
                            localStorage.setItem('aurelia_id_token', data.id_token);
                            localStorage.setItem("profile-photo", data.image);
                        }
                    }).catch(function (e) {
                        location.href = "/#/login";
                    });
                };

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

                    return this.http.fetch('/api/oauth/token/resetPassword', {
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
                    return this.http.fetch('/api/oauth/token/forgotPassword', {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9tYW5hZ2UtdXNlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkh0dHBDbGllbnQiLCJqc29uIiwiaHR0cENvbmZpZyIsImxvZyIsIlVzZXIiLCJNYW5hZ2VVc2VyU2VydmljZSIsImh0dHAiLCJ1c2VyIiwiY29uZmlndXJlIiwicmVmcmVzaCIsInByZXZUb2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJpZF90b2tlbiIsInNldEl0ZW0iLCJpbWFnZSIsImNhdGNoIiwiZSIsImxvY2F0aW9uIiwiaHJlZiIsInVwZGF0ZVVzZXJQcm9maWxlSW1hZ2UiLCJzZWxlY3RGaWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXR1cyIsImVycm9yIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJ1cGRhdGVVc2VyIiwiZXgiLCJzdGF0dXNUZXh0IiwicmVzZXRQYXNzd29yZCIsIm1vZGVsIiwiZm9yZ290UGFzc3dvcmQiLCJlbWFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxzQix1QkFBQUEsVTtBQUFZQyxnQix1QkFBQUEsSTs7QUFFYkMsc0I7O0FBQ0tDLGU7O0FBQ0pDLGdCLGVBQUFBLEk7Ozt5Q0FHS0MsaUIsV0FEWk4sT0FBT0MsVUFBUCxDO0FBS0csMkNBQVlNLElBQVosRUFBaUI7QUFBQTs7QUFBQSx5QkFGakJDLElBRWlCLEdBRlYsSUFFVTs7O0FBRWJELHlCQUFLRSxTQUFMLENBQWVOLFVBQWY7QUFDQSx5QkFBS0ksSUFBTCxHQUFZQSxJQUFaO0FBRUg7OzRDQUVERyxPLHNCQUFTOztBQUVMLHdCQUFJQyxZQUFZQyxhQUFhQyxPQUFiLENBQXFCLGtCQUFyQixDQUFoQjtBQUNBQyw0QkFBUVYsR0FBUixDQUFZLGVBQVo7O0FB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QUFNO0FBQ2pCLDJCQUFPLEtBQUtwQyxJQUFMLENBQVVRLEtBQVYsQ0FBZ0IsaUNBQWhCLEVBQ0Q7QUFDSUUsZ0NBQVEsTUFEWjtBQUVJRCxpQ0FBUztBQUNMLHNDQUFVLGtCQURMO0FBRUwsNENBQWdCO0FBRlgseUJBRmI7QUFNSUUsOEJBQU9hLEtBQUtDLFNBQUwsQ0FBZVcsS0FBZjtBQU5YLHFCQURDLEVBU0R4QixJQVRDLENBU0k7QUFBQSwrQkFBWUMsU0FBU2xCLElBQVQsRUFBWjtBQUFBLHFCQVRKLEVBVURpQixJQVZDLENBVUksZ0JBQVE7QUFFVjtBQUNILHFCQWJDLEVBY0RNLEtBZEMsQ0FjSyxVQUFDYSxFQUFELEVBQU87QUFDVnhCLGdDQUFRVixHQUFSLENBQVksUUFBWixFQUFzQmtDLEVBQXRCOztBQUVBO0FBQ0gscUJBbEJDLENBQVA7QUFtQkgsaUIiLCJmaWxlIjoic2VydmljZXMvZGF0YXNlcnZpY2VzL21hbmFnZS11c2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
