






//TODO: popState - just load as new url








var currURL = trimForwardSlash(window.location.pathname);

var currPageInfo = {
    "no-selection":true,
    "selection-bar":false,
    "body":true,
    "selection-type":"none"
};

updatePageInfo();

function updatePageInfo(){
    var bar = document.getElementById("selection-bar");
    if (bar.innerHTML.length == 0){
        currPageInfo["selection-bar"] = false;
    }
    else {
        currPageInfo["selection-bar"] = true;
    }
    if (document.getElementById("body").innerHTML.length == 0){
        currPageInfo["body"] = false;
    }
    else {
        currPageInfo["body"] = true;
    }
    if (bar.className.indexOf("selection-content") !== -1){
        currPageInfo["selection-type"] = "content";
    }
    else if (bar.className.indexOf("selection-nav") !== -1){
        currPageInfo["selection-type"] = "nav";
    }
    else {
        currPageInfo["selection-type"] = "none";
    }
}

/*
 * nav.items contains an array with top level menu items.
 * Every top level menu item has a 'name' and at least one 'section' with name 'default'.
 * Sections list the pages contained.
 * Top level links to direct pages do not have any sections but are items.
 *
 * nav.orphans contains pages that are not in the top level menu or a section
 */
var nav = JSON.parse(loadAjax("nav.json"));



function getNavTopLevel(topLevel){
    for (var i = 0; i < nav['items'].length; i++){
        if ( nav['items'][i].name === topLevel) {
            return nav['items'][i];
        }
    }
    return null;
}
function getNavSecondLevel(topLevel, secondLevel){
    for (var i = 0; i < nav['items'].length; i++){
        if ( nav['items'][i].name === topLevel) {
            for (var j = 0; j < nav['items'][i]['sections'].length; j++){
                if (nav['items'][i]['sections'][j].name === secondLevel){
                    return nav['items'][i]['sections'][j
                }
            }
            return null;
        }
    }
    return null;
}

function loadAjaxContent(path) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if (xhr.status == 200) {
                return xhr.responseText;
            }
            else {
                return "<div class='failed'>Loading failed :(<div class='button'>Retry</div></div>";
            }
        }
    };
    xhr.open("POST", "load.php", true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(path);
}

function goToPage(path){
    history.pushState({"url":currURL}, "", path);
    currURL = path;
}

function error(){
    closeBody();
    closeNav();
    gotoPage(path);
    openBody(loadAjaxContent("Error"));
}

/*
 * Routes:
 * [index]
 * [error]
 * top-level-menu
 * top-level-menu/content (same content as top-level-menu)
 * top-level-menu/2nd-level-section
 * top-level-menu/2nd-level-section/content
 * orphans (listed or unlisted))
 */
function loadURL(newURL) {
    newURL = trimForwardSlash(newURL);

    //Does not reload same page
    if (currURL !== newURL) {
        var c = currURL.split("/");
        var n = newURL.split("/");

        //TODO: make sure to complete all checks for c to determine shrink/close

        //Body cleared no matter what
        closeBody();

        if (n.length === 1){
            //Same top level
            if (c.length > 0 && c[0] === n[0]){
                //Has content
                if (currPageInfo["selection-type"] === "nav"){
                    expandNav();
                }
                //else top-level-menu/2nd-level-section, redundant odes nothing
            }
            //Different top level
            else {
                closeNav();

                //Load nav if new is second level menu selection page
                var mItem = getNavTopLevel(n[0]);
                if (mItem != null && mItem["sections"].length > 0) {
                    openNavAsContent(loadAjaxContent(n[0]));
                }
                //otherwise load page
                else {
                    openBody(loadAjaxContent(newURL));
                }
            }
        }

        //TODO: check current page and orphan/sectionless pages casework
        else if (n.length === 2){
            if (getNavTopLevel(n[0])){
                if (getNavSecondLevel(n[0], n[1])){
                    openNavAsContent(loadAjaxContent(n[0]));
                }
                else {
                    openNavAsNav(loadAjaxContent(n[0]));
                    openBody(loadAjaxContent(newURL))
                }
            }
            else {
                error();
            }
        }
        else if (n.length === 3) {
            if (getNavSecondLevel(n[0], n[1])) {
                openNavAsNav(loadAjaxContent(n[0]));
                openBody(loadAjaxContent(newURL));
            }
            else {
                error();
            }
        }
        else {
            error();
        }

        updatePageInfo();
    }
}
function trimForwardSlash(stringToTrim){
    if (stringToTrim.charAt(0) === "/"){
        stringToTrim = stringToTrim.substr(1);
    }
    if (stringToTrim.charAt(stringToTrim.length - 1) === "/"){
        stringToTrim = stringToTrim.substr(0, stringToTrim.length - 1);
    }
    return stringToTrim;
}


function closeBody(){
    document.getElementById("body").innerHTML = "";
}
function closeNav(){
    document.getElementById("selection-bar").innerHTML = "";
}
function shrinkNav() {
    document.getElementById("selection-bar").className = "selection-nav";
}
function expandNav() {
    document.getElementById("selection-bar").className = "selection-content";
}
function openNavAsContent(innerHTML) {
    document.getElementById("selection-bar").innerHTML = innerHTML;
    document.getElementById("selection-bar").className = "selection-content";
}
function openNavAsNav(innerHTML) {
    document.getElementById("selection-bar").innerHTML = innerHTML;
    document.getElementById("selection-bar").className = "selection-nav";
}
function openBody(innerHTML) {
    document.getElementById("selection-bar").innerHTML = innerHTML;
}

window.onhashchange() =