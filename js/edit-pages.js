var edit_sections = [{
    name: 'Remove this section',
    fun: function (data) {
        modalConfirm("This function only removes the link from the nav bar, so you can easily restore it by adding a " +
            "section with same name. It leaves all pages and content within  it accessible by anyone who has the " +
            "correct link. " +
            "You can permanently delete it by deleting the folder /" + trimForwardSlashAndFileName(currURL).split('/')[0] +
            " from the server." +
            "<br/>Are you sure you want to remove this section?",
            function (choice) {
                if (choice) {
                    if (data.trigger.is('a')) {
                        data.trigger.remove();
                    }
                    else {
                        data.trigger.closest('a').remove();
                    }
                }
            }
        )
    }
}];

function enableManageSectionsContentEditable() {
    var items = $('#nav-menu-filler a').not('.manage-button').not('.slider-filler');
    items.addClass('editable').attr('contenteditable', 'true').contextMenu(edit_sections).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

}

$('.manage-sections').click(function () {

    enableManageSectionsContentEditable()
    $('#header-filler').css('z-index', 701);
    $('#nav-filler').addClass('managing').prepend(
        "<h2>Use buttons below. Switch to rearrange mode and drag and drop to reorder sections.</h2>");
    $('.manage-sections').css('display', 'none');
    $('#user-filler').css('display', 'none');
    $('#logo-filler').click(function(){
        alert("todo");
    });



    var togglePagesRearrange = false;
    var c = $('.edit-panel').children();
    for (var i = 3; i < c.length; i++) {
        $(c[i]).remove();
    }

    var sectionsEditButtons = ['Add Section', 'Save and Exit', 'Cancel'];
    loadEditPanel(null, sectionsEditButtons);

    var slider = $('#nav-menu-filler .scroll-fix');

    $('#toggle-edit-rearrange').off('click').click(function () {
        togglePagesRearrange = !togglePagesRearrange;
        if (togglePagesRearrange) {
            if (slider.sortable('instance') == undefined) {
                slider.sortable();
            }
            else {
                slider.sortable('enable');
            }
            $('#mode-indicator').html('<h2>Rearrange Mode</h2>');
            $('#toggle-edit-rearrange').html('<p>Switch to Edit Mode</p>');
        }
        else {
            slider.sortable('disable');
            $('#mode-indicator').html('<h2>Edit Mode</h2>');
            $('#toggle-edit-rearrange').html('<p>Switch to Rearrange Mode</p>');
        }
    });


    $('#Add-Section').click(function () {
        modalString("Enter section name. Only letters, numbers, spaces, -, _ allowed.", function (name) {
            if (name.match(/^[\w\-\s]+$/) != null) {
                modalOk(" Only letters, numbers, spaces, -, _ allowed.");
            }
            else {
                var newSectionName = name.replace(/|\s/g, "_");
                slider.append('<a data-nav="' + newSectionName + '" href="">' + name + '</a>');

                $.ajax({
                    type: "post",
                    url: "/php/new-section.php",
                    data: "data=" + JSON.stringify({
                        name: newSectionName
                    }),
                    success: function (msg) {
                        if (msg == "Create section successful!") {
                            saveSections(false, function(){
                                savePage(function(){
                                    window.location.href = "/" + newSectionName + "/edit.php";
                                });
                            });
                        }
                        else {
                            alert(msg);
                        }
                    }
                });

            }
        });
    });

    $('#Save-and-Exit').click(function () {
        modalProgress('Saving...');
        saveSections(true, function (msg) {
            if (msg == 'Save sections successful!') {
                closeModalProgress();
                modalOk('Save successful!', function () {
                    savePage(function () {
                        window.location.reload();
                    });
                })
            }
            else {
                closeModalProgress();
                alert(msg);
            }
        });
    });

    $('#Cancel').click(function () {
        modalProgress('Loading...');
        savePage(function () {
            window.location.reload();
        });
    });

});


var edit_pages = [{
    name: 'Toggle image and text.',
    fun: function (data) {
        if (data.trigger.is('a')) {
            var b = data.trigger;
            var i = b.find('img');
            if (i.length > 0) {
                i.remove();

                b.find('.slider-content').append('<h2 class="editable" contenteditable="true">' + b.find('.name').html() + '</h2>');
                b.find('.name').remove();
                enableManagePagesContentEditable();
            }
            else {
                modalImageSelect(function (src) {
                    b.find('.slider-content').append('<div class="img"><img src="' + src + '" /></div><div class="name">' + b.find('h2').html() + '</div>');
                    b.find('h2').remove();
                    enableManagePagesContentEditable();
                }, true);
            }
        }
        else {
            var b1 = data.trigger.closest('a');
            var i1 = b1.find('img');
            if (i1.length > 0) {
                i1.remove();
                b1.find('.slider-content').append('<h2 class="editable" contenteditable="true">' + b1.find('.name').html() + '</h2>');
                b1.find('.name').remove();
                enableManagePagesContentEditable();
            }
            else {
                modalImageSelect(function (src) {
                    b1.find('.slider-content').append('<div class="img"><img src="' + src + '" /></div><div class="name">' + b.find('h2').html() + '</div>');
                    b1.find('h2').remove();
                    enableManagePagesContentEditable();
                }, true);
            }
        }
    }
},
    {
        name: 'Modify url link',
        fun: function (data) {
            var elem;
            if (data.trigger.is('a')) {
                elem = data.trigger;
            }
            else {
                elem = data.trigger.closest('a');
            }
            modalString('Enter url to link to: ', function (url) {
                $(elem).attr('href', url);
            });
            $('.modal-string-input').val($(elem).attr('href'));
        }
    },
    {
        name: 'Remove this page',
        fun: function (data) {
            modalConfirm("This function only removes the page from the menu bar, so you can easily restore it by adding" +
                "a page with the same name. It leaves the page content accessible by anyone with the right link. " +
                "You can permanently delete it by deleting the folder /" + trimForwardSlashAndFileName(currURL) +
                " from the server." +
                "<br/>Are you sure you want to remove this page? ",
                function (choice) {
                    if (choice) {
                        if (data.trigger.is('a')) {
                            data.trigger.remove();
                        }
                        else {
                            data.trigger.closest('a').remove();
                        }
                    }
                }
            );
        }
    }
];

var edit_pages_img = [{
    name: 'Switch image',
    fun: function (data) {
        modalImageSelect(function (src) {
            data.trigger.attr('src', src);
        }, true);
    }
}
].concat(edit_pages);


function enableManagePagesContentEditable() {
    var items = $('#selection-bar-filler .scroll-fix a').not('.manage-button').not('.slider-filler');
    items.find('h2').addClass('editable').attr('contenteditable', 'true').on('mousedown', function () {
        $('.iw-curMenu').contextMenu('close');
    }).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    items.find('.name').addClass('editable').attr('contenteditable', 'true').on('mousedown', function () {
        $('.iw-curMenu').contextMenu('close');
    }).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });


    items.contextMenu(edit_pages).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
    items.find('img').contextMenu(edit_pages_img).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

}

$('.manage-pages').click(function () {

    enableManagePagesContentEditable();


    $('#header-filler').css('z-index', 701);
    $('#selection-bar-filler').addClass('managing').prepend(
        "<h2>Use buttons below. Switch to rearrange mode and drag and drop to reorder pages in the menu bar.<br/>" +
        "The first page will be the default page that is loaded when the section is clicked on the nav-bar</h2>");
    $('.manage-pages').css('display', 'none');

    var slider = $('#selection-bar-filler .scroll-fix');


    var togglePagesRearrange = false;
    var c = $('.edit-panel').children();
    for (var i = 3; i < c.length; i++) {
        $(c[i]).remove();
    }

    var pagesEditButtons = ['Add Page', 'Add Sponsor Link', 'Save and Exit', 'Cancel'];
    loadEditPanel(null, pagesEditButtons);

    $('#Add-Page').addClass('manage-pages-add');
    $('#Add-Sponsor-Link').addClass('manage-pages-add-sponsor');
    $('#Save-and-Exit').addClass('manage-pages-close');
    $('#Cancel').addClass('manage-pages-cancel');


    $('#toggle-edit-rearrange').off('click').click(function () {
        togglePagesRearrange = !togglePagesRearrange;
        if (togglePagesRearrange) {
            if (slider.sortable('instance') == undefined) {
                slider.sortable();
            }
            else {
                slider.sortable('enable');
            }
            $('#mode-indicator').html('<h2>Rearrange Mode</h2>');
            $('#toggle-edit-rearrange').html('<p>Switch to Edit Mode</p>');
        }
        else {
            slider.sortable('disable');
            $('#mode-indicator').html('<h2>Edit Mode</h2>');
            $('#toggle-edit-rearrange').html('<p>Switch to Rearrange Mode</p>');
        }
    });


    $('.manage-pages-add-sponsor').off('click').click(function () {
        modalString('Enter url to link to', function (url) {
            $(this).append(
                '<a href="' + url + '">' +
                '<div class="slider-content"><h2>Sponsor name</h2></div>' +
                '</a>');
            enableManagePagesContentEditable();
        });
    });

    $('.manage-pages-add').off('click').click(function () {
        modalString("Enter page name. Only letters, numbers, spaces, -, _ allowed.", function (name) {
            if (name.match(/^[\w\-\s]+$/) != null) {
                modalOk(" Only letters, numbers, spaces, -, _ allowed.");
            }
            else {
                var newName = name.replace(/|\s/g, "_");
                var newURL = trimForwardSlashAndFileName(currURL) + '/' + newName;

                $('.selection-nav .scroll-fix').each(function () {
                    $(this).append(
                        '<a class="unsaved" data-nav="' + name + '" href="' + newURL + '">' +
                        '<div class="slider-content"><h2>' + name + '</h2></div>' +
                        '</a>');
                });

                modalSelect(function (choice) {
                    if (choice == 'Copy existing page') {
                        modalString('Enter the url from an existing page (http://teamcodeorange.com/<section>/<page>)',
                            function (url) {
                                var index = url.indexOf('teamcodeorange.com');
                                if (index < 0) {
                                    modalOk("Please enter a valid url");
                                }
                                else {
                                    modalProgress('Adding ...');
                                    url = trimForwardSlashAndFileName(url.substring(index + 18));
                                    $.ajax({
                                        type: "post",
                                        url: "/php/new-page.php",
                                        data: "data=" + JSON.stringify({
                                            type: 'Copy existing page',
                                            url: newURL,
                                            copyPageURL: url
                                        }),
                                        success: function (msg) {
                                            if (msg == "Create page successful!") {
                                                savePages(false, function () {
                                                    if (msg == "Save pages successful!") {
                                                        closeModalProgress;
                                                        savePage(function () {
                                                            window.location.href = newURL;
                                                        });
                                                    }
                                                    else {
                                                        closeModalProgress();
                                                        alert(msg);
                                                    }
                                                })
                                            }
                                            else {
                                                alert(msg);
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    }
                    else {
                        modalProgress('Adding ...');
                        $.ajax({
                            type: "post",
                            url: "/php/new-page.php",
                            data: "data=" + JSON.stringify({
                                type: choice,
                                url: newURL
                            }),
                            success: function (msg) {
                                if (msg == "Page creation successful!") {
                                    savePages(false, function (msg) {
                                        if (msg == "Pages save successful!") {
                                            closeModalProgress;
                                            savePage(function () {
                                                window.location.href = newURL;
                                            });
                                        }
                                        else {
                                            closeModalProgress();
                                            alert(msg);
                                        }
                                    })
                                }
                                else {
                                    alert(msg);
                                }
                            }
                        });
                    }

                }, 'Select page type', 'Content page (2 column template)', 'Content page (1 column template)', 'Full image-background page', 'Copy existing page');
            }
        });
    });

    $('.manage-pages-close').off('click').click(function () {
        modalProgress('Saving...');
        savePages(true, function (msg) {
            if (msg == 'Save pages successful!') {
                closeModalProgress();
                modalOk('Save successful!', function () {
                    savePage(function () {
                        window.location.reload();
                    });
                })
            }
            else {
                closeModalProgress();
                alert(msg);
            }
        });
    });

    $('.manage-pages-cancel').off('click').click(function () {
        modalProgress('Loading...');
        savePage(function () {
            window.location.reload();
        });
    });

});