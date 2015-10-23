//Rule: if div/a/generic box has content-editable by ck editor, text is thrown into <p></p>
// if it is not already in <p></p>, <h2></h2>, ...
//Can fix by putting text into <div></div> so it doesnt break formatting (or i can fix css for <p>)
//Decide on which way later.



//TODO: add iframe support for .content



//Content saving wip code.

var content = "";
//Full page
if (document.getElementById('fullpage') != null){
    content = save_fullpage();
}
else if (document.getElementById('row') != null){
    content = save_content_page();
}