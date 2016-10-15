'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var SortValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('SortValueConverter', SortValueConverter = function () {
                function SortValueConverter() {
                    _classCallCheck(this, SortValueConverter);
                }

                SortValueConverter.prototype.toView = function toView(array, config) {
                    var factor = (config.direction || 'ascending') === 'ascending' ? 1 : -1;

                    return array.slice(0).sort(function (a, b) {
                        return (a[config.propertyName] - b[config.propertyName]) * factor;
                    });
                };

                return SortValueConverter;
            }());

            _export('SortValueConverter', SortValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL3NvcnQuanMiXSwibmFtZXMiOlsiU29ydFZhbHVlQ29udmVydGVyIiwidG9WaWV3IiwiYXJyYXkiLCJjb25maWciLCJmYWN0b3IiLCJkaXJlY3Rpb24iLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsInByb3BlcnR5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzswQ0FBYUEsa0I7Ozs7OzZDQUNUQyxNLG1CQUFPQyxLLEVBQU9DLE0sRUFBUTtBQUNsQix3QkFBSUMsU0FBUyxDQUFDRCxPQUFPRSxTQUFQLElBQW9CLFdBQXJCLE1BQXNDLFdBQXRDLEdBQW9ELENBQXBELEdBQXVELENBQUMsQ0FBckU7O0FBRUEsMkJBQU9ILE1BQ0pJLEtBREksQ0FDRSxDQURGLEVBRUpDLElBRkksQ0FFQyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUNaLCtCQUFPLENBQUNELEVBQUVMLE9BQU9PLFlBQVQsSUFBeUJELEVBQUVOLE9BQU9PLFlBQVQsQ0FBMUIsSUFBb0ROLE1BQTNEO0FBQ0gscUJBSkksQ0FBUDtBQUtILGlCIiwiZmlsZSI6InJlc291cmNlcy9jb252ZXJ0ZXJzL3NvcnQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
