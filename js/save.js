//Content saving wip code.
function savePage(callback) {
    var content = "";
//Full page
    if ($('#fullpage').length > 0) {
        content = save_fullpage();
    }
    else if ($('.row').length > 0) {
        content = save_content_page();
    }

    content = content.replace('<p><br></p>', '');
    content = content.replace(new RegExp('&amp;', 'g'), 'ESCAPED_AMPERSAND');
    content = content.replace(new RegExp('&', 'g'), 'ESCAPED_AMPERSAND');
    $.ajax({
        type: "post",
        url: "/php/save-content.php",
        data: "data=" + JSON.stringify({
            url: trimForwardSlashAndFileName(currURL),
            content: content
        }),
        success: function (msg) {
            callback(msg)
        }
    });
}

$('.save-button').click(function () {
    modalProgress("Saving...");
    savePage(function(msg){
        if (msg != 'Save successful!') {
            alert(msg);
        }
        closeModalProgress();
    });
});