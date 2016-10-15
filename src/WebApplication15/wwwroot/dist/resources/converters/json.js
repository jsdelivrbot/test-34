"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var JsonValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("JsonValueConverter", JsonValueConverter = function () {
                function JsonValueConverter() {
                    _classCallCheck(this, JsonValueConverter);
                }

                JsonValueConverter.prototype.toView = function toView(value) {
                    return JSON.stringify(value, null, "\t");
                };

                return JsonValueConverter;
            }());

            _export("JsonValueConverter", JsonValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2pzb24uanMiXSwibmFtZXMiOlsiSnNvblZhbHVlQ29udmVydGVyIiwidG9WaWV3IiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzBDQUFhQSxrQjs7Ozs7NkNBQ1RDLE0sbUJBQU9DLEssRUFBTTtBQUNULDJCQUFPQyxLQUFLQyxTQUFMLENBQWVGLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNILGlCIiwiZmlsZSI6InJlc291cmNlcy9jb252ZXJ0ZXJzL2pzb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
