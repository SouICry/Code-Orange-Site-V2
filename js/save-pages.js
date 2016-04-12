/**
 * Created by SouICry on 11/3/2015.
 */

//TODO: save new page js and php

function saveSections(callback) {
    var nav = $('#nav-menu-filler .scroll-fix a').not('.manage-button').not('.slider-filler');

    var s = '<a class="slider-filler"></a>';

    for (var i = 0; i < nav.length; i++) {
        var p = $(nav[i]);
        s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved"' : '') + ' data-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' + p.html() + '</a>';
    }
    s += '<a class="slider-filler"></a>';

    var content = s.replace(new RegExp('<p>', 'g'), '');
    content = content.replace(new RegExp('</p>', 'g'), '');
    content = content.replace(new RegExp('<br>', 'g'), '');
    content = content.replace(new RegExp('<br/>', 'g'), '');

    $.ajax({
        type: "post",
        url: "/php/save-sections.php",
        data: "data=" + JSON.stringify({
            content: content
        }),
        success: function (msg) {
            callback(msg)
        }
    });
}


function savePages(callback) {

    var pages = $('#selection-bar-filler .scroll-fix a').not('.manage-button').not('.slider-filler');


    var navItem = $('#nav-menu-filler a.new');
    navItem.replaceWith(
        '<a class="selected new" data-nav="' + navItem.data('nav') + '" href="' + $(pages).first().attr('href') + '">' + navItem.html() + '</a>');

    saveSections(function (msg) {
        if (msg != "Save sections successful!") {
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
                    s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved ' : 'class="') + (i == 0 ? 'selected"' : '"') + ' data-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                        '<div class="slider-content">' +
                        '<div class="name">' + p.find('.name').html() + '</div>' +
                        '<div class="img"><img src="' + p.find('img').attr('src') + '"/></div>' +
                        '</div></a>';
                }
                else {
                    s += '<a ' + (p.hasClass('unsaved') ? 'class="unsaved ' : 'class="') + (i == 0 ? 'selected"' : '"') + ' data-nav="' + p.data('nav') + '" href="' + p.attr('href') + '">' +
                        '<div class="slider-content">' +
                        '<h2>' + p.find('h2').html() + '</h2>' +
                        '</div></a>';
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
                        content: content
                    }),
                    success: function (msg) {
                        callback(msg)
                    }
                });
            }
        }
    });
}