'use strict';

System.register(['bootstrap', 'aurelia-framework', 'aurelia-router', 'app.router.config', 'aurelia-authentication', 'services/session', 'services/dataservices/manage-user-service', 'authConfig', 'toastr', 'jquery'], function (_export, _context) {
    "use strict";

    var inject, Router, AppRouterConfig, FetchConfig, Session, ManageUserService, AuthService, authConfig, log, $, _createClass, _dec, _class, App;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_bootstrap) {}, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_appRouterConfig) {
            AppRouterConfig = _appRouterConfig.default;
        }, function (_aureliaAuthentication) {
            FetchConfig = _aureliaAuthentication.FetchConfig;
            AuthService = _aureliaAuthentication.AuthService;
        }, function (_servicesSession) {
            Session = _servicesSession.Session;
        }, function (_servicesDataservicesManageUserService) {
            ManageUserService = _servicesDataservicesManageUserService.ManageUserService;
        }, function (_authConfig) {
            authConfig = _authConfig;
        }, function (_toastr) {
            log = _toastr;
        }, function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('App', App = (_dec = inject(Session, AuthService, Router, FetchConfig, AppRouterConfig, ManageUserService), _dec(_class = function () {
                function App(session, auth, router, fetchConfig, appRouterConfig, manage) {
                    _classCallCheck(this, App);

                    this.FifteenMins = 60000 * 15;
                    this.FiveMins = 60000 * 5;
                    this.TwoMins = 60000 * 2;
                    this.OneMin = 60000;
                    this.loginSelected = false;

                    this.auth = auth;
                    this.router = router;
                    this.fetchConfig = fetchConfig;
                    this.appRouterConfig = appRouterConfig;
                    this.manage = manage;
                    this.session = session;
                    this.currentUser = this.getCurrentUser();
                }

                App.prototype.getCurrentUser = function getCurrentUser() {

                    try {

                        var token = localStorage.getItem('aurelia_authentication');
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

                        this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

                        return this.currentUser;
                    } catch (error) {}
                };

                App.prototype.activate = function activate() {
                    this.fetchConfig.configure();
                    this.appRouterConfig.configure();
                    this.loginSelected = false;

                    var self = this;

                    this.setupUtilJS();
                };

                App.prototype.setupUtilJS = function setupUtilJS() {
                    $.fn.navList = function () {};

                    $.fn.panel = function (userConfig) {
                        if (this.length == 0) return $this;

                        if (this.length > 1) {

                            for (var i = 0; i < this.length; i++) {
                                $(this[i]).panel(userConfig);
                            }return $this;
                        }

                        var $this = $(this),
                            $body = $('body'),
                            $window = $(window),
                            id = $this.attr('id'),
                            config;

                        config = $.extend({
                            delay: 0,

                            hideOnClick: false,

                            hideOnEscape: false,

                            hideOnSwipe: false,

                            resetScroll: false,

                            resetForms: false,

                            side: null,

                            target: $this,

                            visibleClass: 'visible'

                        }, userConfig);

                        if (typeof config.target != 'jQuery') config.target = $(config.target);

                        $this._hide = function (event) {
                            if (!config.target.hasClass(config.visibleClass)) return;

                            if (event) {

                                event.preventDefault();
                                event.stopPropagation();
                            }

                            config.target.removeClass(config.visibleClass);

                            window.setTimeout(function () {
                                if (config.resetScroll) $this.scrollTop(0);

                                if (config.resetForms) $this.find('form').each(function () {
                                    this.reset();
                                });
                            }, config.delay);
                        };

                        $this.css('-ms-overflow-style', '-ms-autohiding-scrollbar').css('-webkit-overflow-scrolling', 'touch');

                        if (config.hideOnClick) {

                            $this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

                            $this.on('click', 'a', function (event) {

                                var $a = $(this),
                                    href = $a.attr('href'),
                                    target = $a.attr('target');

                                if (!href || href == '#' || href == '' || href == '#' + id) return;

                                event.preventDefault();
                                event.stopPropagation();

                                $this._hide();

                                window.setTimeout(function () {

                                    if (target == '_blank') window.open(href);else window.location.href = href;
                                }, config.delay + 10);
                            });
                        }

                        $this.on('touchstart', function (event) {

                            $this.touchPosX = event.originalEvent.touches[0].pageX;
                            $this.touchPosY = event.originalEvent.touches[0].pageY;
                        });

                        $this.on('touchmove', function (event) {

                            if ($this.touchPosX === null || $this.touchPosY === null) return;

                            var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
                                diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
                                th = $this.outerHeight(),
                                ts = $this.get(0).scrollHeight - $this.scrollTop();

                            if (config.hideOnSwipe) {

                                var result = false,
                                    boundary = 20,
                                    delta = 50;

                                switch (config.side) {

                                    case 'left':
                                        result = diffY < boundary && diffY > -1 * boundary && diffX > delta;
                                        break;

                                    case 'right':
                                        result = diffY < boundary && diffY > -1 * boundary && diffX < -1 * delta;
                                        break;

                                    case 'top':
                                        result = diffX < boundary && diffX > -1 * boundary && diffY > delta;
                                        break;

                                    case 'bottom':
                                        result = diffX < boundary && diffX > -1 * boundary && diffY < -1 * delta;
                                        break;

                                    default:
                                        break;

                                }

                                if (result) {

                                    $this.touchPosX = null;
                                    $this.touchPosY = null;
                                    $this._hide();

                                    return false;
                                }
                            }

                            if ($this.scrollTop() < 0 && diffY < 0 || ts > th - 2 && ts < th + 2 && diffY > 0) {

                                event.preventDefault();
                                event.stopPropagation();
                            }
                        });

                        $this.on('click touchend touchstart touchmove', function (event) {
                            event.stopPropagation();
                        });

                        $this.on('click', 'a[href="#' + id + '"]', function (event) {

                            event.preventDefault();
                            event.stopPropagation();

                            config.target.removeClass(config.visibleClass);
                        });

                        $body.on('click touchend', function (event) {
                            $this._hide(event);
                        });

                        $body.on('click', 'a[href="#' + id + '"]', function (event) {

                            event.preventDefault();
                            event.stopPropagation();

                            config.target.toggleClass(config.visibleClass);
                        });

                        if (config.hideOnEscape) $window.on('keydown', function (event) {

                            if (event.keyCode == 27) $this._hide(event);
                        });

                        return $this;
                    };

                    $.fn.placeholder = function () {
                        if (typeof document.createElement('input').placeholder != 'undefined') return $(this);

                        if (this.length == 0) return $this;

                        if (this.length > 1) {

                            for (var i = 0; i < this.length; i++) {
                                $(this[i]).placeholder();
                            }return $this;
                        }

                        var $this = $(this);

                        $this.find('input[type=text],textarea').each(function () {

                            var i = $(this);

                            if (i.val() == '' || i.val() == i.attr('placeholder')) i.addClass('polyfill-placeholder').val(i.attr('placeholder'));
                        }).on('blur', function () {

                            var i = $(this);

                            if (i.attr('name').match(/-polyfill-field$/)) return;

                            if (i.val() == '') i.addClass('polyfill-placeholder').val(i.attr('placeholder'));
                        }).on('focus', function () {

                            var i = $(this);

                            if (i.attr('name').match(/-polyfill-field$/)) return;

                            if (i.val() == i.attr('placeholder')) i.removeClass('polyfill-placeholder').val('');
                        });

                        $this.find('input[type=password]').each(function () {

                            var i = $(this);
                            var x = $($('<div>').append(i.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));

                            if (i.attr('id') != '') x.attr('id', i.attr('id') + '-polyfill-field');

                            if (i.attr('name') != '') x.attr('name', i.attr('name') + '-polyfill-field');

                            x.addClass('polyfill-placeholder').val(x.attr('placeholder')).insertAfter(i);

                            if (i.val() == '') i.hide();else x.hide();

                            i.on('blur', function (event) {

                                event.preventDefault();

                                var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

                                if (i.val() == '') {

                                    i.hide();
                                    x.show();
                                }
                            });

                            x.on('focus', function (event) {

                                event.preventDefault();

                                var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

                                x.hide();

                                i.show().focus();
                            }).on('keypress', function (event) {

                                event.preventDefault();
                                x.val('');
                            });
                        });

                        $this.on('submit', function () {

                            $this.find('input[type=text],input[type=password],textarea').each(function (event) {

                                var i = $(this);

                                if (i.attr('name').match(/-polyfill-field$/)) i.attr('name', '');

                                if (i.val() == i.attr('placeholder')) {

                                    i.removeClass('polyfill-placeholder');
                                    i.val('');
                                }
                            });
                        }).on('reset', function (event) {

                            event.preventDefault();

                            $this.find('select').val($('option:first').val());

                            $this.find('input,textarea').each(function () {

                                var i = $(this),
                                    x;

                                i.removeClass('polyfill-placeholder');

                                switch (this.type) {

                                    case 'submit':
                                    case 'reset':
                                        break;

                                    case 'password':
                                        i.val(i.attr('defaultValue'));

                                        x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

                                        if (i.val() == '') {
                                            i.hide();
                                            x.show();
                                        } else {
                                            i.show();
                                            x.hide();
                                        }

                                        break;

                                    case 'checkbox':
                                    case 'radio':
                                        i.attr('checked', i.attr('defaultValue'));
                                        break;

                                    case 'text':
                                    case 'textarea':
                                        i.val(i.attr('defaultValue'));

                                        if (i.val() == '') {
                                            i.addClass('polyfill-placeholder');
                                            i.val(i.attr('placeholder'));
                                        }

                                        break;

                                    default:
                                        i.val(i.attr('defaultValue'));
                                        break;

                                }
                            });
                        });

                        return $this;
                    };

                    $.prioritize = function ($elements, condition) {

                        var key = '__prioritize';

                        if (typeof $elements != 'jQuery') $elements = $($elements);

                        $elements.each(function () {

                            var $e = $(this),
                                $p,
                                $parent = $e.parent();

                            if ($parent.length == 0) return;

                            if (!$e.data(key)) {
                                if (!condition) return;

                                $p = $e.prev();

                                if ($p.length == 0) return;

                                $e.prependTo($parent);

                                $e.data(key, $p);
                            } else {
                                    if (condition) return;

                                    $p = $e.data(key);

                                    $e.insertAfter($p);

                                    $e.removeData(key);
                                }
                        });
                    };
                };

                App.prototype.loginRequest = function loginRequest() {

                    this.loginSelected = true;
                };

                _createClass(App, [{
                    key: 'isAuthenticated',
                    get: function get() {
                        return this.auth.isAuthenticated();
                    }
                }]);

                return App;
            }()) || _class));

            _export('App', App);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJSb3V0ZXIiLCJBcHBSb3V0ZXJDb25maWciLCJGZXRjaENvbmZpZyIsIkF1dGhTZXJ2aWNlIiwiU2Vzc2lvbiIsIk1hbmFnZVVzZXJTZXJ2aWNlIiwiYXV0aENvbmZpZyIsImxvZyIsIiQiLCJBcHAiLCJzZXNzaW9uIiwiYXV0aCIsInJvdXRlciIsImZldGNoQ29uZmlnIiwiYXBwUm91dGVyQ29uZmlnIiwibWFuYWdlIiwiRmlmdGVlbk1pbnMiLCJGaXZlTWlucyIsIlR3b01pbnMiLCJPbmVNaW4iLCJsb2dpblNlbGVjdGVkIiwiY3VycmVudFVzZXIiLCJnZXRDdXJyZW50VXNlciIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImJhc2U2NFVybCIsInNwbGl0IiwiYmFzZTY0IiwicmVwbGFjZSIsIkpTT04iLCJwYXJzZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIndpbmRvdyIsImF0b2IiLCJlcnJvciIsImFjdGl2YXRlIiwiY29uZmlndXJlIiwic2VsZiIsInNldHVwVXRpbEpTIiwiZm4iLCJuYXZMaXN0IiwicGFuZWwiLCJ1c2VyQ29uZmlnIiwibGVuZ3RoIiwiJHRoaXMiLCJpIiwiJGJvZHkiLCIkd2luZG93IiwiaWQiLCJhdHRyIiwiY29uZmlnIiwiZXh0ZW5kIiwiZGVsYXkiLCJoaWRlT25DbGljayIsImhpZGVPbkVzY2FwZSIsImhpZGVPblN3aXBlIiwicmVzZXRTY3JvbGwiLCJyZXNldEZvcm1zIiwic2lkZSIsInRhcmdldCIsInZpc2libGVDbGFzcyIsIl9oaWRlIiwiZXZlbnQiLCJoYXNDbGFzcyIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xhc3MiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsVG9wIiwiZmluZCIsImVhY2giLCJyZXNldCIsImNzcyIsIm9uIiwiJGEiLCJocmVmIiwib3BlbiIsImxvY2F0aW9uIiwidG91Y2hQb3NYIiwib3JpZ2luYWxFdmVudCIsInRvdWNoZXMiLCJwYWdlWCIsInRvdWNoUG9zWSIsInBhZ2VZIiwiZGlmZlgiLCJkaWZmWSIsInRoIiwib3V0ZXJIZWlnaHQiLCJ0cyIsImdldCIsInNjcm9sbEhlaWdodCIsInJlc3VsdCIsImJvdW5kYXJ5IiwiZGVsdGEiLCJ0b2dnbGVDbGFzcyIsImtleUNvZGUiLCJwbGFjZWhvbGRlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbCIsImFkZENsYXNzIiwibWF0Y2giLCJ4IiwiYXBwZW5kIiwiY2xvbmUiLCJyZW1vdmUiLCJodG1sIiwiaW5zZXJ0QWZ0ZXIiLCJoaWRlIiwicGFyZW50Iiwic2hvdyIsImZvY3VzIiwidHlwZSIsInByaW9yaXRpemUiLCIkZWxlbWVudHMiLCJjb25kaXRpb24iLCJrZXkiLCIkZSIsIiRwIiwiJHBhcmVudCIsImRhdGEiLCJwcmV2IiwicHJlcGVuZFRvIiwicmVtb3ZlRGF0YSIsImxvZ2luUmVxdWVzdCIsImlzQXV0aGVudGljYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ1FBLGtCLHFCQUFBQSxNOztBQUNBQyxrQixrQkFBQUEsTTs7QUFDREMsMkI7O0FBQ0NDLHVCLDBCQUFBQSxXO0FBR0FDLHVCLDBCQUFBQSxXOztBQUZBQyxtQixvQkFBQUEsTzs7QUFDQUMsNkIsMENBQUFBLGlCOztBQUVJQyxzQjs7QUFDQUMsZTs7QUFDTEMsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQUdNQyxHLFdBRFpWLE9BQU9LLE9BQVAsRUFBZ0JELFdBQWhCLEVBQTZCSCxNQUE3QixFQUFxQ0UsV0FBckMsRUFBa0RELGVBQWxELEVBQW1FSSxpQkFBbkUsQztBQVVHLDZCQUFZSyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQkMsTUFBM0IsRUFBbUNDLFdBQW5DLEVBQWdEQyxlQUFoRCxFQUFpRUMsTUFBakUsRUFBd0U7QUFBQTs7QUFBQSx5QkFQeEVDLFdBT3dFLEdBUDFELFFBQU0sRUFPb0Q7QUFBQSx5QkFOeEVDLFFBTXdFLEdB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bUI7QUFDZnRELDhDQUFFdUQsUUFBRixDQUFXLHNCQUFYO0FBQ0F2RCw4Q0FBRXNELEdBQUYsQ0FBTXRELEVBQUVJLElBQUYsQ0FBTyxhQUFQLENBQU47QUFDSDs7QUFFRDs7QUFFSjtBQUNJSiwwQ0FBRXNELEdBQUYsQ0FBTXRELEVBQUVJLElBQUYsQ0FBTyxjQUFQLENBQU47QUFDQTs7QUF4Q1I7QUEyQ0gsNkJBbkRDO0FBcURILHlCQWpGTzs7QUFtRkEsK0JBQU9MLEtBQVA7QUFFSCxxQkF4TkQ7O0FBK05BdEMsc0JBQUUyRyxVQUFGLEdBQWUsVUFBU0MsU0FBVCxFQUFvQkMsU0FBcEIsRUFBK0I7O0FBRTFDLDRCQUFJQyxNQUFNLGNBQVY7O0FBR0EsNEJBQUksT0FBT0YsU0FBUCxJQUFvQixRQUF4QixFQUNJQSxZQUFZNUcsRUFBRTRHLFNBQUYsQ0FBWjs7QUFHSkEsa0NBQVU1QyxJQUFWLENBQWUsWUFBVzs7QUFFdEIsZ0NBQUkrQyxLQUFLL0csRUFBRSxJQUFGLENBQVQ7QUFBQSxnQ0FBa0JnSCxFQUFsQjtBQUFBLGdDQUNYQyxVQUFVRixHQUFHUixNQUFILEVBREM7O0FBSUEsZ0NBQUlVLFFBQVE1RSxNQUFSLElBQWtCLENBQXRCLEVBQ0k7O0FBR0osZ0NBQUksQ0FBQzBFLEdBQUdHLElBQUgsQ0FBUUosR0FBUixDQUFMLEVBQW1CO0FBR2Ysb0NBQUksQ0FBQ0QsU0FBTCxFQUNJOztBQUdKRyxxQ0FBS0QsR0FBR0ksSUFBSCxFQUFMOztBQUdBLG9DQUFJSCxHQUFHM0UsTUFBSCxJQUFhLENBQWpCLEVBQ0k7O0FBR0owRSxtQ0FBR0ssU0FBSCxDQUFhSCxPQUFiOztBQUdBRixtQ0FBR0csSUFBSCxDQUFRSixHQUFSLEVBQWFFLEVBQWI7QUFFSCw2QkFuQkQsTUFzQks7QUFHRCx3Q0FBSUgsU0FBSixFQUNJOztBQUVKRyx5Q0FBS0QsR0FBR0csSUFBSCxDQUFRSixHQUFSLENBQUw7O0FBR0FDLHVDQUFHVixXQUFILENBQWVXLEVBQWY7O0FBR0FELHVDQUFHTSxVQUFILENBQWNQLEdBQWQ7QUFFSDtBQUVKLHlCQWhERDtBQWtESCxxQkEzREQ7QUE0REgsaUI7OzhCQUNEUSxZLDJCQUFjOztBQUVWLHlCQUFLMUcsYUFBTCxHQUFxQixJQUFyQjtBQUNILGlCOzs7O3dDQXBtQm9CO0FBQ2pCLCtCQUFPLEtBQUtULElBQUwsQ0FBVW9ILGVBQVYsRUFBUDtBQUNIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
