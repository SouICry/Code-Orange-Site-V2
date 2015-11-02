var rearrangeMode = false;
$('#toggle-edit-rearrange').click(function () {
    rearrangeMode = !rearrangeMode;
    if (rearrangeMode) {
        rearrange_mode();
        $('#mode-indicator').html('<h2>Rearrange Mode</h2>');
        $('#toggle-edit-rearrange').html('<p>Switch to Edit Mode</p>');
    }
    else {
        edit_mode();
        $('#mode-indicator').html('<h2>Edit Mode</h2>');
        $('#toggle-edit-rearrange').html('<p>Switch to Rearrange Mode</p>');
    }
});
$('#edit-shrink-button').click(function () {
    var p = $('.edit-panel');
    if (p.hasClass('hover')) {
        p.removeClass('hover');
        $(this).html('V').attr('title', 'Auto-hide edit panel')
    }
    else {
        p.addClass('hover');
        $(this).html('^').attr('title', 'Pin edit panel');
    }
});


function loadEditButtons(arrayToUse) {
    for (var i = 0; i < arrayToUse.length; i++) {
        $('.edit-panel').append('<div id = "' + (arrayToUse[i].replace(new RegExp(" ", "g"), '-')) + '" class="edit-panel-button">' +
            '<p>' + arrayToUse[i] + '</p></div>');
    }
}

var currentNode = null;
function loadEditPanel(node, arrayToUse) {
    currentNode = node;
    $('.edit-panel-active-section').removeClass('edit-panel-active-section');
    $(node).addClass('edit-panel-active-section');
    $('.edit-panel-button').each(function () {
        $(this).remove();
    });
    loadEditButtons(arrayToUse);
}


if ($('#fullpage').length == 0) {

    var blocksEditButtons = ['Add block'];
    var sidebarEditButtons = ['Add image to sidebar', 'Add block to sidebar'];
    var contentEditButtons = ['Add image', 'Add Youtube video', 'Add Google Doc Sheet Form etc', 'Add other embedded content - iframe'];
    //var contentRowEditButtons = ['Add text content section', 'Add image', 'Add Youtube video', 'Add Google Doc Sheet Form etc', 'Add other embedded content - iframe'];


    var gallery = $('#toggle-gallery');
    if ($('#carousel').length > 0) {
        gallery.html('<p>Disable Gallery</p>');
    }
    gallery.click(function () {
        if ($('#carousel').length > 0) {
            gallery.html('<p>Enable Gallery</p>');
            var title = $('.carousel').find('.title');
            $('#body').prepend(
                '<div class="row"><div class="column">' +
                '<div class="title">' +
                '<h1>' + title.find('h1').html() + '</h1>' +
                '<div class="sub-title">' + title.find('.sub-title').html() + '</div>' +
                '</div></div></div>'
            );
            $('.carousel').remove();
            enableContentEditable();
        }
        else {
            modalCarouselImages(function () {
                $('#body').prepend(
                    '<div class="carousel" data-pathname="/' + trimForwardSlashAndFileName(currURL) + '/img/carousel/">' +
                    '<div class="title">' +
                    '<h1>' + $('.title h1').html() + '</h1>' +
                    '<div class="sub-title"> ' + $('.title .sub-title').html() + '</div>' +
                    '<div class="caption"><div class="btn">View Gallery</div></div>' +
                    '</div>' +
                    '<div id="carousel">' +
                    '<?php $pathname = "/' + trimForwardSlashAndFileName(currURL) + '/img/carousel/";include $_SERVER["DOCUMENT_ROOT"]."/php/generate-carousel.php"?>' +
                    '</div>' +
                    '</div>'
                );
                $('.row .column .title').closest('.row').remove();
                savePage(function () {
                    window.location.reload();
                });
            });
        }
    });

    $('#add-section').click(function () {
        if (rearrangeMode) {
            modalOk('Switch to edit mode first.', function () {

            })
        }
        else {
            modalSelect(function (choice) {
                if (choice == 'Two column section') {
                    $('.content-section').first().append(
                        '<div class="content-row manage new-section"><div class="sidebar"></div><div class="content"><h3>Two column section content</h3><p>You can copy, cut, paste, undo changes made to this block of content, copy contents from the content editor of another page, or copy content from a Google/Word document.</p><p>Keep in mind that the formatting may change when copying from an outside document</p><p>Add other types of content using the buttons on the bottom of the screen.</p><h3>h3</h3><h4>h4</h4><p>paragraph</p><ul><li>list item</li></ul></div></div>'
                    );
                }
                else if (choice == 'One column section') {
                    $('.content-section').first().append(
                        '<div class="content-row manage new-section"><h3>Single column section</h3><p>This works the same way as the content in a two column section.</p><p>You can event copy/paste or drag between the two</p></div>'
                    );
                }
                else if (choice == 'Blocks section') {
                    $('.content-section').first().append(
                        '<div class="blocks manage new-section"><a class="block-3" data-class="block-3" href="undefined"><div class="type"><p>Title</p></div><h2>Block (1/3)</h2><div class="view"><p>Leave any boxes blank to not show them</p></div></a></div>'
                    );
                }
                scrollToElement($('.new-section').last());
                modalProgress('Adding and saving...');
                setTimeout(function () {
                    savePage(function () {
                        window.location.reload();
                    });
                }, 800)

            }, 'Select Section Type', 'Two column section', 'One column section', 'Blocks section');
        }
    });

    $('#delete-section').click(function () {
        if (currentNode != null) {
            modalConfirm('Are you sure you want to delete this entire section?', function (choice) {
                if (choice) {

                    if ($(currentNode).hasClass('blocks') || $(currentNode).hasClass('content-row')) {
                        $(currentNode).remove();
                        currentNode = null;
                    }
                    else {
                        $(currentNode).closest('.content-row').remove();
                        currentNode = null;
                    }
                }

            });
        }
        else {
            modalOk('Click on a section first.');
        }
    });


    function editContentShared() {
        $('#Add-image').off('click').click(function () {
            modalImageSelect(function (path) {
                $(currentNode).append('<img src="' + path + '"/>');
                bindContextMenus();
            });
        });


        $('#Add-Youtube-video').off('click').click(function () {
            modalString('Enter youtube url:', function (url) {
                var vequals = url.indexOf('v=');
                var embed = url.indexOf('embed/');
                var list = url.indexOf('list=');

                var vid, listid;
                if (vequals >= 0) {
                    vid = url.substr(vequals + 2, 11);
                }
                if (embed >= 0) {
                    vid = url.substr(embed + 6, 11);
                }
                var link = 'https://www.youtube.com/embed/' + vid;
                if (list >= 0) {
                    listid = url.substr(list + 5, 18);
                    link += '?list=' + listid;
                }

                $(currentNode).append(
                    '<div class="youtube"><div class="data-fix">' + link + '</div>' +
                    '<div class="btn manage-button">Manage Youtube Video</div></div>');
                enableContentEditable();
            });

        });

        $('#Add-Google-Doc-Sheet-Form-etc, #Add-other-embedded-content---iframe').off('click').click(function () {
            var id = $(this).attr('id');

            function callback(urlOrCode, height) {
                if (urlOrCode.charAt(0) == '"' || urlOrCode.charAt(0) == "'") {
                    urlOrCode = urlOrCode.substring(1, urlOrCode.length - 1);
                }

                if (height.charAt(0) == '"' || height.charAt(0) == "'") {
                    height = height.substring(1, height.length - 1);
                }

                var iframe = urlOrCode.indexOf('iframe');
                var link;
                if (iframe >= 0) {
                    link = urlOrCode.substring(src + 4);
                    var qq = link.indexOf('"');
                    var q = link.indexOf("'");
                    var quoteType;
                    if (qq >= 0) {
                        if (q >= 0) {
                            if (qq < q) {
                                quoteType = link.charAt(qq);
                            }
                            else {
                                quoteType = link.charAt(q);
                            }
                        }
                        else {
                            quoteType = link.charAt(qq);
                        }
                    }
                    else if (q >= 0) {
                        quoteType = link.charAt(q);
                    }
                    else {
                        alert("Invalid url");
                        return;
                    }
                    link = link.substring(link.indexOf(quoteType) + 1);
                    link = link.substr(0, link.indexOf(quoteType));
                }
                else {
                    link = urlOrCode;
                    if (link.charAt(0) == '"' || link.charAt(0) == "'") {
                        link = link.substring(1, link.length - 1);
                    }
                }

                $(currentNode).append(
                    '<div class="iframe" data-height="' + height + '" style="height:' + height + ';"><div class="data-fix">' + link + '</div>' +
                    '<img height="' + height + '"/>' +
                    '<div class="btn manage-button">Manage '
                    + (id.indexOf('iframe') > 0 ? 'iframe Embed' : 'Google Embed')
                    + '</div></div>');
                enableContentEditable();
            }

            if ($(currentNode).hasClass('content-row')) {
                modalIframe("Enter Url and Height", 750, callback);
            }
            else {
                modalIframe("Enter Url and Height", 420, callback);
            }
        });
    }

    function editSidebar() {
        $('#Add-image-to-sidebar').off('click').click(function () {
            modalImageSelect(function (path) {
                $(currentNode).append('<div class="img"><img src="' + path + '"/></div>');
                enableContentEditable();
            });

        });
        $('#Add-block-to-sidebar').off('click').click(function () {
            modalString('Enter url to link to, or leave blank if none: ', function (url) {
                if (url.length > 0) {
                    $(currentNode).append(
                        '<a class="block" href="' + url + '">' +
                        '<div class="type"><p>Title</p></div>' +
                        '<div class="view"><p>Leave any boxes blank to not show them</p></div>' +
                        '<h2>Text h2</h2></a>');
                }
                else {
                    $(currentNode).append(
                        '<div class="block">' +
                        '<div class="type"><p>Title</p></div>' +
                        '<div class="view"><p>Leave any boxes blank to not show them</p></div>' +
                        '<h2>Text h2</h2></div>');
                }
                enableContentEditable();
            });
        });
    }

    function editBlocks(){
        $('#Add-block').off('click').click(function () {
            modalString('Enter url to link to, or leave blank if none: ', function (url) {
                if (url.length > 0) {
                    $(currentNode).append(
                        '<a class="block-3" data-class="block-3" href="'+url+'">' +
                        '<div class="type"><p>Title</p></div>' +
                        '<h2>Text h2</h2>' +
                        '<div class="view"><p>Leave any boxes blank to not show them</p></div></a>');
                }
                else {
                    $(currentNode).append(
                        '<div class="block-3" data-class="block-3">' +
                        '<div class="type"><p>Title</p></div>' +
                        '<h2>Text h2</h2>' +
                        '<div class="view"><p>Leave any boxes blank to not show them</p></div></div>');
                }
                enableContentEditable();
            });
        });
    }

    function bindEditPanelTriggers() {
        $('.blocks').off('mouseDown').on('mousedown', function () {
            if (this != currentNode) {
                loadEditPanel(this, blocksEditButtons);
                $('#section-indicator').html('<h2>Blocks Section</h2>');
                editBlocks();
            }
        });
        $('.content-row:not(:has(.sidebar))').off('mouseDown').on('mousedown', function () {
            if (this != currentNode) {
                loadEditPanel(this, contentEditButtons);
                $('#section-indicator').html('<h2>One Column Section</h2>');
                editContentShared();

                //toggleSingleColumnH3();
            }
        });
        $('.content-row .content').off('mouseDown').on('mousedown', function () {
            if (this != currentNode) {
                loadEditPanel(this, contentEditButtons);
                $('#section-indicator').html('<h2>Two Column Section</h2>');
                editContentShared();
            }
        });
        $('.content-row .sidebar').off('mouseDown').on('mousedown', function () {
            if (this != currentNode) {
                loadEditPanel(this, sidebarEditButtons);
                $('#section-indicator').html('<h2>Sidebar</h2>');
                editSidebar();
            }
        });
    }

    bindEditPanelTriggers();
}
else {

}