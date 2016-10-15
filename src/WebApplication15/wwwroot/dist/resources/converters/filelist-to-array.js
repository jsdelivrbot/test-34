"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var FileListToArrayValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("FileListToArrayValueConverter", FileListToArrayValueConverter = function () {
                function FileListToArrayValueConverter() {
                    _classCallCheck(this, FileListToArrayValueConverter);
                }

                FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
                    var files = [];
                    if (!fileList) {
                        return files;
                    }
                    for (var i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                    }
                    return files;
                };

                return FileListToArrayValueConverter;
            }());

            _export("FileListToArrayValueConverter", FileListToArrayValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2ZpbGVsaXN0LXRvLWFycmF5LmpzIl0sIm5hbWVzIjpbIkZpbGVMaXN0VG9BcnJheVZhbHVlQ29udmVydGVyIiwidG9WaWV3IiwiZmlsZUxpc3QiLCJmaWxlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxREFBYUEsNkI7Ozs7O3dEQUNUQyxNLG1CQUFPQyxRLEVBQVU7QUFDYix3QkFBSUMsUUFBUSxFQUFaO0FBQ0Esd0JBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ1gsK0JBQU9DLEtBQVA7QUFDSDtBQUNELHlCQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFJRixTQUFTRyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckNELDhCQUFNRyxJQUFOLENBQVdKLFNBQVNLLElBQVQsQ0FBY0gsQ0FBZCxDQUFYO0FBQ0g7QUFDRCwyQkFBT0QsS0FBUDtBQUNILGlCIiwiZmlsZSI6InJlc291cmNlcy9jb252ZXJ0ZXJzL2ZpbGVsaXN0LXRvLWFycmF5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
