'use strict';

System.register(['toastr'], function (_export, _context) {
    "use strict";

    var log;
    function configure(aurelia) {
        log.options.timeOut = 4000;
        log.options.positionClass = 'toast-bottom-right';
    }

    _export('configure', configure);

    return {
        setters: [function (_toastr) {
            log = _toastr;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3MvaW5kZXguanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsImxvZyIsIm9wdGlvbnMiLCJ0aW1lT3V0IiwicG9zaXRpb25DbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFHL0JDLFlBQUlDLE9BQUosQ0FBWUMsT0FBWixHQUFzQixJQUF0QjtBQUNBRixZQUFJQyxPQUFKLENBQVlFLGFBQVosR0FBNEIsb0JBQTVCO0FBR0g7O3lCQVBlTCxTOzs7O0FBRkpFLGUiLCJmaWxlIjoiY29uZmlncy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
