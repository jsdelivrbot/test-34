'use strict';

System.register(['bootstrap', 'aurelia-framework', 'aurelia-router', 'app.router.config', 'aurelia-authentication', 'services/session', 'services/dataservices/manage-user-service', 'authConfig', 'toastr', 'jquery', 'moment'], function (_export, _context) {
    "use strict";

    var inject, Router, AppRouterConfig, FetchConfig, Session, ManageUserService, AuthService, authConfig, log, $, moment, _createClass, _dec, _class, App;

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
        }, function (_moment) {
            moment = _moment.default;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJSb3V0ZXIiLCJBcHBSb3V0ZXJDb25maWciLCJGZXRjaENvbmZpZyIsIkF1dGhTZXJ2aWNlIiwiU2Vzc2lvbiIsIk1hbmFnZVVzZXJTZXJ2aWNlIiwiYXV0aENvbmZpZyIsImxvZyIsIiQiLCJtb21lbnQiLCJBcHAiLCJzZXNzaW9uIiwiYXV0aCIsInJvdXRlciIsImZldGNoQ29uZmlnIiwiYXBwUm91dGVyQ29uZmlnIiwibWFuYWdlIiwiRmlmdGVlbk1pbnMiLCJGaXZlTWlucyIsIlR3b01pbnMiLCJPbmVNaW4iLCJsb2dpblNlbGVjdGVkIiwiY3VycmVudFVzZXIiLCJnZXRDdXJyZW50VXNlciIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImJhc2U2NFVybCIsInNwbGl0IiwiYmFzZTY0IiwicmVwbGFjZSIsIkpTT04iLCJwYXJzZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIndpbmRvdyIsImF0b2IiLCJlcnJvciIsImFjdGl2YXRlIiwiY29uZmlndXJlIiwic2VsZiIsInNldHVwVXRpbEpTIiwiZm4iLCJuYXZMaXN0IiwicGFuZWwiLCJ1c2VyQ29uZmlnIiwibGVuZ3RoIiwiJHRoaXMiLCJpIiwiJGJvZHkiLCIkd2luZG93IiwiaWQiLCJhdHRyIiwiY29uZmlnIiwiZXh0ZW5kIiwiZGVsYXkiLCJoaWRlT25DbGljayIsImhpZGVPbkVzY2FwZSIsImhpZGVPblN3aXBlIiwicmVzZXRTY3JvbGwiLCJyZXNldEZvcm1zIiwic2lkZSIsInRhcmdldCIsInZpc2libGVDbGFzcyIsIl9oaWRlIiwiZXZlbnQiLCJoYXNDbGFzcyIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xhc3MiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsVG9wIiwiZmluZCIsImVhY2giLCJyZXNldCIsImNzcyIsIm9uIiwiJGEiLCJocmVmIiwib3BlbiIsImxvY2F0aW9uIiwidG91Y2hQb3NYIiwib3JpZ2luYWxFdmVudCIsInRvdWNoZXMiLCJwYWdlWCIsInRvdWNoUG9zWSIsInBhZ2VZIiwiZGlmZlgiLCJkaWZmWSIsInRoIiwib3V0ZXJIZWlnaHQiLCJ0cyIsImdldCIsInNjcm9sbEhlaWdodCIsInJlc3VsdCIsImJvdW5kYXJ5IiwiZGVsdGEiLCJ0b2dnbGVDbGFzcyIsImtleUNvZGUiLCJwbGFjZWhvbGRlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbCIsImFkZENsYXNzIiwibWF0Y2giLCJ4IiwiYXBwZW5kIiwiY2xvbmUiLCJyZW1vdmUiLCJodG1sIiwiaW5zZXJ0QWZ0ZXIiLCJoaWRlIiwicGFyZW50Iiwic2hvdyIsImZvY3VzIiwidHlwZSIsInByaW9yaXRpemUiLCIkZWxlbWVudHMiLCJjb25kaXRpb24iLCJrZXkiLCIkZSIsIiRwIiwiJHBhcmVudCIsImRhdGEiLCJwcmV2IiwicHJlcGVuZFRvIiwicmVtb3ZlRGF0YSIsImxvZ2luUmVxdWVzdCIsImlzQXV0aGVudGljYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ1FBLGtCLHFCQUFBQSxNOztBQUNBQyxrQixrQkFBQUEsTTs7QUFDREMsMkI7O0FBQ0NDLHVCLDBCQUFBQSxXO0FBR0FDLHVCLDBCQUFBQSxXOztBQUZBQyxtQixvQkFBQUEsTzs7QUFDQUMsNkIsMENBQUFBLGlCOztBQUVJQyxzQjs7QUFDQUMsZTs7QUFDTEMsYTs7QUFDQUMsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFHTUMsRyxXQURaWCxPQUFPSyxPQUFQLEVBQWdCRCxXQUFoQixFQUE2QkgsTUFBN0IsRUFBcUNFLFdBQXJDLEVBQWtERCxlQUFsRCxFQUFtRUksaUJBQW5FLEM7QUFVRyw2QkFBWU0sT0FBWixFQUFxQkMsSUFBckIsRUFBMkJDLE1BQTNCLEVBQW1DQyxXQUFuQyxFQUFnREMsZUFBaEQsRUFBaUVDLE1BQWpFLEVBQXdFO0FBQUE7O0FBQUEseUJBUHhFQyxXQU93RSxHQVAxRCxRQUFNLEVBT29EO0FB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LEdBQUYsTUFBVyxFQUFmLEVBQW1CO0FBQ2Z0RCw4Q0FBRXVELFFBQUYsQ0FBVyxzQkFBWDtBQUNBdkQsOENBQUVzRCxHQUFGLENBQU10RCxFQUFFSSxJQUFGLENBQU8sYUFBUCxDQUFOO0FBQ0g7O0FBRUQ7O0FBRUo7QUFDSUosMENBQUVzRCxHQUFGLENBQU10RCxFQUFFSSxJQUFGLENBQU8sY0FBUCxDQUFOO0FBQ0E7O0FBeENSO0FBMkNILDZCQW5EQztBQXFESCx5QkFqRk87O0FBbUZBLCtCQUFPTCxLQUFQO0FBRUgscUJBeE5EOztBQStOQXZDLHNCQUFFNEcsVUFBRixHQUFlLFVBQVNDLFNBQVQsRUFBb0JDLFNBQXBCLEVBQStCOztBQUUxQyw0QkFBSUMsTUFBTSxjQUFWOztBQUdBLDRCQUFJLE9BQU9GLFNBQVAsSUFBb0IsUUFBeEIsRUFDSUEsWUFBWTdHLEVBQUU2RyxTQUFGLENBQVo7O0FBR0pBLGtDQUFVNUMsSUFBVixDQUFlLFlBQVc7O0FBRXRCLGdDQUFJK0MsS0FBS2hILEVBQUUsSUFBRixDQUFUO0FBQUEsZ0NBQWtCaUgsRUFBbEI7QUFBQSxnQ0FDWEMsVUFBVUYsR0FBR1IsTUFBSCxFQURDOztBQUlBLGdDQUFJVSxRQUFRNUUsTUFBUixJQUFrQixDQUF0QixFQUNJOztBQUdKLGdDQUFJLENBQUMwRSxHQUFHRyxJQUFILENBQVFKLEdBQVIsQ0FBTCxFQUFtQjtBQUdmLG9DQUFJLENBQUNELFNBQUwsRUFDSTs7QUFHSkcscUNBQUtELEdBQUdJLElBQUgsRUFBTDs7QUFHQSxvQ0FBSUgsR0FBRzNFLE1BQUgsSUFBYSxDQUFqQixFQUNJOztBQUdKMEUsbUNBQUdLLFNBQUgsQ0FBYUgsT0FBYjs7QUFHQUYsbUNBQUdHLElBQUgsQ0FBUUosR0FBUixFQUFhRSxFQUFiO0FBRUgsNkJBbkJELE1Bc0JLO0FBR0Qsd0NBQUlILFNBQUosRUFDSTs7QUFFSkcseUNBQUtELEdBQUdHLElBQUgsQ0FBUUosR0FBUixDQUFMOztBQUdBQyx1Q0FBR1YsV0FBSCxDQUFlVyxFQUFmOztBQUdBRCx1Q0FBR00sVUFBSCxDQUFjUCxHQUFkO0FBRUg7QUFFSix5QkFoREQ7QUFrREgscUJBM0REO0FBNERILGlCOzs4QkFDRFEsWSwyQkFBYzs7QUFFVix5QkFBSzFHLGFBQUwsR0FBcUIsSUFBckI7QUFDSCxpQjs7Ozt3Q0FwbUJvQjtBQUNqQiwrQkFBTyxLQUFLVCxJQUFMLENBQVVvSCxlQUFWLEVBQVA7QUFDSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
