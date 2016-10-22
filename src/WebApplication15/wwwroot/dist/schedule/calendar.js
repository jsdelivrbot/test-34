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
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        allDaySlot: false,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIm5vVmlldyIsImJpbmRhYmxlIiwiYmluZGluZ01vZGUiLCJjdXN0b21FbGVtZW50IiwiQmluZGluZ0VuZ2luZSIsImlubGluZVZpZXciLCIkIiwibW9tZW50IiwiZnVsbENhbGVuZGFyIiwiY2FsZW5kYXIiLCJFbGVtZW50IiwiZWxlbWVudCIsImJpbmRpbmdFbmdpbmUiLCJzdWJzY3JpcHRpb24iLCJjb2xsZWN0aW9uT2JzZXJ2ZXIiLCJldmVudHMiLCJzdWJzY3JpYmUiLCJzcGxpY2VzIiwiZXZlbnRMaXN0Q2hhbmdlZCIsImNvbnNvbGUiLCJsb2ciLCJldmVudHNDaGFuZ2VkIiwibmV3VmFsdWUiLCJkaXNwb3NlIiwiYXR0YWNoZWQiLCJldmVudFNvdXJjZSIsInN0YXJ0IiwiZW5kIiwidGltZXpvbmUiLCJjYWxsYmFjayIsImRlZmF1bHRWYWx1ZXMiLCJkZWZhdWx0VmlldyIsInZpZXciLCJoZWFkZXIiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJhbGxEYXlTbG90IiwiZmlyc3REYXkiLCJkYXlDbGljayIsImRhdGUiLCJqc0V2ZW50IiwiZXZlbnRDbGljayIsImV2ZW50IiwiT2JqZWN0IiwiYXNzaWduIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFQSxrQixxQkFBQUEsTTtBQUFRQyxrQixxQkFBQUEsTTtBQUFRQyxvQixxQkFBQUEsUTtBQUFVQyx1QixxQkFBQUEsVztBQUMxQkMseUIscUJBQUFBLGE7QUFBZUMseUIscUJBQUFBLGE7QUFBZUMsc0IscUJBQUFBLFU7O0FBR3pCQyxhOztBQUNBQyxrQjs7QUFDQ0Msd0IsaUJBQUFBLFk7OztnQ0FLS0MsUSxXQUhaTixjQUFjLFVBQWQsQyxVQUNBRSxXQUFXLG9GQUFYLEMsVUFDQU4sT0FBT1csT0FBUCxFQUFnQk4s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
