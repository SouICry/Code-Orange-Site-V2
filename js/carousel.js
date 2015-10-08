//Carousel mouse/touch drag script based on cssSlider gesture.js from cssSlider - http://cssSlider.com/
//Removed all code related to the extra drag layer (which enabled infinite loop, but was unnecessarily laggy and jumps).
//Default autoplay is disabled and rewritten to be js instead of css to fix jumping problem (js is php generated).


function s(e, s) {
    if (!e)return [];
    for (var t = [], i = new RegExp("(^| )" + s + "( |\\d|$)"), a = e.getElementsByTagName("*"), r = 0, n = a.length; n > r; r++)i.test(a[r].className) && t.push(a[r]);
    return t
}

function t(e, s) {
    var t = new RegExp("(^|\\s)" + s + "(\\s|$)", "g");
    return t.test(e.className) || (e.className = (e.className + " " + s).replace(/\s+/g, " ").replace(/(^ | $)/g, "")), e
}

function r(e, s, t) {
    if (e) {
        s = s.split(" ");
        for (var i in s)e.addEventListener(s[i], t, !1)
    }
}

var n = function (t, i) {
    this.$slider = t, this.options = i, this.$radios = s(this.$slider, "cs_anchor slide"), this.checked = 0, this.init()
};
n.DEFAULT = {speed: 300, minDistance: 15}, n.prototype = {
    init: function () {
        t(this.$slider, "cs_handle"), this.startSwipes();

    }, startSwipes: function () {
        var s = this, n = 0, o = 0, c = s.$slider.clientWidth;
        r(s.$slider, "mousedown touchstart", function (e) {
            if (!/cs_play_pause|cs_arrowprev|cs_arrownext|cs_bullets|cs_thumb/g.test(e.target.parentNode.className) && !/cs_bullets/g.test(e.target.parentNode.parentNode.className)) {
                n = (e.touches ? e.touches[0] : e).pageX, o = 0, e.stopPropagation(), e.touches || e.preventDefault(), c = s.$slider.clientWidth;
                for (var i in s.$radios)if (s.$radios[i].checked) {
                    s.checked = i;
                    break
                }
                s.$radios[s.checked].checked = !0
            }
        }), r(document, "mousemove touchmove", function (e) {
            if (n) {
                var i = (e.touches ? e.touches[0] : e).pageX;
                e.stopPropagation(), o = i - n >= c ? c + n : -c >= i - n ? -c + n : i
            }
        }), r(document, "mouseup touchend", function (e) {
            if (n) {
                o && (e.preventDefault(), e.stopPropagation());
                var t = n - o, r = 0;
                if (o && Math.max(t, -1 * t) > s.options.minDistance) {
                    for (var d in s.$radios)if (s.$radios[d].checked) {
                        t > 0 && d < s.$radios.length - 1 ? s.checked = 1 * d + 1 : 0 > t && d > 0 ? s.checked = 1 * d - 1 : 0 > t ? (r = -1, s.checked = s.$radios.length - 1) : (r = s.$radios.length, s.checked = 0);
                        break
                    }
                    s.$radios[s.checked].checked = !0
                }
                o = 0, n = 0
            }
        })
    }
};

var carousel = null;
var timer = null;
function checkLoadCarousel() {
    var c = document.getElementById("carousel");
    if (c !== null) {
        carousel = new n(c, n.DEFAULT)
    }
    else {
        carousel = null;
    }

    //Touch or mousedown to access carousel
    var el1 = document.querySelector('.carousel .btn');
    var el2 = document.querySelector('.carousel .title');
    function hide() {
        el2.style.display = "none";
    }
    if (el1 !== null) {
        el1.removeEventListener("mousedown", hide, false);
        el1.removeEventListener("touchstart", hide, false);
        el1.addEventListener("mousedown", hide, false);
        el1.addEventListener("touchstart", hide, false);
    }

    //Autoplay
    if (timer !== null){
        clearInterval(timer);
    }
    var slideCount = 1;

    function moveRight() {
        var list = document.querySelectorAll('cs_anchor:checked');
        for (var i = 0; i < list.length; i++){
            list[i].checked = false;
        }
        if (slideCount >= maxSlideCount){
            slideCount = 0;
        }
        document.getElementById('cs_slide_' + slideCount++).checked = true;
    }

    timer = setInterval(moveRight, 5000);
    function stopAutoplay(){
        window.clearInterval(timer);
    }
    var el = document.getElementById('carousel');
    el.removeEventListener('mousedown', stopAutoplay, false);
    el.removeEventListener('touchstart', stopAutoplay, false);
    el.addEventListener('mousedown', stopAutoplay, false);
    el.addEventListener('touchstart', stopAutoplay, false);




}
r(window, "load", checkLoadCarousel);







