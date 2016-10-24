'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'services/dataservices/manage-user-service', 'aurelia-router', 'services/session', 'toastr', 'jquery', 'aurelia-event-aggregator', 'aurelia-dialog', 'services/dataservices/golfmatch-service', 'aurelia-validation', 'underscore', 'moment', 'fullcalendar/dist/fullcalendar.css!', 'skeljs', 'utiljs', 'mainSkeljs', 'fullcalendar', './match-modal'], function (_export, _context) {
    "use strict";

    var AuthService, inject, ManageUserService, Router, Session, log, $, EventAggregator, DialogService, GolfMatchDataService, Validation, _, moment, skeljs, fullCalendar, MatchModal, _dec, _class, Schedule;

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
        }, function (_servicesDataservicesManageUserService) {
            ManageUserService = _servicesDataservicesManageUserService.ManageUserService;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_servicesSession) {
            Session = _servicesSession.Session;
        }, function (_toastr) {
            log = _toastr;
        }, function (_jquery) {
            $ = _jquery.default;
        }, function (_aureliaEventAggregator) {
            EventAggregator = _aureliaEventAggregator.EventAggregator;
        }, function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_servicesDataservicesGolfmatchService) {
            GolfMatchDataService = _servicesDataservicesGolfmatchService.GolfMatchDataService;
        }, function (_aureliaValidation) {
            Validation = _aureliaValidation.Validation;
        }, function (_underscore) {
            _ = _underscore.default;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_fullcalendarDistFullcalendarCss) {}, function (_skeljs) {
            skeljs = _skeljs.default;
        }, function (_utiljs) {}, function (_mainSkeljs) {}, function (_fullcalendar) {
            fullCalendar = _fullcalendar.fullCalendar;
        }, function (_matchModal) {
            MatchModal = _matchModal.MatchModal;
        }],
        execute: function () {
            _export('Schedule', Schedule = (_dec = inject(AuthService, ManageUserService, Router, Session, EventAggregator, DialogService, GolfMatchDataService, Validation), _dec(_class = function () {
                function Schedule(auth, manage, router, session, eventAggregator, dialogService, golfMatchDataService, validation) {
                    _classCallCheck(this, Schedule);

                    this.heading = 'Schedule';
                    this.showing = true;
                    this.pendingUpdate = false;
                    this.updated = true;
                    this.view = "month";
                    this.createMode = false;
                    this.events = [];
                    this.currentContext = "";
                    this.calendarView = true;
                    this.listView = false;
                    this.eventView = false;
                    this.schedule = {};

                    this.auth = auth;
                    this.manage = manage;
                    this.router = router;
                    this.session = session;
                    this.ea = eventAggregator;
                    this.dialogService = dialogService;
                    this.golfMatchDataService = golfMatchDataService;
                    this.today = moment().format("dddd MMM DD");
                    this.upcomingScheduledMatchesCount = 0;
                    this.selectedView = "all";
                    this.currentContext = this;

                    this.scheduleValidation = validation.on(this).ensure('start').isNotEmpty();
                }

                Schedule.prototype.attached = function attached() {

                    $("body").removeClass("is-loading");

                    this.configureCalendar();
                };

                Schedule.prototype.activate = function activate() {
                    var self = this;
                    this.currentUser = this.session.getCurrentUser();

                    this.showUndo = false;
                };

                Schedule.prototype.eventClick = function eventClick(event) {

                    console.log(event);

                    var model = {
                        match: event,
                        mode: "view",
                        context: this
                    };

                    this.dialogService.open({ viewModel: MatchModal, model: model }).then(function (response) {

                        if (!response.wasCancelled) {
                            console.log('good - ', response.output);
                        } else {
                            console.log('bad');
                        }
                        console.log(response.output);
                    });
                };

                Schedule.prototype.processMatch = function processMatch(match) {
                    console.log('made it!');
                    console.log(match);
                };

                Schedule.prototype.dayClick = function dayClick(date, jsEvent, view) {

                    jsEvent.start = date;
                    jsEvent.time = moment(date).format('HH:mm');
                    jsEvent.numberOfHoles = 9;

                    var currentView = $("#golf-calendar").fullCalendar('getView');
                    if (currentView.type === 'month') {
                        jsEvent.time = moment().format('HH:mm');
                    }

                    var model = {
                        match: jsEvent,
                        mode: "create",
                        context: this
                    };

                    this.dialogService.openAndYieldController({ viewModel: MatchModal, model: model });
                };

                Schedule.prototype.configureCalendar = function configureCalendar(schedule) {
                    var _this = this;

                    this.events = [];

                    var self = this;

                    $("#golf-calendar").fullCalendar({

                        context: self,
                        defaultView: 'month',
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,listMonth'
                        },
                        theme: false,
                        allDaySlot: false,
                        weekends: true,
                        firstDay: 1,
                        dayClick: function dayClick(date, jsEvent, view) {
                            return self.dayClick(date, jsEvent, view);
                        },

                        events: function events(start, end, timezone, callback) {

                            _this.events = [];

                            _this.golfMatchDataService.getGolfMatches(start, end).then(function (golfmatches) {
                                return self.golfmatches = _.sortBy(golfmatches, "GolfMatchId");
                            }).then(function () {

                                if (self.golfmatches) {
                                    for (var i = 0; i < self.golfmatches.length; i++) {

                                        var _start = moment(self.golfmatches[i].GolfMatchDateIso).format('MM-DD-YYYY');

                                        var isCurrentUserInMatch = void 0,
                                            isCurrentUserCreator = false;

                                        for (var j = 0; j < self.golfmatches[i].Players.length; j++) {
                                            if (self.golfmatches[i].Players[j].DisplayName == self.currentUser.displayName) {
                                                isCurrentUserInMatch = true;

                                                if (self.golfmatches[i].Players[j].IsMatchCreator) {
                                                    isCurrentUserCreator = true;
                                                }
                                            }
                                        }

                                        var backgroundColor = "#C2b85B";
                                        if (!isCurrentUserInMatch) backgroundColor = "#C2185B";

                                        var formattedTime = moment(self.golfmatches[i].GolfMatchDateIso).format('LT');
                                        _this.events.push({
                                            title: formattedTime,
                                            start: _start,
                                            time: self.golfmatches[i].Time,
                                            allDay: false,
                                            textColor: "#fff",
                                            backgroundColor: backgroundColor,
                                            id: self.golfmatches[i].ScheduleId,
                                            numberOfHoles: self.golfmatches[i].NumberOfHoles,
                                            players: self.golfmatches[i].Players,

                                            isCurrentUserCreator: isCurrentUserCreator
                                        });
                                    }
                                }

                                _this.events.map(function (event) {
                                    event.editable = !self.isPast(event.start);
                                    console.log(event);
                                    return event;
                                });
                            }).then(function () {
                                callback(self.events);
                            });
                        },
                        eventClick: function eventClick(event) {
                            return self.eventClick(event);
                        },

                        editable: true,
                        handleWindowResize: true,
                        minTime: '07:30:00',
                        maxTime: '15:00:00',
                        displayEventTime: false,

                        eventMouseover: function eventMouseover(calEvent, jsEvent) {
                            var tooltip = '<div class="tooltipevent" style="width:200px;padding:10px;height:auto;background:#000;color:#fff;position:absolute;z-index:10001;">' + calEvent.title + '</div>';
                            $("body").append(tooltip);
                            $(this).mouseover(function (e) {
                                $(this).css('z-index', 10000);
                                $('.tooltipevent').fadeIn('500');
                                $('.tooltipevent').fadeTo('10', 1.9);
                            }).mousemove(function (e) {
                                $('.tooltipevent').css('top', e.pageY + 10);
                                $('.tooltipevent').css('left', e.pageX + 20);
                            });
                        },

                        eventMouseout: function eventMouseout(calEvent, jsEvent) {
                            $(this).css('z-index', 8);
                            $('.tooltipevent').remove();
                        }
                    });
                };

                Schedule.prototype.isPast = function isPast(date) {
                    var today = moment().format();
                    return moment(today).isAfter(date);
                };

                return Schedule;
            }()) || _class));

            _export('Schedule', Schedule);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL3NjaGVkdWxlLmpzIl0sIm5hbWVzIjpbIkF1dGhTZXJ2aWNlIiwiaW5qZWN0IiwiTWFuYWdlVXNlclNlcnZpY2UiLCJSb3V0ZXIiLCJTZXNzaW9uIiwibG9nIiwiJCIsIkV2ZW50QWdncmVnYXRvciIsIkRpYWxvZ1NlcnZpY2UiLCJHb2xmTWF0Y2hEYXRhU2VydmljZSIsIlZhbGlkYXRpb24iLCJfIiwibW9tZW50Iiwic2tlbGpzIiwiZnVsbENhbGVuZGFyIiwiTWF0Y2hNb2RhbCIsIlNjaGVkdWxlIiwiYXV0aCIsIm1hbmFnZSIsInJvdXRlciIsInNlc3Npb24iLCJldmVudEFnZ3JlZ2F0b3IiLCJkaWFsb2dTZXJ2aWNlIiwiZ29sZk1hdGNoRGF0YVNlcnZpY2UiLCJ2YWxpZGF0aW9uIiwiaGVhZGluZyIsInNob3dpbmciLCJwZW5kaW5nVXBkYXRlIiwidXBkYXRlZCIsInZpZXciLCJjcmVhdGVNb2RlIiwiZXZlbnRzIiwiY3VycmVudENvbnRleHQiLCJjYWxlbmRhclZpZXciLCJsaXN0VmlldyIsImV2ZW50VmlldyIsInNjaGVkdWxlIiwiZWEiLCJ0b2RheSIsImZvcm1hdCIsInVwY29taW5nU2NoZWR1bGVkTWF0Y2hlc0NvdW50Iiwic2VsZWN0ZWRWaWV3Iiwic2NoZWR1bGVWYWxpZGF0aW9uIiwib24iLCJlbnN1cmUiLCJpc05vdEVtcHR5IiwiYXR0YWNoZWQiLCJyZW1vdmVDbGFzcyIsImNvbmZpZ3VyZUNhbGVuZGFyIiwiYWN0aXZhdGUiLCJzZWxmIiwiY3VycmVudFVzZXIiLCJnZXRDdXJyZW50VXNlciIsInNob3dVbmRvIiwiZXZlbnRDbGljayIsImV2ZW50IiwiY29uc29sZSIsIm1vZGVsIiwibWF0Y2giLCJtb2RlIiwiY29udGV4dCIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJ0aGVuIiwicmVzcG9uc2UiLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJwcm9jZXNzTWF0Y2giLCJkYXlDbGljayIsImRhdGUiLCJqc0V2ZW50Iiwic3RhcnQiLCJ0aW1lIiwibnVtYmVyT2ZIb2xlcyIsImN1cnJlbnRWaWV3IiwidHlwZSIsIm9wZW5BbmRZaWVsZENvbnRyb2xsZXIiLCJkZWZhdWx0VmlldyIsImhlYWRlciIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsInRoZW1lIiwiYWxsRGF5U2xvdCIsIndlZWtlbmRzIiwiZmlyc3REYXkiLCJlbmQiLCJ0aW1lem9uZSIsImNhbGxiYWNrIiwiZ2V0R29sZk1hdGNoZXMiLCJnb2xmbWF0Y2hlcyIsInNvcnRCeSIsImkiLCJsZW5ndGgiLCJHb2xmTWF0Y2hEYXRlSXNvIiwiaXNDdXJyZW50VXNlckluTWF0Y2giLCJpc0N1cnJlbnRVc2VyQ3JlYXRvciIsImoiLCJQbGF5ZXJzIiwiRGlzcGxheU5hbWUiLCJkaXNwbGF5TmFtZSIsIklzTWF0Y2hDcmVhdG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZm9ybWF0dGVkVGltZSIsInB1c2giLCJ0aXRsZSIsIlRpbWUiLCJhbGxEYXkiLCJ0ZXh0Q29sb3IiLCJpZCIsIlNjaGVkdWxlSWQiLCJOdW1iZXJPZkhvbGVzIiwicGxheWVycyIsIm1hcCIsImVkaXRhYmxlIiwiaXNQYXN0IiwiaGFuZGxlV2luZG93UmVzaXplIiwibWluVGltZSIsIm1heFRpbWUiLCJkaXNwbGF5RXZlbnRUaW1lIiwiZXZlbnRNb3VzZW92ZXIiLCJjYWxFdmVudCIsInRvb2x0aXAiLCJhcHBlbmQiLCJtb3VzZW92ZXIiLCJlIiwiY3NzIiwiZmFkZUluIiwiZmFkZVRvIiwibW91c2Vtb3ZlIiwicGFnZVkiLCJwYWdlWCIsImV2ZW50TW91c2VvdXQiLCJyZW1vdmUiLCJpc0FmdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsdUIsMEJBQUFBLFc7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyw2QiwwQ0FBQUEsaUI7O0FBQ0FDLGtCLGtCQUFBQSxNOztBQUNBQyxtQixvQkFBQUEsTzs7QUFDSUMsZTs7QUFDTEMsYTs7QUFDRUMsMkIsMkJBQUFBLGU7O0FBQ0RDLHlCLGtCQUFB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Q0FKRDtBQU1ILDZCQXBEYixFQW9EZVEsSUFwRGYsQ0FvRG9CLFlBQUk7QUFDUnlCLHlDQUFVdEMsS0FBS25CLE1BQWY7QUFDSCw2QkF0RGI7QUEwREgseUJBN0U0QjtBQThFN0J1QixvQ0FBWSxvQkFBRUMsS0FBRjtBQUFBLG1DQUFhTCxLQUFLSSxVQUFMLENBQWlCQyxLQUFqQixDQUFiO0FBQUEseUJBOUVpQjs7QUFnRjdCMkQsa0NBQVUsSUFoRm1CO0FBaUY3QkUsNENBQW9CLElBakZTO0FBa0Y3QkMsaUNBQVMsVUFsRm9CO0FBbUY3QkMsaUNBQVMsVUFuRm9CO0FBb0Y3QkMsMENBQWtCLEtBcEZXOztBQXNGN0JDLHdDQUFnQix3QkFBU0MsUUFBVCxFQUFtQm5ELE9BQW5CLEVBQTRCO0FBQ3hDLGdDQUFJb0QsVUFBVSx3SUFBd0lELFNBQVNoQixLQUFqSixHQUF5SixRQUF2SztBQUNBbkcsOEJBQUUsTUFBRixFQUFVcUgsTUFBVixDQUFpQkQsT0FBakI7QUFDQXBILDhCQUFFLElBQUYsRUFBUXNILFNBQVIsQ0FBa0IsVUFBU0MsQ0FBVCxFQUFZO0FBQzFCdkgsa0NBQUUsSUFBRixFQUFRd0gsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkI7QUFDQXhILGtDQUFFLGVBQUYsRUFBbUJ5SCxNQUFuQixDQUEwQixLQUExQjtBQUNBekgsa0NBQUUsZUFBRixFQUFtQjBILE1BQW5CLENBQTBCLElBQTFCLEVBQWdDLEdBQWhDO0FBQ0gsNkJBSkQsRUFJR0MsU0FKSCxDQUlhLFVBQVNKLENBQVQsRUFBWTtBQUNyQnZILGtDQUFFLGVBQUYsRUFBbUJ3SCxHQUFuQixDQUF1QixLQUF2QixFQUE4QkQsRUFBRUssS0FBRixHQUFVLEVBQXhDO0FBQ0E1SCxrQ0FBRSxlQUFGLEVBQW1Cd0gsR0FBbkIsQ0FBdUIsTUFBdkIsRUFBK0JELEVBQUVNLEtBQUYsR0FBVSxFQUF6QztBQUNILDZCQVBEO0FBUUgseUJBakc0Qjs7QUFtRzdCQyx1Q0FBZSx1QkFBU1gsUUFBVCxFQUFtQm5ELE9BQW5CLEVBQTRCO0FBQ3ZDaEUsOEJBQUUsSUFBRixFQUFRd0gsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBdkI7QUFDQXhILDhCQUFFLGVBQUYsRUFBbUIrSCxNQUFuQjtBQUNIO0FBdEc0QixxQkFBakM7QUE4R0gsaUI7O21DQUNEbEIsTSxtQkFBTzlDLEksRUFBTTtBQUNULHdCQUFJL0IsUUFBUTFCLFNBQVMyQixNQUFULEVBQVo7QUFDQSwyQkFBTzNCLE9BQVEwQixLQUFSLEVBQWdCZ0csT0FBaEIsQ0FBeUJqRSxJQUF6QixDQUFQO0FBQ0gsaUIiLCJmaWxlIjoic2NoZWR1bGUvc2NoZWR1bGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
