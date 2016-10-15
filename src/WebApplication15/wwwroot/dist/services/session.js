'use strict';

System.register(['toastr'], function (_export, _context) {
    "use strict";

    var log, Session;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_toastr) {
            log = _toastr;
        }],
        execute: function () {
            _export('Session', Session = function () {
                function Session(user) {
                    _classCallCheck(this, Session);

                    this.currentUser = user;
                }

                Session.prototype.getCurrentUser = function getCurrentUser(token) {

                    try {

                        var base64Url = token.split('.')[1];

                        this.currentUser = JSON.parse(window.atob(base64Url));

                        this.currentUser.userName = this.currentUser.unique_name;
                        this.currentUser.displayName = this.currentUser.firstName + " " + this.currentUser.lastName;
                    } catch (error) {
                        console.log(error);
                        log.error('Unauthorized (no token)' + error);
                    }

                    return this.currentUser;
                };

                return Session;
            }());

            _export('Session', Session);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Nlc3Npb24uanMiXSwibmFtZXMiOlsibG9nIiwiU2Vzc2lvbiIsInVzZXIiLCJjdXJyZW50VXNlciIsImdldEN1cnJlbnRVc2VyIiwidG9rZW4iLCJiYXNlNjRVcmwiLCJzcGxpdCIsIkpTT04iLCJwYXJzZSIsIndpbmRvdyIsImF0b2IiLCJ1c2VyTmFtZSIsInVuaXF1ZV9uYW1lIiwiZGlzcGxheU5hbWUiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVycm9yIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVlBLGU7OzsrQkFFQ0MsTztBQUdULGlDQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQ2IseUJBQUtDLFdBQUwsR0FBbUJELElBQW5CO0FBQ0g7O2tDQUtERSxjLDJCQUFlQyxLLEVBQU07O0FBRWpCLHdCQUFJOztBQUVBLDRCQUFJQyxZQUFZRCxNQUFNRSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFoQjs7QUFHQSw2QkFBS0osV0FBTCxHQUFtQkssS0FBS0MsS0FBTCxDQUFXQyxPQUFPQyxJQUFQLENBQVlMLFNBQVosQ0FBWCxDQUFuQjs7QUFHQSw2QkFBS0gsV0FBTCxDQUFpQlMsUUFBakIsR0FBNEIsS0FBS1QsV0FBTCxDQUFpQlUsV0FBN0M7QUFDQSw2QkFBS1YsV0FBTCxDQUFpQlcsV0FBakIsR0FBK0IsS0FBS1gsV0FBTCxDQUFpQlksU0FBakIsR0FBNkIsR0FBN0IsR0FBbUMsS0FBS1osV0FBTCxDQUFpQmEsUUFBbkY7QUFFSCxxQkFYRCxDQVdFLE9BQU9DLEtBQVAsRUFBYztBQUNaQyxnQ0FBUWxCLEdBQVIsQ0FBWWlCLEtBQVo7QUFDQWpCLDRCQUFJaUIsS0FBSixDQUFVLDRCQUE0QkEsS0FBdEM7QUFDSDs7QUFFRCwyQkFBTyxLQUFLZCxXQUFaO0FBRUgsaUIiLCJmaWxlIjoic2VydmljZXMvc2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
