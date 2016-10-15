'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'services/dataservices/manage-user-service', 'aurelia-router', 'services/session', 'toastr', 'jquery', 'aurelia-event-aggregator', 'aurelia-dialog', 'services/dataservices/schedule-service', 'aurelia-validation', 'underscore', 'moment', 'skeljs', 'utiljs', 'mainSkeljs'], function (_export, _context) {
    "use strict";

    var AuthService, inject, ManageUserService, Router, Session, log, $, EventAggregator, DialogService, ScheduleDataService, Validation, _, moment, skeljs, _dec, _class, Schedule;

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
        }, function (_servicesDataservicesScheduleService) {
            ScheduleDataService = _servicesDataservicesScheduleService.ScheduleDataService;
        }, function (_aureliaValidation) {
            Validation = _aureliaValidation.Validation;
        }, function (_underscore) {
            _ = _underscore.default;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_skeljs) {
            skeljs = _skeljs.default;
        }, function (_utiljs) {}, function (_mainSkeljs) {}],
        execute: function () {
            _export('Schedule', Schedule = (_dec = inject(AuthService, ManageUserService, Router, Session, EventAggregator, DialogService, ScheduleDataService, Validation), _dec(_class = function () {
                function Schedule(auth, manage, router, session, eventAggregator, dialogService, scheduleDataService, validation) {
                    _classCallCheck(this, Schedule);

                    this.heading = 'Schedule';
                    this.pendingUpdate = false;
                    this.updated = true;
                    this.view = "month";
                    this.createMode = false;
                    this.events = [];
                    this.currentContext = "";
                    this.calendarView = true;
                    this.listView = false;
                    this.eventView = false;

                    this.auth = auth;
                    this.manage = manage;
                    this.router = router;
                    this.session = session;
                    this.ea = eventAggregator;
                    this.dialogService = dialogService;
                    this.scheduleDataService = scheduleDataService;
                    this.today = moment().format("dddd MMM DD");
                    this.upcomingScheduledMatchesCount = 0;
                    this.selectedView = "all";
                    this.currentContext = this;

                    this.scheduleValidation = validation.on(this).ensure('startDate').isNotEmpty();
                }

                Schedule.prototype.eventClicked = function eventClicked(calEvent, jsEvent, view) {
                    var _this = this;

                    console.log(calEvent);

                    this.options[0].context.eventView = true;

                    this.options[0].context.scheduleDataService.getScheduleById(calEvent.id).then(function (schedule) {
                        _this.options[0].context.selectedMatch = schedule;
                    });
                };

                Schedule.prototype.closeEvent = function closeEvent() {
                    this.eventView = false;
                    this.calendarView = true;
                };

                Schedule.prototype.showCalendarView = function showCalendarView() {
                    var _this2 = this;

                    this.calendarView = true;
                    this.listView = false;


                    this.getSchedules().then(function () {
                        _this2.configureCalendar();
                    });
                };

                Schedule.prototype.showListView = function showListView() {
                    this.listView = true;
                    this.calendarView = false;
                    this.eventView = false;
                };

                Schedule.prototype.dayClick = function dayClick(date, jsEvent, view) {

                    console.log(date);
                    console.log(view);

                    var check = date._d.toJSON().slice(0, 10);

                    var time = view.type === "month" ? moment().hour(6).minute(0).format('h:mm A') : date.format('h:mm A');

                    var today = new Date().toJSON().slice(0, 10);

                    if (check < today) {} else {
                        var startDate = date.format("MM/DD/YYYY");
                        this.options[0].context.toggleCreateMode(startDate, time);
                    }
                };

                Schedule.prototype.configureCalendar = function configureCalendar(schedule) {
                    var _this3 = this;

                    this.events = [];

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

                    this.options = [{
                        context: self,
                        view: "month",
                        eventLimit: true,
                        theme: true,
                        handleWindowResize: true,
                        displayEventTime: true,
                        prev: 'circle-triangle-w',
                        next: 'circle-triangle-e',
                        prevYear: 'seek-prev',
                        nextYear: 'seek-next',
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        dayClick: function dayClick(date, jsEvent, view) {
                            return _this3.dayClick(date, jsEvent, view);
                        },

                        eventMouseover: function eventMouseover(calEvent) {
                            $(this).popover({
                                title: event.name,
                                placement: 'right',
                                trigger: 'manual',
                                content: 'foo',
                                container: '#calendar'
                            }).popover('toggle');
                        }

                    }];
                };

                Schedule.prototype.attached = function attached() {
                    var _this4 = this;

                    $("#upcoming-matches-header").velocity('transition.slideDownIn');
                    $("#calendar").velocity('transition.slideDownIn');

                    this.getSchedules().then(function () {
                        _this4.configureCalendar();
                    });
                };

                Schedule.prototype.activate = function activate() {
                    var self = this;
                    this.currentUser = this.session.getCurrentUser();

                    this.showUndo = false;
                };

                Schedule.prototype.getSchedules = function getSchedules() {
                    var _this5 = this;

                    return this.scheduleDataService.schedules.then(function (schedules) {
                        return _this5.schedules = _.sortBy(schedules, "ScheduleId");
                    });
                };

                return Schedule;
            }()) || _class));

            _export('Schedule', Schedule);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL3NjaGVkdWxlLmpzIl0sIm5hbWVzIjpbIkF1dGhTZXJ2aWNlIiwiaW5qZWN0IiwiTWFuYWdlVXNlclNlcnZpY2UiLCJSb3V0ZXIiLCJTZXNzaW9uIiwibG9nIiwiJCIsIkV2ZW50QWdncmVnYXRvciIsIkRpYWxvZ1NlcnZpY2UiLCJTY2hlZHVsZURhdGFTZXJ2aWNlIiwiVmFsaWRhdGlvbiIsIl8iLCJtb21lbnQiLCJza2VsanMiLCJTY2hlZHVsZSIsImF1dGgiLCJtYW5hZ2UiLCJyb3V0ZXIiLCJzZXNzaW9uIiwiZXZlbnRBZ2dyZWdhdG9yIiwiZGlhbG9nU2VydmljZSIsInNjaGVkdWxlRGF0YVNlcnZpY2UiLCJ2YWxpZGF0aW9uIiwiaGVhZGluZyIsInBlbmRpbmdVcGRhdGUiLCJ1cGRhdGVkIiwidmlldyIsImNyZWF0ZU1vZGUiLCJldmVudHMiLCJjdXJyZW50Q29udGV4dCIsImNhbGVuZGFyVmlldyIsImxpc3RWaWV3IiwiZXZlbnRWaWV3IiwiZWEiLCJ0b2RheSIsImZvcm1hdCIsInVwY29taW5nU2NoZWR1bGVkTWF0Y2hlc0NvdW50Iiwic2VsZWN0ZWRWaWV3Iiwic2NoZWR1bGVWYWxpZGF0aW9uIiwib24iLCJlbnN1cmUiLCJpc05vdEVtcHR5IiwiZXZlbnRDbGlja2VkIiwiY2FsRXZlbnQiLCJqc0V2ZW50IiwiY29uc29sZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiZ2V0U2NoZWR1bGVCeUlkIiwiaWQiLCJ0aGVuIiwic2NoZWR1bGUiLCJzZWxlY3RlZE1hdGNoIiwiY2xvc2VFdmVudCIsInNob3dDYWxlbmRhclZpZXciLCJnZXRTY2hlZHVsZXMiLCJjb25maWd1cmVDYWxlbmRhciIsInNob3dMaXN0VmlldyIsImRheUNsaWNrIiwiZGF0ZSIsImNoZWNrIiwiX2QiLCJ0b0pTT04iLCJzbGljZSIsInRpbWUiLCJ0eXBlIiwiaG91ciIsIm1pbnV0ZSIsIkRhdGUiLCJzdGFydERhdGUiLCJ0b2dnbGVDcmVhdGVNb2RlIiwic2NoZWR1bGVzIiwiaSIsImxlbmd0aCIsInN0YXJ0IiwiU2NoZWR1bGVEYXRlSXNvIiwiUGxheWVycyIsImZvdW5kUGxheWVyIiwiaiIsIkRpc3BsYXlOYW1lIiwiY3VycmVudFVzZXIiLCJkaXNwbGF5TmFtZSIsInB1c2giLCJ0aXRsZSIsIk51bWJlck9mSG9sZXMiLCJhbGxEYXkiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInRleHRDb2xvciIsIlNjaGVkdWxlSWQiLCJzZWxmIiwiZXZlbnRMaW1pdCIsInRoZW1lIiwiaGFuZGxlV2luZG93UmVzaXplIiwiZGlzcGxheUV2ZW50VGltZSIsInByZXYiLCJuZXh0IiwicHJldlllYXIiLCJuZXh0WWVhciIsImhlYWRlciIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsImV2ZW50TW91c2VvdmVyIiwicG9wb3ZlciIsImV2ZW50IiwibmFtZSIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJjb250ZW50IiwiY29udGFpbmVyIiwiYXR0YWNoZWQiLCJ2ZWxvY2l0eSIsImFjdGl2YXRlIiwiZ2V0Q3VycmVudFVzZXIiLCJzaG93VW5kbyIsInNvcnRCeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLHVCLDBCQUFBQSxXOztBQUNBQyxrQixxQkFBQUEsTTs7QUFDQUMsNkIsMENBQUFBLGlCOztBQUNBQyxrQixrQkFBQUEsTTs7QUFDQUMsbUIsb0JBQUFBLE87O0FBQ0lDLGU7O0FBQ0xDLGE7O0FBQ0VDLDJCLDJCQUFBQSxlOztBQUNEQyx5QixrQkFBQUEsYTs7QUFDQUMsK0Isd0NBQUFBLG1COztBQUNBQyxzQixzQkFBQUEsVTs7QUFDREMsYTs7QUFDQUMsa0I7O0FBSUFDLGtCOzs7Z0NBR01DLFEsV0FEWmIsT0FBT0QsV0FBUCxFQUFvQkUsaUJBQXBCLEVBQXVDQyxNQUF2QyxFQUErQ0MsT0FBL0MsRUFBd0RHLGVBQXhELEVBQXlFQyxhQUF6RSxFQUF3RkMsbUJBQXhGLEVBQTZHQyxVQUE3RyxDO0FBZUcsa0NBQVlLLElBQVosRUFBa0JDLE1BQWxCLEVB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
