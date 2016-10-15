"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var ObjectKeysValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("ObjectKeysValueConverter", ObjectKeysValueConverter = function () {
                function ObjectKeysValueConverter() {
                    _classCallCheck(this, ObjectKeysValueConverter);
                }

                ObjectKeysValueConverter.prototype.toView = function toView(obj) {
                    var temp = [];

                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            temp.push(obj[prop]);
                        }
                    }

                    return temp;
                };

                return ObjectKeysValueConverter;
            }());

            _export("ObjectKeysValueConverter", ObjectKeysValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL29iamVjdC1rZXlzLmpzIl0sIm5hbWVzIjpbIk9iamVjdEtleXNWYWx1ZUNvbnZlcnRlciIsInRvVmlldyIsIm9iaiIsInRlbXAiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2dEQUFhQSx3Qjs7Ozs7bURBQ1RDLE0sbUJBQU9DLEcsRUFBSztBQUVSLHdCQUFJQyxPQUFPLEVBQVg7O0FBSUEseUJBQUssSUFBSUMsSUFBVCxJQUFpQkYsR0FBakIsRUFBc0I7QUFDbEIsNEJBQUlBLElBQUlHLGNBQUosQ0FBbUJELElBQW5CLENBQUosRUFBOEI7QUFDMUJELGlDQUFLRyxJQUFMLENBQVVKLElBQUlFLElBQUosQ0FBVjtBQUNIO0FBQ0o7O0FBRUQsMkJBQU9ELElBQVA7QUFDSCxpQiIsImZpbGUiOiJyZXNvdXJjZXMvY29udmVydGVycy9vYmplY3Qta2V5cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
