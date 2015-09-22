var curr_url = window.location.pathname.split('/');


function loadAjax(path) {
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

function getTopLevelMenu(){
    document.getElementById('menu').innerHTML = loadAjax("menu");
}

function analyzeURL() {
    var new_url = window.location.pathname.split('/');
}

window.onhashchange() =