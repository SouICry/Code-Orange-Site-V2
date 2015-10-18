// TODO: Scroll buttons for slider for desktop

//TODO: gallery maximize on click, close and reset title on it.

//TODO: header shrink  z-index toggle to hide other one

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
                return null; //Error code
            }
        }
    };

    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path), true);
    xhr.send();
}


function ajaxLoadContent(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
            else {
                return null; //Error code
            }
        }
    };
    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path + "/content.htm"), true);

    xhr.send();
}

var nav;
ajaxLoad("nav.json", function (text) {
    nav = JSON.parse(text);
});


var currURL = trimForwardSlash(window.location.pathname);
history.replaceState({"url": currURL}, "", "/" + currURL);
filterLinks();

function setHeaderScroll() {

    if (document.getElementById("fullpage") !== null) {

    }
    else {
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
    setHeaderScroll();

}


setHeaderHeight();
window.addEventListener("resize", setHeaderHeight, false);

var navItems1 = null;
var navItems2 = null;
function highlightActiveNav() {
    var c = currURL.split("/");

    if (c.length > 0) {
        navItems1 = document.querySelectorAll("[data-nav='" + c[0] + "']");
        for (var i1 = 0; i1 < navItems1.length; i1++) {
            navItems1[i1].className = "selected";
        }
    }
    if (c.length > 1) {
        navItems2 = document.querySelectorAll("[data-nav='" + c[1] + "']");
        for (var i2 = 0; i2 < navItems2.length; i2++) {
            navItems2[i2].className = "selected";
        }
    }
}
function clearActiveSelection() {
    if (navItems2 !== null) {
        for (var i = 0; i < navItems2.length; i++) {
            navItems2[i].className = "";
        }
    }
}
function clearActiveNav() {
    if (navItems1 !== null) {
        for (var i = 0; i < navItems1.length; i++) {
            navItems1[i].className = "";
        }
    }
}

highlightActiveNav();


function goToPage(path) {
    currURL = path;
    history.pushState({"url": path}, "", "/" + path);
    setHeaderHeight();

}
function goBackPage(path) {
    currURL = path;
}

function error() {
    closeBody(function () {
        closeSelectionBar(function () {
            ajaxLoadContent("Error", openBody);
            goToPage("Error");
        });
    });
}

function getMenuItem(name) {
    for (var i = 0; i < nav['menu-items'].length; i++) {
        if (nav['menu-items'][i].name === name) {
            return nav['menu-items'][i];
        }
    }
    return null;
}

function menuItemExists(name) {
    for (var i = 0; i < nav['menu-items'].length; i++) {
        if (nav['menu-items'][i].name === name) {
            return true;
        }
    }
    return false;
}
function menuPageExists(menuName, pageName) {
    for (var i = 0; i < nav['menu-items'].length; i++) {
        if (nav['menu-items'][i].name === menuName) {
            var pages = nav['menu-items'][i]['pages'];
            for (var j = 0; j < pages.length; j++) {
                if (pages[j] === pageName) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}
function unlistedItemExists(name) {
    for (var i = 0; i < nav['unlisted-items'].length; i++) {
        if (nav['unlisted-items'][i].name === name) {
            return true;
        }
    }
    return false;
}

/*
 * Routes:
 * [empty] - loads index
 * top-level-menu/content //default
 * top-level-menu - Redirect to default page (first page in the section)
 * orphans (listed or unlisted, include error, index)
 * does-not-exist (check nav.json) - error (or DNE)
 */
function loadURL(newURL, statePopped) {
    try {
        newURL = trimForwardSlash(newURL);

        //Does not reload same page
        if (currURL !== newURL) {
            var c = currURL.split("/");
            //Manually typed in top level menu selection page, just loads new page
            if (c.length === 1 && menuItemExists(c[0])) {
                window.location.href = "/" + newURL;
            }
            //Body cleared no matter what
            closeBody(function () {
                //Index
                if (newURL.length == 0) {
                    clearActiveNav();
                    closeSelectionBar(function () {
                        ajaxLoadContent(newURL, openBody);
                    });
                }
                else {
                    var n = newURL.split("/");

                    //Page without selection-bar
                    if (n.length == 1) {
                        clearActiveNav();
                        //Redirects to first page if top level menu
                        if (menuItemExists(n[0])) {
                            newURL = n[0] + "/" + getMenuItem(n[0])['pages'][0];
                            window.location.href = "/" + newURL;
                            return false;
                        }
                        closeSelectionBar(function () {

                            if (unlistedItemExists(n[0])) {
                                ajaxLoadContent(n[0], openBody);
                            }
                            else {
                                error();
                            }
                        });
                    }
                    //Page with selection bar
                    else if (n.length == 2) {
                        if (menuPageExists(n[0], n[1])) {
                            var c = currURL.split("/");
                            //Same menu item
                            if (c.length == 2 && c[0] === n[0]) {
                                clearActiveSelection();
                                ajaxLoadContent(newURL, openBody);
                            }
                            //Different menu item
                            else {
                                clearActiveNav();
                                closeSelectionBar(function () {
                                    ajaxLoadContent(n[0], openSelectionBar);
                                    setTimeout(function () {
                                        ajaxLoadContent(newURL, openBody);
                                    }, 300);
                                });
                            }
                        }
                        else {
                            error();
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
    catch (err) {
        //TODO: remove this in production
        throw err;
        //error();
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


fixSelectionBarWidth();

function fixSelectionBarWidth(){
    var slide = $('.slider .scroll-fix');
    if (slide.length) {
        var children = slide.first().children();
        slide.width(children.first().width() * children.length);
    }
}

function closeBody(callback) {
    var body = document.getElementById("body");
    body.style.opacity = 0;
    body.style.transform = "translateY(200px)";
    body.style.height = '1000px';
    window.scrollTo(0, 0);
    setTimeout(function () {
        if (document.getElementById("fullpage") !== null) {
            $.fn.fullpage.destroy('all');
        }
        callback();
    }, 300);
}
function openBody(innerHTML) {
    var body = document.getElementById("body");
    body.innerHTML = innerHTML;
    checkLoadCarousel();

    body.style.opacity = 1;
    body.style.transform = "translateY(0px)";
    body.style.height = 'auto';
    //highlightActiveNav();
    filterLinks();
    setHeaderScroll();
    highlightActiveNav();
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
    var s = document.getElementById("selection-bar");
    var s1 = document.getElementById("selection-bar-filler");
    s.innerHTML = innerHTML;
    s1.innerHTML = innerHTML;

    s.style.opacity = 1;
    s.style.transform = "translateY(0)";
    s1.style.opacity = 1;
    s1.style.transform = "translateY(0)";
    highlightActiveNav();
    fixSelectionBarWidth();
}




