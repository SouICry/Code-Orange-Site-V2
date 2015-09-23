






//TODO: popState - just load as new url








var currURL = trimForwardSlash(window.location.pathname);

//nav contains an object tree of top-level menu items and their (possible) additional sections
var nav = JSON.parse(loadAjax("nav.json"));


function navContainsTopLevel(topLevel){
    for (var i = 0; i < nav.items.length; i++){
        if (nav.items[i].name === topLevel) {
            return true;
        }
    }
    return false;
}
function navContainsSecondLevel(topLevel, secondLevel){
    for (var i = 0; i < nav.items.length; i++){
        if (nav.items[i].name === topLevel) {
            for (var j = 0; j < nav.items[i].sections.length; j++){
                if (nav.items[i].sections[j] === secondLevel){
                    return true;
                }
            }
            return false;
        }
    }
    return false;
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
 * top-level-menu/content (default section same name as top-level)
 * top-level-menu/2nd-level-section
 * top-level-menu/2nd-level-section/content
 * orphans (listed or unlisted))
 */
function loadURL(newURL) {
    newURL = trimForwardSlash(newURL);

    if (currURL !== newURL) {
        var c = currURL.split("/");
        var n = newURL.split("/");

        //TODO: make sure to complete all checks for c to determine shrink/close
        if (c.length === 0) {
            closeBody();
        }
        if (n.length === 1){
            if (navContainsTopLevel(n[0])){
                openNavAsContent(loadAjaxContent(n[0]));
            }
            else {
                error();
            }
        }
        else if (n.length === 2){
            if (navContainsTopLevel(n[0])){
                if (navContainsSecondLevel(n[0], n[1])){
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
            if (navContainsSecondLevel(n[0], n[1])) {
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