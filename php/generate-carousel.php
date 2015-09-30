<?php
$pathname = "/Robots/Hanalei/img/carousel/";

$dir = $_SERVER['DOCUMENT_ROOT'].$pathname;
$duration = 4000;
$animation = 1000;

$imgs = glob($dir.'*.{jpg,jpeg,gif,png}', GLOB_BRACE);
$count = count($imgs);

$timePerSlide = ($duration+$animation);
$total = ($duration+$animation) * $count;


echo "<style>";

for ($num = 0; $num < $count; $num++){
    if ($num == $count - 1){
        echo ("#cs_play:checked ~ .cs_prev .num".($num - 1).",#cs_play:checked ~ .cs_next .num0 {-webkit-animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;}");
    }
    else if ($num == 0) {
        echo ("#cs_play:checked ~ .cs_prev .num".($count-1).",#cs_play:checked ~ .cs_next .num".($num + 1)." {-webkit-animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;}");
    }
    else {
        echo ("#cs_play:checked ~ .cs_prev .num".($num - 1).",#cs_play:checked ~ .cs_next .num".($num + 1)." {-webkit-animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;animation: arrow1 ".($total)."ms infinite ".($timePerSlide*$num-$animation)."ms;}");
    }
}


for ($num = 0; $num < $count; $num++){
    if ($num == $count - 1){
        echo ("#cs_slide_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_pause_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_slide_".$num.":checked ~ .cs_next .num0,#cs_pause_".$num.":checked ~ .cs_next .num0 {opacity: 1;z-index: 5;}");
    }
    else if ($num == 0) {
        echo ("#cs_slide_".$num.":checked ~ .cs_prev .num".($count-1).",#cs_pause_".$num.":checked ~ .cs_prev .num".($count-1).",#cs_slide_".$num.":checked ~ .cs_next .num".($num+1).",#cs_pause_".$num.":checked ~ .cs_next .num".($num+1).",");
    }
    else {
        echo ("#cs_slide_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_pause_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_slide_".$num.":checked ~ .cs_next .num".($num+1).",#cs_pause_".$num.":checked ~ .cs_next .num".($num+1).",");
    }
}

for ($num = 0; $num < $count; $num++){
    if ($num == $count - 1){
        echo ("#cs_slide_".$num.":checked ~ .cs_bullets .num".$num." .cs_point,#cs_pause_".$num.":checked ~ .cs_bullets .num".$num." .cs_point {background: #3A4A5A;}");
    }
    else {
        echo ("#cs_slide_".$num.":checked ~ .cs_bullets .num".$num." .cs_point,#cs_pause_".$num.":checked ~ .cs_bullets .num".$num." .cs_point,");
    }
}

for ($num = 0; $num < $count; $num++){
    echo ("ul .slide.num".$num." {left: ".($num * 100)."%;}#cs_slide_".$num.":checked ~ ul .slide,#cs_pause_".$num.":checked ~ ul .slide {-webkit-transform: translateX(".($num * -100)."%);-ms-transform: translateX(".($num * -100)."%);transform: translateX(".($num * -100)."%);}");
}

echo "</style>";

echo ("<input name='cs_anchor' id='cs_play' type='radio' class='cs_anchor' checked>");
echo ("<input name='cs_anchor' id='cs_slide_0' type='radio' class='cs_anchor slide'><input name='cs_anchor' id='cs_pause_0' type='radio' class='cs_anchor pause'>");
for ($num = 1; $num < $count; $num++){
    echo ("<input name='cs_anchor' id='cs_slide_".$num."' type='radio' class='cs_anchor slide'><input name='cs_anchor' id='cs_pause_".$num."' type='radio' class='cs_anchor pause'>");
}

echo "<ul><li class='cs_skeleton'><img src='".$pathname.basename($imgs[0])."'></li>";
for ($num = 0; $num < $count; $num++){
    echo ("<li class='num".$num." img slide'><img src='".$pathname.basename($imgs[$num])."'/></li>");
}
echo "</ul>";


echo "<div class='cs_prev'>";
for ($num = 0; $num < $count; $num++){
    echo ("<label class='num".$num."' for='cs_slide_".$num."'><span></span></label>");
}
echo "</div>";

echo "<div class='cs_next'>";
for ($num = 0; $num < $count; $num++){
    echo ("<label class='num".$num."' for='cs_slide_".$num."'><span></span></label>");
}
echo "</div>";

echo "<div class='cs_bullets'>";
for ($num = 0; $num < $count; $num++){
    echo ("<label class='num".$num."' for='cs_slide_".$num."'><span class='cs_point'></span></label>");
}
echo "</div>";


echo ("<script>function moveRight(){for(var e=document.querySelectorAll('cs_anchor:checked'),t=0;t<e.length;t++)e[t].checked=!1;slideCount>=maxSlideCount&&(slideCount=0),document.getElementById('cs_slide_'+slideCount++).checked=!0}function stopAutoplay(){window.clearInterval(timer)}var slideCount=1,maxSlideCount=".$count.",timer=setInterval(moveRight,".($animation+$duration)."),el=document.getElementById('carousel');el.addEventListener('mousedown',stopAutoplay,!1),el.addEventListener('touchstart',stopAutoplay,!1);</script>");

/*
var slideCount = 1;
var maxSlideCount = ".$count.";
function moveRight() {
    var list = document.querySelectorAll('cs_anchor:checked');
    for (var i = 0; i < list.length; i++){
        list[i].checked = false;
    }
    if (slideCount >= maxSlideCount){
        slideCount = 0;
    }
    document.getElementById('cs_slide_' + slideCount++).checked = true;
}

var timer = setInterval(moveRight, ".($animation+$duration).");
function stopAutoplay(){
    window.clearInterval(timer);
}
var el = document.getElementById('carousel');
el.addEventListener('mousedown', stopAutoplay, false);
el.addEventListener('touchstart', stopAutoplay, false);
*/