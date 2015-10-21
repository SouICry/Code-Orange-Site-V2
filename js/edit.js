var delete_sidebar_img = [{
    name: 'Delete image',
    fun: function (data) {
        data.trigger.parent().remove();
    }
}];
var edit_block = [{
    name: 'Add image',
    fun: function (data) {
        alert('i am delete button')
    }
},
{
    name: 'Delete block',
    fun: function (data) {
        data.trigger.remove();
    }
}];
var delete_block_img = [{
    name: 'Delete image',
    fun: function (data) {
        data.trigger.remove();
    }
}];


//TODO: async loading library.

var style = document.createElement("style");

$('.editable').attr('contenteditable', 'true');

document.head.appendChild(style);
var sheet = style.sheet;
sheet.insertRule(".editable { border-color: yellow; border-width: 3px; border-style: dashed }", 0);
sheet.insertRule(".manage { cursor: pointer; border-color: yellow; border-width: 3px; border-style: dashed }", 0);
sheet.insertRule(".content-row.manage { margin-bottom: 80px; cursor: pointer; border-color: red; border-width: 3px; border-style: dashed;  }", 0);
sheet.insertRule(".manage-button { display: inherit;}", 0);
sheet.insertRule(".blocks.manage-button { display: flex;}", 0);

$('.sidebar-left .img img').contextMenu(delete_sidebar_img);
$('.blocks.manage a.manage').contextMenu(edit_block);
$('.blocks.manage a.manage img').contextMenu(delete_block_img);

$('.blocks.manage').sortable({
    connectWith: ".blocks.manage"
});



CKEDITOR.config.contentsCss = '/css/style.css';
CKEDITOR.inlineAll();



