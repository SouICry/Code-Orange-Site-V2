function publishPage(){
    if (confirm("Are you sure you want to make these changes live?")){
        $.ajax({
            type: "post",
            url: "/php/publish-content.php",
            data: "data=" + JSON.stringify({
                "url": trimForwardSlashAndFileName(currURL)
            }),
            success: function (msg) {
                alert(msg);
                if (msg == "Publish successful!") {
                    window.location.href = "index.php";
                }
            }
        });
    }
}

$('.publish-button').click(function () {
    publishPage();
});