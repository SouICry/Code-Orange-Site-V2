
var rearrangeMode = false;
$('#toggle-edit-rearrange').click(function(){
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

if ($('#fullpage').length == 0) {



    var blocksEditButtons = ['Add block to section', 'Delete blocks section'];
    var sidebarEditButtons = ['Add image to sidebar', 'Add block to sidebar', 'Add another sidebar'];
    var contentEditButtons = ['Add Youtube Video', 'Add Google Doc, Sheet, Form, etc', 'Add other embedded content'];
    var contentRowEditButtons = ['Add Blocks Section', 'Add '];
    var currentNode = null;

    if ($('#carousel').length > 0){
        $('#toggle-gallery').html('<p>Remove Gallery</p>');
    }

    $('.blocks').on('mousedown', function () {
        if (this != currentNode) {


            currentNode = this;
            $('.edit-panel-active-section').removeClass('edit-panel-active-section');
            $(this).addClass('edit-panel-active-section');
            $('.edit-panel-button').each(function(){
                $(this).remove();
            });


            $('#section-indicator').html('<h2>Blocks Section</h2>');
            $('edit-panel').append()

        }
    });
    $('.content-row:not(:has(.sidebar))').on('mousedown', function () {
        if (this != currentNode) {


            $('.edit-panel-active-section').removeClass('edit-panel-active-section');
            $(this).addClass('edit-panel-active-section');
            currentNode = this;
            $('.edit-panel-button').each(function(){
                $(this).remove();
            });

            $('#section-indicator').html('<h2>One Column Section</h2>');
        }
    });
    $('.content-row .content').on('mousedown', function () {
        if (this != currentNode) {
            $('.edit-panel-active-section').removeClass('edit-panel-active-section');
            $(this).addClass('edit-panel-active-section');
            currentNode = this;
            $('.edit-panel-button').each(function(){
                $(this).remove();
            });

            $('#section-indicator').html('<h2>Two Column Section</h2>');
        }
    });
    $('.content-row .sidebar').on('mousedown', function () {
        if (this != currentNode) {
            $('.edit-panel-active-section').removeClass('edit-panel-active-section');
            $(this).addClass('edit-panel-active-section');
            currentNode = this;

            $('.edit-panel-button').each(function(){
                $(this).remove();
            });

            $('#section-indicator').html('<h2>Sidebar</h2>');


        }
    });
}
else {

}