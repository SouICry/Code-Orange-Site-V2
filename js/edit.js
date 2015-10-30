/*
 Format:
 edit.php - preview normally when default loaded.
 content-edit.htm - exact content of content.php, copied over on publish

 Editor works on both main page and standalone edit.php/content-edit.htm.
 //NOnono, for security must load edit.php to edit
 Publish overrides content.htm

 On add new page/section:
 Add it on selection-bar/nav as display hidden normally, show on edit mode
 index.php as expected.
 content.html redirects to edit.php
 content-edit.htm is generated, work progresses in standalone.
 Publish unhides the menu items as necessary

 Footer changes published immediately

 */



//Disables all a href links
function disableLink(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;

}
function disableLinks() {
    var elements = document.getElementsByTagName("a");
    for (var i = 0; i < elements.length; i++) {
        elements[i].removeEventListener('click', load, false);
        elements[i].addEventListener('click', disableLink, false);
    }
}
disableLinks();

function getBlocksData() {
    $('.blocks > *').each(function () {
        $(this).data('class', this.className)
    });
}
getBlocksData();


//function disableIframes(){
//    $('iframe').each(function(){
//        $(this).data('src', $(this).attr('src'));
//        $(this).attr('src', ' ').css('z-index','-20');
//    });
//}
//disableIframes();


//Highlights objects or makes enables contenteditable
$('.content-row, .sidebar, .youtube, .blocks, .blocks > a, .sidebar > *, .iframe').addClass('manage');
$('.section-inner').addClass('manage');

$('.title h1, .title .sub-title, .content-row .content, .content-row > h3').addClass('editable').attr('contenteditable', 'true');
$('.blocks > a > .type, .blocks > a > .view, .blocks > a > h2').addClass('editable').attr('contenteditable', 'true');
$('.sidebar .block .type, .sidebar .block .view, .sidebar .block  h2').addClass('editable').attr('contenteditable', 'true');
$('.content-row:not(:has(.sidebar))').addClass('editable').attr('contenteditable', 'true');


$('.section-inner .content').addClass('editable').attr('contenteditable', 'true');

//Closes active context menu when editable content selected (since this doesnt normally work)
$('.editable').on('mousedown', function () {
    $('.iw-curMenu').contextMenu('close');
});

$(document).ready(function () {
    if (document.getElementById("fullpage") !== null) {
        $.fn.fullpage.setKeyboardScrolling(false);
    }
});
//Creates left click menus
//Fullpage sections
var edit_section = [
    {
        name: 'Change section background image',
        fun: function (data) {
            modalImageSelect(function (src) {
                data.trigger.closest('.section').css('background-image', 'url(' + src + ')');
            });
        }
    },
    {
        name: 'Delete this section',
        fun: function (data) {
            modalConfirm("Are you sure you want to delete this section?", function () {
                data.trigger.closest('.section').remove();
                modalProgress('Deleting...');
                savePage(function () {
                    window.location.reload();
                });
            });

        }
    },
    {
        name: 'Add new section',
        fun: function (data) {
            modalSelect(function (choice) {
                if (choice == 'Title Section') {
                    $('#fullpage').prepend('' +
                        '<div class="section"style="background-image:url();"><div class="section-inner">' +
                        '<div class="title">' +
                        '<h1>Title</h1>' +
                        '<div class="sub-title"><p>Subtitle</p></div>' +
                        '</div> ' +
                        '<a onclick="moveSectionDown();" href="" class="scroll-for-more"><img src="/icon/down.svg"></a> ' +
                        '</div> </div>'
                    );
                    modalProgress('Adding...');
                    $.fn.fullpage.destroy('all');
                    fullpageInit();
                    savePage(function () {
                        window.location.reload();
                    });
                }
                else if (choice == 'Content Section') {
                    $('#fullpage').prepend('' +
                        '<div class="section" style="background-image:url();"><div class="section-inner"> ' +
                        '<div class="content"><h1>h1</h1><h2>h2</h2><p>paragraph</p></div></div></div>'
                    );
                    modalProgress('Adding...');
                    $.fn.fullpage.destroy('all');
                    fullpageInit();
                    savePage(function () {
                        window.location.reload();
                    });
                }
            }, 'Select Type', 'Title Section', 'Content Section');
        }
    }
];

$('.section-inner').contextMenu(edit_section);
$('.section-inner > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});



var edit_sidebar_img = [{
    name: 'Switch image',
    fun: function (data) {
        modalImageSelect(function (src) {
            data.trigger.attr('src', src);
        });
    }
},
    {
        name: 'Delete this image',
        fun: function (data) {
            data.trigger.closest('.img').remove();
        }
    }
];


var edit_sidebar_block = [{
    name: 'Toggle image and text.',
    fun: function (data) {
        if (data.trigger.hasClass('block')) {
            var b = data.trigger;
            var i = b.find('img');
            if (i.length > 0) {
                i.remove();
                b.append('<h2 class="editable" contenteditable="true"></h2>');
                $('.sidebar .block > h2').click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            else {
                modalImageSelect(function (src) {
                    b.find('h2').remove();
                    b.append('<img src="' + src + '" />');
                    $('.sidebar .block > img').click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    });
                    $('.sidebar .block img').contextMenu(edit_sidebar_block_img);
                });
            }
        }
        else {
            var b1 = data.trigger.closest('.block');
            var i1 = b1.find('img');
            if (i1.length > 0) {
                i1.remove();
                b1.append('<h2 class="editable" contenteditable="true"></h2>');
                $('.sidebar .block > h2').click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            else {
                modalImageSelect(function (src) {
                    b1.find('h2').remove();
                    b1.append('<img src="' + src + '" />');
                    $('.sidebar .block > img').click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    });
                    $('.sidebar .block img').contextMenu(edit_sidebar_block_img);
                });
            }
        }
    }

},
    {
        name: 'Delete this block',
        fun: function (data) {
            if (data.trigger.hasClass('block')) {
                data.trigger.remove();
            }
            else {
                data.trigger.closest('.block').remove();
            }
        }
    }
];

var edit_sidebar_block_img = [{
    name: 'Switch image',
    fun: function (data) {
        modalImageSelect(function (src) {
            data.trigger.attr('src', src);
        });
    }
}
].concat(edit_sidebar_block);

$('.sidebar .img img').contextMenu(edit_sidebar_img);

$('.sidebar .block').contextMenu(edit_sidebar_block);
$('.sidebar .block > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});
$('.sidebar .block img').contextMenu(edit_sidebar_block_img);



//Blocks section

var edit_blocks_section_block = [{
    name: 'Toggle image and text',
    fun: function (data) {
        if (data.trigger.hasClass('manage')) {
            var b = data.trigger;
            var i = b.find('img');
            if (i.length > 0) {
                i.remove();
                b.append('<h2 class="editable" contenteditable="true"></h2>');
                $('.blocks.manage a.manage > h2').click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            else {
                modalImageSelect(function (src) {
                    b.find('h2').remove();
                    b.append('<img src="' + src + '" />');
                    $('.blocks.manage a.manage > img').click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    });
                    $('.blocks.manage a.manage img').contextMenu(edit_blocks_section_block_img);
                });
            }
        }
        else {
            var b1 = data.trigger.closest('.manage');
            var i1 = b1.find('img');
            if (i1.length > 0) {
                i1.remove();
                b1.append('<h2 class="editable" contenteditable="true"></h2>');
                $('.blocks.manage a.manage > h2').click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            else {
                modalImageSelect(function (src) {
                    b1.find('h2').remove();
                    b1.append('<img src="' + src + '" />');
                    $('.blocks.manage a.manage > img').click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    });
                    $('.blocks.manage a.manage img').contextMenu(edit_blocks_section_block_img);
                });
            }
        }
    }
},
    {
        name: 'Delete this block',
        fun: function (data) {
            if (data.trigger.hasClass('manage')) {
                data.trigger.remove();
            }
            else {
                data.trigger.closest('.manage').remove();
            }
        }
    }
];

var edit_blocks_section_block_img = [{
    name: 'Switch image',
    fun: function (data) {
        modalImageSelect(function (src) {
            data.trigger.attr('src', src);
        });
    }
}
].concat(edit_blocks_section_block);

$('.blocks.manage a.manage').contextMenu(edit_blocks_section_block);
$('.blocks.manage a.manage > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});
$('.blocks.manage a.manage img').contextMenu(edit_blocks_section_block_img);


//Sortable enable/disable

function enable_rearrange_fullpage_sections() {
    if ($('#fullpage').sortable("instance") == undefined) {
        $('#fullpage').sortable();
    }
    else {
        $('#fullpage').sortable("enable");
    }
}
function disable_rearrange_fullpage_sections() {
    $('#fullpage').sortable("disable");
}

function enable_rearrange_sidebar() {
    if ($('.sidebar').sortable("instance") == undefined) {
        $('.sidebar').sortable({
            connectWith: ".sidebar"
        });
    }
    else {
        $('.sidebar').sortable("enable");
    }
}
function disable_rearrange_sidebar() {
    $('.sidebar').sortable("disable");
}

function enable_rearrange_blocks_section() {
    if ($('.blocks').sortable("instance") == undefined) {
        $('.blocks').sortable({
            connectWith: ".sidebar"
        });
    }
    else {
        $('.blocks').sortable("enable");
    }
}
function disable_rearrange_blocks_section() {
    $('.blocks').sortable("disable");
}

function enable_rearrange_content_section() {
    if ($('.content-section').sortable('instance') == undefined) {
        $('.content-section').sortable({
            connectWith: '.content-row .content'
        });
    }
    else {
        $('.content-section').sortable('disable');
    }
}
function disable_rearrange_content_section() {
    $('.content-section').sortable('disable');
}

function enable_rearrange_content_row() {
    if ($('.content-row:not(:has(.sidebar))').sortable('instance') == undefined) {
        $('.content-row:not(:has(.sidebar))').sortable({
            connectWith: '.content-row:not(:has(.sidebar))'
        });
    }
    else {
        $('.content-row:not(:has(.sidebar))').sortable('disable');
    }
    if ($('.content-row:has(.sidebar)').sortable('instance') == undefined) {
        $('.content-row:has(.sidebar)').sortable({
            connectWith: '.content-row:has(.sidebar)'
        });
    }
    else {
        $('.content-row:has(.sidebar)').sortable('disable');
    }
}
function disable_rearrange_content_row() {
    $('.content-row:not(:has(.sidebar))').sortable('disable');
    $('.content-row:has(.sidebar)').sortable('disable');
}

function enable_rearrange_content_row_content() {
    $('.content-row > .content > *').addClass('sorting-content');
    $('.content-row > .content').addClass('sorting-content');
    $('.content-row > h3').addClass('sorting-content');

    if ($('.content-row > .content').sortable("instance") == undefined) {
        $('.content-row > .content').sortable({
            connectWith: '.content-row > .content'
        });
    }
    else {
        $('.content-row > .content').sortable('enable');
    }
}
function disable_rearrange_content_row_content() {
    $('.content-row > .content > *').removeClass('sorting-content');
    $('.content-row > .content').removeClass('sorting-content');
    $('.content-row > h3').removeClass('sorting-content');

    $('.content-row > .content').sortable('disable');
}

//Global toggle to enable rearrange
function rearrange_mode() {
    $('.editable').attr('contenteditable', false);

    enable_rearrange_fullpage_sections();

    enable_rearrange_content_section();
    enable_rearrange_content_row();
    enable_rearrange_content_row_content();
    enable_rearrange_blocks_section();
    enable_rearrange_sidebar();
}
//Global toggle to enable content editing
function edit_mode() {
    $('.editable').attr('contenteditable', true);

    disable_rearrange_fullpage_sections();

    disable_rearrange_content_section();
    disable_rearrange_content_row();
    disable_rearrange_content_row_content();
    disable_rearrange_blocks_section();
    disable_rearrange_sidebar();
}


//Testing toggle sorting/editing


//end test


var manage_gallery_button =
    '<div class="btn manage-button">Manage Gallery</div>';
$('.carousel .caption').append(manage_gallery_button);
$('.carousel .manage-button').click(function(){
    modalCarouselImages(function(json){
        $.ajax({
            type: "post",
            url: "/php/rename-carousel-images.php",
            data: "data=" + JSON.stringify(json),
            success: function (success) {
                if (success == 'true') {
                    savePage(function(){
                        window.location.reload();
                    });
                }
                else {
                    alert(success);
                }
            }
        });
    });
});


var manage_youtube_button =
    '<div class="btn manage-button">Manage Youtube Video</div>';
$('.youtube').append(manage_youtube_button);

var manage_iframe_button =
    '<div class="btn manage-button">Manage iframe</div>';
$('.iframe').append(manage_iframe_button);

//var manage_two_column_content_buttons =
//    '<div class="blocks manage-button">' +
//    '<div class="manage" style="width: 100%">' +
//    '<h2>2 column content row - Manage</h2>' +
//    '</div>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Image</h2> ' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Youtube Video</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Form</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Docs</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Maps</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add other iframes</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Delete this content row</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add new content row</h2>' +
//    '</a>' +
//    '</div>';
//
//$('.content-row:has(.sidebar)').append(manage_two_column_content_buttons);


//var manage_one_column_content_buttons =
//    '<div class="blocks manage-button">' +
//    '<div class="manage" style="width: 100%">' +
//    '<h2>1 column content row - Manage</h2>' +
//    '</div>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add header (h3)</h2> ' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Blocks Section</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Image</h2> ' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Youtube Video</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Form</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Docs</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add Google Maps</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add other iframes</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Delete this content row</h2>' +
//    '</a>' +
//    '<a class="block-6 manage">' +
//    '<h2>Add new content row</h2>' +
//    '</a>' +
//    '</div>';
//
//$('.content-row:not(:has(.sidebar))').append(manage_one_column_content_buttons);


//TODO: async loading library.

var style = document.createElement("style");

document.head.appendChild(style);
var sheet = style.sheet;

sheet.insertRule(".manage-button { display: inherit;}", 0);
sheet.insertRule(".blocks.manage-button { display: flex;}", 0);
sheet.insertRule(".manage-none { display: none;}", 0);


$('.preview-button').click(function () {
    modalProgress("Saving...");
    savePage(function () {
        window.location.href = '/' + currURL;
    });
});


CKEDITOR.config.contentsCss = '/css/style.css';
CKEDITOR.inlineAll();


