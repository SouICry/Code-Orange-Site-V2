//TODO: Scroll buttons for selection bar slider by device width. Re-hide scrollbar.

//TODO: Sync scrolling and highlighting across two nav menus (both ways)

//TODO: gallery maximize on click, close and reset title on it.

//TODO: add fittext support for carousel titles/titles on phones. Center instead on larger devices

//TODO: fix nav bar not scrolling when scrolled from top (bugginess)

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

var nav;
ajaxLoad("nav.json", function (text) {
    nav = JSON.parse(text);
});


var currURL = trimForwardSlash(window.location.pathname);
//history.replaceState({"url": currURL}, "", "/" + currURL);
filterLinks();

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
window.addEventListener("resize", function () {
    setHeaderScroll()
}, false);

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
                    clearActiveNav();
                    //Redirects to first page if top level menu
                    if (menuItemExists(n[0])) {
                        newURL = n[0] + "/" + getMenuItem(n[0])['pages'][0];
                        window.location.href = "/" + newURL;
                        return false;
                    }
                    closeSelectionBar(function () {

                        if (unlistedItemExists(n[0])) {
                            ajaxLoadContent(n[0], function (a) {
                                openBody(a);
                                setHeaderScroll();
                            });
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
                            ajaxLoadContent(newURL, function (a) {
                                openBody(a);
                                setHeaderScroll();
                            });
                        }
                        //Different menu item
                        else {
                            clearActiveNav();
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


function fixHeaderWidth() {
    var slide = $('.scroll-fix');
    if (slide.length) {
        slide.each(function () {
            var width = 20;
            $(this).children().each(function () {
                width += $(this).outerWidth(true);
            });
            $(this).width(width);
        });
    }
}

fixHeaderWidth();


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
    var body = document.getElementById("body");
    body.innerHTML = innerHTML;
    checkLoadCarousel();

    body.style.opacity = 1;
    body.style.transform = "translateY(0px)";
    body.style.height = 'auto';
    filterLinks();

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
        //s1.style.height = '0';
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
    fixHeaderWidth();
}


function checkLoadEdit() {
    var t = trimForwardSlashAndFileName(currURL);
    var slasht = '/' + t;
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

$('.edit-button').click(checkLoadEdit);
