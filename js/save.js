

//Content saving wip code.

var content = "";
//Full page
if (document.getElementById('fullpage') != null){
    content = save_fullpage();
}
else if (document.getElementById('row') != null){
    content = save_content_page();
}