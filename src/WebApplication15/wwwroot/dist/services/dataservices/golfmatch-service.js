'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'configs/app.http', 'toastr', 'underscore'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, httpConfig, log, _, _createClass, _dec, _class, GolfMatchDataService;

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

            _export('GolfMatchDataService', GolfMatchDataService = (_dec = inject(HttpClient), _dec(_class = function () {
                function GolfMatchDataService(http) {
                    _classCallCheck(this, GolfMatchDataService);

                    http.configure(httpConfig);
                    this.http = http;
                }

                GolfMatchDataService.prototype.getUpcomingSchedulesForCurrentUser = function getUpcomingSchedulesForCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/upcoming/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                GolfMatchDataService.prototype.getJoinableSchedulesForCurrentUser = function getJoinableSchedulesForCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/joinable/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                GolfMatchDataService.prototype.getCreatedSchedulesByCurrentUser = function getCreatedSchedulesByCurrentUser(displayName) {
                    return this.http.fetch('/api/schedule/created/' + displayName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                GolfMatchDataService.prototype.getScheduleById = function getScheduleById(id) {
                    return this.http.fetch('/api/schedule/' + id).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                GolfMatchDataService.prototype.getScheduleByDateTime = function getScheduleByDateTime(date, clubName) {
                    return this.http.fetch('/api/schedule/' + date + '/' + clubName).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

                GolfMatchDataService.prototype.deleteSchedule = function deleteSchedule(id) {
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

                GolfMatchDataService.prototype.removePlayerFromSchedule = function removePlayerFromSchedule(id, playerId) {
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

                GolfMatchDataService.prototype.editSchedule = function editSchedule(id, schedule) {
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

                GolfMatchDataService.prototype.addSchedule = function addSchedule(schedule) {
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

                _createClass(GolfMatchDataService, [{
                    key: 'golfmatches',
                    get: function get() {
                        return this.http.fetch('/api/golfmatch').then(function (response) {
                            return response.json();
                        }).catch(function (ex) {
                            console.log('failed', ex);
                            log.error(ex.statusText);
                            return;
                        });
                    }
                }]);

                return GolfMatchDataService;
            }()) || _class));

            _export('GolfMatchDataService', GolfMatchDataService);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9nb2xmbWF0Y2gtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiaHR0cENvbmZpZyIsImxvZyIsIl8iLCJHb2xmTWF0Y2hEYXRhU2VydmljZSIsImh0dHAiLCJjb25maWd1cmUiLCJnZXRVcGNvbWluZ1NjaGVkdWxlc0ZvckN1cnJlbnRVc2VyIiwiZGlzcGxheU5hbWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImV4IiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzVGV4dCIsImdldEpvaW5hYmxlU2NoZWR1bGVzRm9yQ3VycmVudFVzZXIiLCJnZXRDcmVhdGVkU2NoZWR1bGVzQnlDdXJyZW50VXNlciIsImdldFNjaGVkdWxlQnlJZCIsImlkIiwiZ2V0U2NoZWR1bGVCeURhdGVUaW1lIiwiZGF0ZSIsImNsdWJOYW1lIiwiZGVsZXRlU2NoZWR1bGUiLCJtZXRob2QiLCJoZWFkZXJzIiwiZGF0YSIsInN0YXR1cyIsIm1lc3NhZ2UiLCJzdWNjZXNzIiwicmVtb3ZlUGxheWVyRnJvbVNjaGVkdWxlIiwicGxheWVySWQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRTY2hlZHVsZSIsInNjaGVkdWxlIiwiYWRkU2NoZWR1bGUiLCJjc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsc0IsdUJBQUFBLFU7O0FBRURDLHNCOztBQUNLQyxlOztBQUNMQyxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NENBR01DLG9CLFdBRFpMLE9BQU9DLFVBQVAsQztBQUdHLDhDQUFZSyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLHlCQUFLQyxTQUFMLENBQWVMLFVBQWY7QUFDQSx5QkFBS0ksSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OytDQWVERSxrQywrQ0FBbUNDLFcsRUFBYTtBQUM1QywyQkFBTyxLQUFLSCxJQUFMLENBQVVJ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
