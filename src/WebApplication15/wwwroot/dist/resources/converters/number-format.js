'use strict';

System.register(['numeral'], function (_export, _context) {
    "use strict";

    var numeral, NumberFormatValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_numeral) {
            numeral = _numeral.default;
        }],
        execute: function () {
            _export('NumberFormatValueConverter', NumberFormatValueConverter = function () {
                function NumberFormatValueConverter() {
                    _classCallCheck(this, NumberFormatValueConverter);
                }

                NumberFormatValueConverter.prototype.toView = function toView(value, format) {
                    return numeral(value).format(format);
                };

                return NumberFormatValueConverter;
            }());

            _export('NumberFormatValueConverter', NumberFormatValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL251bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOlsibnVtZXJhbCIsIk51bWJlckZvcm1hdFZhbHVlQ29udmVydGVyIiwidG9WaWV3IiwidmFsdWUiLCJmb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPQSxtQjs7O2tEQUVNQywwQjs7Ozs7cURBQ1RDLE0sbUJBQU9DLEssRUFBT0MsTSxFQUFRO0FBQ2xCLDJCQUFPSixRQUFRRyxLQUFSLEVBQWVDLE1BQWYsQ0FBc0JBLE1BQXRCLENBQVA7QUFDSCxpQiIsImZpbGUiOiJyZXNvdXJjZXMvY29udmVydGVycy9udW1iZXItZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
