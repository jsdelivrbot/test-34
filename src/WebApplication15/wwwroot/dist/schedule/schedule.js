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

                    this.scheduleValidation = validation.on(this).ensure('startDate').isNotEmpty();
                }

                Schedule.prototype.attached = function attached() {
                    var _this = this;

                    $("#upcoming-matches-header").velocity('slideDownIn');
                    $("#golf-calendar").velocity('slideDownIn');

                    this.getGolfMatches().then(function () {
                        _this.configureCalendar();
                    });
                };

                Schedule.prototype.activate = function activate() {
                    var self = this;
                    this.currentUser = this.session.getCurrentUser();

                    this.showUndo = false;
                };

                Schedule.prototype.eventClick = function eventClick(event) {

                    console.log(event);

                    this.dialogService.open({ viewModel: MatchModal, model: event }).then(function (response) {

                        if (!response.wasCancelled) {
                            console.log('good - ', response.output);
                        } else {
                            console.log('bad');
                        }
                        console.log(response.output);
                    });
                };

                Schedule.prototype.dayClick = function dayClick(options, date, jsEvent, view) {

                    console.log(date);
                    console.log(view);
                    options.options[0].context.toggleCreateMode(startDate, time);
                    var check = date._d.toJSON().slice(0, 10);

                    var time = view.type === "month" ? moment().hour(6).minute(0).format('h:mm A') : date.format('h:mm A');

                    var today = new Date().toJSON().slice(0, 10);

                    if (check < today) {} else {
                        var startDate = date.format("MM/DD/YYYY");
                        this.options[0].context.toggleCreateMode(startDate, time);
                    }
                };

                Schedule.prototype.configureCalendar = function configureCalendar(schedule) {
                    this.events = [];
                    this.events.push({
                        title: 'This is a Material Design event!',
                        start: '10-19-2016',
                        end: '10-19-2016',
                        color: '#C2185B',
                        guests: 50
                    });
                    this.events.push({
                        title: 'happy birthday!',
                        start: '10-19-2016',
                        end: '10-19-2016',
                        color: '#C2185B',
                        guests: 50
                    });

                    this.events.push({
                        title: 'happy birthdayve!',
                        start: '10-19-2016',
                        end: '10-19-2016',
                        color: '#C2d85B',
                        guests: 50
                    });
                    if (this.schedules) {
                        for (var i = 0; i < this.schedules.length; i++) {

                            var start = this.schedules[i].ScheduleDateIso;
                            console.log(this.schedules[i].Players);

                            var foundPlayer = false;
                            for (var j = 0; j < this.schedules[i].Players.length; j++) {
                                if (this.schedules[i].Players[j].DisplayName == this.currentUser.displayName) {
                                    foundPlayer = true;
                                }
                            }

                            if (foundPlayer) {
                                this.events.push({
                                    title: this.schedules[i].NumberOfHoles + " holes",
                                    start: start,
                                    allDay: false,
                                    color: 'black',
                                    backgroundColor: '#48692A',
                                    textColor: '#fff',
                                    id: this.schedules[i].ScheduleId
                                });
                            } else {
                                this.events.push({
                                    title: this.schedules[i].NumberOfHoles + " holes",
                                    start: start,
                                    allDay: false,
                                    color: 'grey',
                                    backgroundColor: '#fff',
                                    textColor: '#48692A',
                                    id: this.schedules[i].ScheduleId
                                });
                            }
                        }
                    }
                    var self = this;

                    $("#golf-calendar").fullCalendar({

                        context: self,

                        defaultView: this.view || 'agendaWeek',
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek'
                        },
                        theme: false,
                        allDaySlot: false,
                        weekends: true,
                        firstDay: 1,
                        dayClick: function dayClick(date, jsEvent, view) {
                            return self.dayClick(date, jsEvent, view);
                        },

                        events: function events(start, end, timezone, callback) {

                            var data = self.events.map(function (event) {
                                event.editable = !self.isPast(event.start);
                                console.log(event);
                                return event;
                            });
                            if (data) {

                                console.log(callback);

                                callback(self.events);
                            }
                        },
                        eventClick: function eventClick(event) {
                            return self.eventClick(event);
                        },

                        editable: true,
                        handleWindowResize: true,

                        minTime: '07:30:00',
                        maxTime: '15:00:00',
                        columnFormat: {
                            week: 'ddd' },
                        displayEventTime: false,
                        allDayText: 'Online/TBD'

                    });
                };

                Schedule.prototype.isPast = function isPast(date) {
                    var today = moment().format();
                    return moment(today).isAfter(date);
                };

                Schedule.prototype.getGolfMatches = function getGolfMatches() {
                    var _this2 = this;

                    return this.golfMatchDataService.golfmatches.then(function (golfmatches) {
                        return _this2.golfmatches = _.sortBy(golfmatches, "GolfMatchId");
                    });
                };

                return Schedule;
            }()) || _class));

            _export('Schedule', Schedule);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL3NjaGVkdWxlLmpzIl0sIm5hbWVzIjpbIkF1dGhTZXJ2aWNlIiwiaW5qZWN0IiwiTWFuYWdlVXNlclNlcnZpY2UiLCJSb3V0ZXIiLCJTZXNzaW9uIiwibG9nIiwiJCIsIkV2ZW50QWdncmVnYXRvciIsIkRpYWxvZ1NlcnZpY2UiLCJHb2xmTWF0Y2hEYXRhU2VydmljZSIsIlZhbGlkYXRpb24iLCJfIiwibW9tZW50Iiwic2tlbGpzIiwiZnVsbENhbGVuZGFyIiwiTWF0Y2hNb2RhbCIsIlNjaGVkdWxlIiwiYXV0aCIsIm1hbmFnZSIsInJvdXRlciIsInNlc3Npb24iLCJldmVudEFnZ3JlZ2F0b3IiLCJkaWFsb2dTZXJ2aWNlIiwiZ29sZk1hdGNoRGF0YVNlcnZpY2UiLCJ2YWxpZGF0aW9uIiwiaGVhZGluZyIsInNob3dpbmciLCJwZW5kaW5nVXBkYXRlIiwidXBkYXRlZCIsInZpZXciLCJjcmVhdGVNb2RlIiwiZXZlbnRzIiwiY3VycmVudENvbnRleHQiLCJjYWxlbmRhclZpZXciLCJsaXN0VmlldyIsImV2ZW50VmlldyIsInNjaGVkdWxlIiwiZWEiLCJ0b2RheSIsImZvcm1hdCIsInVwY29taW5nU2NoZWR1bGVkTWF0Y2hlc0NvdW50Iiwic2VsZWN0ZWRWaWV3Iiwic2NoZWR1bGVWYWxpZGF0aW9uIiwib24iLCJlbnN1cmUiLCJpc05vdEVtcHR5IiwiYXR0YWNoZWQiLCJ2ZWxvY2l0eSIsImdldEdvbGZNYXRjaGVzIiwidGhlbiIsImNvbmZpZ3VyZUNhbGVuZGFyIiwiYWN0aXZhdGUiLCJzZWxmIiwiY3VycmVudFVzZXIiLCJnZXRDdXJyZW50VXNlciIsInNob3dVbmRvIiwiZXZlbnRDbGljayIsImV2ZW50IiwiY29uc29sZSIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJtb2RlbCIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwiZGF5Q2xpY2siLCJvcHRpb25zIiwiZGF0ZSIsImpzRXZlbnQiLCJjb250ZXh0IiwidG9nZ2xlQ3JlYXRlTW9kZSIsInN0YXJ0RGF0ZSIsInRpbWUiLCJjaGVjayIsIl9kIiwidG9KU09OIiwic2xpY2UiLCJ0eXBlIiwiaG91ciIsIm1pbnV0ZSIsIkRhdGUiLCJwdXNoIiwidGl0bGUiLCJzdGFydCIsImVuZCIsImNvbG9yIiwiZ3Vlc3RzIiwic2NoZWR1bGVzIiwiaSIsImxlbmd0aCIsIlNjaGVkdWxlRGF0ZUlzbyIsIlBsYXllcnMiLCJmb3VuZFBsYXllciIsImoiLCJEaXNwbGF5TmFtZSIsImRpc3BsYXlOYW1lIiwiTnVtYmVyT2ZIb2xlcyIsImFsbERheSIsImJhY2tncm91bmRDb2xvciIsInRleHRDb2xvciIsImlkIiwiU2NoZWR1bGVJZCIsImRlZmF1bHRWaWV3IiwiaGVhZGVyIiwibGVmdCIsImNlbnRlciIsInJpZ2h0IiwidGhlbWUiLCJhbGxEYXlTbG90Iiwid2Vla2VuZHMiLCJmaXJzdERheSIsInRpbWV6b25lIiwiY2FsbGJhY2siLCJkYXRhIiwibWFwIiwiZWRpdGFibGUiLCJpc1Bhc3QiLCJoYW5kbGVXaW5kb3dSZXNpemUiLCJtaW5UaW1lIiwibWF4VGltZSIsImNvbHVtbkZvcm1hdCIsIndlZWsiLCJkaXNwbGF5RXZlbnRUaW1lIiwiYWxsRGF5VGV4dCIsImlzQWZ0ZXIiLCJnb2xmbWF0Y2hlcyIsInNvcnRCeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLHVCLDBCQUFBQSxXOztBQUNBQyxrQixxQkFBQUEsTTs7QUFDQUMsNkIsMENBQUFBLGlCOztBQUNBQyxrQixrQkFBQUEsTTs7QUFDQUMsbUIsb0JBQUFBLE87O0FBQ0lDLGU7O0FBQ0xDLGE7O0FBQ0VDLDJCLDJCQUFBQSxlOztBQUNEQyx5QixrQkFBQUEsYTs7QUFDQUMsZ0MseUNBQUFBLG9COztBQUNBQyxzQixzQkFBQUEsVTs7QUFDREMsYTs7QUFDQUMsa0I7O0FBSUFDLGtCOztBQUNDQyx3QixpQkFBQUEsWTs7QUFFQUMsc0IsZUFBQUEsVTs7O2dDQUdLQyxRLFdBRFpmLE9BQU9ELFdBQVAsRUFBb0JFLGlC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
