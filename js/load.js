//TODO: page section manafer

//TODO: change page layout fullpage - content

//TODO: image upload

//TODO: add fittext support for carousel titles/titles on phones. Center instead on larger devices
//Probably just gonna center dual float like fullpage title.

//Gets the redirect path if top level menu item entered
var nav_items = $('#nav-menu-filler .scroll-fix a').not('.manage-button').not('.slider-filler');
function getTopLevelRedirectPath(name) {
    for (var i = 0; i < nav_items.length; i++) {
        if ($(nav_items[i]).data('nav') == name) {
            return $(nav_items[i]).attr('href');
        }
    }
    return null;
}

var currURL = trimForwardSlash(window.location.pathname);
if (currURL.indexOf('/') < 0) {
    var path = getTopLevelRedirectPath(currURL);
    if (path != null) {
        window.location.href = path;
    }
}


//From underscore.js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


function fullpageInit() {
    if (document.getElementById("fullpage") !== null) {
        $('#fullpage').fullpage({
            navigation: true,
            fitToSection: false,
            //scrollBar: true,
            scrollingSpeed: 1000,
            responsiveWidth: 1024
        });
    }
}
function moveSectionDown() {
    $.fn.fullpage.moveSectionDown();
}
$(document).ready(function () {
    fullpageInit();
});


window.onpopstate = pop;

function pop(event) {
    loadURL(event.state['url'], true);
}

function load(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;
    loadURL(this.getAttribute("href"), false);
}

function filterLinks() {
    var elements = document.getElementsByTagName("a");
    for (var i = 0; i < elements.length; i++) {
        if ((elements[i].href.indexOf("teamcodeorange.com") >= 0
            || elements[i].href.indexOf("localhost") >= 0)
            && elements[i].href.indexOf("#") != elements[i].href.length - 1
            && elements[i].href.indexOf("php") < 0) {


            elements[i].removeEventListener('click', load, false);
            elements[i].addEventListener('click', load, false);
        }
    }
}

function ajaxLoad(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
            else {
                error();
            }
        }
    };

    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path), true);
    xhr.send();
}


function ajaxLoadContent(path, callback) {
    if (path.length > 0) {
        path += "/";
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
            else {
                error();
            }
        }
    };
    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path + "content.htm"), true);

    xhr.send();
}


//history.replaceState({"url": currURL}, "", "/" + currURL);
filterLinks();


//Header hide/show on scroll
var header_height = 210;
var headScroll = null;
function setHeaderScroll() {
    setHeaderHeight();
    var elem = document.querySelector("#header");
    elem.style.top = "-" + header_height + "px";
    headScroll = new Headroom(elem, {
        "offset": header_height,
        "tolerance": 0,
        "classes": {
            "initial": "headroom",
            "pinned": "headroom--pinned",
            "unpinned": "headroom--unpinned",
            "top": "headroom--top",
            "notTop": "headroom--not-top"
        }
    });
    headScroll.init();
}
function setHeaderHeight() {
    var c = currURL.split("/");

    if (c.length < 2) {
        if (window.outerWidth > 1024)
            header_height = 50;
        else
            header_height = 100;
    }
    else {
        header_height = 210;
    }
}

setHeaderScroll();
window.addEventListener("resize", debounce(function () {
    setHeaderScroll();
}, 250), false);

//Syncs two header scrolling

function syncHeaderScroll() {
    var scroll1 = $('#selection-bar .scroll-hide');
    var scroll2 = $('#selection-bar-filler .scroll-hide');
    var scroll3 = $('#nav-menu .scroll-hide');
    var scroll4 = $('#nav-menu-filler .scroll-hide');
    var header = $('#header');

    scroll1.off('scroll').scroll(debounce(function () {
        if (header.hasClass('headroom--not-top')) {
            scroll2.scrollLeft(scroll1.scrollLeft());
        }
    }, 100));
    scroll2.off('scroll').scroll(debounce(function () {
        if (header.hasClass('headroom--top')) {
            scroll1.scrollLeft(scroll2.scrollLeft());
        }
    }, 100));
    scroll3.off('scroll').scroll(debounce(function () {
        if (header.hasClass('headroom--not-top')) {
            scroll4.scrollLeft(scroll3.scrollLeft());
        }
    }, 100));
    scroll4.off('scroll').scroll(debounce(function () {
        if (header.hasClass('headroom--top')) {
            scroll3.scrollLeft(scroll4.scrollLeft());
        }
    }, 100));
}
syncHeaderScroll();

//Sets selection bar width to be all elements + 20px on load and resize.

function fixHeaderWidth() {
    var width;
    var slide = $('.selection-nav .scroll-fix');
    if (slide.length) {
        width = 20;
        $(slide[0]).children().each(function () {
            width += $(this).outerWidth(true);
        });
        slide.width(width);

        var selectionnav = $('.selection-nav');
        //Toggles scroll buttons
        if (width > selectionnav.outerWidth()) {
            if (!selectionnav.hasClass('show')) {
                selectionnav.addClass('show');
            }
        }
        else {
            if (selectionnav.hasClass('show')) {
                selectionnav.removeClass('show');
            }
        }
    }

    slide = $('.nav-nav .scroll-fix');
    if (slide.length) {
        width = 20;
        $(slide[0]).children().each(function () {
            width += $(this).outerWidth(true);
        });
        slide.width(width);

        var navnav = $('.nav-nav');
        //Toggles scroll buttons
        if (width > navnav.outerWidth()) {
            if (!navnav.hasClass('show')) {
                navnav.addClass('show');
            }
        }
        else {
            if (navnav.hasClass('show')) {
                navnav.removeClass('show');
            }
        }
    }
}
fixHeaderWidth();
$(window).resize(debounce(function () {
    fixHeaderWidth();
}, 100));


function bindSelectionBarScroll() {
    var selectionNav = $('.selection-nav .scroll-hide');



    function selectionNavScrollLeft() {
        var amt = selectionNav.width() / 3 * 2;
        if (amt > 1000){
            amt = 1000;
        }
        selectionNav.animate({scrollLeft: ('-=' + amt)}, 500);
    }

    function selectionNavScrollRight() {
        var amt = selectionNav.width() / 3 * 2;
        if (amt > 1000){
            amt = 1000;
        }
        selectionNav.animate({scrollLeft: ('+=' + amt)}, 500);
    }

    function selectionNavScrollStop() {
        selectionNav.stop();
    }

    var selectionSlideButtons = $('.selection-nav .slider-left, .selection-nav .slider-right');
    $('.selection-nav').hover(function () {
        selectionSlideButtons.css('background-color', 'rgba(255,152,0,0.6)');
    }, function () {
        selectionSlideButtons.css('background-color', 'rgba(251,140,0,0.6)');
    });

    $('.selection-nav .slider-left').click(selectionNavScrollLeft);
    $('.selection-nav .slider-right').click(selectionNavScrollRight);
}

function bindNavBarScroll() {
    var navNav = $('.nav-nav .scroll-hide');


    function navNavScrollLeft() {
        var amt = navNav.width() / 3 * 2;
        if (amt > 1000){
            amt = 1000;
        }
        navNav.animate({scrollLeft: '-=' + amt}, 500);
    }

    function navNavScrollRight() {
        var amt = navNav.width() / 3 * 2;
        if (amt > 1000){
            amt = 1000;
        }
        navNav.animate({scrollLeft: '+=' + amt}, 500);
    }

    function navNavScrollStop() {
        navNav.stop();
    }


    var navSlideButtons = $('.nav-nav .slider-left, .nav-nav .slider-right');
    $('.nav-nav').hover(function () {
        navSlideButtons.css('background-color', 'rgba(245,124,0,0.6)');
    }, function () {
        navSlideButtons.css('background-color', 'rgba(239,108,0,0.6)');
    });

    $('.nav-nav .slider-left').click(navNavScrollLeft);
    $('.nav-nav .slider-right').click(navNavScrollRight);
}

bindNavBarScroll();
bindSelectionBarScroll();


//Highlights(underlines) the active nav/selection bar items
var navItems1 = null;
var navItems2 = null;
function highlightActiveNav() {
    //Removes new to mark for clearing to clear later
    //var oldItems = document.querySelectorAll(".selected.new");
    //if (oldItems != null) {
    //    for (var i3 = 0; i3 < oldItems.length; i3++) {
    //        oldItems[i3].className = "selected old";
    //    }
    //}
    $('.selected.new').addClass('selected old');


    //Marks or re-marks valid selections
    var c = currURL.split("/");
    if (c.length > 0) {
        //navItems1 = document.querySelectorAll("[data-nav='" + c[0] + "']");
        //for (var i1 = 0; i1 < navItems1.length; i1++) {
        //    navItems1[i1].className = "selected new";
        //}
        $("[data-nav='" + c[0] + "']").addClass('selected new');
    }
    if (c.length > 1) {
        //navItems2 = document.querySelectorAll("[data-nav='" + c[1] + "']");
        //for (var i2 = 0; i2 < navItems2.length; i2++) {
        //    navItems2[i2].className = "selected new";
        //}
        $("[data-nav='" + c[1] + "']").addClass('selected new');
    }

    //Clears still remaining old selections
    //oldItems = document.querySelectorAll(".selected.old");
    //if (oldItems != null) {
    //    for (var i4 = 0; i4 < oldItems.length; i4++) {
    //        oldItems[i4].className = "";
    //    }
    //}
    $('.selected.old').removeClass('selected old');

}
highlightActiveNav();

//Selects on click

function bindSelectOnClick() {
    //var selectable = document.querySelectorAll('.scroll-fix a');
    //for (var ii5 = 0; ii5 < selectable.length; ii5++) {
    //    selectable[ii5].onclick = function () {
    //        this.className = "selected";
    //    }
    //}
    $('.scroll-fix a').click(function(){
        $(this).addClass('selected');
    })

}
bindSelectOnClick();


//Routing helpers
function goToPage(path) {
    currURL = path;
    history.pushState({"url": path}, "", "/" + path);

}
function goBackPage(path) {
    currURL = path;
}

//Loads error page. Replaces state so it doesn't cause a back button loop
function error() {
    closeBody(function () {
        closeSelectionBar(function () {
            ajaxLoadContent("Error", openBody);
            currURL = "Error";
            history.replaceState({"url": "Error"}, "", "/Error");
        });
    });
}


//Actual routing function
/*
 * Routes:
 * [empty] - loads index
 * top-level-menu/content //default
 * top-level-menu - Redirect to default page (first page in the section)
 * orphans (listed or unlisted, include error, index)
 */
function loadURL(newURL, statePopped) {

    newURL = trimForwardSlash(newURL);

    //Does not reload same page
    if (currURL !== newURL) {
        //Manually typed in top level menu selection page, just loads new page
        //if (c.length == 1 && menuItemExists(c[0])) {
        //    window.location.href = "/" + newURL;
        //}
        //Body cleared no matter what
        closeBody(function () {
            //Index
            if (newURL.length == 0) {
                //clearActiveNav();
                closeSelectionBar(function () {
                    ajaxLoadContent(newURL, function (a) {
                        openBody(a);
                        setHeaderScroll();
                    });
                });
            }
            else {
                var n = newURL.split("/");

                //Page without selection-bar
                if (n.length == 1) {
                    //clearActiveNav();
                    var redirect = getTopLevelRedirectPath(n[0]);

                    //Redirects to first page if top level menu
                    if (redirect != null) {
                        window.location.href = redirect;
                        return false;
                    }
                    closeSelectionBar(function () {
                        ajaxLoadContent(n[0], function (a) {
                            openBody(a);
                            setHeaderScroll();
                        });
                    });
                }
                //Page with selection bar
                else if (n.length == 2) {
                    var c = currURL.split("/");
                    //Same menu item
                    if (c.length == 2 && c[0] === n[0]) {
                        //clearActiveSelection();
                        ajaxLoadContent(newURL, function (a) {
                            openBody(a);
                            setHeaderScroll();
                        });
                    }
                    //Different menu item
                    else {
                        //clearActiveNav();
                        closeSelectionBar(function () {
                            ajaxLoadContent(n[0], function (a) {
                                openSelectionBar(a);
                                setHeaderScroll();
                            });
                            setTimeout(function () {
                                ajaxLoadContent(newURL, function (a) {
                                    openBody(a);
                                });
                            }, 300);
                        });
                    }
                }
                else {
                    error();
                }
            }
            if (!statePopped) {
                goToPage(newURL);
            }
            else {
                goBackPage(newURL);
            }
        });
    }

}


function trimForwardSlash(stringToTrim) {
    if (stringToTrim.charAt(0) === "/") {
        stringToTrim = stringToTrim.substr(1);
    }
    if (stringToTrim.charAt(stringToTrim.length - 1) === "/") {
        stringToTrim = stringToTrim.substr(0, stringToTrim.length - 1);
    }
    return stringToTrim;
}

function trimForwardSlashAndFileName(stringToTrim) {
    if (stringToTrim.charAt(0) === "/") {
        stringToTrim = stringToTrim.substr(1);
    }
    if (stringToTrim.indexOf("/") < 0) {
        return "";
    }
    if (stringToTrim.lastIndexOf(".") > stringToTrim.lastIndexOf("/")) {
        return stringToTrim.substring(0, stringToTrim.lastIndexOf("/"));
    }
    return stringToTrim;
}


//Closes (and clears content) or opens (and displays content) for body/selection bar
function closeBody(callback) {
    var body = document.getElementById("body");
    body.style.opacity = 0;
    body.style.transform = "translateY(200px)";
    body.style.height = '1337px';
    window.scrollTo(0, 0);
    setTimeout(function () {
        if (document.getElementById("fullpage") !== null) {
            $.fn.fullpage.destroy('all');
        }
        callback();
    }, 300);
}
function openBody(innerHTML) {
    highlightActiveNav();
    var body = document.getElementById("body");
    body.innerHTML = innerHTML;
    checkLoadCarousel();

    body.style.opacity = 1;
    body.style.transform = "translateY(0px)";
    body.style.height = 'auto';
    filterLinks();


    fullpageInit();
}
function closeSelectionBar(callback) {
    var s = document.getElementById("selection-bar");
    var s1 = document.getElementById("selection-bar-filler");

    s.style.opacity = 0;
    s.style.transform = "translateY(-200px)";
    s1.style.opacity = 0;
    s1.style.transform = "translateY(-200px)";
    setTimeout(function () {
        s.innerHTML = "";
        s1.innerHTML = "";
        callback();
    }, 300);
}
function openSelectionBar(innerHTML) {
    highlightActiveNav();
    var s = document.getElementById("selection-bar");
    var s1 = document.getElementById("selection-bar-filler");
    s.innerHTML = '<div class="slider-left"><span></span></div>' + innerHTML + '<div class="slider-right"><span></span></div>';
    s1.innerHTML = '<div class="slider-left"><span></span></div>' + innerHTML + '<div class="slider-right"><span></span></div>';
    s.style.opacity = 1;
    s.style.transform = "translateY(0)";
    s1.style.opacity = 1;
    s1.style.transform = "translateY(0)";

    fixHeaderWidth();
    syncHeaderScroll();
    bindSelectionBarScroll();
    bindSelectOnClick();
}


//Scrolls to given jQuery element
function scrollToElement(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 1000);
}


//Loads editor. Functions are here, but server requires user tokens to actually perform changes
function checkLoadEdit() {
    var t = trimForwardSlashAndFileName(currURL);
    if (arguments.length > 0 && (typeof arguments[0] === 'string' || arguments[0] instanceof String)){
        t = arguments[0];
    }
    var slasht = '/' + t;
    if (t.length == 0) {
        slasht = '';
    }

    if (currURL.indexOf('edit.php') >= 0 && (arguments.length == 0 || !(typeof arguments[0] === 'string' || arguments[0] instanceof String)) ) {
        window.location.href = (slasht + "/" + "edit.php?edit=true");
    }
    else {

        var path = (t.length < 1 ? "content-edit.htm" : t + "/content-edit.htm");
        $.ajax({
            type: "post",
            url: "/php/file-exists.php",
            data: "data=" + JSON.stringify({
                "filePath": path
            }),
            success: function (msg) {
                if (msg === "true") {
                    modalConfirm("An unpublished save file already exists for this page. Click OK to load the saved file, or click cancel " +
                        "to discard it and load the current page", function (choice) {
                        if (choice) {
                            window.location.href = (slasht + "/" + "edit.php?edit=true");
                        }
                        else {
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        window.location.href = (slasht + "/" + "edit.php?edit=true");
                                    }
                                    else {
                                        error();
                                    }
                                }
                            };
                            xhr.open("GET", "/php/load-content-edit.php?url=" + encodeURIComponent(t), true);
                            xhr.send();
                        }
                    });
                }
                else {
                    var xhr1 = new XMLHttpRequest();
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == 4) {
                            if (xhr1.status == 200) {
                                window.location.href = (slasht + "/" + "edit.php?edit=true");
                            }
                            else {
                                error();
                            }
                        }
                    };
                    xhr1.open("GET", "/php/load-content-edit.php?url=" + encodeURIComponent(t), true);
                    xhr1.send();
                }
            }
        });
    }
}

$('.edit-button').click(checkLoadEdit);
