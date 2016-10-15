"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var BlobToUrlValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("BlobToUrlValueConverter", BlobToUrlValueConverter = function () {
                function BlobToUrlValueConverter() {
                    _classCallCheck(this, BlobToUrlValueConverter);
                }

                BlobToUrlValueConverter.prototype.toView = function toView(blob) {
                    return URL.createObjectURL(blob);
                };

                return BlobToUrlValueConverter;
            }());

            _export("BlobToUrlValueConverter", BlobToUrlValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2Jsb2ItdG8tdXJsLmpzIl0sIm5hbWVzIjpbIkJsb2JUb1VybFZhbHVlQ29udmVydGVyIiwidG9WaWV3IiwiYmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FBYUEsdUI7Ozs7O2tEQUNUQyxNLG1CQUFPQyxJLEVBQU07QUFDVCwyQkFBT0MsSUFBSUMsZUFBSixDQUFvQkYsSUFBcEIsQ0FBUDtBQUNILGlCIiwiZmlsZSI6InJlc291cmNlcy9jb252ZXJ0ZXJzL2Jsb2ItdG8tdXJsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
