//TODO: Sorting/editing mode global toggle.

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


//Highlights objects or makes enables contenteditable
$('.content-row, .sidebar, .youtube, .blocks, .blocks > a, .sidebar > *').addClass('manage');
$('.section-inner').addClass('manage');

$('.title h1, .title .sub-title, .content-row .content, .content-row > h3').addClass('editable').attr('contenteditable', 'true');
$('.blocks > a > .type, .blocks > a > .view, .blocks > a > h2').addClass('editable').attr('contenteditable', 'true');
$('.sidebar .block .type, .sidebar .block .view, .sidebar .block  h2').addClass('editable').attr('contenteditable', 'true');

$('.section-inner .content').addClass('editable').attr('contenteditable', 'true');


//Left click menus

//Fullpage sections

function enable_rearrange_sections() {
    $('.section-inner').contextMenu('update', edit_section_rearrange);
    if ($('#fullpage').sortable("instance") == undefined) {
        $('#fullpage').sortable();
    }
    else {
        $('#fullpage').sortable("enable");
    }
}
function disable_rearrange_sections() {
    $('.section-inner').contextMenu('update', edit_section_stop_rearrange);
    $('#fullpage').sortable("disable");
}
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
            enable_rearrange_sections();
        }
    },
    {
        name: 'Exit rearrange mode',
        disable: true,
        fun: function (data) {
            disable_rearrange_sections();
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
var edit_section_stop_rearrange = [
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
$('.section-inner > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});


//Sidebar (left)

function enable_rearrange_sidebar() {
    $('.sidebar .block').contextMenu('update', edit_sidebar_block_rearrange);

    $('.sidebar .block img').contextMenu('update', edit_sidebar_block_img_rearrange);
    $('.sidebar .img').contextMenu('update', edit_sidebar_img_rearrange);
    $('.sidebar').contextMenu('update', edit_sidebar_rearrange);

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
    $('.sidebar .block').contextMenu('update', edit_sidebar_block_stop_rearrange);

    $('.sidebar .block img').contextMenu('update', edit_sidebar_block_img_stop_rearrange);
    $('.sidebar .img').contextMenu('update', edit_sidebar_img_stop_rearrange);
    $('.sidebar').contextMenu('update', edit_sidebar_stop_rearrange);

    $('.sidebar').sortable("disable");
}

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
    {
        name: 'Rearrange sidebars (works across different sidebars)',
        fun: enable_rearrange_sidebar
    },
    {
        name: 'Exit rearrange mode',
        disable: true,
        fun: disable_rearrange_sidebar
    },
    {name: '', disable: true},
    {
        name: 'Add a sidebar somewhere else',
        fun: function (data) {

        }
    }
];
var edit_sidebar_rearrange = [
    {
        name: 'Add image to sidebar',
        disable: true
    },
    {
        name: 'Add block to sidebar',
        disable: true
    },
    {
        name: 'Rearrange sidebars (works across different sidebars)',
        disable: true
    },
    {
        name: 'Exit rearrange mode',
        disable: false
    },
    {name: '', disable: true},
    {
        name: 'Add a sidebar somewhere else',
        disable: true
    }
];
var edit_sidebar_stop_rearrange = [
    {
        name: 'Add image to sidebar',
        disable: false
    },
    {
        name: 'Add block to sidebar',
        disable: false
    },
    {
        name: 'Rearrange sidebars (works across different sidebars)',
        disable: false
    },
    {
        name: 'Exit rearrange mode',
        disable: true
    },
    {name: '', disable: true},
    {
        name: 'Add a sidebar somewhere else',
        disable: false
    }
];

var edit_sidebar_img = [{
    name: 'Delete this image',
    fun: function (data) {

    }
},
    {name: '', disable: true}
].concat(edit_sidebar);
var edit_sidebar_img_rearrange = [{
    name: 'Delete this image',
    disable: true
},
    {name: '', disable: true}
].concat(edit_sidebar_rearrange);
var edit_sidebar_img_stop_rearrange = [{
    name: 'Delete this image',
    disable: false
},
    {name: '', disable: true}
].concat(edit_sidebar_stop_rearrange);

var edit_sidebar_block = [{
    name: 'Delete this block',
    fun: function (data) {

    }
},
    {name: '', disable: true}
].concat(edit_sidebar);
var edit_sidebar_block_rearrange = [{
    name: 'Delete this block',
    disable: true
},
    {name: '', disable: true}
].concat(edit_sidebar_rearrange);
var edit_sidebar_block_stop_rearrange = [{
    name: 'Delete this block',
    disable: false
},
    {name: '', disable: true}
].concat(edit_sidebar_stop_rearrange);

var edit_sidebar_block_img = [{
    name: 'Add image instead of text',
    fun: function (data) {
        data.trigger.remove();
    }
}
].concat(edit_sidebar_block);
var edit_sidebar_block_img_rearrange = [{
    name: 'Add image instead of text',
    disable: true
}
].concat(edit_sidebar_block_rearrange);
var edit_sidebar_block_img_stop_rearrange = [{
    name: 'Add image instead of text',
    disable: false
}
].concat(edit_sidebar_block_stop_rearrange);

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

$('.sidebar').contextMenu(edit_sidebar);


//Blocks section

function enable_rearrange_blocks_section() {
    if ($('.blocks').sortable("instance") == undefined) {
        $('.blocks').sortable({
            connectWith: ".sidebar"
        });
    }
    else {
        $('.blocks').sortable("enable");
    }
    $('.blocks.manage').contextMenu('update', edit_blocks_section_rearrange);
    $('.blocks.manage a.manage').contextMenu('update', edit_blocks_section_block_rearrange);

    $('.blocks.manage a.manage img').contextMenu('update', edit_blocks_section_block_img_rearrange);


}
function disable_rearrange_blocks_section() {
    $('.blocks').sortable("disable");
    $('.blocks.manage').contextMenu('update', edit_blocks_section_stop_rearrange);
    $('.blocks.manage a.manage').contextMenu('update', edit_blocks_section_block_stop_rearrange);


    $('.blocks.manage a.manage img').contextMenu('update', edit_blocks_section_block_img_stop_rearrange);


}

var edit_blocks_section = [{
    name: 'Add block to this section',
    fun: function (data) {

    }
},
    {
        name: 'Rearrange blocks (works across different block sections)',
        fun: enable_rearrange_blocks_section
    },
    {
        name: 'Exit rearrange mode',
        disable: true,
        fun: disable_rearrange_blocks_section
    },
    {
        name: 'Delete entire blocks section',
        fun: function (data) {

        }
    }];
var edit_blocks_section_rearrange = [{
    name: 'Add block to this section',
    disable: true
},
    {
        name: 'Rearrange blocks (works across different block sections)',
        disable: true
    },
    {
        name: 'Exit rearrange mode',
        disable: false
    },
    {
        name: 'Delete entire blocks section',
        disable: true
    }];
var edit_blocks_section_stop_rearrange = [{
    name: 'Add block to this section',
    disable: false
},
    {
        name: 'Rearrange blocks (works across different block sections)',
        disable: false
    },
    {
        name: 'Exit rearrange mode',
        disable: true
    },
    {
        name: 'Delete entire blocks section',
        disable: false
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
var edit_blocks_section_block_rearrange = [{
    name: 'Add image instead of text',
    disable: true
},
    {
        name: 'Delete this block',
        disable: true
    },
    {name: '', disable: true}
].concat(edit_blocks_section_rearrange);
var edit_blocks_section_block_stop_rearrange = [{
    name: 'Add image instead of text',
    disable: false
},
    {
        name: 'Delete this block',
        disable: false
    },
    {name: '', disable: true}
].concat(edit_blocks_section_stop_rearrange);

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
var edit_blocks_section_block_img_rearrange = [{
    name: 'Add text instead of image',
    disable: true
},
    {
        name: 'Delete this block',
        disable: true
    },
    {name: '', disable: true}
].concat(edit_blocks_section_rearrange);
var edit_blocks_section_block_img_stop_rearrange = [{
    name: 'Add text instead of image',
    disable: false
},
    {
        name: 'Delete this block',
        disable: false
    },
    {name: '', disable: true}
].concat(edit_blocks_section_stop_rearrange);


$('.blocks.manage').contextMenu(edit_blocks_section);
$('.blocks.manage a.manage').contextMenu(edit_blocks_section_block);
//$('.blocks.manage a.manage > h2, .blocks.manage a.manage > .view, .blocks.manage a.manage > .type').click(function (event) {
//    event.preventDefault();
//    event.stopPropagation();
//});
$('.blocks.manage a.manage > *').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
});
$('.blocks.manage a.manage img').contextMenu(edit_blocks_section_block_img);


//if ($('.blocks').sortable("instance") == undefined) {
//    $('.blocks').sortable({
//        connectWith: ".sidebar"
//    });
//}
//else {
//    $('.blocks').sortable("enable");
//}


var manage_gallery_button =
    '<div class="btn manage-button">Manage Gallery</div>';

$('.carousel .caption').append(manage_gallery_button);


var manage_youtube_button =
    '<div class="btn manage-button">Manage Youtube Video</div>';

$('.youtube').append(manage_youtube_button);


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

$('.content-row:has(.sidebar)').append(manage_two_column_content_buttons);


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

$('.content-row:not(:has(.sidebar))').append(manage_one_column_content_buttons);


//TODO: async loading library.

var style = document.createElement("style");

document.head.appendChild(style);
var sheet = style.sheet;

sheet.insertRule(".manage-button { display: inherit;}", 0);
sheet.insertRule(".blocks.manage-button { display: flex;}", 0);


//Testing toggle sorting/editing

var t = false;
$('#footer').click(function () {
    t = !t;
    if (t) {
        $('.editable').attr('contenteditable', false);
        $('.content-row > .content > *').addClass('sorting-content');
        $('.content-row > .content').addClass('sorting-content');

        $('.content-row > .content').sortable({
            connectWith: '.content-row > .content'
        });
        $('.content-row:not(:has(.sidebar))').sortable({
            connectWith: '.content-row:not(:has(.sidebar))'
        });
        $('.content-row:has(.sidebar)').sortable({
            connectWith: '.content-row:has(.sidebar)'
        });
        $('.content-section').sortable({
            connectWith: '.content-row .content'
        });

        enable_rearrange_sections();
        enable_rearrange_blocks_section();
        enable_rearrange_sidebar();
    }
    else {
        $('.editable').attr('contenteditable', true);

        $('.content-row > .content > *').removeClass('sorting-content');
        $('.content-row > .content').removeClass('sorting-content');

        $('.content-row > .content').sortable('disable');
        $('.content-row:not(:has(.sidebar))').sortable('disable');
        $('.content-row:has(.sidebar)').sortable('disable');
        $('.content-section').sortable('disable');

        disable_rearrange_sections();
        disable_rearrange_blocks_section();
        disable_rearrange_sidebar();
    }

});
//end test


CKEDITOR.config.contentsCss = '/css/style.css';
CKEDITOR.inlineAll();


