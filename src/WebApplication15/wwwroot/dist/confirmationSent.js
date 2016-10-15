'use strict';

System.register(['aurelia-authentication', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var AuthService, inject, _dec, _class, ConfirmationSent;

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
        }],
        execute: function () {
            _export('ConfirmationSent', ConfirmationSent = (_dec = inject(AuthService), _dec(_class = function ConfirmationSent(auth) {
                _classCallCheck(this, ConfirmationSent);

                this.heading = 'Confirmation Sent';

                this.auth = auth;
            }) || _class));

            _export('ConfirmationSent', ConfirmationSent);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm1hdGlvblNlbnQuanMiXSwibmFtZXMiOlsiQXV0aFNlcnZpY2UiLCJpbmplY3QiLCJDb25maXJtYXRpb25TZW50IiwiYXV0aCIsImhlYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSx1QiwwQkFBQUEsVzs7QUFDQUMsa0IscUJBQUFBLE07Ozt3Q0FHS0MsZ0IsV0FEWkQsT0FBT0QsV0FBUCxDLGdCQUdHLDBCQUFZRyxJQUFaLEVBQWtCO0FBQUE7O0FBQUEscUJBSWxCQyxPQUprQixHQUlSLG1CQUpROztBQUNkLHFCQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDSCxhIiwiZmlsZSI6ImNvbmZpcm1hdGlvblNlbnQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
