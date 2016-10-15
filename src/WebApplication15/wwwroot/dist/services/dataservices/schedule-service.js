'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'configs/app.http', 'toastr', 'underscore'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, httpConfig, log, _, _createClass, _dec, _class, ScheduleDataService;

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

            _export('ScheduleDataService', ScheduleDataService = (_dec = inject(HttpClient), _dec(_class = function () {
                function ScheduleDataService(http) {
                    _classCallCheck(this, ScheduleDataService);

                    http.configure(httpConfig);
                    this.http = http;
                }

                ScheduleDataService.prototype.getUpcomingSchedulesForCurrentUser = function getUpcomingSchedulesForCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/upcoming/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.getJoinableSchedulesForCurrentUser = function getJoinableSchedulesForCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/joinable/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.getCreatedSchedulesByCurrentUser = function getCreatedSchedulesByCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/created/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.getScheduleById = function getScheduleById(id) {
                    return this.http.fetch('/api/schedule/' + id).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.getScheduleByDateTime = function getScheduleByDateTime(date, clubName) {
                    return this.http.fetch('/api/schedule/' + date + '/' + clubName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.deleteSchedule = function deleteSchedule(id) {
                    return this.http.fetch('/api/schedule/' + id, {
                        method: 'delete',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('schedule deleted.');
                        return;
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                ScheduleDataService.prototype.removePlayerFromSchedule = function removePlayerFromSchedule(id, playerId) {
                    return this.http.fetch('/api/schedule/remove-player/' + id, {
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(playerId)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('schedule edited.');
                        return;
                    }).catch(function (ex) {

                        return;
                    });
                };

                ScheduleDataService.prototype.editSchedule = function editSchedule(id, schedule) {
                    return this.http.fetch('/api/schedule/' + id, {
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(schedule)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('schedule edited.');
                        return;
                    }).catch(function (ex) {

                        return;
                    });
                };

                ScheduleDataService.prototype.addSchedule = function addSchedule(schedule) {
                    return this.http.fetch('/api/schedule', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(schedule)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        data.status === "error" ? log.error(data.message) : log.success('Great! Your match has been added!').css("width", "500px");
                        return;
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                _createClass(ScheduleDataService, [{
                    key: 'schedules',
                    get: function get() {
                        return this.http.fetch('/api/schedule').then(function (response) {
                            return response.json();
                        }).catch(function (ex) {
                            console.log('failed', ex);
                            log.error(ex.statusText);
                            return;
                        });
                    }
                }]);

                return ScheduleDataService;
            }()) || _class));

            _export('ScheduleDataService', ScheduleDataService);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9zY2hlZHVsZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkh0dHBDbGllbnQiLCJodHRwQ29uZmlnIiwibG9nIiwiXyIsIlNjaGVkdWxlRGF0YVNlcnZpY2UiLCJodHRwIiwiY29uZmlndXJlIiwiZ2V0VXBjb21pbmdTY2hlZHVsZXNGb3JDdXJyZW50VXNlciIsImRpc3BsYXlOYW1lIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJleCIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1c1RleHQiLCJnZXRKb2luYWJsZVNjaGVkdWxlc0ZvckN1cnJlbnRVc2VyIiwiZ2V0Q3JlYXRlZFNjaGVkdWxlc0J5Q3VycmVudFVzZXIiLCJnZXRTY2hlZHVsZUJ5SWQiLCJpZCIsImdldFNjaGVkdWxlQnlEYXRlVGltZSIsImRhdGUiLCJjbHViTmFtZSIsImRlbGV0ZVNjaGVkdWxlIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJzdGF0dXMiLCJtZXNzYWdlIiwic3VjY2VzcyIsInJlbW92ZVBsYXllckZyb21TY2hlZHVsZSIsInBsYXllcklkIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0U2NoZWR1bGUiLCJzY2hlZHVsZSIsImFkZFNjaGVkdWxlIiwiY3NzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLHNCLHVCQUFBQSxVOztBQUVEQyxzQjs7QUFDS0MsZTs7QUFDTEMsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQUdNQyxtQixXQURaTCxPQUFPQyxVQUFQLEM7QUFHRyw2Q0FBWUssSUFBWixFQUFrQjtBQUFBOztBQUNkQSx5QkFBS0MsU0FBTCxDQUFlTCxVQUFmO0FBQ0EseUJBQUtJLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs4Q0FlREUsa0MsK0NBQW1DQyxXLEVBQWE7QUFDNUMsMkJBQU8sS0FBS0gsSUFBTCxDQUFVSSxL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
