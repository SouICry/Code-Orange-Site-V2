//Content saving wip code.
function savePage() {
    var content = "";
//Full page
    if ($('#fullpage').length > 0) {
        content = save_fullpage();
    }
    else if ($('.row').length > 0) {
        content = save_content_page();
    }

    content = content.replace('<p><br></p>', '');
    content = content.replace('&amp;', '&');

    $.ajax({
        type: "post",
        url: "/php/save-content.php",
        data: "data=" + JSON.stringify({
            "url": trimForwardSlashAndFileName(currURL),
            "content": content
        }),
        success: function (msg) {
            alert(msg);
        }
    });
}

$('.save-button').click(function () {
    savePage();
});