'use strict';

System.register(['aurelia-authentication', 'aurelia-framework', 'services/dataservices/manage-user-service', 'aurelia-router', 'services/session', 'toastr', 'jquery', 'aurelia-event-aggregator', 'aurelia-dialog', 'services/dataservices/golfmatch-service', 'aurelia-validation', 'underscore', 'moment', 'fullcalendar/dist/fullcalendar.css!', 'bootstrap', 'skeljs', 'utiljs', 'mainSkeljs'], function (_export, _context) {
    "use strict";

    var AuthService, inject, ManageUserService, Router, Session, log, $, EventAggregator, DialogService, GolfMatchDataService, Validation, _, moment, skeljs, _dec, _class, Schedule;

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
        }, function (_fullcalendarDistFullcalendarCss) {}, function (_bootstrap) {}, function (_skeljs) {
            skeljs = _skeljs.default;
        }, function (_utiljs) {}, function (_mainSkeljs) {}],
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

                Schedule.prototype.openDialog = function openDialog(viewModel, calEvent) {
                    var _this = this;

                    this.dialogService.open({ viewModel: viewModel, model: calEvent }).then(function (response) {
                        if (!response.wasCancelled) {
                            console.log('OK');
                            _this.rating = response.output;
                        } else {
                            console.log('Cancel');
                        }
                        console.log(response.output);
                    });
                };

                Schedule.prototype.eventClicked = function eventClicked(vm, calEvent, jsEvent, view) {
                    console.log(calEvent);
                    vm.openDialog("schedule/match-modal", model);
                };

                Schedule.prototype.closeEvent = function closeEvent() {
                    this.eventView = false;
                    this.calendarView = true;
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

                Schedule.prototype.isPast = function isPast(date) {
                    var today = moment().format();
                    return moment(today).isAfter(date);
                };

                Schedule.prototype.configureCalendar = function configureCalendar(schedule) {
                    var _this2 = this;

                    this.events = [];
                    this.events.push({
                        title: 'This is a Material Design event!',
                        start: '10-19-2016',
                        end: '10-19-2016',
                        color: '#C2185B',
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

                    this.options = [{
                        context: self,
                        dayClick: function dayClick(date, jsEvent, view) {
                            return _this2.dayClick(date, jsEvent, view);
                        },
                        eventClicked: function eventClicked(vm, calEvent, jsEvent, view) {
                            return _this2.eventClicked(self, vm, calEvent, jsEvent, view);
                        }
                    }];
                };

                Schedule.prototype.attached = function attached() {
                    var _this3 = this;

                    $("#upcoming-matches-header").velocity('transition.slideDownIn');
                    $("#golf-calendar").velocity('transition.slideDownIn');

                    this.getGolfMatches().then(function () {
                        _this3.configureCalendar();
                        console.log(_this3.events);
                    });
                };

                Schedule.prototype.activate = function activate() {
                    var self = this;
                    this.currentUser = this.session.getCurrentUser();

                    this.showUndo = false;
                };

                Schedule.prototype.getGolfMatches = function getGolfMatches() {
                    var _this4 = this;

                    return this.golfMatchDataService.golfmatches.then(function (golfmatches) {
                        return _this4.golfmatches = _.sortBy(golfmatches, "GolfMatchId");
                    });
                };

                return Schedule;
            }()) || _class));

            _export('Schedule', Schedule);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL3NjaGVkdWxlLmpzIl0sIm5hbWVzIjpbIkF1dGhTZXJ2aWNlIiwiaW5qZWN0IiwiTWFuYWdlVXNlclNlcnZpY2UiLCJSb3V0ZXIiLCJTZXNzaW9uIiwibG9nIiwiJCIsIkV2ZW50QWdncmVnYXRvciIsIkRpYWxvZ1NlcnZpY2UiLCJHb2xmTWF0Y2hEYXRhU2VydmljZSIsIlZhbGlkYXRpb24iLCJfIiwibW9tZW50Iiwic2tlbGpzIiwiU2NoZWR1bGUiLCJhdXRoIiwibWFuYWdlIiwicm91dGVyIiwic2Vzc2lvbiIsImV2ZW50QWdncmVnYXRvciIsImRpYWxvZ1NlcnZpY2UiLCJnb2xmTWF0Y2hEYXRhU2VydmljZSIsInZhbGlkYXRpb24iLCJoZWFkaW5nIiwic2hvd2luZyIsInBlbmRpbmdVcGRhdGUiLCJ1cGRhdGVkIiwidmlldyIsImNyZWF0ZU1vZGUiLCJldmVudHMiLCJjdXJyZW50Q29udGV4dCIsImNhbGVuZGFyVmlldyIsImxpc3RWaWV3IiwiZXZlbnRWaWV3IiwiZWEiLCJ0b2RheSIsImZvcm1hdCIsInVwY29taW5nU2NoZWR1bGVkTWF0Y2hlc0NvdW50Iiwic2VsZWN0ZWRWaWV3Iiwic2NoZWR1bGVWYWxpZGF0aW9uIiwib24iLCJlbnN1cmUiLCJpc05vdEVtcHR5Iiwib3BlbkRpYWxvZyIsInZpZXdNb2RlbCIsImNhbEV2ZW50Iiwib3BlbiIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwiY29uc29sZSIsInJhdGluZyIsIm91dHB1dCIsImV2ZW50Q2xpY2tlZCIsInZtIiwianNFdmVudCIsImNsb3NlRXZlbnQiLCJkYXlDbGljayIsImRhdGUiLCJjaGVjayIsIl9kIiwidG9KU09OIiwic2xpY2UiLCJ0aW1lIiwidHlwZSIsImhvdXIiLCJtaW51dGUiLCJEYXRlIiwic3RhcnREYXRlIiwib3B0aW9ucyIsImNvbnRleHQiLCJ0b2dnbGVDcmVhdGVNb2RlIiwiaXNQYXN0IiwiaXNBZnRlciIsImNvbmZpZ3VyZUNhbGVuZGFyIiwic2NoZWR1bGUiLCJwdXNoIiwidGl0bGUiLCJzdGFydCIsImVuZCIsImNvbG9yIiwiZ3Vlc3RzIiwic2NoZWR1bGVzIiwiaSIsImxlbmd0aCIsIlNjaGVkdWxlRGF0ZUlzbyIsIlBsYXllcnMiLCJmb3VuZFBsYXllciIsImoiLCJEaXNwbGF5TmFtZSIsImN1cnJlbnRVc2VyIiwiZGlzcGxheU5hbWUiLCJOdW1iZXJPZkhvbGVzIiwiYWxsRGF5IiwiYmFja2dyb3VuZENvbG9yIiwidGV4dENvbG9yIiwiaWQiLCJTY2hlZHVsZUlkIiwic2VsZiIsImF0dGFjaGVkIiwidmVsb2NpdHkiLCJnZXRHb2xmTWF0Y2hlcyIsImFjdGl2YXRlIiwiZ2V0Q3VycmVudFVzZXIiLCJzaG93VW5kbyIsImdvbGZtYXRjaGVzIiwic29ydEJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsdUIsMEJBQUFBLFc7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyw2QiwwQ0FBQUEsaUI7O0FBQ0FDLGtCLGtCQUFBQSxNOztBQUNBQyxtQixvQkFBQUEsTzs7QUFDSUMsZTs7QUFDTEMsYTs7QUFDRUMsMkIsMkJBQUFBLGU7O0FBQ0RDLHlCLGtCQUFBQSxhOztBQUNBQyxnQyx5Q0FBQUEsb0I7O0FBQ0FDLHNCLHNCQUFBQSxVOztBQUNEQyxhOztBQUNBQyxrQjs7QUFJQUMsa0I7OztnQ0FHTUMsUSxXQURaYixPQUFPRCxXQUFQLEVBQW9CRSxpQkFBcEIsRUFBdUNDLE1BQXZDLEVBQStDQyxPQUEvQyxFQUF3REcsZUFBeEQsRUFBeUVDLGFBQXpFLEVBQXdGQyxvQkFBeEYsRUFBOEdDLFVBQTlHLEM7QUFlRyxrQ0FBWUssSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxPQUFsQyxFQUEyQ0MsZUFBM0MsRUFBNERDLGFBQTVELEVBQTJFQyxvQkFBM0UsRUFBaUdDLFVBQWpHLEVBQTZHO0FBQUE7O0FBQUEseUJBWjdHQyxPQVk2RyxHQVpuRyxVQVltRztBQUFBLHlCQVg3R0MsT0FXNkcsR0FYbkcsSUFXbUc7QUFBQSx5QkFWN0dDLGFBVTZHLEdBVjdGLEtBVTZGO0FBQUEseUJBVDdHQyxPQVM2RyxHQVRuRyxJQVNtRztBQUFBLHlCQVI3R0MsSUFRNkcsR0FSdEcsT0FRc0c7QUFBQSx5QkFQN0dDLFVBTzZHLEdBUGhHLEtBT2dHO0FBQUEseUJBTjdHQyxNQU02RyxHQU5wRyxFQU1vRztBQUFBLHlCQUw3R0MsY0FLNkcsR0FMNUYsRUFLNEY7QUFBQSx5QkFKN0dDLFlBSTZHLEdBSjlGLElBSThGO0FBQUEseUJBSDdHQyxRQUc2RyxHQUhsRyxLQUdrRztBQUFBLHlCQUY3R0MsU0FFNkcsR0FGakcsS0FFaUc7O0FBQ3pHLHlCQUFLbEIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLHlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSx5QkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EseUJBQUtnQixFQUFMLEdBQVVmLGVBQVY7QUFDQSx5QkFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSx5QkFBS0Msb0JBQUwsR0FBNEJBLG9CQUE1QjtBQUNBLHlCQUFLYyxLQUFMLEdBQWF2QixTQUFTd0IsTUFBVCxDQUFnQixhQUFoQixDQUFiO0FBQ0EseUJBQUtDLDZCQUFMLEdBQXFDLENBQXJDO0FBQ0EseUJBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSx5QkFBS1IsY0FBTCxHQUFzQixJQUF0Qjs7QUFJQSx5QkFBS1Msa0JBQUwsR0FBMkJqQixXQUFXa0IsRUFBWCxDQUFjLElBQWQsRUFDMUJDLE1BRDBCLENBQ25CLFdBRG1CLEVBRXBCQyxVQUZvQixFQUEzQjtBQUdIOzttQ0FDREMsVSx1QkFBV0MsUyxFQUFXQyxRLEVBQVM7QUFBQTs7QUFDM0IseUJBQUt6QixhQUFMLENBQW1CMEIsSUFBbkIsQ0FBd0IsRUFBQ0YsV0FBV0EsU0FBWixFQUF1QkcsT0FBT0YsUUFBOUIsRUFBeEIsRUFBaUVHLElBQWpFLENBQXNFLG9CQUFZO0FBQzlFLDRCQUFHLENBQUNDLFNBQVNDLFlBQWIsRUFBMkI7QUFDdkJDLG9DQUFROUMsR0FBUixDQUFZLElBQVo7QUFDQSxrQ0FBSytDLE1BQUwsR0FBY0gsU0FBU0ksTUFBdkI7QUFDSCx5QkFIRCxNQUdPO0FBQ0hGLG9DQUFROUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNEOEMsZ0NBQVE5QyxHQUFSLENBQVk0QyxTQUFTSSxNQUFyQjtBQUNILHFCQVJEO0FBU0gsaUI7O21DQUtEQyxZLHlCQUFhQyxFLEVBQUlWLFEsRUFBVVcsTyxFQUFTN0IsSSxFQUFLO0FBQ3JDd0IsNEJBQVE5QyxHQUFSLENBQVl3QyxRQUFaO0FBQ0FVLHVCQUFHWixVQUFILENBQWMsc0JBQWQsRUFBc0NJLEtBQXRDO0FBMEJILGlCOzttQ0FDRFUsVSx5QkFBWTtBQUNSLHlCQUFLeEIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlCQUFLRixZQUFMLEdBQW9CLElBQXBCO0FBQ0gsaUI7O21DQXNCRDJCLFEscUJBQVNDLEksRUFBTUgsTyxFQUFTN0IsSSxFQUFLOztBQUV6QndCLDRCQUFROUMsR0FBUixDQUFZc0QsSUFBWjtBQUNBUiw0QkFBUTlDLEdBQVIsQ0FBWXNCLElBQVo7O0FBRUEsd0JBQUlpQyxRQUFRRCxLQUFLRSxFQUFMLENBQVFDLE1BQVIsR0FBaUJDLEtBQWpCLENBQXVCLENBQXZCLEVBQXlCLEVBQXpCLENBQVo7O0FBR0Esd0JBQUlDLE9BQU9yQyxLQUFLc0MsSUFBTCxLQUFjLE9BQWQsR0FBd0JyRCxTQUFTc0QsSUFBVCxDQUFjLENBQWQsRUFBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCL0IsTUFBM0IsQ0FBa0MsUUFBbEMsQ0FBeEIsR0FBc0V1QixLQUFLdkIsTUFBTCxDQUFZLFFBQVosQ0FBakY7O0FBRUEsd0JBQUlELFFBQVEsSUFBSWlDLElBQUosR0FBV04sTUFBWCxHQUFvQkMsS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNEIsRUFBNUIsQ0FBWjs7QUFFQSx3QkFBR0gsUUFBUXpCLEtBQVgsRUFDQSxDQUVDLENBSEQsTUFLQTtBQUNJLDRCQUFJa0MsWUFBWVYsS0FBS3ZCLE1BQUwsQ0FBWSxZQUFaLENBQWhCO0FBQ0EsNkJBQUtrQyxPQUFMLENBQWEsQ0FBYixFQUFnQkMsT0FBaEIsQ0FBd0JDLGdCQUF4QixDQUF5Q0gsU0FBekMsRUFBb0RMLElBQXBEO0FBQ0g7QUFDSixpQjs7bUNBRURTLE0sbUJBQU9kLEksRUFBTTtBQUNULHdCQUFJeEIsUUFBUXZCLFNBQVN3QixNQUFULEVBQVo7QUFDQSwyQkFBT3hCLE9BQVF1QixLQUFSLEVBQWdCdUMsT0FBaEIsQ0FBeUJmLElBQXpCLENBQVA7QUFDSCxpQjs7bUNBR0RnQixpQiw4QkFBa0JDLFEsRUFBUztBQUFBOztBQUN2Qix5QkFBSy9DLE1BQUwsR0FBYyxFQUFkO0FBQ0EseUJBQUtBLE1BQUwsQ0FBWWdELElBQVosQ0FBaUI7QUFDYkMsK0JBQU8sa0NBRE07QUFFYkMsK0JBQU8sWUFGTTtBQUdiQyw2QkFBSyxZQUhRO0FBSWJDLCtCQUFPLFNBSk07QUFLYkMsZ0NBQVE7QUFMSyxxQkFBakI7O0FBU0Esd0JBQUcsS0FBS0MsU0FBUixFQUFrQjtBQUNkLDZCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLRCxTQUFMLENBQWVFLE1BQW5DLEVBQTJDRCxHQUEzQyxFQUFnRDs7QUFFNUMsZ0NBQUlMLFFBQVMsS0FBS0ksU0FBTCxDQUFlQyxDQUFmLEVBQWtCRSxlQUEvQjtBQUNBbkMsb0NBQVE5QyxHQUFSLENBQVksS0FBSzhFLFNBQUwsQ0FBZUMsQ0FBZixFQUFrQkcsT0FBOUI7O0FBRUEsZ0NBQUlDLGNBQWMsS0FBbEI7QUFDQSxpQ0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS04sU0FBTCxDQUFlQyxDQUFmLEVBQWtCRyxPQUFsQixDQUEwQkYsTUFBOUMsRUFBc0RJLEdBQXRELEVBQTJEO0FBQ3ZELG9DQUFHLEtBQUtOLFNBQUwsQ0FBZUMsQ0FBZixFQUFrQkcsT0FBbEIsQ0FBMEJFLENBQTFCLEVBQTZCQyxXQUE3QixJQUE0QyxLQUFLQyxXQUFMLENBQWlCQyxXQUFoRSxFQUE2RTtBQUN6RUosa0RBQWMsSUFBZDtBQUNIO0FBQ0o7O0FBRUQsZ0NBQUdBLFdBQUgsRUFBZTtBQUNYLHFDQUFLM0QsTUFBTCxDQUFZZ0QsSUFBWixDQUFpQjtBQUNiQywyQ0FBTyxLQUFLSyxTQUFMLENBQWVDLENBQWYsRUFBa0JTLGFBQWxCLEdBQWtDLFFBRDVCO0FBRWJkLDJDQUFPQSxLQUZNO0FBR2JlLDRDQUFTLEtBSEk7QUFJYmIsMkNBQU8sT0FKTTtBQUtiYyxxREFBaUIsU0FMSjtBQU1iQywrQ0FBVyxNQU5FO0FBT2JDLHdDQUFJLEtBQUtkLFNBQUwsQ0FBZUMsQ0FBZixFQUFrQmM7QUFQVCxpQ0FBakI7QUFTSCw2QkFWRCxNQVVLO0FBQ0QscUNBQUtyRSxNQUFMLENBQVlnRCxJQUFaLENBQWlCO0FBQ2JDLDJDQUFPLEtBQUtLLFNBQUwsQ0FBZUMsQ0FBZixFQUFrQlMsYUFBbEIsR0FBa0MsUUFENUI7QUFFYmQsMkNBQU9BLEtBRk07QUFHYmUsNENBQVMsS0FISTtBQUliYiwyQ0FBTyxNQUpNO0FBS2JjLHFEQUFpQixNQUxKO0FBTWJDLCtDQUFXLFNBTkU7QUFPYkMsd0NBQUksS0FBS2QsU0FBTCxDQUFlQyxDQUFmLEVBQWtCYztBQVBULGlDQUFqQjtBQVNIO0FBRUo7QUFDSjtBQUNELHdCQUFJQyxPQUFPLElBQVg7O0FBR0EseUJBQUs3QixPQUFMLEdBQWUsQ0FBQztBQUNaQyxpQ0FBUzRCLElBREc7QUFnQlp6QyxrQ0FBVSxrQkFBQ0MsSUFBRCxFQUFPSCxPQUFQLEVBQWdCN0IsSUFBaEI7QUFBQSxtQ0FBeUIsT0FBSytCLFFBQUwsQ0FBY0MsSUFBZCxFQUFvQkgsT0FBcEIsRUFBNkI3QixJQUE3QixDQUF6QjtBQUFBLHlCQWhCRTtBQWlCWjJCLHNDQUFjLHNCQUFDQyxFQUFELEVBQUtWLFFBQUwsRUFBZVcsT0FBZixFQUF3QjdCLElBQXhCO0FBQUEsbUNBQWlDLE9BQUsyQixZQUFMLENBQWtCNkMsSUFBbEIsRUFBd0I1QyxFQUF4QixFQUE0QlYsUUFBNUIsRUFBc0NXLE9BQXRDLEVBQStDN0IsSUFBL0MsQ0FBakM7QUFBQTtBQWpCRixxQkFBRCxDQUFmO0FBK0JILGlCOzttQ0FFRHlFLFEsdUJBQVU7QUFBQTs7QUFFTjlGLHNCQUFFLDBCQUFGLEVBQThCK0YsUUFBOUIsQ0FBdUMsd0JBQXZDO0FBQ0EvRixzQkFBRSxnQkFBRixFQUFvQitGLFFBQXBCLENBQTZCLHdCQUE3Qjs7QUFFQSx5QkFBS0MsY0FBTCxHQUFzQnRELElBQXRCLENBQTJCLFlBQUs7QUFDNUIsK0JBQUsyQixpQkFBTDtBQUNBeEIsZ0NBQVE5QyxHQUFSLENBQVksT0FBS3dCLE1BQWpCO0FBQ0gscUJBSEQ7QUFNSCxpQjs7bUNBRUQwRSxRLHVCQUFVO0FBQ04sd0JBQUlKLE9BQU8sSUFBWDtBQUNBLHlCQUFLUixXQUFMLEdBQW1CLEtBQUt6RSxPQUFMLENBQWFzRixjQUFiLEVBQW5COztBQUVBLHlCQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBR0gsaUI7O21DQUNESCxjLDZCQUFpQjtBQUFBOztBQUNiLDJCQUFPLEtBQUtqRixvQkFBTCxDQUEwQnFGLFdBQTFCLENBQ0MxRCxJQURELENBQ007QUFBQSwrQkFBZSxPQUFLMEQsV0FBTCxHQUFtQi9GLEVBQUVnRyxNQUFGLENBQVNELFdBQVQsRUFBc0IsYUFBdEIsQ0FBbEM7QUFBQSxxQkFETixDQUFQO0FBRUgsaUIiLCJmaWxlIjoic2NoZWR1bGUvc2NoZWR1bGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
