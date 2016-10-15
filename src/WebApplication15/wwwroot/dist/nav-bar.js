'use strict';

System.register(['aurelia-framework', 'aurelia-authentication', 'services/session', 'toastr', 'aurelia-router', 'jquery'], function (_export, _context) {
    "use strict";

    var inject, AuthService, Session, computedFrom, log, Router, $, _createClass, _dec, _class, NavBar;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            computedFrom = _aureliaFramework.computedFrom;
        }, function (_aureliaAuthentication) {
            AuthService = _aureliaAuthentication.AuthService;
        }, function (_servicesSession) {
            Session = _servicesSession.Session;
        }, function (_toastr) {
            log = _toastr;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
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

            _export('NavBar', NavBar = (_dec = inject(AuthService, Session, Router), _dec(_class = function () {
                function NavBar(auth, session, router) {
                    _classCallCheck(this, NavBar);

                    this.auth = auth;
                    this.session = session;
                    this.router = router;

                    this.currentUser = this.getCurrentUser();
                }

                NavBar.prototype.activate = function activate() {};

                NavBar.prototype.attached = function attached() {
                    this.setupNavigation();
                };

                NavBar.prototype.activateDropotron = function activateDropotron() {
                    (function (e) {
                        var t = "openerActiveClass",
                            n = "click touchend",
                            r = "left",
                            i = "doCollapseAll",
                            s = "position",
                            o = "trigger",
                            u = "disableSelection_dropotron",
                            a = "addClass",
                            f = "doCollapse",
                            l = !1,
                            c = "outerWidth",
                            h = "removeClass",
                            p = "preventDefault",
                            d = "length",
                            v = "dropotron",
                            m = "clearTimeout",
                            g = "right",
                            y = "parent",
                            b = !0,
                            w = "speed",
                            E = "none",
                            S = "stopPropagation",
                            x = "doExpand",
                            T = ":visible",
                            N = "absolute",
                            C = "css",
                            k = "center",
                            L = "toggle",
                            A = "baseZIndex",
                            O = "offsetX",
                            M = "alignment",
                            _ = "submenuClassPrefix",
                            D = "children",
                            P = "hover",
                            H = "relative",
                            B = "doToggle",
                            j = "ul",
                            F = "z-index",
                            I = "opacity",
                            q = "find",
                            R = "opener",
                            U = "px",
                            z = null,
                            W = "hide",
                            X = "offset",
                            V = "detach",
                            $ = "fast";e.fn[u] = function () {
                            return e(this)[C]("user-select", E)[C]("-khtml-user-select", E)[C]("-moz-user-select", E)[C]("-o-user-select", E)[C]("-webkit-user-select", E);
                        }, e.fn[v] = function (t) {
                            var n;if (this[d] == 0) return e(this);if (this[d] > 1) for (n = 0; n < this[d]; n++) {
                                e(this[n])[v](t);
                            }return e[v](e.extend({ selectorParent: e(this) }, t));
                        }, e[v] = function (E) {
                            var et = e.extend({ selectorParent: z, baseZIndex: 1e3, menuClass: v, expandMode: P, hoverDelay: 150, hideDelay: 250, openerClass: R, openerActiveClass: "active", submenuClassPrefix: "level-", mode: "fade", speed: $, easing: "swing", alignment: r, offsetX: 0, offsetY: 0, globalOffsetY: 0, IEOffsetX: 0, IEOffsetY: 0, noOpenerFade: b, detach: b, cloneOnDetach: b }, E),
                                tt = et.selectorParent,
                                nt = tt[q](j),
                                rt = e("body"),
                                it = e("body,html"),
                                st = e(window),
                                ot = l,
                                ut = z,
                                at = z;tt.on(i, function () {
                                nt[o](f);
                            }), nt.each(function () {
                                var i = e(this),
                                    d = i[y]();et.hideDelay > 0 && i.add(d).on("mouseleave", function () {
                                    window[m](at), at = window.setTimeout(function () {
                                        i[o](f);
                                    }, et.hideDelay);
                                }), i[u]()[W]()[a](et.menuClass)[C](s, N).on("mouseenter", function () {
                                    window[m](at);
                                }).on(x, function () {
                                    var n, u, p, v, E, S, x, _, D, P, B;if (i.is(T)) return l;window[m](at), nt.each(function () {
                                        var t = e(this);e.contains(t.get(0), d.get(0)) || t[o](f);
                                    }), n = d[X](), u = d[s](), p = d[y]()[s](), v = d[c](), E = i[c](), S = i[C](F) == et[A];if (S) {
                                        et[V] ? x = n : x = u, P = x.top + d.outerHeight() + et.globalOffsetY, _ = et[M], i[h](r)[h](g)[h](k);switch (et[M]) {case g:
                                                D = x[r] - E + v, D < 0 && (D = x[r], _ = r);break;case k:
                                                D = x[r] - Math.floor((E - v) / 2), D < 0 ? (D = x[r], _ = r) : D + E > st.width() && (D = x[r] - E + v, _ = g);break;case r:default:
                                                D = x[r], D + E > st.width() && (D = x[r] - E + v, _ = g);}i[a](_);
                                    } else {
                                        d[C](s) == H || d[C](s) == N ? (P = et.offsetY, D = -1 * u[r]) : (P = u.top + et.offsetY, D = 0);switch (et[M]) {case g:
                                                D += -1 * d[y]()[c]() + et[O];break;case k:case r:default:
                                                D += d[y]()[c]() + et[O];}
                                    }navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 < 8 && (D += et.IEOffsetX, P += et.IEOffsetY), i[C](r, D + U)[C]("top", P + U)[C](I, "0.01").show(), B = l, d[C](s) == H || d[C](s) == N ? D = -1 * u[r] : D = 0, i[X]()[r] < 0 ? (D += d[y]()[c]() - et[O], B = b) : i[X]()[r] + E > st.width() && (D += -1 * d[y]()[c]() - et[O], B = b), B && i[C](r, D + U), i[W]()[C](I, "1");switch (et.mode) {case "zoom":
                                            ot = b, d[a](et[t]), i.animate({ width: L, height: L }, et[w], et.easing, function () {
                                                ot = l;
                                            });break;case "slide":
                                            ot = b, d[a](et[t]), i.animate({ height: L }, et[w], et.easing, function () {
                                                ot = l;
                                            });break;case "fade":
                                            ot = b, S && !et.noOpenerFade ? (et[w] == "slow" ? B = 80 : et[w] == $ ? B = 40 : B = Math.floor(et[w] / 2), d.fadeTo(B, .01, function () {
                                                d[a](et[t]), d.fadeTo(et[w], 1), i.fadeIn(et[w], function () {
                                                    ot = l;
                                                });
                                            })) : (d[a](et[t]), d.fadeTo(et[w], 1), i.fadeIn(et[w], function () {
                                                ot = l;
                                            }));break;case "instant":default:
                                            d[a](et[t]), i.show();}return l;
                                }).on(f, function () {
                                    return i.is(T) ? (i[W](), d[h](et[t]), i[q]("." + et[t])[h](et[t]), i[q](j)[W](), l) : l;
                                }).on(B, function () {
                                    return i.is(T) ? i[o](f) : i[o](x), l;
                                }), d[u]()[a](R)[C]("cursor", "pointer").on(n, function (e) {
                                    if (ot) return;e[p](), e[S](), i[o](B);
                                }), et.expandMode == P && d[P](function () {
                                    if (ot) return;ut = window.setTimeout(function () {
                                        i[o](x);
                                    }, et.hoverDelay);
                                }, function () {
                                    window[m](ut);
                                });
                            }), nt[q]("a")[C]("display", "block").on(n, function (t) {
                                if (ot) return;e(this).attr("href")[d] < 1 && t[p]();
                            }), tt[q]("li")[C]("white-space", "nowrap").each(function () {
                                var t = e(this),
                                    r = t[D]("a"),
                                    s = t[D](j),
                                    u = r.attr("href");r.on(n, function (e) {
                                    u[d] == 0 || u == "#" ? e[p]() : e[S]();
                                }), r[d] > 0 && s[d] == 0 && t.on(n, function (e) {
                                    if (ot) return;tt[o](i), e[S]();
                                });
                            }), tt[D]("li").each(function () {
                                var t,
                                    n,
                                    r,
                                    i,
                                    s = e(this),
                                    o = s[D](j);if (o[d] > 0) {
                                    et[V] && (et.cloneOnDetach && (t = o.clone(), t.attr("class", "")[W]().appendTo(o[y]())), o[V]().appendTo(rt));for (n = et[A], r = 1, i = o; i[d] > 0; r++) {
                                        i[C](F, n++), et[_] && i[a](et[_] + (n - 1 - et[A])), i = i[q]("> li > ul");
                                    }
                                }
                            }), st.on("scroll", function () {
                                tt[o](i);
                            }).on("keypress", function (e) {
                                !ot && e.keyCode == 27 && (e[p](), tt[o](i));
                            }), it.on(n, function () {
                                ot || tt[o](i);
                            });
                        };
                    })($);
                };

                NavBar.prototype.setupNavigation = function setupNavigation() {
                    this.activateDropotron();

                    $('#nav > ul').dropotron({
                        alignment: 'right',
                        hideDelay: 400
                    });

                    $('<a href="#navPanel" class="navPanelToggle"></a>').appendTo($("#header"));

                    var $body = $('body');

                    $("#navPanel").remove();

                    $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '<a href="#navPanel" class="close"></a>' + '</div>').appendTo($body).panel({
                        delay: 500,
                        hideOnClick: true,
                        hideOnSwipe: true,
                        resetScroll: true,
                        resetForms: true,
                        side: 'right'
                    });
                };

                NavBar.prototype.getCurrentUser = function getCurrentUser() {

                    try {

                        var token = localStorage.getItem('aurelia_id_token');
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

                        this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

                        return this.currentUser;
                    } catch (error) {}
                };

                _createClass(NavBar, [{
                    key: 'isAuthenticated',
                    get: function get() {
                        return this.auth.isAuthenticated();
                    }
                }]);

                return NavBar;
            }()) || _class));

            _export('NavBar', NavBar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi1iYXIuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiY29tcHV0ZWRGcm9tIiwiQXV0aFNlcnZpY2UiLCJTZXNzaW9uIiwibG9nIiwiUm91dGVyIiwiJCIsIk5hdkJhciIsImF1dGgiLCJzZXNzaW9uIiwicm91dGVyIiwiY3VycmVudFVzZXIiLCJnZXRDdXJyZW50VXNlciIsImFjdGl2YXRlIiwiYXR0YWNoZWQiLCJzZXR1cE5hdmlnYXRpb24iLCJhY3RpdmF0ZURyb3BvdHJvbiIsImUiLCJ0IiwibiIsInIiLCJpIiwicyIsIm8iLCJ1IiwiYSIsImYiLCJsIiwiYyIsImgiLCJwIiwiZCIsInYiLCJtIiwiZyIsInkiLCJiIiwidyIsIkUiLCJTIiwieCIsIlQiLCJOIiwiQyIsImsiLCJMIiwiQSIsIk8iLCJNIiwiXyIsIkQiLCJQIiwiSCIsIkIiLCJqIiwiRiIsIkkiLCJxIiwiUiIsIlUiLCJ6IiwiVyIsIlgiLCJWIiwiZm4iLCJleHRlbmQiLCJzZWxlY3RvclBhcmVudCIsImV0IiwiYmFzZVpJbmRleCIsIm1lbnVDbGFzcyIsImV4cGFuZE1vZGUiLCJob3ZlckRlbGF5IiwiaGlkZURlbGF5Iiwib3BlbmVyQ2xhc3MiLCJvcGVuZXJBY3RpdmVDbGFzcyIsInN1Ym1lbnVDbGFzc1ByZWZpeCIsIm1vZGUiLCJzcGVlZCIsImVhc2luZyIsImFsaWdubWVudCIsIm9mZnNldFgiLCJvZmZzZXRZIiwiZ2xvYmFsT2Zmc2V0WSIsIklFT2Zmc2V0WCIsIklFT2Zmc2V0WSIsIm5vT3BlbmVyRmFkZSIsImRldGFjaCIsImNsb25lT25EZXRhY2giLCJ0dCIsIm50IiwicnQiLCJpdCIsInN0Iiwid2luZG93Iiwib3QiLCJ1dCIsImF0Iiwib24iLCJlYWNoIiwiYWRkIiwic2V0VGltZW91dCIsImlzIiwiY29udGFpbnMiLCJnZXQiLCJ0b3AiLCJvdXRlckhlaWdodCIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwidXNlckFnZW50IiwibWF0Y2giLCJSZWdFeHAiLCIkMSIsInNob3ciLCJhbmltYXRlIiwiaGVpZ2h0IiwiZmFkZVRvIiwiZmFkZUluIiwiYXR0ciIsImNsb25lIiwiYXBwZW5kVG8iLCJrZXlDb2RlIiwiZHJvcG90cm9uIiwiJGJvZHkiLCJyZW1vdmUiLCJuYXZMaXN0IiwicGFuZWwiLCJkZWxheSIsImhpZGVPbkNsaWNrIiwiaGlkZU9uU3dpcGUiLCJyZXNldFNjcm9sbCIsInJlc2V0Rm9ybXMiLCJzaWRlIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYmFzZTY0VXJsIiwic3BsaXQiLCJiYXNlNjQiLCJyZXBsYWNlIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwiYXRvYiIsImVycm9yIiwiaXNBdXRoZW50aWNhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07QUFHQUMsd0IscUJBQUFBLFk7O0FBRkFDLHVCLDBCQUFBQSxXOztBQUNBQyxtQixvQkFBQUEsTzs7QUFFSUMsZTs7QUFDSkMsa0Isa0JBQUFBLE07O0FBQ0RDLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFHTUMsTSxXQURaUCxPQUFPRSxXQUFQLEVBQW9CQyxPQUFwQixFQUE2QkUsTUFBN0IsQztBQUdHLGdDQUFZRyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQkMsTUFBM0IsRUFBa0M7QUFBQTs7QUFDOUIseUJBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSx5QkFBS0MsTUFBTCxHQUFjQSxNQUFkOztBQUVBLHlCQUFLQyxXQUFMLEdBQW1CLEtBQUtDLGNBQUwsRUFBbkI7QUFDSDs7aUNBQ0RDLFEsdUJBQVUsQ0FFVCxDOztpQ0FDREMsUSx1QkFBVTtBQUNOLHlCQUFLQyxlQUFMO0FBQ0gsaUI7O2lDQUVEQyxpQixnQ0FBbUI7QUFFZixxQkFBQyxVQUFTQyxDQUFULEVBQVc7QUFBQyw0QkFBSUMsSUFBRSxtQkFBTjtBQUFBLDRCQUEwQkMsSUFBRSxnQkFBNUI7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
