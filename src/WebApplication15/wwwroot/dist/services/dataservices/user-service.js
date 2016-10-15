'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'configs/app.http', 'toastr', 'underscore'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, httpConfig, log, _, _dec, _class, UserDataService;

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
        }, function (_fetch) {}, function (_configsAppHttp) {
            httpConfig = _configsAppHttp.default;
        }, function (_toastr) {
            log = _toastr;
        }, function (_underscore) {
            _ = _underscore.default;
        }],
        execute: function () {
            _export('UserDataService', UserDataService = (_dec = inject(HttpClient), _dec(_class = function () {
                function UserDataService(http) {
                    _classCallCheck(this, UserDataService);

                    http.configure(httpConfig);
                    this.http = http;
                }

                UserDataService.prototype.getAllUsers = function getAllUsers() {

                    return this.http.fetch('/api/user/all').then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                UserDataService.prototype.getAutocompleteUsers = function getAutocompleteUsers(clubName) {

                    return this.http.fetch('/api/user/autocomplete?clubName=' + clubName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                UserDataService.prototype.updateUser = function updateUser(user) {

                    return this.http.fetch('/api/user', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('user saved!');
                        return;
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                return UserDataService;
            }()) || _class));

            _export('UserDataService', UserDataService);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSHR0cENsaWVudCIsImh0dHBDb25maWciLCJsb2ciLCJfIiwiVXNlckRhdGFTZXJ2aWNlIiwiaHR0cCIsImNvbmZpZ3VyZSIsImdldEFsbFVzZXJzIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJleCIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1c1RleHQiLCJnZXRBdXRvY29tcGxldGVVc2VycyIsImNsdWJOYW1lIiwidXBkYXRlVXNlciIsInVzZXIiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic3RhdHVzIiwibWVzc2FnZSIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsc0IsdUJBQUFBLFU7O0FBRURDLHNCOztBQUNLQyxlOztBQUNMQyxhOzs7dUNBR01DLGUsV0FEWkwsT0FBT0MsVUFBUCxDO0FBR0cseUNBQVlLLElBQVosRUFBa0I7QUFBQTs7QUFDZEEseUJBQUtDLFNBQUwsQ0FBZUwsVUFBZjtBQUNBLHlCQUFLSSxJQUFMLEdBQVlBLElBQVo7QUFDSDs7MENBQ0RFLFcsMEJBQWM7O0FBRVYsMkJBQU8sS0FBS0YsSUFBTCxDQUFVRyxLQUFWLENBQWdCLGVBQWhCLEVBQ0ZDLElBREUsQ0FDRztBQUFBLCtCQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxxQkFESCxFQUVGQyxLQUZFLENBRUksVUFBU0MsRUFBVCxFQUFhO0FBQ2hCQyxnQ0FBUVosR0FBUixDQUFZLFFBQVosRUFBc0JXLEVBQXRCO0FBQ0FYLDRCQUFJYSxLQUFKLENBQVVGLEdBQUdHLFVBQWI7QUFDQTtBQUNILHFCQU5FLENBQVA7QUFPSCxpQjs7MENBQ0RDLG9CLGlDQUFxQkMsUSxFQUFVOztBQUUzQiwyQkFBTyxLQUFLYixJQUFMLENBQVVHLEtBQVYsQ0FBZ0IscUNBQXFDVSxRQUFyRCxFQUNGVCxJQURFLENBQ0c7QUFBQSwrQkFBWUMsU0FBU0MsSUFBVCxFQUFaO0FBQUEscUJBREgsRUFFRkMsS0FGRSxDQUVJLFVBQVNDLEVBQVQsRUFBYTtBQUNoQkMsZ0NBQVFaLEdBQVIsQ0FBWSxRQUFaLEVBQXNCVyxFQUF0QjtBQUNBWCw0QkFBSWEsS0FBSixDQUFVRixHQUFHRyxVQUFiO0FBQ0E7QUFDSCxxQkFORSxDQUFQO0FBT0gsaUI7OzBDQUNERyxVLHVCQUFXQyxJLEVBQU07O0FBRWIsMkJBQU8sS0FBS2YsSUFBTCxDQUFVRyxLQUFWLENBQWdCLFdBQWhCLEVBQ0Q7QUFDSWEsZ0NBQVEsTUFEWjtBQUVJQyxpQ0FBUztBQUNMLHNDQUFVLGtCQURMO0FBRUwsNENBQWdCO0FBRlgseUJBRmI7QUFNSUMsOEJBQU9DLEtBQUtDLFNBQUwsQ0FBZUwsSUFBZjtBQU5YLHFCQURDLEVBU0RYLElBVEMsQ0FTSTtBQUFBLCtCQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxxQkFUSixFQVVERixJQVZDLENBVUksZ0JBQVE7QUFDVmlCLDZCQUFLQyxNQUFMLEtBQWdCLE9BQWhCLEdBQTJCekIsSUFBSWEsS0FBSixDQUFVVyxLQUFLRSxPQUFmLENBQTNCLEdBQXFEMUIsSUFBSTJCLE9BQUosQ0FBWSxhQUFaLENBQXJEO0FBQ0E7QUFDSCxxQkFiQyxFQWNEakIsS0FkQyxDQWNLLFVBQUNDLEVBQUQsRUFBTztBQUNWQyxnQ0FBUVosR0FBUixDQUFZLFFBQVosRUFBc0JXLEVBQXRCO0FBQ0FYLDRCQUFJYSxLQUFKLENBQVVGLEdBQUdHLFVBQWI7QUFDQTtBQUNILHFCQWxCQyxDQUFQO0FBbUJILGlCIiwiZmlsZSI6InNlcnZpY2VzL2RhdGFzZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
