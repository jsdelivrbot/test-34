'use strict';

System.register(['aurelia-framework', 'toastr'], function (_export, _context) {
    "use strict";

    var inject, log, Settings;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_toastr) {
            log = _toastr;
        }],
        execute: function () {
            _export('Settings', Settings = function () {
                function Settings() {
                    _classCallCheck(this, Settings);

                    this.heading = 'Settings';
                }

                Settings.prototype.activate = function activate() {
                    log.info('Settings');
                };

                return Settings;
            }());

            _export('Settings', Settings);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbImluamVjdCIsImxvZyIsIlNldHRpbmdzIiwiaGVhZGluZyIsImFjdGl2YXRlIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNJQyxlOzs7Z0NBRUNDLFE7QUFJVCxvQ0FBYTtBQUFBOztBQUFBLHlCQUZiQyxPQUVhLEdBRkgsVUFFRztBQUVaOzttQ0FFREMsUSx1QkFBVTtBQUNOSCx3QkFBSUksSUFBSixDQUFTLFVBQVQ7QUFDSCxpQiIsImZpbGUiOiJzZXR0aW5ncy9zZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
