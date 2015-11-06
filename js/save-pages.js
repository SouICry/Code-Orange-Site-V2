/**
 * Created by SouICry on 11/3/2015.
 */

//TODO: php parts

function saveSections(normalSave, callback) {
    var nav;
    if (normalSave) {
        nav = $('#nav-menu-filler .scroll-fix a').not('.manage-button').not('.slider-filler').not('.unsaved');
    }
    else {
        nav = $('#nav-menu-filler .scroll-fix a').not('.manage-button').not('.slider-filler');
    }

    var s = '<a class="slider-filler"></a>';

    for (var i = 0; i < nav.length; i++) {
        var p = nav[i];
        s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved"' : '') + ' data-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' + p.html() + '</a>';
    }
    s += '<a class="slider-filler"></a>';

    $.ajax({
        type: "post",
        url: "/php/save-pages.php",
        data: "data=" + JSON.stringify({
            content: s,
            new: normalSave
        }),
        success: function (msg) {
            callback(msg)
        }
    });
}


function savePages(normalSave, callback) {

    var pages, nav;
    if (normalSave) {
        pages = $('#selection-bar-filler .scroll-fix a').not('.manage-button').not('.slider-filler').not('.unsaved');
    }
    else {
        pages = $('#selection-bar-filler .scroll-fix a').not('.manage-button').not('.slider-filler');
    }

    var defaultPage = pages.first().date('nav');
    $('#nav-menu-filler .scroll-fix a[data-nav=' + defaultPage + ']').attr('src', pages.first().attr('src'));

    saveSections(normalSave, function (msg) {
        if (msg != "Sections save successful!") {
            callback("Save failed.");
        }
        else {
            var s = '<div class="slider">' +
                '<div class="scroll-hide">' +
                '<div class="column">' +
                '<div class="scroll-fix">' +
                '<a class="slider-filler"></a>';
            for (var i = 0; i < pages.length; i++) {
                var p = $(pages[i]);
                var img = p.find('img');
                if (img.length > 0) {
                    s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved"' : '') + ' date-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                        '<div class="slider-content">' +
                        '<div class="name">' + p.find('.name').html() + '</div>' +
                        '<div class="img"><img src="' + p.attr('src') + '"/></div>' +
                        ' </a>';
                }
                else {
                    s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved"' : '') + ' date-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                        '<div class="slider-content">' +
                        '<h2>' + p.find('h2').html() + '</h2>' +
                        ' </a>';
                }
            }
            s += '<a class="slider-filler"></a></div></div></div></div>';

            var content = s.replace(new RegExp('<p>', 'g'), '');
            content = content.replace(new RegExp('</p>', 'g'), '');
            content = content.replace(new RegExp('<br>', 'g'), '');
            content = content.replace(new RegExp('<br/>', 'g'), '');

            var url = trimForwardSlashAndFileName(currURL);
            if (url.length > 0) {
                url = url.substring(0, url.indexOf('/'));

                $.ajax({
                    type: "post",
                    url: "/php/save-pages.php",
                    data: "data=" + JSON.stringify({
                        url: url,
                        content: content,
                        new: normalSave,
                    }),
                    success: function (msg) {
                        callback(msg)
                    }
                });
            }

            callback("Save failed.");
        }
    });
}