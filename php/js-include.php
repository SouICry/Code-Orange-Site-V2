<script>
    var header_height = 210;
    var headScroll = null;
    function fullpageInit(){
        if (document.getElementById("fullpage") !== null) {
            $('#fullpage').fullpage({
                sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
                navigation: true,
                fitToSection: false,
                scrollBar: true,
                scrollingSpeed: 1000,
                responsiveWidth: 1024
            });
        }
    }
    function moveSectionDown(){
        $.fn.fullpage.moveSectionDown();
    }
    $(document).ready(function () {
        fullpageInit();
    });
</script>
<script src='/js/carousel.js'></script>
<script src='/js/headroom.js'></script>
<script src='/js/load.js'></script>
<script src='//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>
