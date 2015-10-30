<?php
date_default_timezone_set('America/Los_Angeles');
$images = json_decode($_POST['data']);

$time = date("Y-m-d__h-i-sa");
$fail = false;

for ($i = 0; $i < count($images); $i++){
    $path = $_SERVER['DOCUMENT_ROOT'].$images[$i];
    if (!rename($path, dirname($path).'/'.$i.'_'.$time.'.'.pathinfo($path, PATHINFO_EXTENSION))){
        echo 'false';
        $fail = true;
    }
}

if (!$fail) {
    echo 'true';
}