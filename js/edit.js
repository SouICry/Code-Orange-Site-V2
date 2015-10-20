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
