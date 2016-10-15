"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var FilterValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("FilterValueConverter", FilterValueConverter = function () {
                function FilterValueConverter() {
                    _classCallCheck(this, FilterValueConverter);
                }

                FilterValueConverter.prototype.toView = function toView() {
                    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    var filterObject = arguments[1];


                    return array.filter(function (item) {
                        for (var key in filterObject) {

                            if (item[key] !== filterObject[key]) {
                                return false;
                            }
                        }
                        return true;
                    });
                };

                return FilterValueConverter;
            }());

            _export("FilterValueConverter", FilterValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2ZpbHRlci5qcyJdLCJuYW1lcyI6WyJGaWx0ZXJWYWx1ZUNvbnZlcnRlciIsInRvVmlldyIsImFycmF5IiwiZmlsdGVyT2JqZWN0IiwiZmlsdGVyIiwiaXRlbSIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FBYUEsb0I7Ozs7OytDQUNUQyxNLHFCQUFpQztBQUFBLHdCQUExQkMsS0FBMEIsdUVBQWxCLEVBQWtCO0FBQUEsd0JBQWRDLFlBQWM7OztBQUU3QiwyQkFBT0QsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUMxQiw2QkFBSyxJQUFJQyxHQUFULElBQWdCSCxZQUFoQixFQUE4Qjs7QUFFMUIsZ0NBQUlFLEtBQUtDLEdBQUwsTUFBY0gsYUFBYUcsR0FBYixDQUFsQixFQUFxQztBQUNqQyx1Q0FBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELCtCQUFPLElBQVA7QUFDSCxxQkFSTSxDQUFQO0FBU0gsaUIiLCJmaWxlIjoicmVzb3VyY2VzL2NvbnZlcnRlcnMvZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
