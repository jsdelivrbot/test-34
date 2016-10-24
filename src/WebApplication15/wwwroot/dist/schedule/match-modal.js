'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'moment', 'jquery'], function (_export, _context) {
    "use strict";

    var inject, customElement, bindable, DialogController, moment, $, _dec, _class, MatchModal;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            customElement = _aureliaFramework.customElement;
            bindable = _aureliaFramework.bindable;
        }, function (_aureliaDialog) {
            DialogController = _aureliaDialog.DialogController;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {
            _export('MatchModal', MatchModal = (_dec = inject(DialogController), _dec(_class = function () {
                function MatchModal(controller) {
                    _classCallCheck(this, MatchModal);

                    this.controller = controller;
                }

                MatchModal.prototype.activate = function activate(model) {
                    $("#main").addClass('blur');

                    this.match = model.match;
                    this.context = model.context;
                    this.mode = model.mode;

                    this.start = moment(this.match.start).format('YYYY-MM-DD');
                };

                MatchModal.prototype.deactivate = function deactivate() {
                    $(".active").remove();

                    $("#main").removeClass('blur');
                };

                MatchModal.prototype.ok = function ok(match) {

                    var self = this;

                    if (this.mode === 'create') {
                        var dto = {

                            IsMatchCreator: true,
                            StartDate: moment(match.start).format("YYYY-MM-DD"),
                            Time: match.time,
                            Comments: match.title,
                            NumberOfHoles: match.numberOfHoles,
                            UserName: self.context.currentContext.currentUser.userName
                        };

                        this.context.golfMatchDataService.addGolfMatch(dto).then(function () {
                            $("#golf-calendar").fullCalendar('refetchEvents');
                            self.controller.cancel();
                        });
                    } else {
                        this.controller.cancel();
                    }
                };

                MatchModal.prototype.cancel = function cancel() {
                    return this.controller.cancel();
                };

                return MatchModal;
            }()) || _class));

            _export('MatchModal', MatchModal);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL21hdGNoLW1vZGFsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsImN1c3RvbUVsZW1lbnQiLCJiaW5kYWJsZSIsIkRpYWxvZ0NvbnRyb2xsZXIiLCJtb21lbnQiLCIkIiwiTWF0Y2hNb2RhbCIsImNvbnRyb2xsZXIiLCJhY3RpdmF0ZSIsIm1vZGVsIiwiYWRkQ2xhc3MiLCJtYXRjaCIsImNvbnRleHQiLCJtb2RlIiwic3RhcnQiLCJmb3JtYXQiLCJkZWFjdGl2YXRlIiwicmVtb3ZlIiwicmVtb3ZlQ2xhc3MiLCJvayIsInNlbGYiLCJkdG8iLCJJc01hdGNoQ3JlYXRvciIsIlN0YXJ0RGF0ZSIsIlRpbWUiLCJ0aW1lIiwiQ29tbWVudHMiLCJ0aXRsZSIsIk51bWJlck9mSG9sZXMiLCJudW1iZXJPZkhvbGVzIiwiVXNlck5hbWUiLCJjdXJyZW50Q29udGV4dCIsImN1cnJlbnRVc2VyIiwidXNlck5hbWUiLCJnb2xmTWF0Y2hEYXRhU2VydmljZSIsImFkZEdvbGZNYXRjaCIsInRoZW4iLCJmdWxsQ2FsZW5kYXIiLCJjYW5jZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTtBQUFRQyx5QixxQkFBQUEsYTtBQUFlQyxvQixxQkFBQUEsUTs7QUFDdkJDLDRCLGtCQUFBQSxnQjs7QUFDREMsa0I7O0FBQ0FDLGE7OztrQ0FJTUMsVSxXQURaTixPQUFPRyxnQkFBUCxDO0FBR0csb0NBQVlJLFVBQVosRUFBdUI7QUFBQTs7QUFDbkIseUJBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0g7O3FDQUVEQyxRLHFCQUFTQyxLLEVBQU07QUFDWEosc0JBQUUsT0FBRixFQUFXSyxRQUFYLENBQW9CLE1BQXBCOztBQUVBLHlCQUFLQyxLQUFMLEdBQWFGLE1BQU1FLEtBQW5CO0FBQ0EseUJBQUtDLE9BQUwsR0FBZUgsTUFBTUcsT0FBckI7QUFDQSx5QkFBS0MsSUFBTCxHQUFZSixNQUFNSSxJQUFsQjs7QUFHQSx5QkFBS0MsS0FBTCxHQUFhVixPQUFPLEtBQUtPLEtBQUwsQ0FBV0csS0FBbEIsRUFBeUJDLE1BQXpCLENBQWdDLFlBQWhDLENBQWI7QUFDSCxpQjs7cUNBQ0RDLFUseUJBQVk7QUFFUlgsc0JBQUUsU0FBRixFQUFhWSxNQUFiOztBQUVBWixzQkFBRSxPQUFGLEVBQVdhLFdBQVgsQ0FBdUIsTUFBdkI7QUFFSCxpQjs7cUNBQ0RDLEUsZUFBR1IsSyxFQUFNOztBQUVMLHdCQUFJUyxPQUFPLElBQVg7O0FBRUEsd0JBQUcsS0FBS1AsSUFBTCxLQUFjLFFBQWpCLEVBQTBCO0FBQ3RCLDRCQUFJUSxNQUFNOztBQUVOQyw0Q0FBZ0IsSUFGVjtBQUdOQyx1Q0FBV25CLE9BQU9PLE1BQU1HLEtBQWIsRUFBb0JDLE1BQXBCLENBQTJCLFlBQTNCLENBSEw7QUFJTlMsa0NBQU1iLE1BQU1jLElBSk47QUFLTkMsc0NBQVVmLE1BQU1nQixLQUxWO0FBTU5DLDJDQUFlakIsTUFBTWtCLGFBTmY7QUFPTkMsc0NBQVVWLEtBQUtSLE9BQUwsQ0FBYW1CLGNBQWIsQ0FBNEJDLFdBQTVCLENBQXdDQztBQVA1Qyx5QkFBVjs7QUFVQSw2QkFBS3JCLE9BQUwsQ0FBYXNCLG9CQUFiLENBQWtDQyxZQUFsQyxDQUErQ2QsR0FBL0MsRUFDS2UsSUFETCxDQUNVLFlBQUs7QUFDUC9CLDhCQUFFLGdCQUFGLEVBQW9CZ0MsWUFBcEIsQ0FBa0MsZUFBbEM7QUFDQWpCLGlDQUFLYixVQUFMLENBQWdCK0IsTUFBaEI7QUFDSCx5QkFKTDtBQUtILHFCQWhCRCxNQWtCQTtBQUNJLDZCQUFLL0IsVUFBTCxDQUFnQitCLE1BQWhCO0FBQ0g7QUFDSixpQjs7cUNBQ0RBLE0scUJBQVE7QUFDSiwyQkFBTyxLQUFLL0IsVUFBTCxDQUFnQitCLE1BQWhCLEVBQVA7QUFDSCxpQiIsImZpbGUiOiJzY2hlZHVsZS9tYXRjaC1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
