'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'jquery'], function (_export, _context) {
    "use strict";

    var inject, DialogController, $, _dec, _class, MatchModal;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaDialog) {
            DialogController = _aureliaDialog.DialogController;
        }, function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {
            _export('MatchModal', MatchModal = (_dec = inject(DialogController), _dec(_class = function () {
                function MatchModal(controller) {
                    _classCallCheck(this, MatchModal);

                    this.controller = controller;
                }

                MatchModal.prototype.activate = function activate(calEvent) {
                    this.event = calEvent;
                    console.log("thanks for the " + calEvent);
                };

                MatchModal.prototype.cancel = function cancel() {
                    $(".active").remove();
                    this.controller.cancel();
                };

                MatchModal.prototype.ok = function ok(event) {
                    this.controller.ok(event);
                    $(".active").remove();
                };

                return MatchModal;
            }()) || _class));

            _export('MatchModal', MatchModal);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL21hdGNoLW1vZGFsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkRpYWxvZ0NvbnRyb2xsZXIiLCIkIiwiTWF0Y2hNb2RhbCIsImNvbnRyb2xsZXIiLCJhY3RpdmF0ZSIsImNhbEV2ZW50IiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwiY2FuY2VsIiwicmVtb3ZlIiwib2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsNEIsa0JBQUFBLGdCOztBQUNEQyxhOzs7a0NBR01DLFUsV0FEWkgsT0FBT0MsZ0JBQVAsQztBQUVHLG9DQUFZRyxVQUFaLEVBQXVCO0FBQUE7O0FBQ25CLHlCQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNIOztxQ0FFREMsUSxxQkFBU0MsUSxFQUFTO0FBQ2QseUJBQUtDLEtBQUwsR0FBYUQsUUFBYjtBQUNBRSw0QkFBUUMsR0FBUixDQUFZLG9CQUFvQkgsUUFBaEM7QUFDSCxpQjs7cUNBRURJLE0scUJBQVE7QUFDSlIsc0JBQUUsU0FBRixFQUFhUyxNQUFiO0FBQ0EseUJBQUtQLFVBQUwsQ0FBZ0JNLE1BQWhCO0FBRUgsaUI7O3FDQUNERSxFLGVBQUdMLEssRUFBTTtBQUVMLHlCQUFLSCxVQUFMLENBQWdCUSxFQUFoQixDQUFtQkwsS0FBbkI7QUFDQUwsc0JBQUUsU0FBRixFQUFhUyxNQUFiO0FBQ0gsaUIiLCJmaWxlIjoic2NoZWR1bGUvbWF0Y2gtbW9kYWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
