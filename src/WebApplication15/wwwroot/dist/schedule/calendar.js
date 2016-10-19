'use strict';

System.register(['aurelia-framework', 'jquery', 'moment', 'fullcalendar'], function (_export, _context) {
    "use strict";

    var inject, noView, bindable, bindingMode, customElement, BindingEngine, inlineView, $, moment, fullCalendar, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, calendar;

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

                    _initDefineProp(this, 'dayClick', _descriptor, this);

                    _initDefineProp(this, 'eventClick', _descriptor2, this);

                    _initDefineProp(this, 'events', _descriptor3, this);

                    _initDefineProp(this, 'options', _descriptor4, this);

                    _initDefineProp(this, 'view', _descriptor5, this);

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

                calendar.prototype.isPast = function isPast(date) {
                    var today = moment().format();
                    return moment(today).isAfter(date);
                };

                calendar.prototype.attached = function attached() {
                    var _this3 = this;

                    this.calendar = $(this.element);

                    var defaultOptions = {
                        defaultView: this.view || 'agendaWeek',
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek'
                        },
                        theme: false,
                        allDaySlot: false,
                        weekends: true,
                        firstDay: 1,
                        dayClick: function dayClick(date, jsEvent, view) {
                            return _this3.dayClick(date, jsEvent, view);
                        },
                        eventClick: function eventClick(event) {
                            return _this3.eventClick(event);
                        },
                        events: function events(start, end, timezone, callback) {

                            var data = _this3.events.map(function (event) {
                                event.editable = !_this3.isPast(event.start);
                                console.log(event);
                                return event;
                            });
                            if (data) {
                                console.log('hi');
                                console.log(callback);

                                callback(_this3.events);
                            }
                        },

                        editable: true,
                        handleWindowResize: true,

                        minTime: '07:30:00',
                        maxTime: '15:00:00',
                        columnFormat: {
                            week: 'ddd' },
                        displayEventTime: false,
                        allDayText: 'Online/TBD'
                    };

                    this.calendar.fullCalendar(Object.assign(defaultOptions, this.options));
                };

                return calendar;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dayClick', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'eventClick', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'events', [bindable], {
                enumerable: true,
                initializer: function initializer() {
                    return [];
                }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'options', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'view', [bindable], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class) || _class));

            _export('calendar', calendar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIm5vVmlldyIsImJpbmRhYmxlIiwiYmluZGluZ01vZGUiLCJjdXN0b21FbGVtZW50IiwiQmluZGluZ0VuZ2luZSIsImlubGluZVZpZXciLCIkIiwibW9tZW50IiwiZnVsbENhbGVuZGFyIiwiY2FsZW5kYXIiLCJFbGVtZW50IiwiZWxlbWVudCIsImJpbmRpbmdFbmdpbmUiLCJzdWJzY3JpcHRpb24iLCJjb2xsZWN0aW9uT2JzZXJ2ZXIiLCJldmVudHMiLCJzdWJzY3JpYmUiLCJzcGxpY2VzIiwiZXZlbnRMaXN0Q2hhbmdlZCIsImNvbnNvbGUiLCJsb2ciLCJkYXlDbGljayIsImRhdGUiLCJqc0V2ZW50IiwidmlldyIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsImV2ZW50c0NoYW5nZWQiLCJuZXdWYWx1ZSIsImRpc3Bvc2UiLCJpc1Bhc3QiLCJ0b2RheSIsImZvcm1hdCIsImlzQWZ0ZXIiLCJhdHRhY2hlZCIsImRlZmF1bHRPcHRpb25zIiwiZGVmYXVsdFZpZXciLCJoZWFkZXIiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJ0aGVtZSIsImFsbERheVNsb3QiLCJ3ZWVrZW5kcyIsImZpcnN0RGF5IiwiZXZlbnRDbGljayIsImV2ZW50Iiwic3RhcnQiLCJlbmQiLCJ0aW1lem9uZSIsImNhbGxiYWNrIiwiZGF0YSIsIm1hcCIsImVkaXRhYmxlIiwiaGFuZGxlV2luZG93UmVzaXplIiwibWluVGltZSIsIm1heFRpbWUiLCJjb2x1bW5Gb3JtYXQiLCJ3ZWVrIiwiZGlzcGxheUV2ZW50VGltZSIsImFsbERheVRleHQiLCJPYmplY3QiLCJhc3NpZ24iLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0VBLGtCLHFCQUFBQSxNO0FBQVFDLGtCLHFCQUFBQSxNO0FBQVFDLG9CLHFCQUFB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
