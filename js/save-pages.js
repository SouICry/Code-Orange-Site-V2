/**
 * Created by SouICry on 11/3/2015.
 */


function savePages(callback) {
    var pages = $('#selection-bar-filler .scroll-fix a').not('.manage-button').not('.slider-filler');

    var s = '<div class="slider">' +
        '<div class="scroll-hide">' +
        '<div class="column">' +
        '<div class="scroll-fix">' +
        '<a class="slider-filler"></a>';
    for (var i = 0; i < pages.length; i++) {
        var p = $(pages[i]);
        var img = p.find('img');
        if (img.length > 0) {
            s += '<a date-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                '<div class="slider-content">' +
                '<div class="name">' + p.find('.name').html() + '</div>' +
                '<div class="img"><img src="' + p.attr('src') + '"/></div>' +
                ' </a>';
        }
        else {
            s += '<a date-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                '<div class="slider-content">' +
                '<h2>' + p.find('h2').html() + '</h2>' +
                ' </a>';
        }
    }
    s += '<a class="slider-filler"></a></div></div></div></div>';

    var content = s.replace('<p><br></p>', '');

    var url = trimForwardSlashAndFileName(currURL);
    if (url.length > 0) {
        url = url.substring(0, url.indexOf('/'));

        $.ajax({
            type: "post",
            url: "/php/save-pages.php",
            data: "data=" + JSON.stringify({
                url: url,
                content: content,
                new: 'false'
            }),
            success: function (msg) {
                callback(msg)
            }
        });
    }
    callback("Save failed.");
}