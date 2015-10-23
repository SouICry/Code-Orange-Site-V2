function save_fullpage() {
    return '<style>#header-filler { position: absolute; }#footer { display: none; }</style>' +
        '<div id="fullpage">' + save_fullpage_sections + '</div>';
}

function save_fullpage_sections() {
    var s = "";
    $('#fullpage .section').each(function () {
        s += '<div class="section" style="background-image:' + $(this).css('background-image') + '">'
            + save_fullpage_section_inner(this) + '</div>';
    });
    return s;
}

function save_fullpage_section_inner(section) {
    var s = '<div class="section-inner">'
    var t = $(section).find('.title');
    if (t.length != 0) {
        s += '<div class="title"><h1>' + t.find('h1').innerHTML() + '</h1>' +
            '<div class="sub-title">' + t.find('.sub-title').innerHTML() + '</div></div>' +
            '<a onclick="moveSectionDown();" href="" class="scroll-for-more"><img src="/icon/down.svg"></a>';
    }
    else {
        if (t.find('.content').hasClass('right')){
            s += '<div class="content right">' + t.find('.content').innerHTML() + '</div>';
        }
        else {
            s += '<div class="content">' + t.find('.content').innerHTML() + '</div>';
        }
    }
    s += '</div>';
    return s;
}