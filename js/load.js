//
//
// TODO: rewrite with new format, simplified routes and fixes.
// And add animation of course, especially since its simpler
//
// TODO: Scroll buttons for slider for desktop
//
//


//window.onpopstate = pop;
//
//function pop(event){
//    loadURL(event.state['url']);
//}
//
//function filterLinks() {
//    var elements = document.getElementsByTagName("a");
//    for (var i = 0; i < elements.length; i++) {
//        if ((elements[i].href.indexOf("teamcodeorange.com") >= 0
//                || elements[i].href.indexOf("localhost") >= 0)
//            && elements[i].href.indexOf("#") != elements[i].href.length - 1
//            && elements[i].href.indexOf("php") < 0) {
//
//            elements[i].addEventListener('click', function(event){
//                if ( event.preventDefault ) {
//                    event.preventDefault();
//                }
//                event.returnValue = false;
//                loadURL(this.getAttribute("href"));
//            }, false);
//        }
//    }
//}
//
//function ajaxLoad(path, callback) {
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                callback(xhr.responseText);
//            }
//            else {
//                return null; //Error code
//            }
//        }
//    };
//
//    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path), true);
//    xhr.send();
//}
//
//
//function ajaxLoadContent(path, callback) {
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                callback(xhr.responseText);
//            }
//            else {
//                return null; //Error code
//            }
//        }
//    };
//    xhr.open("GET", "/load.php?url=" + encodeURIComponent(path + "/content.htm"), true);
//
//    xhr.send();
//}
//
//
//var nav;
//ajaxLoad("nav.json", function(text){
//
//    nav = JSON.parse(text);
//    var ccc = JSON.parse(text);
//});
//
//
//var currURL = trimForwardSlash(window.location.pathname);
//
//var currPageInfo = {
//    "no-selection": true,
//    "selection-bar": false,
//    "body": true,
//    "selection-type": "none"
//};
//
//updatePageInfo();
//
//filterLinks();
//
//
//function updatePageInfo() {
//    var bar = document.getElementById("selection-bar");
//    if (bar.innerHTML.length == 0) {
//        currPageInfo["selection-bar"] = false;
//    }
//    else {
//        currPageInfo["selection-bar"] = true;
//    }
//    if (document.getElementById("body").innerHTML.length == 0) {
//        currPageInfo["body"] = false;
//    }
//    else {
//        currPageInfo["body"] = true;
//    }
//    if (bar.className.indexOf("selection-content") !== -1) {
//        currPageInfo["selection-type"] = "content";
//    }
//    else if (bar.className.indexOf("selection-nav") !== -1) {
//        currPageInfo["selection-type"] = "nav";
//    }
//    else {
//        currPageInfo["selection-type"] = "none";
//    }
//}
//
///*
// * nav.items contains an array with top level menu items.
// * Every top level menu item has a 'name' and at least one 'section' with name 'default'.
// * Sections list the pages contained.
// * Top level links to direct pages do not have any sections but are items.
// *
// * nav.orphans contains pages that are not in the top level menu or a section
// */
//
//
//
//
//function getNavTopLevel(topLevel) {
//    for (var i = 0; i < nav['items'].length; i++) {
//        if (nav['items'][i].name === topLevel) {
//            return nav['items'][i];
//        }
//     }
//    return null;
//}
///*
// * Returns a second level section with given name, or null if it does not exist
// * Does not include default pages
// */
//function getNavSecondLevel(topLevel, secondLevel) {
//
//    for (var i = 0; i < nav['items'].length; i++) {
//        if (nav['items'][i].name === topLevel) {
//            for (var j = 0; j < nav['items'][i]['sections'].length; j++) {
//                if (nav['items'][i]['sections'][j].name === secondLevel) {
//                    return nav['items'][i]['sections'][j];
//                }
//            }
//            return null;
//        }
//    }
//    return null;
//}
//
//
//
//
//function loadAjaxContent(path) {
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                return xhr.responseText;
//            }
//            else {
//                return "<div class='failed'>Loading failed :(<div class='button'>Retry</div></div>";
//            }
//        }
//    };
//    xhr.open("GET", path + "/content.htm", true);
//    xhr.send();
//}
//
//function loadAjaxFile(path) {
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                return xhr.responseText;
//            }
//            else {
//                return "<div class='failed'>Loading failed :(<div class='button'>Retry</div></div>";
//            }
//        }
//    };
//    xhr.open("GET", "load.php?url=" + encodeURIComponent(path), true);
//    xhr.send();
//}
//
//function goToPage(path) {
//    history.pushState({"url": currURL}, "", "/" + path);
//    currURL = path;
//    updatePageInfo();
//    filterLinks();
//}
//
//function error() {
//    closeBody();
//    closeNav();
//    ajaxLoadContent("Error", openBody);
//    gotoPage("Error");
//}
//
///*
// * Routes:
// * [index]
// * [error]
// * top-level-menu
// * top-level-menu/content (defatult second level section)
// * top-level-menu/2nd-level-section
// * top-level-menu/2nd-level-section/content
// * orphans (listed or unlisted))
// */
//function loadURL(newURL) {
//    newURL = trimForwardSlash(newURL);
//
//    //Does not reload same page
//    if (currURL !== newURL) {
//        var c = currURL.split("/");
//        var n = newURL.split("/");
//
//        //Body cleared no matter what
//        closeBody();
//
//        if (n.length === 1) {
//            //Same top level
//            if (c.length > 0 && c[0] === n[0]) {
//                //Has content
//                if (currPageInfo["selection-type"] === "nav") {
//                    expandNav();
//                }
//                //else top-level-menu/2nd-level-section, redundant odes nothing
//            }
//            //Different top level
//            else {
//                closeNav();
//
//                //Load nav if new is second level menu selection page
//                var mItem = getNavTopLevel(n[0]);
//                if (mItem != null && mItem["sections"].length > 0) {
//                    ajaxLoadContent(n[0], openNavAsContent);
//                }
//                //otherwise load page
//                else {
//                    ajaxLoadContent(newURL, openBody);
//                }
//            }
//        }
//
//        else if (n.length === 2) {
//
//            var mItem1 = getNavTopLevel(n[0]);
//
//            if (mItem1 == null) {
//                error();
//            }
//
//            //Same top level
//            if (c.length > 0 && c[0] === n[0]) {
//                var nItem = getNavSecondLevel(n[0], n[1]);
//                //New page is default page content
//                if (nItem == null) {
//                    if (currPageInfo["selection-type"] === "none") {
//                        ajaxLoadContent(n[0], openNavAsNav);
//                    }
//                    else if (currPageInfo["selection-type"] === "content") {
//                        shrinkNav();
//                    }
//                    ajaxLoadContent(newURL, openBody);
//                }
//                //New page is selection (redundant second part)
//                else {
//                    if (currPageInfo["selection-type"] === "nav") {
//                        expandNav();
//                    }
//                    else if (currPageInfo["selection-type"] === "none") {
//                        openNavAsContent(n[0]);
//                    }
//                }
//            }
//            else {
//                closeNav();
//                var nItem1 = getNavSecondLevel(n[0], n[1]);
//                //New page is default page content
//                if (nItem1 == null) {
//                    ajaxLoadContent(n[0], openNavAsNav);
//                    ajaxLoadContent(newURL, openBody);
//                }
//                //New page is selection (redundant second part)
//                else {
//                    openNavAsContent(n[0]);
//                }
//            }
//        }
//        else if (n.length === 3) {
//            //Same top level
//            if (c.length > 0 && c[0] === n[0]) {
//                //Same second level nav
//                if (c.length > 1 && c[1] === n[1]) {
//                    if (currPageInfo["selection-type"] === "content") {
//                        shrinkNav();
//                    }
//                }
//                //Currently on selection page
//                else if (currPageInfo["selection-type"] === "content") {
//                    shrinkNav();
//                }
//            }
//            else {
//                closeNav();
//                ajaxLoadContent(n[0], openNavAsNav);
//
//            }
//            ajaxLoadContent(newURL, openBody);
//        }
//        else {
//            error();
//        }
//
//        goToPage(newURL);
//    }
//    return false;
//}
//
//function trimForwardSlash(stringToTrim) {
//    if (stringToTrim.charAt(0) === "/") {
//        stringToTrim = stringToTrim.substr(1);
//    }
//    if (stringToTrim.charAt(stringToTrim.length - 1) === "/") {
//        stringToTrim = stringToTrim.substr(0, stringToTrim.length - 1);
//    }
//    return stringToTrim;
//}
//
//
//function closeBody() {
//    document.getElementById("body").innerHTML = "";
//}
//function openBody(innerHTML) {
//    document.getElementById("body").innerHTML = innerHTML;
//}
//function closeNav() {
//    document.getElementById("selection-bar").innerHTML = "";
//}
//function shrinkNav() {
//    document.getElementById("selection-bar").className = "selection-nav";
//}
//function expandNav() {
//    document.getElementById("selection-bar").className = "selection-content";
//}
//function openNavAsContent(innerHTML) {
//    document.getElementById("selection-bar").className = "selection-content";
//    document.getElementById("selection-bar").innerHTML = innerHTML;
//}
//function openNavAsNav(innerHTML) {
//    document.getElementById("selection-bar").className = "selection-nav";
//    document.getElementById("selection-bar").innerHTML = innerHTML;
//}
//
//
