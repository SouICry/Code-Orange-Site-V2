function publishPage(){
    modalConfirm("Are you sure you want to make these changes live?", function(){
        $.ajax({
            type: "post",
            url: "/php/publish-content.php",
            data: "data=" + JSON.stringify({
                "url": trimForwardSlashAndFileName(currURL)
            }),
            success: function (msg) {
                if (msg == "Publish successful!") {
                    modalOk("Publish successful! Redirecting to page.", function() {
                            window.location.href = "/" + trimForwardSlashAndFileName(currURL);
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
    });
}

$('.publish-button').click(function () {
    publishPage();
});