'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'configs/app.http', 'toastr', 'underscore', 'fullcalendar'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, httpConfig, log, _, fullCalendar, _createClass, _dec, _class, GolfMatchDataService;

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
        }, function (_fullcalendar) {
            fullCalendar = _fullcalendar.fullCalendar;
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

                GolfMatchDataService.prototype.getGolfMatches = function getGolfMatches(start, end) {
                    return this.http.fetch('/api/golfmatch/daterange/' + start + '/' + end).then(function (response) {
                        return response.json();
                    }).catch(function (ex) {
                        console.log('failed', ex);
                        log.error(ex.statusText);
                        return;
                    });
                };

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

                GolfMatchDataService.prototype.addGolfMatch = function addGolfMatch(match) {
                    return this.http.fetch('/api/golfmatch', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(match)
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
                    key: 'golfMatches',
                    get: function get() {
                        return this.http.fetch('/api/golfmatch/').then(function (response) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGFzZXJ2aWNlcy9nb2xmbWF0Y2gtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiaHR0cENvbmZpZyIsImxvZyIsIl8iLCJmdWxsQ2FsZW5kYXIiLCJHb2xmTWF0Y2hEYXRhU2VydmljZSIsImh0dHAiLCJjb25maWd1cmUiLCJnZXRHb2xmTWF0Y2hlcyIsInN0YXJ0IiwiZW5kIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJleCIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1c1RleHQiLCJnZXRVcGNvbWluZ1NjaGVkdWxlc0ZvckN1cnJlbnRVc2VyIiwiZGlzcGxheU5hbWUiLCJnZXRKb2luYWJsZVNjaGVkdWxlc0ZvckN1cnJlbnRVc2VyIiwiZ2V0Q3JlYXRlZFNjaGVkdWxlc0J5Q3VycmVudFVzZXIiLCJnZXRTY2hlZHVsZUJ5SWQiLCJpZCIsImdldFNjaGVkdWxlQnlEYXRlVGltZSIsImRhdGUiLCJjbHViTmFtZSIsImRlbGV0ZVNjaGVkdWxlIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJzdGF0dXMiLCJtZXNzYWdlIiwic3VjY2VzcyIsInJlbW92ZVBsYXllckZyb21TY2hlZHVsZSIsInBsYXllcklkIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0U2NoZWR1bGUiLCJzY2hlZHVsZSIsImFkZEdvbGZNYXRjaCIsIm1hdGNoIiwiY3NzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLHNCLHVCQUFBQSxVOztBQUVEQyxzQjs7QUFDS0MsZTs7QUFDTEMsYTs7QUFDQ0Msd0IsaUJBQUFBLFk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FHS0Msb0IsV0FEWk4sT0FBT0MsVUFBUCxDO0FBR0csOENBQVlNLElBQVosRUFBa0I7QUFBQTs7QUFDZEEseUJBQUtDLFNBQUwsQ0FBZU4sVUFBZjtBQUNBLHlCQUFLSyxJ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LE9BQTdELENBQXJEOztBQUdBO0FBQ0gscUJBZkMsRUFnQkQ5QixLQWhCQyxDQWdCSyxVQUFDQyxFQUFELEVBQU87QUFDVkMsZ0NBQVFmLEdBQVIsQ0FBWSxRQUFaLEVBQXNCYyxFQUF0QjtBQUNBZCw0QkFBSWdCLEtBQUosQ0FBVUYsR0FBR0csVUFBYjtBQUNBO0FBQ0gscUJBcEJDLENBQVA7QUFxQkgsaUI7Ozs7d0NBNUppQjtBQUNkLCtCQUFPLEtBQUtiLElBQUwsQ0FBVUssS0FBVixDQUFnQixpQkFBaEIsRUFDRkMsSUFERSxDQUNHO0FBQUEsbUNBQVlDLFNBQVNDLElBQVQsRUFBWjtBQUFBLHlCQURILEVBRUZDLEtBRkUsQ0FFSSxVQUFTQyxFQUFULEVBQWE7QUFDaEJDLG9DQUFRZixHQUFSLENBQVksUUFBWixFQUFzQmMsRUFBdEI7QUFDQWQsZ0NBQUlnQixLQUFKLENBQVVGLEdBQUdHLFVBQWI7QUFDQTtBQUNILHlCQU5FLENBQVA7QUFRSCIsImZpbGUiOiJzZXJ2aWNlcy9kYXRhc2VydmljZXMvZ29sZm1hdGNoLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
