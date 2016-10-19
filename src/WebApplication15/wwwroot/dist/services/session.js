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

                        var token = localStorage.getItem('aurelia_authentication');
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

                        this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Nlc3Npb24uanMiXSwibmFtZXMiOlsibG9nIiwiU2Vzc2lvbiIsInVzZXIiLCJjdXJyZW50VXNlciIsImdldEN1cnJlbnRVc2VyIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYmFzZTY0VXJsIiwic3BsaXQiLCJiYXNlNjQiLCJyZXBsYWNlIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwid2luZG93IiwiYXRvYiIsInVzZXJOYW1lIiwidW5pcXVlX25hbWUiLCJkaXNwbGF5TmFtZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZXJyb3IiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBWUEsZTs7OytCQUVDQyxPO0FBR1QsaUNBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFDYix5QkFBS0MsV0FBTCxHQUFtQkQsSUFBbkI7QUFDSDs7a0NBS0RFLGMsMkJBQWVDLEssRUFBTTs7QUFFakIsd0JBQUk7O0FBRUEsNEJBQUlBLFFBQVFDLGFBQWFDLE9BQWIsQ0FBcUIsd0JBQXJCLENBQVo7QUFDQSw0QkFBSUMsWUFBWUgsTUFBTUksS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBaEI7QUFDQSw0QkFBSUMsU0FBYUYsVUFBVUcsT0FBVixDQUFrQixJQUFsQixFQUF3QixHQUF4QixFQUE2QkEsT0FBN0IsQ0FBcUMsSUFBckMsRUFBMkMsR0FBM0MsQ0FBakI7O0FBRUEsNkJBQUtSLFdBQUwsR0FBbUJTLEtBQUtDLEtBQUwsQ0FBV0MsbUJBQW1CQyxPQUFPQyxPQUFPQyxJQUFQLENBQVlQLE1BQVosQ0FBUCxDQUFuQixDQUFYLENBQW5COztBQUdBLDZCQUFLUCxXQUFMLENBQWlCZSxRQUFqQixHQUE0QixLQUFLZixXQUFMLENBQWlCZ0IsV0FBN0M7QUFDQSw2QkFBS2hCLFdBQUwsQ0FBaUJpQixXQUFqQixHQUErQixLQUFLakIsV0FBTCxDQUFpQmtCLFNBQWpCLEdBQTZCLEdBQTdCLEdBQW1DLEtBQUtsQixXQUFMLENBQWlCbUIsUUFBbkY7QUFFSCxxQkFaRCxDQVlFLE9BQU9DLEtBQVAsRUFBYztBQUNaQyxnQ0FBUXhCLEdBQVIsQ0FBWXVCLEtBQVo7QUFDQXZCLDRCQUFJdUIsS0FBSixDQUFVLDRCQUE0QkEsS0FBdEM7QUFDSDs7QUFFRCwyQkFBTyxLQUFLcEIsV0FBWjtBQUVILGlCIiwiZmlsZSI6InNlcnZpY2VzL3Nlc3Npb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
