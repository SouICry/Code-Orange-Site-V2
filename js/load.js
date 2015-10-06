//
//
// TODO: rewrite with new format, simplified routes and fixes.
// And add animation of course, especially since its simpler
//
// TODO: Scroll buttons for slider for desktop
//
//


//TODO: variable header height
var header_height = 250;

//TODO: open/close animations (requires default css changes as well)


//TODO: Fix Top level typed pages not loading into other pages

//TODO: onpopstate

//TODO: shake when loading

window.onpopstate = pop;

function pop(event){
    loadURL(event.state['url'], true);
}

function filterLinks() {
    var elements = document.getElementsByTagName("a");
    for (var i = 0; i < elements.length; i++) {
        if ((elements[i].href.indexOf("teamcodeorange.com") >= 0
                || elements[i].href.indexOf("localhost") >= 0)
            && elements[i].href.indexOf("#") != elements[i].href.length - 1
            && elements[i].href.indexOf("php") < 0) {

            elements[i].addEventListener('click', function(event){
                if ( event.preventDefault ) {
                    event.preventDefault();
                }
                event.returnValue = false;
                loadURL(this.getAttribute("href"), false);
            }, false);
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
ajaxLoad("nav.json", function(text){
    nav = JSON.parse(text);
});


var currURL = trimForwardSlash(window.location.pathname);
history.replaceState({"url": currURL}, "", "/" + currURL);
filterLinks();


function goToPage(path) {
    currURL = path;
    history.pushState({"url": path}, "", "/" + path);
    filterLinks();
}
function goBackPage(path){
    currURL = path;
    filterLinks();
}

function error() {
    closeBody();
    closeSelectionBar();
    ajaxLoadContent("Error", openBody);
    goToPage("Error");
}


function menuItemExists(name){
    for (var i = 0; i < nav['menu-items'].length; i++){
        if (nav['menu-items'][i].name === name){
            return true;
        }
    }
    return false;
}
function menuPageExists(menuName, pageName){
    for (var i = 0; i < nav['menu-items'].length; i++){
        if (nav['menu-items'][i].name === menuName){
            var pages = nav['menu-items'][i]['pages'];
            for (var j = 0; j < pages.length; j++){
                if (pages[j] === pageName){
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}
function unlistedItemExists(name){
    for (var i = 0; i < nav['unlisted-items'].length; i++){
        if (nav['unlisted-items'][i].name === name){
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
function loadURL(newURL, statePopped){
    try {
        newURL = trimForwardSlash(newURL);

        //Does not reload same page
        if (currURL !== newURL) {
            var c = currURL.split("/");
            //Manually typed in top level menu selection page, just loads new page
            if (c.length === 1 && menuItemExists(c[0])){
                window.location.href = "/" + newURL;
            }
            //Body cleared no matter what
            closeBody();
            //Index
            if (newURL.length == 0) {
                closeSelectionBar();
                ajaxLoadContent(newURL, openBody);
            }
            else {
                var n = newURL.split("/");

                //Page without selection-bar
                if (n.length == 1) {
                    closeSelectionBar();
                    //Redirects to first page if top level menu
                    if (menuItemExists(n[0])) {
                        newURL = n[0] + "/" + nav['menu-items'][0]['pages'][0];
                        ajaxLoadContent(newURL, openBody);
                    }
                    //Loads body if unlisted
                    else if (unlistedItemExists(n[0])) {
                        ajaxLoadContent(n[0], openBody);
                    }
                    else {
                        error();
                    }
                }
                //Page with selection bar
                else if (n.length == 2) {
                    if (menuPageExists(n[0], n[1])) {
                        var c = currURL.split("/");
                        //Same menu item
                        if (c.length == 2 && c[0] === n[0]) {
                            ajaxLoadContent(newURL, openBody);
                        }
                        //Different menu item
                        else {
                            closeSelectionBar();
                            ajaxLoadContent(n[0], openSelectionBar);
                            ajaxLoadContent(newURL, openBody);
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
        }
    }
    catch (err){
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


function closeBody() {
    document.getElementById("body").innerHTML = "";
}
function openBody(innerHTML) {
    document.getElementById("body").innerHTML = innerHTML;
    checkLoadCarousel();
}
function closeSelectionBar() {
    document.getElementById("selection-bar").innerHTML = "";
    document.getElementById("selection-bar-filler").innerHTML = "";
}
function openSelectionBar(innerHTML) {
    document.getElementById("selection-bar").innerHTML = innerHTML;
    document.getElementById("selection-bar-filler").innerHTML = innerHTML;
}


