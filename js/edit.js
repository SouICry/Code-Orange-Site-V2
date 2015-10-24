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





 Instead of left click, do hover buttons instead
 ...
 Actually, nvm, too much unnecessary work


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

function getBlocksData(){
    $('.blocks > *').each(function(){
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





//Creates left click menus
//Fullpage sections
var edit_section = [
    {
        name: 'Change section background image',
        fun: function (data) {

        }
    },
    {
        name: 'Delete this section',
        fun: function (data) {

        }
    },
    {
        name: 'Add new section',
        fun: function (data) {

        }
    }
];

$('.section-inner').contextMenu(edit_section);
$('.section-inner > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});


//Sidebar (left)
var edit_sidebar = [{
    name: 'Add image to sidebar',
    fun: function (data) {

    }
},
    {
        name: 'Add block to sidebar',
        fun: function (data) {

        }
    },
    {name: '', disable: true},
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }
];

var edit_sidebar_img = [{
    name: 'Delete this image',
    fun: function (data) {

    }
},
    {name: '', disable: true}
].concat(edit_sidebar);


var edit_sidebar_block = [{
    name: 'Delete this block',
    fun: function (data) {

    }
},
    {name: '', disable: true}
].concat(edit_sidebar);

var edit_sidebar_block_img = [{
    name: 'Add image instead of text',
    fun: function (data) {
        data.trigger.remove();
    }
}
].concat(edit_sidebar_block);

$('.sidebar .img').contextMenu(edit_sidebar_img);
$('.sidebar .img').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});
$('.sidebar .block').contextMenu(edit_sidebar_block);
$('.sidebar .block > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});
$('.sidebar .block img').contextMenu(edit_sidebar_block_img);

$('.sidbar').contextMenu(edit_sidebar);


//Blocks section

var edit_blocks_section = [{
    name: 'Add block to this section',
    fun: function (data) {

    }
},
    {
        name: 'Delete entire blocks section',
        fun: function (data) {

        }
    }];

var edit_blocks_section_block = [{
    name: 'Add image instead of text',
    fun: function (data) {
        alert('i am delete button')
    }
},
    {
        name: 'Delete this block',
        fun: function (data) {
            data.trigger.remove();
        }
    },
    {name: '', disable: true}
].concat(edit_blocks_section);

var edit_blocks_section_block_img = [{
    name: 'Add text instead of image',
    fun: function (data) {
        data.trigger.remove();
    }
},
    {
        name: 'Delete this block',
        fun: function (data) {
            data.trigger.parent().remove();
        }
    },
    {name: '', disable: true}
].concat(edit_blocks_section);

$('.blocks.manage').contextMenu(edit_blocks_section);
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

var t = false;
$('#footer').click(function () {
    t = !t;
    if (t) {
        rearrange_mode();
    }
    else {
        edit_mode()
    }
});
//end test


var manage_gallery_button =
    '<div class="btn manage-button">Manage Gallery</div>';
$('.carousel .caption').append(manage_gallery_button);


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




$('.preview-button').click(function(){
    window.open('/' + currURL);
});
$('.save-button').click(function(){
    var c = savePage();
});





CKEDITOR.config.contentsCss = '/css/style.css';
CKEDITOR.inlineAll();


