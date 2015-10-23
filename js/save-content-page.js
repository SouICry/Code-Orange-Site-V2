
//TODO: 1 column

function save_content_page(){
    var s = "";
    $('#body').children().each(function(){

    var c = $(this);
    //Carousel
    if (c.hasClass('carousel')){
        s += '<div class="carousel" data-pathname="' + c.data('pathname') +'"><div class="title"><h1>' +
            c.find('h1').innerHTML() + '</h1><div class="sub-title">' + c.find('.sub-title').innerHTML() +
            '</div><div class="caption"><div class="btn">View Gallery</div></div></div>'+
            '<div id="carousel" class="csslider1"><?php $pathname = "' + c.data('pathname') + '";' +
            'include $_SERVER["DOCUMENT_ROOT"]."/php/generate-carousel.php"?></div></div>';
    }
    else if (c.hasClass('row')){
        s += '<div class="row"><div class="column">'


        var d = c.find('.title');
        var e = c.find('.content-section');
        if (e.length > 0){
            //Content section
            s += '<div class="content-section">';
            e.children().each(function(){
                s += '<div class="content-row">';
                save_content_row($(this));
                s += '</div>'
            });
            s += '</div>'
        }
        else if (d.length > 0){
            //Title
            s += '<div class="title"><h1>' + d.find('h1').innerHTML() + '</h1><div class="sub-title">'+
                    d.find('.sub-title').innerHTML() + '</div></div>';
        }
        s += '</div></div>'
    }

    });
    return s;
}


function save_content_row(content_row){
    var s = "";
    if (content_row.find('sidebar').length > 0){
        content_row.children().each(function(){
            if ($(this).hasClass('sidebar')){
                save_sidebar($(this));
            }
            else if ($(this).hasClass('content')){
                save_content($(this));
            }
        });

    }
    else {
        //1 column
    }
    return s;
}

function save_content(content){
    var s = '<div class="content">';
    content.children().each(function() {
        if ($(this).is('h3')){
            s += '<h3>' + $(this).innerHTML + '</h3>';
        }
        else if ($(this).is('p')){
            s += '<p>' + $(this).innerHTML + '</p>';
        }
        else if ($(this).is('h4')){
            s += '<h4>' + $(this).innerHTML + '</h4>';
        }
        else if ($(this).is('ul')){
            s += '<ul>' + $(this).innerHTML + '</ul>';
        }
        else if ($(this).is('table')){
            s += '<table border="1" cellspacing="0" cellpadding="0">' + $(this).innerHTML + '</table>';
        }
        /*Need Iframe code*/

    });
    s += '</div>';
    return s;
}


function save_sidebar(sidebar){
    var s = '<div class="sidebar">';
    sidebar.children().each(function(){
        if ($(this).hasClass('img')){
            if ($(this).is('a')){
                s += '<a class="img" href="' + $(this).href() +'">' + $(this).innerHTML() + '</a>';
            }
            else {
                s += '<div class="img">' + $(this).innerHTML() + '</div>';
            }
        }
        else if ($(this).hasClass('block')){
            if ($(this).is('a')) {
                s += '<a class="block" href="' + $(this).href() + '">';
            }
            else {
                s += '<div class="block">';
            }
            $(this).children().each(function(){
                if ($(this).hasClass('type')){
                    s += '<div class="type>"' + $(this).innerHTML()+ '</div>';
                }
                else if ($(this).hasClass('view')){
                    s += '<div class="view>' + $(this).innerHTML() + '</div>';
                }
                else if ($(this).is('h2')){
                    s += '<h2>' + $(this).innerHTML() + '</h2>';
                }
                else if ($(this).is('img')){
                    s += '<img src="' + $(this).attr('src') + '/>';
                }
            });
            if ($(this).is('a')) {
                s += '</a>';
            }
            else {
                s += '</div>';
            }
        }
    });
    s += '</div>';
    return s;
}