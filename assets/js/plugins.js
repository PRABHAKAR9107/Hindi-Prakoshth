// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.

/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i);
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {};
        }
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke(this, "disable");
      },
      enable: function () {
        return d._invoke(this, "enable");
      },
      destroy: function () {
        return d._invoke(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.load(function () {
      return n[m]("refresh");
    });
  });
}.call(this));

//Smooth scroll

!(function () {
  function e() {
    T.keyboardSupport && f("keydown", a);
  }
  function t() {
    if (!z && document.body) {
      z = !0;
      var t = document.body,
        o = document.documentElement,
        n = window.innerHeight,
        a = t.scrollHeight;
      if (
        ((X = document.compatMode.indexOf("CSS") >= 0 ? o : t),
        (S = t),
        e(),
        top != self)
      )
        C = !0;
      else if (a > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
        var r = document.createElement("div");
        (r.style.cssText =
          "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
          X.scrollHeight +
          "px"),
          document.body.appendChild(r);
        var l,
          i = function () {
            l ||
              (l = setTimeout(function () {
                H ||
                  ((r.style.height = "0"),
                  (r.style.height = X.scrollHeight + "px"),
                  (l = null));
              }, 500));
          };
        setTimeout(i, 10);
        var c = { attributes: !0, childList: !0, characterData: !1 };
        if (((x = new j(i)), x.observe(t, c), X.offsetHeight <= n)) {
          var u = document.createElement("div");
          (u.style.clear = "both"), t.appendChild(u);
        }
      }
      T.fixedBackground ||
        H ||
        ((t.style.backgroundAttachment = "scroll"),
        (o.style.backgroundAttachment = "scroll"));
    }
  }
  function o(e, t, o) {
    if ((h(t, o), 1 != T.accelerationMax)) {
      var n = Date.now(),
        a = n - N;
      if (a < T.accelerationDelta) {
        var r = (1 + 50 / a) / 2;
        r > 1 && ((r = Math.min(r, T.accelerationMax)), (t *= r), (o *= r));
      }
      N = Date.now();
    }
    if (
      (A.push({
        x: t,
        y: o,
        lastX: 0 > t ? 0.99 : -0.99,
        lastY: 0 > o ? 0.99 : -0.99,
        start: Date.now(),
      }),
      !K)
    ) {
      var l = e === document.body,
        i = function (n) {
          for (var a = Date.now(), r = 0, c = 0, u = 0; u < A.length; u++) {
            var d = A[u],
              s = a - d.start,
              f = s >= T.animationTime,
              m = f ? 1 : s / T.animationTime;
            T.pulseAlgorithm && (m = y(m));
            var h = (d.x * m - d.lastX) >> 0,
              p = (d.y * m - d.lastY) >> 0;
            (r += h),
              (c += p),
              (d.lastX += h),
              (d.lastY += p),
              f && (A.splice(u, 1), u--);
          }
          l
            ? window.scrollBy(r, c)
            : (r && (e.scrollLeft += r), c && (e.scrollTop += c)),
            t || o || (A = []),
            A.length ? P(i, e, 1e3 / T.frameRate + 1) : (K = !1);
        };
      P(i, e, 0), (K = !0);
    }
  }
  function n(e) {
    z || t();
    var n = e.target,
      a = c(n);
    if (!a || e.defaultPrevented || e.ctrlKey) return !0;
    if (
      m(S, "embed") ||
      (m(n, "embed") && /\.pdf/i.test(n.src)) ||
      m(S, "object")
    )
      return !0;
    var r = -e.wheelDeltaX || e.deltaX || 0,
      i = -e.wheelDeltaY || e.deltaY || 0;
    return (
      B &&
        (e.wheelDeltaX &&
          w(e.wheelDeltaX, 120) &&
          (r = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))),
        e.wheelDeltaY &&
          w(e.wheelDeltaY, 120) &&
          (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))),
      r || i || (i = -e.wheelDelta || 0),
      1 === e.deltaMode && ((r *= 40), (i *= 40)),
      !T.touchpadSupport && p(i)
        ? !0
        : (Math.abs(r) > 1.2 && (r *= T.stepSize / 120),
          Math.abs(i) > 1.2 && (i *= T.stepSize / 120),
          o(a, r, i),
          // e.preventDefault(),
          void l())
    );
  }
  function a(e) {
    var t = e.target,
      n =
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        (e.shiftKey && e.keyCode !== L.spacebar);
    document.contains(S) || (S = document.activeElement);
    var a = /^(textarea|select|embed|object)$/i,
      r = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (
      a.test(t.nodeName) ||
      (m(t, "input") && !r.test(t.type)) ||
      m(S, "video") ||
      b(e) ||
      t.isContentEditable ||
      e.defaultPrevented ||
      n
    )
      return !0;
    if (
      (m(t, "button") || (m(t, "input") && r.test(t.type))) &&
      e.keyCode === L.spacebar
    )
      return !0;
    var i,
      u = 0,
      d = 0,
      s = c(S),
      f = s.clientHeight;
    switch ((s == document.body && (f = window.innerHeight), e.keyCode)) {
      case L.up:
        d = -T.arrowScroll;
        break;
      case L.down:
        d = T.arrowScroll;
        break;
      case L.spacebar:
        (i = e.shiftKey ? 1 : -1), (d = -i * f * 0.9);
        break;
      case L.pageup:
        d = 0.9 * -f;
        break;
      case L.pagedown:
        d = 0.9 * f;
        break;
      case L.home:
        d = -s.scrollTop;
        break;
      case L.end:
        var h = s.scrollHeight - s.scrollTop - f;
        d = h > 0 ? h + 10 : 0;
        break;
      case L.left:
        u = -T.arrowScroll;
        break;
      case L.right:
        u = T.arrowScroll;
        break;
      default:
        return !0;
    }
    o(s, u, d), e.preventDefault(), l();
  }
  function r(e) {
    S = e.target;
  }
  function l() {
    clearTimeout(D),
      (D = setInterval(function () {
        O = {};
      }, 1e3));
  }
  function i(e, t) {
    for (var o = e.length; o--; ) O[q(e[o])] = t;
    return t;
  }
  function c(e) {
    var t = [],
      o = document.body,
      n = X.scrollHeight;
    do {
      var a = O[q(e)];
      if (a) return i(t, a);
      if ((t.push(e), n === e.scrollHeight)) {
        var r = d(X) && d(o),
          l = r || s(X);
        if ((C && u(X)) || (!C && l)) return i(t, F());
      } else if (u(e) && s(e)) return i(t, e);
    } while ((e = e.parentElement));
  }
  function u(e) {
    return e.clientHeight + 10 < e.scrollHeight;
  }
  function d(e) {
    var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
    return "hidden" !== t;
  }
  function s(e) {
    var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
    return "scroll" === t || "auto" === t;
  }
  function f(e, t) {
    window.addEventListener(e, t, !1);
  }
  function m(e, t) {
    return (e.nodeName || "").toLowerCase() === t.toLowerCase();
  }
  function h(e, t) {
    (e = e > 0 ? 1 : -1),
      (t = t > 0 ? 1 : -1),
      (E.x !== e || E.y !== t) && ((E.x = e), (E.y = t), (A = []), (N = 0));
  }
  function p(e) {
    return e
      ? (Y.length || (Y = [e, e, e]),
        (e = Math.abs(e)),
        Y.push(e),
        Y.shift(),
        clearTimeout(k),
        (k = setTimeout(function () {
          window.localStorage && (localStorage.SS_deltaBuffer = Y.join(","));
        }, 1e3)),
        !v(120) && !v(100))
      : void 0;
  }
  function w(e, t) {
    return Math.floor(e / t) == e / t;
  }
  function v(e) {
    return w(Y[0], e) && w(Y[1], e) && w(Y[2], e);
  }
  function b(e) {
    var t = e.target,
      o = !1;
    if (-1 != document.URL.indexOf("www.youtube.com/watch"))
      do
        if ((o = t.classList && t.classList.contains("html5-video-controls")))
          break;
      while ((t = t.parentNode));
    return o;
  }
  function g(e) {
    var t, o, n;
    return (
      (e *= T.pulseScale),
      1 > e
        ? (t = e - (1 - Math.exp(-e)))
        : ((o = Math.exp(-1)),
          (e -= 1),
          (n = 1 - Math.exp(-e)),
          (t = o + n * (1 - o))),
      t * T.pulseNormalize
    );
  }
  function y(e) {
    return e >= 1
      ? 1
      : 0 >= e
      ? 0
      : (1 == T.pulseNormalize && (T.pulseNormalize /= g(1)), g(e));
  }
  var S,
    x,
    D,
    k,
    M = {
      frameRate: 150,
      animationTime: 400,
      stepSize: 120,
      pulseAlgorithm: !0,
      pulseScale: 4,
      pulseNormalize: 1,
      accelerationDelta: 20,
      accelerationMax: 1,
      keyboardSupport: !0,
      arrowScroll: 50,
      touchpadSupport: !0,
      fixedBackground: !0,
      excluded: "",
    },
    T = M,
    H = !1,
    C = !1,
    E = { x: 0, y: 0 },
    z = !1,
    X = document.documentElement,
    Y = [],
    B = /^Mac/.test(navigator.platform),
    L = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
    },
    T = M,
    A = [],
    K = !1,
    N = Date.now(),
    q = (function () {
      var e = 0;
      return function (t) {
        return t.uniqueID || (t.uniqueID = e++);
      };
    })(),
    O = {};
  window.localStorage &&
    localStorage.SS_deltaBuffer &&
    (Y = localStorage.SS_deltaBuffer.split(","));
  var R,
    P = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (e, t, o) {
          window.setTimeout(e, o || 1e3 / 60);
        }
      );
    })(),
    j =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver,
    F = (function () {
      var e;
      return function () {
        if (!e) {
          var t = document.createElement("div");
          (t.style.cssText = "height:10000px;width:1px;"),
            document.body.appendChild(t);
          var o = document.body.scrollTop;
          document.documentElement.scrollTop;
          window.scrollBy(0, 1),
            (e =
              document.body.scrollTop != o
                ? document.body
                : document.documentElement),
            window.scrollBy(0, -1),
            document.body.removeChild(t);
        }
        return e;
      };
    })();
  "onwheel" in document.createElement("div")
    ? (R = "wheel")
    : "onmousewheel" in document.createElement("div") && (R = "mousewheel"),
    R && (f(R, n), f("mousedown", r), f("load", t));
})();

//LocalScroll
/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.3.5
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function ($) {
  var g = location.href.replace(/#.*/, "");
  var h = ($.localScroll = function (a) {
    $("body").localScroll(a);
  });
  h.defaults = {
    duration: 1000,
    axis: "y",
    event: "click",
    stop: true,
    target: window,
  };
  $.fn.localScroll = function (a) {
    a = $.extend({}, h.defaults, a);
    if (a.hash && location.hash) {
      if (a.target) window.scrollTo(0, 0);
      scroll(0, location, a);
    }
    return a.lazy
      ? this.on(a.event, "a,area", function (e) {
          if (filter.call(this)) {
            scroll(e, this, a);
          }
        })
      : this.find("a,area")
          .filter(filter)
          .bind(a.event, function (e) {
            scroll(e, this, a);
          })
          .end()
          .end();
    function filter() {
      return (
        !!this.href &&
        !!this.hash &&
        this.href.replace(this.hash, "") == g &&
        (!a.filter || $(this).is(a.filter))
      );
    }
  };
  h.hash = function () {};
  function scroll(e, a, b) {
    var c = a.hash.slice(1),
      elem = document.getElementById(c) || document.getElementsByName(c)[0];
    if (!elem) return;
    if (e) e.preventDefault();
    var d = $(b.target);
    if (
      (b.lock && d.is(":animated")) ||
      (b.onBefore && b.onBefore(e, elem, d) === false)
    )
      return;
    if (b.stop) d._scrollable().stop(true);
    if (b.hash) {
      var f = elem.id === c ? "id" : "name",
        $a = $("<a> </a>")
          .attr(f, c)
          .css({
            position: "absolute",
            top: $(window).scrollTop(),
            left: $(window).scrollLeft(),
          });
      elem[f] = "";
      $("body").prepend($a);
      location.hash = a.hash;
      $a.remove();
      elem[f] = c;
    }
    d.scrollTo(elem, b).trigger("notify.serialScroll", [elem]);
  }
  return h;
});

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function ($) {
  var j = ($.scrollTo = function (a, b, c) {
    return $(window).scrollTo(a, b, c);
  });
  j.defaults = {
    axis: "xy",
    duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
    limit: true,
  };
  j.window = function (a) {
    return $(window)._scrollable();
  };
  $.fn._scrollable = function () {
    return this.map(function () {
      var a = this,
        isWin =
          !a.nodeName ||
          $.inArray(a.nodeName.toLowerCase(), [
            "iframe",
            "#document",
            "html",
            "body",
          ]) != -1;
      if (!isWin) return a;
      var b = (a.contentWindow || a).document || a.ownerDocument || a;
      return /webkit/i.test(navigator.userAgent) || b.compatMode == "BackCompat"
        ? b.body
        : b.documentElement;
    });
  };
  $.fn.scrollTo = function (f, g, h) {
    if (typeof g == "object") {
      h = g;
      g = 0;
    }
    if (typeof h == "function") h = { onAfter: h };
    if (f == "max") f = 9e9;
    h = $.extend({}, j.defaults, h);
    g = g || h.duration;
    h.queue = h.queue && h.axis.length > 1;
    if (h.queue) g /= 2;
    h.offset = both(h.offset);
    h.over = both(h.over);
    return this._scrollable()
      .each(function () {
        if (f == null) return;
        var d = this,
          $elem = $(d),
          targ = f,
          toff,
          attr = {},
          win = $elem.is("html,body");
        switch (typeof targ) {
          case "number":
          case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
              targ = both(targ);
              break;
            }
            targ = win ? $(targ) : $(targ, this);
            if (!targ.length) return;
          case "object":
            if (targ.is || targ.style) toff = (targ = $(targ)).offset();
        }
        var e = ($.isFunction(h.offset) && h.offset(d, targ)) || h.offset;
        $.each(h.axis.split(""), function (i, a) {
          var b = a == "x" ? "Left" : "Top",
            pos = b.toLowerCase(),
            key = "scroll" + b,
            old = d[key],
            max = j.max(d, a);
          if (toff) {
            attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
            if (h.margin) {
              attr[key] -= parseInt(targ.css("margin" + b)) || 0;
              attr[key] -= parseInt(targ.css("border" + b + "Width")) || 0;
            }
            attr[key] += e[pos] || 0;
            if (h.over[pos])
              attr[key] += targ[a == "x" ? "width" : "height"]() * h.over[pos];
          } else {
            var c = targ[pos];
            attr[key] =
              c.slice && c.slice(-1) == "%" ? (parseFloat(c) / 100) * max : c;
          }
          if (h.limit && /^\d+$/.test(attr[key]))
            attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
          if (!i && h.queue) {
            if (old != attr[key]) animate(h.onAfterFirst);
            delete attr[key];
          }
        });
        animate(h.onAfter);
        function animate(a) {
          $elem.animate(
            attr,
            g,
            h.easing,
            a &&
              function () {
                a.call(this, targ, h);
              }
          );
        }
      })
      .end();
  };
  j.max = function (a, b) {
    var c = b == "x" ? "Width" : "Height",
      scroll = "scroll" + c;
    if (!$(a).is("html,body")) return a[scroll] - $(a)[c.toLowerCase()]();
    var d = "client" + c,
      html = a.ownerDocument.documentElement,
      body = a.ownerDocument.body;
    return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
  };
  function both(a) {
    return $.isFunction(a) || typeof a == "object" ? a : { top: a, left: a };
  }
  return j;
});

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);

/*! WOW - v1.0.2 - 2014-09-24
 * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
(function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          (this.animationNameCache = new c());
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else {
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
              this.util().addEvent(window, "scroll", this.scrollHandler),
                this.util().addEvent(window, "resize", this.scrollHandler),
                (this.interval = setInterval(this.scrollCallback, 50));
            }
          return this.config.live
            ? new a(
                (function (a) {
                  return function (b) {
                    var c, d, e, f, g;
                    for (g = [], e = 0, f = b.length; f > e; e++)
                      (d = b[e]),
                        g.push(
                          function () {
                            var a, b, e, f;
                            for (
                              e = d.addedNodes || [],
                                f = [],
                                a = 0,
                                b = e.length;
                              b > a;
                              a++
                            )
                              (c = e[a]), f.push(this.doSync(c));
                            return f;
                          }.call(a)
                        );
                    return g;
                  };
                })(this)
              ).observe(document.body, { childList: !0, subtree: !0 })
            : void 0;
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = "" + a.className + " " + this.config.animateClass)
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          f = [];
          for (c in b)
            (d = b[c]),
              (a["" + c] = d),
              f.push(
                function () {
                  var b, f, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, f = g.length;
                    f > b;
                    b++
                  )
                    (e = g[b]),
                      h.push(
                        (a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] =
                          d)
                      );
                  return h;
                }.call(this)
              );
          return f;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            e = d(a),
              c = e.getPropertyCSSValue(b),
              i = this.vendors,
              g = 0,
              h = i.length;
            h > g;
            g++
          )
            (f = i[g]), (c = c || e.getPropertyCSSValue("-" + f + "-" + b));
          return c;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f = window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}.call(this));
