// Carousel drag-touch script from cssSlider - http://cssSlider.com/
!function (e) {
    function s(e, s) {
        if (!e)return [];
        for (var t = [], i = new RegExp("(^| )" + s + "( |\\d|$)"), a = e.getElementsByTagName("*"), r = 0, n = a.length; n > r; r++)i.test(a[r].className) && t.push(a[r]);
        return t
    }

    function t(e, s) {
        var t = new RegExp("(^|\\s)" + s + "(\\s|$)", "g");
        return t.test(e.className) || (e.className = (e.className + " " + s).replace(/\s+/g, " ").replace(/(^ | $)/g, "")), e
    }

    function i(e, s) {
        var t = new RegExp("(^|\\s)" + s + "(\\s|$)", "g");
        return e.className = e.className.replace(t, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, ""), e
    }

    function a(e, s) {
        for (var t in s)e.style[t] = s[t]
    }

    function r(e, s, t) {
        if (e) {
            s = s.split(" ");
            for (var i in s)e.addEventListener(s[i], t, !1)
        }
    }

    if (!window.cssSliderGestures && (window.cssSliderGestures = 1, !e.all || window.atob)) {
        var n = function (t, i) {
            this.$slider = t, this.options = i, this.$images = s(this.$slider.getElementsByTagName("ul")[0], "img"), this.$gesturesCont = e.createElement("div"), this.$gesturesWrap = e.createElement("div"), this.$radios = s(this.$slider, "cs_anchor slide"), this.$allRadios = s(this.$slider, "cs_anchor"), this.checked = 0, this.init()
        };
        n.DEFAULT = {speed: 300, minDistance: 15}, n.prototype = {
            init: function () {
                t(this.$slider, "cs_handle"), this.prepareGesturesConainer(), this.startSwipes();
                var e = this;
                for (var s in e.$allRadios)(function (s) {
                    r(e.$allRadios[s], "change", function () {
                        s != e.checked && i(e.$gesturesWrap, "cs_show")
                    })
                })(s)
            }, prepareGesturesConainer: function () {
                t(this.$gesturesWrap, "cs_gestures"), this.$gesturesWrap.appendChild(this.$gesturesCont), this.$slider.appendChild(this.$gesturesWrap), this.$gesturesCont.appendChild(t(this.$images[this.$images.length - 1].getElementsByTagName("img")[0].cloneNode(), "cs_first_img"));
                for (var e in this.$images)this.$gesturesCont.appendChild(this.$images[e].getElementsByTagName("img")[0].cloneNode());
                this.$gesturesCont.appendChild(t(this.$images[0].getElementsByTagName("img")[0].cloneNode(), "cs_last_img"))
            }, startSwipes: function () {
                var s = this, n = 0, o = 0, c = s.$slider.clientWidth;
                r(s.$slider, "mousedown touchstart", function (e) {
                    if (!/cs_play_pause|cs_arrowprev|cs_arrownext|cs_bullets|cs_thumb/g.test(e.target.parentNode.className) && !/cs_bullets/g.test(e.target.parentNode.parentNode.className)) {
                        n = (e.touches ? e.touches[0] : e).pageX, o = 0, e.stopPropagation(), e.touches || e.preventDefault(), c = s.$slider.clientWidth;
                        for (var i in s.$radios)if (s.$radios[i].checked) {
                            s.checked = i;
                            break
                        }
                        t(s.$slider, "cs_grab"), s.$radios[s.checked].checked = !0, a(s.$gesturesCont, {
                            WebkitTransition: "",
                            transition: "",
                            WebkitTransform: "translate3d(" + -c * s.checked + "px,0px,0px)",
                            transform: "translate3d(" + -c * s.checked + "px,0px,0px)"
                        })
                    }
                }), r(e, "mousemove touchmove", function (e) {
                    if (n) {
                        var i = (e.touches ? e.touches[0] : e).pageX;
                        e.stopPropagation(), o = i - n >= c ? c + n : -c >= i - n ? -c + n : i, t(s.$gesturesWrap, "cs_show"), a(s.$gesturesCont, {
                            WebkitTransform: "translate3d(" + (-c * s.checked + o - n) + "px,0px,0px)",
                            transform: "translate3d(" + (-c * s.checked + o - n) + "px,0px,0px)"
                        })
                    }
                }), r(e, "mouseup touchend", function (e) {
                    if (n) {
                        o && (e.preventDefault(), e.stopPropagation()), i(s.$slider, "cs_grab");
                        var t = n - o, r = 0;
                        if (o && Math.max(t, -1 * t) > s.options.minDistance) {
                            for (var d in s.$radios)if (s.$radios[d].checked) {
                                t > 0 && d < s.$radios.length - 1 ? s.checked = 1 * d + 1 : 0 > t && d > 0 ? s.checked = 1 * d - 1 : 0 > t ? (r = -1, s.checked = s.$radios.length - 1) : (r = s.$radios.length, s.checked = 0);
                                break
                            }
                            s.$radios[s.checked].checked = !0
                        }
                        var h = Math.max((c + (t > 0 ? -1 : 1) * t) / c, .3);
                        a(s.$gesturesCont, {
                            WebkitTransition: "-webkit-transform " + s.options.speed * h + "ms linear",
                            transition: "transform " + s.options.speed * h + "ms linear",
                            WebkitTransform: "translate3d(" + -c * (r || s.checked) + "px,0px,0px)",
                            transform: "translate3d(" + -c * (r || s.checked) + "px,0px,0px)"
                        }), o = 0, n = 0
                    }
                })
            }
        }, r(window, "load", function () {
            for (var t = s(e.body, "csslider"), i = 0, a = t.length; a > i; i++)new n(t[i], n.DEFAULT)
        })
    }
}(document);