function save_fullpage() {
    return '<style>#header-filler { position: absolute; }#footer { display: none; }</style>' +
        '<div id="fullpage">' + save_fullpage_sections() + '</div>';
}

function save_fullpage_sections() {
    var s = "";
    $('#fullpage .section').each(function () {
        s += '<div class="section" style="background-image:' + $(this).css('background-image').replace('")', "')").replace('url("', "url('") + ';">'
            + save_fullpage_section_inner($(this)) + '</div>';
    });
    return s;
}

function save_fullpage_section_inner(section) {
    var s = '<div class="section-inner">'
    var t = $(section).find('.title');
    var r = $(section).find('.content');
    if (t.length != 0) {
        s += '<div class="title"><h1>' + t.find('h1').html()+ '</h1>' +
            '<div class="sub-title">' + t.find('.sub-title').html()+ '</div></div>' +
            '<a onclick="moveSectionDown();" href="" class="scroll-for-more"><img src="/icon/down.svg"></a>';
    }
    else if (r.length > 0){
        if (r.hasClass('right')){
            s += '<div class="content right">' + r.html().replace(new RegExp('sorting-content', 'g'), '')+ '</div>';
        }
        else {
            s += '<div class="content">' + r.html().replace(new RegExp('sorting-content', 'g'), '')+ '</div>';
        }
    }
    s += '</div>';
    return s;
}