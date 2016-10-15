"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var GroupByValueConverter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("GroupByValueConverter", GroupByValueConverter = function () {
                function GroupByValueConverter() {
                    _classCallCheck(this, GroupByValueConverter);
                }

                GroupByValueConverter.prototype.toView = function toView(array, groupBy) {

                    var groups = {};

                    array.forEach(function (o) {
                        var group = o[groupBy];
                        groups[group] = groups[group] || [];
                        groups[group].push(o);
                    });

                    return Object.keys(groups).map(function (group) {
                        return {
                            group: group,
                            values: groups[group]
                        };
                    });
                };

                return GroupByValueConverter;
            }());

            _export("GroupByValueConverter", GroupByValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jb252ZXJ0ZXJzL2dyb3VwLWJ5LmpzIl0sIm5hbWVzIjpbIkdyb3VwQnlWYWx1ZUNvbnZlcnRlciIsInRvVmlldyIsImFycmF5IiwiZ3JvdXBCeSIsImdyb3VwcyIsImZvckVhY2giLCJvIiwiZ3JvdXAiLCJwdXNoIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsInZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs2Q0FBYUEscUI7Ozs7O2dEQUNUQyxNLG1CQUFPQyxLLEVBQU9DLE8sRUFBUzs7QUFFbkIsd0JBQUlDLFNBQVMsRUFBYjs7QUFFQUYsMEJBQU1HLE9BQU4sQ0FBYyxVQUFVQyxDQUFWLEVBQWE7QUFDdkIsNEJBQUlDLFFBQVFELEVBQUVILE9BQUYsQ0FBWjtBQUNBQywrQkFBT0csS0FBUCxJQUFnQkgsT0FBT0csS0FBUCxLQUFpQixFQUFqQztBQUNBSCwrQkFBT0csS0FBUCxFQUFjQyxJQUFkLENBQW1CRixDQUFuQjtBQUNILHFCQUpEOztBQU1BLDJCQUFPRyxPQUFPQyxJQUFQLENBQVlOLE1BQVosRUFBb0JPLEdBQXBCLENBQXdCLFVBQVVKLEtBQVYsRUFBaUI7QUFDNUMsK0JBQU87QUFDSEEsbUNBQU9BLEtBREo7QUFFSEssb0NBQVFSLE9BQU9HLEtBQVA7QUFGTCx5QkFBUDtBQUlILHFCQUxNLENBQVA7QUFNSCxpQiIsImZpbGUiOiJyZXNvdXJjZXMvY29udmVydGVycy9ncm91cC1ieS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
