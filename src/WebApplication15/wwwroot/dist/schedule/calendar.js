'use strict';

System.register(['aurelia-framework', 'jquery', 'moment', 'fullcalendar'], function (_export, _context) {
    "use strict";

    var inject, noView, bindable, bindingMode, customElement, BindingEngine, inlineView, $, moment, fullCalendar, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, calendar;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            noView = _aureliaFramework.noView;
            bindable = _aureliaFramework.bindable;
            bindingMode = _aureliaFramework.bindingMode;
            customElement = _aureliaFramework.customElement;
            BindingEngine = _aureliaFramework.BindingEngine;
            inlineView = _aureliaFramework.inlineView;
        }, function (_jquery) {
            $ = _jquery.default;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_fullcalendar) {
            fullCalendar = _fullcalendar.fullCalendar;
        }],
        execute: function () {
            _export('calendar', calendar = (_dec = customElement('calendar'), _dec2 = inlineView('<template><require from="fullcalendar/dist/fullcalendar.css"></require></template>'), _dec3 = inject(Element, BindingEngine), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
                function calendar(element, bindingEngine) {
                    var _this = this;

                    _classCallCheck(this, calendar);

                    _initDefineProp(this, 'weekends', _descriptor, this);

                    _initDefineProp(this, 'dayClick', _descriptor2, this);

                    _initDefineProp(this, 'eventClick', _descriptor3, this);

                    _initDefineProp(this, 'events', _descriptor4, this);

                    _initDefineProp(this, 'options', _descriptor5, this);

                    _initDefineProp(this, 'view', _descriptor6, this);

                    this.subscription = null;

                    this.element = element;
                    this.bindingEngine = bindingEngine;

                    this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe(function (splices) {
                        _this.eventListChanged(splices);
                    });
                }

                calendar.prototype.eventListChanged = function eventListChanged(splices) {
                    console.log('eventListChanged');
                    if (this.calendar) this.calendar.fullCalendar('refetchEvents');
                };

                calendar.prototype.dayClick = function dayClick(date, jsEvent, view) {
                    sessionStorage.setItem("NewMatchStartDate", date);
                };

                calendar.prototype.eventsChanged = function eventsChanged(newValue) {
                    var _this2 = this;

                    if (this.subscription !== null) {
                        this.subscription.dispose();
                    }
                    this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe(function (splices) {
                        _this2.eventListChanged(splices);
                    });
                    console.log('eventsChanged');
                    if (this.calendar) this.calendar.fullCalendar('refetchEvents');
                };

                calendar.prototype.attached = function attached() {
                    var _this3 = this;

                    this.calendar = $(this.element);
                    var eventSource = function eventSource(start, end, timezone, callback) {
                        callback(_this3.events);
                    };

                    var defaultValues = {
                        defaultView: this.view || 'week',

                        allDaySlot: false,
                        weekends: this.weekends,
                        firstDay: 1,
                        dayClick: function dayClick(date, jsEvent, view) {
                            return _this3.dayClick(date, jsEvent, view);
                        },
                        eventClick: function eventClick(event) {
                            return _this3.eventClick(event);
                        },
                        events: eventSource
                    };

                    console.log(this.calendar.fullCalendar);
                    this.calendar.fullCalendar(Object.assign(defaultValues, this.options));
                };

                return calendar;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'weekends', [bindable], {
                enumerable: true,
                initializer: function initializer() {
                    return true;
                }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dayClick', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'eventClick', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'events', [bindable], {
                enumerable: true,
                initializer: function initializer() {
                    return [];
                }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'options', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'view', [bindable], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class) || _class));

            _export('calendar', calendar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIm5vVmlldyIsImJpbmRhYmxlIiwiYmluZGluZ01vZGUiLCJjdXN0b21FbGVtZW50IiwiQmluZGluZ0VuZ2luZSIsImlubGluZVZpZXciLCIkIiwibW9tZW50IiwiZnVsbENhbGVuZGFyIiwiY2FsZW5kYXIiLCJFbGVtZW50IiwiZWxlbWVudCIsImJpbmRpbmdFbmdpbmUiLCJzdWJzY3JpcHRpb24iLCJjb2xsZWN0aW9uT2JzZXJ2ZXIiLCJldmVudHMiLCJzdWJzY3JpYmUiLCJzcGxpY2VzIiwiZXZlbnRMaXN0Q2hhbmdlZCIsImNvbnNvbGUiLCJsb2ciLCJkYXlDbGljayIsImRhdGUiLCJqc0V2ZW50IiwidmlldyIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsImV2ZW50c0NoYW5nZWQiLCJuZXdWYWx1ZSIsImRpc3Bvc2UiLCJhdHRhY2hlZCIsImV2ZW50U291cmNlIiwic3RhcnQiLCJlbmQiLCJ0aW1lem9uZSIsImNhbGxiYWNrIiwiZGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaWV3IiwiYWxsRGF5U2xvdCIsIndlZWtlbmRzIiwiZmlyc3REYXkiLCJldmVudENsaWNrIiwiZXZlbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0VBLGtCLHFCQUFBQSxNO0FBQVFDLGtCLHFCQUFBQSxNO0FBQVFDLG9CLHFCQUFBQSxRO0FBQVVDLHVCLHFCQUFBQSxXO0FBQzFCQyx5QixxQkFBQUEsYTtBQUFlQyx5QixxQkFBQUEsYTtBQUFlQyxzQixxQkFBQUEsVTs7QUFHekJDLGE7O0FBQ0FDLGtCOztBQUNDQyx3QixpQkFBQUEsWTs7O2dDQUtLQyxRLFdBSFpOLGNBQWMsVUFBZCxDLFVBQ0FFLFdBQVcsb0ZBQVgsQyxVQUNBTixPQUFPVyxPQUFQLEVB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
