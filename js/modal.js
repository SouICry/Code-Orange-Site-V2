$('.modal-cancel').click(function(){
    $('.modal').css('opacity', 0);
    setTimeout(function() {
        $('.modal').css('display', 'none');
    }, 1000);
});
$('.modal-accept').click(function(){
    $.ajax({
        type: "post",
        url: "/php/scan-images.php",
        data: "data=" + JSON.stringify({
            "url": trimForwardSlashAndFileName(currURL),
            "carousel": false
        }),
        success: function (imgs) {
            var c = JSON.parse('[' + imgs + ']');
            for (var i = 0; i < c.length; i++){
               $('.modal-select-image .images').append('<div class="modal-image"><img src="' + c[i] +'"></div>')
            }
        }
    });
});