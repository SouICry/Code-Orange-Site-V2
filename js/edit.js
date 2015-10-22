

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



$('.content-row, .sidebar-left, .youtube, .blocks, .blocks > a, .sidebar-left > *').addClass('manage');
$('.section-inner').addClass('manage');



$('.title h1, .title .sub-title, .content-row .content').addClass('editable').attr('contenteditable', 'true');
$('.blocks > a > .type, .blocks > a > .view, .blocks > a > h2').addClass('editable').attr('contenteditable', 'true');
$('.sidebar-left .block .type, .sidebar-left .block .view, .sidebar-left .block  h2').addClass('editable').attr('contenteditable', 'true');

//Fullpage
$('.section-inner .content').addClass('editable').attr('contenteditable', 'true');

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
    },
    {
        name: 'Rearrange sections',
        fun: function (data) {
            $('.section-inner').contextMenu('update', edit_section_rearrange);
            if ($('#fullpage').sortable("instance") == undefined) {
                $('#fullpage').sortable();
            }
            else {
                $('#fullpage').sortable("enable");
            }
        }
    },
    {
        name: 'Exit rearrange mode',
        disable: true,
        fun: function (data) {
            $('.section-inner').contextMenu('update', edit_section_stop_rearranging);
            $('#fullpage').sortable("disable");
        }
    }
];

var edit_section_rearrange = [
    {
        name: 'Change section background image',
        disable: true
    },
    {
        name: 'Delete this section',
        disable: true
    },
    {
        name: 'Add new section',
        disable: true
    },
    {
        name: 'Rearrange sections',
        disable: true
    },
    {
        name: 'Exit rearrange mode',
        disable: false
    }
];

var edit_section_stop_rearranging = [
    {
        name: 'Change section background image',
        disable: false
    },
    {
        name: 'Delete this section',
        disable: false
    },
    {
        name: 'Add new section',
        disable: false
    },
    {
        name: 'Rearrange sections',
        disable: false
    },
    {
        name: 'Exit rearrange mode',
        disable: true
    }
];

$('.section-inner').contextMenu(edit_section);
$('.section-inner > *').click(function(event){
    event.preventDefault();
    event.stopPropagation();
});






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
    { name: '', disable: true },
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }
];
var edit_sidebar_img = [{
        name: 'Delete image',
        fun: function (data) {

        }
    },
    { name: '', disable: true },
    {
        name: 'Add image to sidebar',
        fun: function (data) {

        }
    },
    {
        name: 'Add block to sidebar',
        fun: function (data) {

        }
    },
    { name: '', disable: true },
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }];
var edit_sidebar_block = [{
        name: 'Delete this block',
        fun: function (data) {

        }
    },
    { name: '', disable: true },
    {
        name: 'Add image to sidebar',
        fun: function (data) {

        }
    },
    {
        name: 'Add block to sidebar',
        fun: function (data) {

        }
    },
    { name: '', disable: true },
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }];
var edit_sidebar_block_img = [{
        name: 'Delete image',
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
    { name: '', disable: true },
    {
        name: 'Add image to sidebar',
        fun: function (data) {

        }
    },
    {
        name: 'Add block to sidebar',
        fun: function (data) {

        }
    },
    { name: '', disable: true },
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }];

$('.sidebar-left .block').contextMenu(edit_sidebar_block);
$('.sidebar-left .block > *').click(function(event){
    event.preventDefault();
    event.stopPropagation();
});
$('.sidebar-left .block img').contextMenu(edit_sidebar_block_img);
$('.sidebar-left .img img').contextMenu(edit_sidebar_img);
$('.sidebar-left').contextMenu(edit_sidebar);


var edit_block = [{
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
    {
        name: '',
        disable: true
    },
    {
        name: 'Add block to blocks section',
        fun: function (data) {

        }
    },
    {
        name: 'Delete entire blocks section',
        fun: function (data) {

        }
    }];
var edit_block_section = [{
        name: 'Add block to this section',
        fun: function (data) {

        }
    },
    {
        name: 'Delete entire blocks section',
        fun: function (data) {

        }
    }];
var edit_block_img = [{
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
    {
        name: '',
        disable: true
    },
    {
        name: 'Add block to blocks section',
        fun: function (data) {

        }
    },
    {
        name: 'Delete entire blocks section',
        fun: function (data) {

        }
    }];

$('.blocks.manage').contextMenu(edit_block_section);
$('.blocks.manage a.manage').contextMenu(edit_block);
$('.blocks.manage a.manage > *').click(function(event){
    event.preventDefault();
    event.stopPropagation();
});
$('.blocks.manage a.manage img').contextMenu(edit_block_img);













var manage_gallery_button =
'<div class="btn manage-button">Manage Gallery</div>';

$('.carousel .caption').append(manage_gallery_button);

//var manage_sidebar_buttons =
//'<div class="btn manage-button">Add image</div>' +
//'<div class="btn manage-button">Add block</div>' +
//'<div class="manage-button">If you want to align an image or block with another section, add another content row or split the current row at some place (indicated by red border)</div>' +
//'<div class="btn manage-button">Split this row</div>';
//
//$('.content-row .sidebar-left').append(manage_sidebar_buttons);


var manage_youtube_button =
'<div class="btn manage-button">Manage Youtube Video</div>';

$('.youtube').append(manage_youtube_button);


//var manage_blocks_buttons =
//'<a class="block-6 manage-button"> ' +
//    '<h2>Add block</h2> ' +
//'</a> ' +
//'<a class="block-6 manage-button"> ' +
//    '<h2>Delete blocks section</h2> ' +
//'</a>';
//
//$('.blocks').not('.manage-button').append(manage_blocks_buttons);


var manage_two_column_content_buttons = 
'<div class="blocks manage-button">' +
    '<div class="manage" style="width: 100%">' +
        '<h2>2 column content row - Manage</h2>' +
    '</div>' +
    '<a class="block-6 manage">' +
        '<h2>Add Image</h2> ' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Youtube Video</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Form</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Docs</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Maps</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add other iframes</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Delete this content row</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add new content row</h2>' +
    '</a>' +
'</div>';

$('.content-row:has(.sidebar-left)').append(manage_two_column_content_buttons);


var manage_one_column_content_buttons =
'<div class="blocks manage-button">' +
    '<div class="manage" style="width: 100%">' +
        '<h2>1 column content row - Manage</h2>' +
    '</div>' +
    '<a class="block-6 manage">' +
        '<h2>Add header (h3)</h2> ' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Blocks Section</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Image</h2> ' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Youtube Video</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Form</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Docs</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add Google Maps</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add other iframes</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Delete this content row</h2>' +
    '</a>' +
    '<a class="block-6 manage">' +
        '<h2>Add new content row</h2>' +
    '</a>' +
'</div>';

$('.content-row:not(:has(.sidebar-left))').append(manage_one_column_content_buttons);







//TODO: async loading library.

var style = document.createElement("style");

document.head.appendChild(style);
var sheet = style.sheet;
sheet.insertRule(".editable { border-color: yellow; border-width: 3px; border-style: dashed }", 0);
sheet.insertRule(".manage { cursor: pointer; border-color: yellow; border-width: 3px; border-style: dashed }", 0);
sheet.insertRule(".content-row.manage { margin-bottom: 80px; cursor: pointer; border-color: red; border-width: 3px; border-style: dashed;  }", 0);
sheet.insertRule(".manage-button { display: inherit;}", 0);
sheet.insertRule(".blocks.manage-button { display: flex;}", 0);


//$('.blocks.manage').sortable({
//    connectWith: ".blocks.manage"
//});



CKEDITOR.config.contentsCss = '/css/style.css';
CKEDITOR.inlineAll();


