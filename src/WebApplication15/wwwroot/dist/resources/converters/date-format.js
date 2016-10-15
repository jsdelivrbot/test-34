'use strict';

System.register(['moment'], function (_export, _context) {
    "use strict";

    var moment, DateFormatValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {
            _export('DateFormatValueConverter', DateFormatValueConverter = function () {
                function DateFormatValueConverter() {
                    _classCallCheck(this, DateFormatValueConverter);
                }

                DateFormatValueConverter.prototype.toView = function toView(value, format) {
                    if (format) {
                        return moment(value).format(format);
                    } else {
                        return moment(value).format('M/D/YYYY');
                    }
                };

                return DateFormatValueConverter;
            }());

            _export('DateFormatValueConverter', DateFormatValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2RhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbIm1vbWVudCIsIkRhdGVGb3JtYXRWYWx1ZUNvbnZlcnRlciIsInRvVmlldyIsInZhbHVlIiwiZm9ybWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBT0Esa0I7OztnREFFTUMsd0I7Ozs7O21EQUNUQyxNLG1CQUFPQyxLLEVBQU9DLE0sRUFBUTtBQUNsQix3QkFBR0EsTUFBSCxFQUFVO0FBQ04sK0JBQU9KLE9BQU9HLEtBQVAsRUFBY0MsTUFBZCxDQUFxQkEsTUFBckIsQ0FBUDtBQUNILHFCQUZELE1BRUs7QUFDRCwrQkFBT0osT0FBT0csS0FBUCxFQUFjQyxNQUFkLENBQXFCLFVBQXJCLENBQVA7QUFDSDtBQUNKLGlCIiwiZmlsZSI6InJlc291cmNlcy9jb252ZXJ0ZXJzL2RhdGUtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
