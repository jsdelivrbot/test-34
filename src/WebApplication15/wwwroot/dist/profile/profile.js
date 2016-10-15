'use strict';

System.register(['aurelia-framework', 'toastr'], function (_export, _context) {
    "use strict";

    var inject, log, Profile;

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
            _export('Profile', Profile = function () {
                function Profile() {
                    _classCallCheck(this, Profile);

                    this.heading = 'Profile';

                    log.info('hello');
                }

                Profile.prototype.activate = function activate() {
                    log.info('hello');
                };

                return Profile;
            }());

            _export('Profile', Profile);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUvcHJvZmlsZS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJsb2ciLCJQcm9maWxlIiwiaGVhZGluZyIsImluZm8iLCJhY3RpdmF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNJQyxlOzs7K0JBRUNDLE87QUFJVCxtQ0FBYTtBQUFBOztBQUFBLHlCQUZiQyxPQUVhLEdBRkgsU0FFRzs7QUFDVEYsd0JBQUlHLElBQUosQ0FBUyxPQUFUO0FBQ0g7O2tDQUVEQyxRLHVCQUFVO0FBQ05KLHdCQUFJRyxJQUFKLENBQVMsT0FBVDtBQUNILGlCIiwiZmlsZSI6InByb2ZpbGUvcHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
