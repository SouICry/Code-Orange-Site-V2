//body-prepend.php has modal html

function modalString(text, callback) {
    $('.modal-string-header').html(text);
    $('.modal-string').css('display', 'block').css('opacity', '1');
    $('.modal-string-ok').click(function () {
        callback($('.modal-string-input').val());
    });
}

function closeModalString() {
    $('.modal-string').css('opacity', 0);
    setTimeout(function () {
        $('.modal-string-input').val('');
        $('.modal-string').css('display', 'none');
    }, 500);
}

function modalProgress(text) {
    $('.modal-progress-inner').html(text);
    $('.modal-progress').css('display', 'block').css('opacity', '1');

}
function closeModalProgress() {
    $('.modal-progress').css('opacity', '1');
    setTimeout(function () {
        $('.modal-progress').css('opacity', '0');
    }, 500);
    setTimeout(function () {
        $('.modal-progress').css('display', 'none');
    }, 1500);
}

function modalConfirm(text, yesCallback) {
    $('.modal-confirm-content').html(text);
    $('.modal-confirm').css('display', 'block').css('opacity', 1);
    $('.modal-confirm .modal-confirm-yes').click(function () {
        yesCallback(true);
        closeConfirmModal();
    });
    $('.modal-confirm .modal-confirm-cancel').click(function () {
        yesCallback(false);
        closeConfirmModal();
    });
}


function closeConfirmModal() {
    $('.modal-confirm').css('opacity', 0);
    setTimeout(function () {
        $('.modal-confirm').css('display', 'none');
        $('.modal-confirm-yes').off('click');
        $('.modal-confirm-cancel').off('click');
        $('.modal-confirm-content').empty();
    }, 500);
}

function modalOk(text, callback) {
    $('.modal-ok-content').html(text);
    $('.modal-ok-ok').click(function () {
        closeConfirmModal();
        callback();
    });
    $('.modal-ok').css('display', 'block').css('opacity', 1);
}

function closeOkModal() {
    $('.modal-ok').css('opacity', 0);
    setTimeout(function () {
        $('.modal-ok').css('display', 'none');
        $('.modal-ok-ok').off('click');
        $('.modal-ok-content').empty();
    }, 500);
}

function closeModal() {
    $('.modal').css('opacity', 0);
    setTimeout(function () {
        $('.modal').css('display', 'none');
        $('.modal-footer').children().each(function () {
            $('this').off('click');
        });
        $('.modal-footer').html('<div class="btn modal-accept">Select</div>' +
            '<div class="btn modal-cancel">Cancel</div>');

        $('.modal-header').empty();
        $('.modal-content .btn').each(function () {
            $(this).off('click');
        });
        $('.modal-content').empty();
    }, 100);
}

function modalSelect(callback, title, options) {
    $('.modal-header').html(title);
    $('.modal-content').html('<div class="modal-options"></div>');

    $('.modal-content .modal-options').append('<div data-option="' + arguments[2] + '" class="modal-option selected">' + arguments[2] + '</div>');
    for (var i = 3; i < arguments.length; i++) {
        $('.modal-content .modal-options').append('<div data-option="' + arguments[i] + '" class="modal-option">' + arguments[i] + '</div>');
    }

    $('.modal').css('display', 'block').css('opacity', '1');

    $('.modal-cancel').click(function () {
        closeModal();
    });
    $('.modal-accept').click(function () {
        callback($('.modal-option.selected').data('option'));
        closeModal();
    });
    $('.modal-option').off('click').click(function () {
        $(this).siblings().each(function () {
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
    });
}

function modalCarouselImages(doneCallback) {
    $('.modal-header').html('Manage Image Gallery');
    $('.modal-content').html('Drag and drop from your computer or ' +
        '<div class="btn modal-browse">Browse</div> to add images. Drag to reorder them in the gallery. <div class="modal-options"></div>');
    $('.modal-footer').prepend('<div class="btn modal-delete">Delete image</div>');
    $('.modal-accept').html('Done');
    $('.modal-cancel').remove();

    $('.modal').css('display', 'block').css('opacity', '1');

    function loadImages() {
        $.ajax({
            type: "post",
            url: "/php/scan-images.php",
            data: "data=" + JSON.stringify({
                "url": trimForwardSlashAndFileName(currURL),
                "carousel": true
            }),
            success: function (imgs) {
                var selection = $('.modal-content .modal-options')
                selection.empty();
                var c = JSON.parse('[' + imgs + ']');
                selection.append('<div class="modal-option selected"><img src="' + c[0] + '"></div>');
                for (var i = 1; i < c.length; i++) {
                    selection.append('<div class="modal-option"><img src="' + c[i] + '"></div>');
                }
                $('.modal-option').off('click').click(function () {
                    $(this).siblings().each(function () {
                        $(this).removeClass('selected');
                    });
                    $(this).addClass('selected');
                });

                if (selection.sortable('instance') == undefined) {
                    selection.sortable();
                }
            }
        });
    }

    loadImages();


    $('.modal-delete').off('click').click(function () {
        modalConfirm('Are you sure you want to delete this image?', function (choice) {
            if (choice) {
                $.ajax({
                    type: "post",
                    url: "/php/delete-file.php",
                    data: "data=" + JSON.stringify({
                        "path": $('.modal-option.selected').children().first().attr("src")
                    }),
                    success: function (success) {
                        if (success == 'true') {
                            loadImages();
                        }
                        else {
                            alert('Delete failed.');
                        }
                    }
                });
            }
        });
    });

    $('.modal-accept').click(function () {
        var images = [];
        $('.modal-options').children().each(function(){
            if ($(this).children().first().is('img')){
                images.push($(this).children().first().attr('src'));
            }
        });

        $('.modal-content .modal-options').sortable('disable');
        closeModal();
        doneCallback(images);
    });
}

function modalImageSelect(yesCallback) {
    $('.modal-header').html('Select Image');
    $('.modal-content').html('Drag and drop from your computer, or ' +
        '<div class="btn modal-browse">Browse</div> to add image choices. Then pick one.<div class="modal-options"></div>');
    $('.modal-footer').prepend('<div class="btn modal-delete">Delete image</div>');

    $('.modal').css('display', 'block').css('opacity', '1');

    function loadImages() {
        $.ajax({
            type: "post",
            url: "/php/scan-images.php",
            data: "data=" + JSON.stringify({
                "url": trimForwardSlashAndFileName(currURL),
                "carousel": false
            }),
            success: function (imgs) {
                $('.modal-content .modal-options').empty();
                var c = JSON.parse('[' + imgs + ']');
                $('.modal-content .modal-options').append('<div class="modal-option selected"><img src="' + c[0] + '"></div>');
                for (var i = 1; i < c.length; i++) {
                    $('.modal-content .modal-options').append('<div class="modal-option"><img src="' + c[i] + '"></div>');
                }
                $('.modal-option').off('click').click(function () {
                    $(this).siblings().each(function () {
                        $(this).removeClass('selected');
                    });
                    $(this).addClass('selected');
                });
            }
        });
    }

    loadImages();


    $('.modal-delete').off('click').click(function () {
        modalConfirm('Are you sure you want to delete this image?', function (choice) {
            if (choice) {
                $.ajax({
                    type: "post",
                    url: "/php/delete-file.php",
                    data: "data=" + JSON.stringify({
                        "path": $('.modal-option.selected').children().first().attr("src")
                    }),
                    success: function (success) {
                        if (success == 'true') {
                            loadImages();
                        }
                        else {
                            alert('Delete failed.');
                        }
                    }
                });
            }
        });
    });

    $('.modal-cancel').click(function () {
        closeModal();
    });
    $('.modal-accept').click(function () {
        yesCallback($('.modal-option.selected').children().first().attr("src"));
        closeModal();
    });
}





