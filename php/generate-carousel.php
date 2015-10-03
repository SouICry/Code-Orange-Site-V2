<?php
//$pathname is defined in content page
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
        echo ("#cs_slide_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_pause_".$num.":checked ~ .cs_prev .num".($num-1).",#cs_slide_".$num.":checked ~ .cs_next .num0,#cs_pause_".$num.":checked ~ .cs_next .num0 {opacity: 0.5;z-index: 5;}");
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
        echo ("#cs_slide_".$num.":checked ~ .cs_bullets .num".$num." .cs_point,#cs_pause_".$num.":checked ~ .cs_bullets .num".$num." .cs_point {opacity: 1;}");
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
echo ("<input name='cs_anchor' id='cs_slide_0' type='radio' class='cs_anchor slide' checked><input name='cs_anchor' id='cs_pause_0' type='radio' class='cs_anchor pause'>");
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
    echo ("<span></span><label class='num".$num."' for='cs_slide_".$num."'></label>");
}
echo "</div>";

echo "<div class='cs_next'>";
for ($num = 0; $num < $count; $num++){
    echo ("<span></span><label class='num".$num."' for='cs_slide_".$num."'></label>");
}
echo "</div>";

echo "<div class='cs_bullets'>";
for ($num = 0; $num < $count; $num++){
    echo ("<label class='num".$num."' for='cs_slide_".$num."'><span class='cs_point'></span></label>");
}
echo "</div>";


echo ("<script>function moveRight(){for(var e=document.querySelectorAll('cs_anchor:checked'),t=0;t<e.length;t++)e[t].checked=!1;slideCount>=maxSlideCount&&(slideCount=0),document.getElementById('cs_slide_'+slideCount++).checked=!0}function stopAutoplay(){window.clearInterval(timer)}var slideCount=1,maxSlideCount=".$count.",timer=setInterval(moveRight,".($animation+$duration)."),el=document.getElementById('carousel');el.addEventListener('mousedown',stopAutoplay,!1),el.addEventListener('touchstart',stopAutoplay,!1);var el1 = document.querySelector('.carousel .title');if (el1 !== null){el1.addEventListener('mousedown', function(){el1.style.display = 'none';}, false);el1.addEventListener('touchstart', function(){el1.style.display = 'none';}, false);}</script>");

/* Autoplay

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

/* Touch or mousedown to access carousel

var el1 = document.querySelector('.carousel .title');
if (el1 !== null){
    el1.addEventListener("mousedown", function(){
        el1.style.display = "none";
    }, false);
    el1.addEventListener("touchstart", function(){
        el1.style.display = "none";
    }, false);
}
*/
?>