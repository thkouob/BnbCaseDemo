/**
 * 
 * This js is referer from http://electricpulp.com/
 *
*/


function FastClick(t, e) {
    "use strict";
    function n(t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }
    var i;
    if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10, this.layer = t, this.tapDelay = e.tapDelay || 200, !FastClick.notNeeded(t)) {
        for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = this, s = 0, a = o.length; a > s; s++)
            r[o[s]] = n(r[o[s]], r);
        deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, i) {
            var o = Node.prototype.removeEventListener;
            "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
        }, t.addEventListener = function (e, n, i) {
            var o = Node.prototype.addEventListener;
            "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function (t) {
                t.propagationStopped || n(t)
            }), i) : o.call(t, e, n, i)
        }), "function" == typeof t.onclick && (i = t.onclick, t.addEventListener("click", function (t) {
            i(t)
        }, !1), t.onclick = null)
    }
}

var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function (t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (t.disabled)
                return !0;
            break;
        case "input":
            if (deviceIsIOS && "file" === t.type || t.disabled)
                return !0;
            break;
        case "label":
        case "video":
            return !0
    }
    return /\bneedsclick\b/.test(t.className)
},

FastClick.prototype.needsFocus = function (t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !deviceIsAndroid;
        case "input":
            switch (t.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
            }
            return !t.disabled && !t.readOnly;
        default:
            return /\bneedsfocus\b/.test(t.className)
    }
},

FastClick.prototype.sendClick = function (t, e) {
    "use strict";
    var n, i;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(), i = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
},

FastClick.prototype.determineEventType = function (t) {
    "use strict";
    return deviceIsAndroid && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
},

FastClick.prototype.focus = function (t) {
    "use strict";
    var e;
    deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
},

FastClick.prototype.updateScrollParent = function (t) {
    "use strict";
    var e, n;
    if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
        n = t;
        do {
            if (n.scrollHeight > n.offsetHeight) {
                e = n, t.fastClickScrollParent = n;
                break
            }
            n = n.parentElement
        } while (n)
    }
    e && (e.fastClickLastScrollTop = e.scrollTop)
},

FastClick.prototype.getTargetElementFromEventTarget = function (t) {
    "use strict";
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
},

FastClick.prototype.onTouchStart = function (t) {
    "use strict";
    var e, n, i;
    if (t.targetTouches.length > 1)
        return !0;
    if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], deviceIsIOS) {
        if (i = window.getSelection(), i.rangeCount && !i.isCollapsed)
            return !0;
        if (!deviceIsIOS4) {
            if (n.identifier && n.identifier === this.lastTouchIdentifier)
                return t.preventDefault(), !1;
            this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
},

FastClick.prototype.touchHasMoved = function (t) {
    "use strict";
    var e = t.changedTouches[0], n = this.touchBoundary;
    return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
},

FastClick.prototype.onTouchMove = function (t) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
},

FastClick.prototype.findControl = function (t) {
    "use strict";
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
},

FastClick.prototype.onTouchEnd = function (t) {
    "use strict";
    var e, n, i, o, r, s = this.targetElement;
    if (!this.trackingClick)
        return !0;
    if (t.timeStamp - this.lastClickTime < this.tapDelay)
        return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (r = t.changedTouches[0], s = document.elementFromPoint(r.pageX - window.pageXOffset, r.pageY - window.pageYOffset) || s, s.fastClickScrollParent = this.targetElement.fastClickScrollParent), i = s.tagName.toLowerCase(), "label" === i) {
        if (e = this.findControl(s)) {
            if (this.focus(s), deviceIsAndroid)
                return !1;
            s = e
        }
    } else if (this.needsFocus(s))
        return t.timeStamp - n > 100 || deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(s), this.sendClick(s, t), deviceIsIOS && "select" === i || (this.targetElement = null, t.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (o = s.fastClickScrollParent, o && o.fastClickLastScrollTop !== o.scrollTop) ? !0 : (this.needsClick(s) || (t.preventDefault(), this.sendClick(s, t)), !1)
},

FastClick.prototype.onTouchCancel = function () {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
},

FastClick.prototype.onMouse = function (t) {
    "use strict";
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
},

FastClick.prototype.onClick = function (t) {
    "use strict";
    var e;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
},

FastClick.prototype.destroy = function () {
    "use strict";
    var t = this.layer;
    deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
},

FastClick.notNeeded = function (t) {
    "use strict";
    var e, n, i;
    if ("undefined" == typeof window.ontouchstart)
        return !0;
    if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!deviceIsAndroid)
            return !0;
        if (e = document.querySelector("meta[name=viewport]")) {
            if (-1 !== e.content.indexOf("user-scalable=no"))
                return !0;
            if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                return !0
        }
    }
    if (deviceIsBlackBerry10 && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
        if (-1 !== e.content.indexOf("user-scalable=no"))
            return !0;
        if (document.documentElement.scrollWidth <= window.outerWidth)
            return !0
    }
    return "none" === t.style.msTouchAction ? !0 : !1
},

FastClick.attach = function (t, e) {
    "use strict";
    return new FastClick(t, e)
},

"function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
    "use strict";
    return FastClick
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick, +function (t) {

    "use strict";
    var e = function (n, i) {
        this.$element = t(n), this.options = t.extend({}, e.DEFAULTS, i), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.DEFAULTS = { toggle: !0 }, e.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var i = n.data("bs.collapse");
                    if (i && i.transitioning)
                        return;
                    n.collapse("hide"), i || n.data("bs.collapse", null)
                }
                var o = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
                var r = function (e) {
                    return e && e.target != this.$element[0] ? void this.$element.one(t.support.transition.end, t.proxy(r, this)) : (this.$element.removeClass("collapsing").addClass("collapse in")[o](""), this.transitioning = 0, void this.$element.trigger("shown.bs.collapse"))
                };
                if (!t.support.transition)
                    return r.call(this);
                var s = t.camelCase(["scroll", o].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(r, this)).emulateTransitionEnd(350)[o](this.$element[0][s])
            }
        }
    }, e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var i = function (e) {
                    return e && e.target != this.$element[0] ? void this.$element.one(t.support.transition.end, t.proxy(i, this)) : (this.transitioning = 0, void this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse"))
                };
                return t.support.transition ? void this.$element[n](0).one(t.support.transition.end, t.proxy(i, this)).emulateTransitionEnd(350) : i.call(this)
            }
        }
    }, e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var n = t.fn.collapse;
    t.fn.collapse = function (n) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.collapse"), r = t.extend({}, e.DEFAULTS, i.data(), "object" == typeof n && n);
            !o && r.toggle && "show" == n && (n = !n), o || i.data("bs.collapse", o = new e(this, r)), "string" == typeof n && o[n]()
        })
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (e) {
        var n, i = t(this), o = i.attr("data-target") || e.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), r = t(o), s = r.data("bs.collapse"), a = s ? "toggle" : i.data(), c = i.attr("data-parent"), l = c && t(c);
        s && s.transitioning || (l && l.find('[data-toggle="collapse"][data-parent="' + c + '"]').not(i).addClass("collapsed"), i[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(a)
    })
}(jQuery), +function (t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var n in e)
            if (void 0 !== t.style[n])
                return { end: e[n] };
        return !1
    }
    t.fn.emulateTransitionEnd = function (e) {
        var n = !1, i = this;
        t(this).one(t.support.transition.end, function () {
            n = !0
        });
        var o = function () {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(o, e), this
    }, t(function () {
        t.support.transition = e()
    })
}(jQuery), function () {
    "use strict";
    function t() {
    }
    function e(t, e) {
        for (var n = t.length; n--;)
            if (t[n].listener === e)
                return n;
        return -1
    }
    function n(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }
    var i = t.prototype, o = this, r = o.EventEmitter;
    i.getListeners = function (t) {
        var e, n, i = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (n in i)
                i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else
            e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1)
            n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function (t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function (t, n) {
        var i, o = this.getListenersAsObject(t), r = "object" == typeof n;
        for (i in o)
            o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(r ? n : { listener: n, once: !1 });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 })
    }, i.once = n("addOnceListener"), i.defineEvent = function (t) {
        return this.getListeners(t), this
    }, i.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1)
            this.defineEvent(t[e]);
        return this
    }, i.removeListener = function (t, n) {
        var i, o, r = this.getListenersAsObject(t);
        for (o in r)
            r.hasOwnProperty(o) && (i = e(r[o], n), -1 !== i && r[o].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function (t, e, n) {
        var i, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (i = n.length; i--;)
                r.call(this, e, n[i]);
        else
            for (i in e)
                e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? r.call(this, i, o) : s.call(this, i, o));
        return this
    }, i.removeEvent = function (t) {
        var e, n = typeof t, i = this._getEvents();
        if ("string" === n)
            delete i[t];
        else if (t instanceof RegExp)
            for (e in i)
                i.hasOwnProperty(e) && t.test(e) && delete i[e];
        else
            delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (t, e) {
        var n, i, o, r, s = this.getListenersAsObject(t);
        for (o in s)
            if (s.hasOwnProperty(o))
                for (i = s[o].length; i--;)
                    n = s[o][i], n.once === !0 && this.removeListener(t, n.listener), r = n.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define(function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
}(window, function (t, e, n) {
    "use strict";
    function i(t, e) {
        for (var n in e)
            t[n] = e[n];
        return t
    }
    function o(t) {
        return "[object Array]" === d.call(t)
    }
    function r(t) {
        var e = [];
        if (o(t))
            e = t;
        else if ("number" == typeof t.length)
            for (var n = 0, i = t.length; i > n; n++)
                e.push(t[n]);
        else
            e.push(t);
        return e
    }
    function s(t, e, n) {
        if (!(this instanceof s))
            return new s(t, e);
        "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = i({}, this.options), "function" == typeof e ? n = e : i(this.options, e), n && this.on("always", n), this.getImages(), l && (this.jqDeferred = new l.Deferred);
        var o = this;
        setTimeout(function () {
            o.check()
        })
    }
    function a(t) {
        this.img = t
    }
    function c(t) {
        this.src = t, f[t] = this
    }
    var l = t.jQuery, u = t.console, h = "undefined" != typeof u, d = Object.prototype.toString;
    s.prototype = new e, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var t = 0, e = this.elements.length; e > t; t++) {
            var n = this.elements[t];
            "IMG" === n.nodeName && this.addImage(n);
            var i = n.nodeType;
            if (i && (1 === i || 9 === i || 11 === i))
                for (var o = n.querySelectorAll("img"), r = 0, s = o.length; s > r; r++) {
                    var a = o[r];
                    this.addImage(a)
                }
        }
    }, s.prototype.addImage = function (t) {
        var e = new a(t);
        this.images.push(e)
    }, s.prototype.check = function () {
        function t(t, o) {
            return e.options.debug && h && u.log("confirm", t, o), e.progress(t), n++, n === i && e.complete(), !0
        }
        var e = this, n = 0, i = this.images.length;
        if (this.hasAnyBroken = !1, !i)
            return void this.complete();
        for (var o = 0; i > o; o++) {
            var r = this.images[o];
            r.on("confirm", t), r.check()
        }
    }, s.prototype.progress = function (t) {
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
        var e = this;
        setTimeout(function () {
            e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
        })
    }, s.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var e = this;
        setTimeout(function () {
            if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                var n = e.hasAnyBroken ? "reject" : "resolve";
                e.jqDeferred[n](e)
            }
        })
    }, l && (l.fn.imagesLoaded = function (t, e) {
        var n = new s(this, t, e);
        return n.jqDeferred.promise(l(this))
    }), a.prototype = new e, a.prototype.check = function () {
        var t = f[this.img.src] || new c(this.img.src);
        if (t.isConfirmed)
            return void this.confirm(t.isLoaded, "cached was confirmed");
        if (this.img.complete && void 0 !== this.img.naturalWidth)
            return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var e = this;
        t.on("confirm", function (t, n) {
            return e.confirm(t.isLoaded, n), !0
        }), t.check()
    }, a.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emit("confirm", this, e)
    };
    var f = {};
    return c.prototype = new e, c.prototype.check = function () {
        if (!this.isChecked) {
            var t = new Image;
            n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.src, this.isChecked = !0
        }
    }, c.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, c.prototype.onload = function (t) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(t)
    }, c.prototype.onerror = function (t) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
    }, c.prototype.confirm = function (t, e) {
        this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
    }, c.prototype.unbindProxyEvents = function (t) {
        n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
    }, s
}), function (t, e) {
    "$:nomunge";
    var n, i = t.jQuery || t.Cowboy || (t.Cowboy = {});
    i.throttle = n = function (t, n, o, r) {
        function s() {
            function i() {
                c = +new Date, o.apply(l, h)
            }
            function s() {
                a = e
            }
            var l = this, u = +new Date - c, h = arguments;
            r && !a && i(), a && clearTimeout(a), r === e && u > t ? i() : n !== !0 && (a = setTimeout(r ? s : i, r === e ? t - u : t))
        }
        var a, c = 0;
        return "boolean" != typeof n && (r = o, o = n, n = e), i.guid && (s.guid = o.guid = o.guid || i.guid++), s
    }, i.debounce = function (t, i, o) {
        return o === e ? n(t, i, !1) : n(t, o, i !== !1)
    }
}(this), function (t, e) {
    "use strict";
    function n(t) {
        this.callback = t, this.ticking = !1
    }
    function i(e) {
        return e && "undefined" != typeof t && (e === t || e.nodeType)
    }
    function o(t) {
        if (arguments.length <= 0)
            throw new Error("Missing arguments in extend function");
        var e, n, r = t || {};
        for (n = 1; n < arguments.length; n++) {
            var s = arguments[n] || {};
            for (e in s)
                r[e] = "object" != typeof r[e] || i(r[e]) ? r[e] || s[e] : o(r[e], s[e])
        }
        return r
    }
    function r(t) {
        return t === Object(t) ? t : { down: t, up: t }
    }
    function s(t, e) {
        e = o(e, s.options), this.lastKnownScrollY = 0, this.elem = t, this.debouncer = new n(this.update.bind(this)), this.tolerance = r(e.tolerance), this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop
    }
    var a = {
        bind: !!function () {
        }.bind, classList: "classList" in e.documentElement, rAF: !!(t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame)
    };
    t.requestAnimationFrame = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame, n.prototype = {
        constructor: n, update: function () {
            this.callback && this.callback(), this.ticking = !1
        }, requestTick: function () {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
        }, handleEvent: function () {
            this.requestTick()
        }
    }, s.prototype = {
        constructor: s, init: function () {
            return s.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
        }, destroy: function () {
            var t = this.classes;
            this.initialised = !1, this.elem.classList.remove(t.unpinned, t.pinned, t.top, t.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
        }, attachEvent: function () {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        }, unpin: function () {
            var t = this.elem.classList, e = this.classes;
            (t.contains(e.pinned) || !t.contains(e.unpinned)) && (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this))
        }, pin: function () {
            var t = this.elem.classList, e = this.classes;
            t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this))
        }, top: function () {
            var t = this.elem.classList, e = this.classes;
            t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this))
        }, notTop: function () {
            var t = this.elem.classList, e = this.classes;
            t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this))
        }, getScrollY: function () {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (e.documentElement || e.body.parentNode || e.body).scrollTop
        }, getViewportHeight: function () {
            return t.innerHeight || e.documentElement.clientHeight || e.body.clientHeight
        }, getDocumentHeight: function () {
            var t = e.body, n = e.documentElement;
            return Math.max(t.scrollHeight, n.scrollHeight, t.offsetHeight, n.offsetHeight, t.clientHeight, n.clientHeight)
        }, getElementHeight: function (t) {
            return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
        }, getScrollerHeight: function () {
            return this.scroller === t || this.scroller === e.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        }, isOutOfBounds: function (t) {
            var e = 0 > t, n = t + this.getViewportHeight() > this.getScrollerHeight();
            return e || n
        }, toleranceExceeded: function (t, e) {
            return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e]
        }, shouldUnpin: function (t, e) {
            var n = t > this.lastKnownScrollY, i = t >= this.offset;
            return n && i && e
        }, shouldPin: function (t, e) {
            var n = t < this.lastKnownScrollY, i = t <= this.offset;
            return n && e || i
        }, update: function () {
            var t = this.getScrollY(), e = t > this.lastKnownScrollY ? "down" : "up", n = this.toleranceExceeded(t, e);
            this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(t, n) ? this.unpin() : this.shouldPin(t, n) && this.pin(), this.lastKnownScrollY = t)
        }
    }, s.options = { tolerance: { up: 0, down: 0 }, offset: 0, scroller: t, classes: { pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", initial: "headroom" } }, s.cutsTheMustard = "undefined" != typeof a && a.rAF && a.bind && a.classList, t.Headroom = s
}(window, document), function (t) {
    t && (t.fn.headroom = function (e) {
        return this.each(function () {
            var n = t(this), i = n.data("headroom"), o = "object" == typeof e && e;
            o = t.extend(!0, {}, Headroom.options, o), i || (i = new Headroom(this, o), i.init(), n.data("headroom", i)), "string" == typeof e && i[e]()
        })
    }, t("[data-headroom]").each(function () {
        var e = t(this);
        e.headroom(e.data())
    }))
}(window.Zepto || window.jQuery), jQuery(function (t) {
    "use strict";
    var e = t(window), n = t(".headerMenu"), i = t(".navbar-collapse"), o = function () {
        n.headroom({ offset: Math.floor(.15 * e.height()), tolerance: 10 }), n.data("headroom").init(), n.on("hover", function () {
            var t = n.data("headroom");
            t && t.pin()
        })
    }, r = function () {
        var t = n.data("headroom");
        n.off("hover"), t && t.destroy()
    };
    o(), i.on("show.bs.collapse", r), i.on("hide.bs.collapse", o);
    var s = t('.headerMenu a[href="#contact"]'), a = t("#contact");
    s.click(function (i) {
        i.preventDefault();
        var o;
        o = e.width() >= 960 ? a.offset().top : a.offset().top - n.height(), t("html, body").animate({ scrollTop: o }, 250)
    })
}(jQuery));
