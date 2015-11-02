function save_content_page() {
    var s = "";
    $('#body').children().each(function () {

        var c = $(this);
        //Carousel
        if (c.hasClass('carousel')) {
            s += '<div class="carousel" data-pathname="' + c.data('pathname') + '"><div class="title"><h1>' +
                c.find('h1').html() + '</h1><div class="sub-title">' + c.find('.sub-title').html() +
                '</div><div class="caption"><div class="btn">View Gallery</div></div></div>' +
                '<div id="carousel"><?php $pathname = "' + c.data('pathname') + '";' +
                'include $_SERVER["DOCUMENT_ROOT"]."/php/generate-carousel.php"?></div></div>';
        }
        else if (c.hasClass('row')) {
            s += '<div class="row"><div class="column">'


            var d = c.find('.title');
            var e = c.find('.content-section');
            if (e.length > 0) {
                //Content section
                s += '<div class="content-section">';
                e.children().each(function () {
                    if ($(this).hasClass('blocks')) {
                        s += '<div class="blocks">';
                        $(this).children().each(function () {
                            s += save_blocks($(this));
                        });
                        s += '</div>'
                    }
                    else {
                        s += save_content_row($(this));
                    }
                });
                s += '</div>'
            }
            else if (d.length > 0) {
                //Title
                s += '<div class="title"><h1>' + d.find('h1').html() + '</h1><div class="sub-title">' +
                    d.find('.sub-title').html() + '</div></div>';
            }

            s += '</div></div>'
        }
    });
    return s;
}


function save_blocks(block) {
    var s = '';
    if (block.is('a')) {
        s += '<a class="' + block.data('class') + '" href="' + block.attr('href') + '">';
    }
    else {
        s += '<div class="' + block.data('class') + '">';
    }
    block.children().each(function () {
        if ($(this).hasClass('type')) {
            s += '<div class="type">' + $(this).html() + '</div>';
        }
        else if ($(this).hasClass('view')) {
            s += '<div class="view">' + $(this).html() + '</div>';
        }
        else if ($(this).is('h2')) {
            s += '<h2>' + $(this).html() + '</h2>';
        }
        else if ($(this).is('h3')) {
            s += '<h3>' + $(this).html() + '</h3>';
        }
        else if ($(this).is('h4')) {
            s += '<h4>' + $(this).html() + '</h4>';
        }
        else if ($(this).is('img')) {
            s += '<img src="' + $(this).attr('src') + '"/>';
        }
    });
    if (block.is('a')) {
        s += '</a>';
    }
    else {
        s += '</div>';
    }
    return s;
}

function save_content_row(content_row) {
    var s = '<div class="content-row">';
    if (content_row.find('.sidebar').length > 0) {
        content_row.children().each(function () {
            if ($(this).hasClass('sidebar')) {
                s += save_sidebar($(this));
            }
            else if ($(this).hasClass('content')) {
                s += '<div class="content">' + save_content($(this)) + '</div>';
            }
        });

    }
    else {
        s += save_content(content_row);
    }
    s += '</div>';
    return s;
}

function save_content(content) {
    var s = '';
    content.children().each(function () {
        if ($(this).is('h3')) {
            s += '<h3>' + $(this).html() + '</h3>';
        }
        else if ($(this).is('p')) {
            s += '<p>' + $(this).html() + '</p>';
        }
        else if ($(this).is('h4')) {
            s += '<h4>' + $(this).html() + '</h4>';
        }
        else if ($(this).is('img')) {
            s += '<img src="' + $(this).attr('src') + '"/>';
        }
        else if ($(this).is('ul')) {
            s += '<ul>' + $(this).html() + '</ul>';
        }
        else if ($(this).is('table')) {
            s += '<table border="1" cellspacing="0" cellpadding="0">' + $(this).html() + '</table>';
        }
        else if ($(this).hasClass('youtube')) {
            var src3 = $(this).find('.data-fix').html();
            if (src3.charAt(0) == '"' || src3.charAt(0) == "'"){
                src3 = src3.substring(1, src3.length - 1);
            }
            s += '<div class="youtube">' +
                '<div class="data-fix">' + src3 + '</div>' +
                '<iframe src="' + src3 + '" frameborder="0" allowfullscreen></iframe>' +
                '</div>';
        }
        else if ($(this).hasClass('iframe')) {
            var src4 = $(this).find('.data-fix').html();
            if (src4.charAt(0) == '"' || src4.charAt(0) == "'"){
                src4 = src4.substring(1, src4.length - 1);
            }
            s += '<div class="iframe" data-height="'+$(this).data('height')+'">' +
                '<div class="data-fix">' + src4 + '</div>' +
                '<iframe height="' + $(this).data('height') + '" src="' + src4 + '" frameborder="0" ></iframe>' +
                '</div>';
        }
    });
    return s;
}


function save_sidebar(sidebar) {
    var s = '<div class="sidebar">';
    sidebar.children().each(function () {
        if ($(this).hasClass('img')) {
            if ($(this).is('a')) {
                s += '<a class="img" href="' + $(this).attr('href') + '">' + $(this).html() + '</a>';
            }
            else {
                s += '<div class="img">' + $(this).html() + '</div>';
            }
        }
        else if ($(this).hasClass('block')) {
            if ($(this).is('a')) {
                s += '<a class="block" href="' + $(this).attr('href') + '">';
            }
            else {
                s += '<div class="block">';
            }
            $(this).children().each(function () {
                if ($(this).hasClass('type')) {
                    s += '<div class="type">' + $(this).html() + '</div>';
                }
                else if ($(this).hasClass('view')) {
                    s += '<div class="view">' + $(this).html() + '</div>';
                }
                else if ($(this).is('h2')) {
                    s += '<h2>' + $(this).html() + '</h2>';
                }
                else if ($(this).is('img')) {
                    s += '<img src="' + $(this).attr('src') + '"/>';
                }
            });
            if ($(this).is('a')) {
                s += '</a>';
            }
            else {
                s += '</div>';
            }
        }
    });
    s += '</div>';
    return s;
}