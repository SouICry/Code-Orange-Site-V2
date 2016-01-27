<?php
$json = json_decode($_POST['data']);
$url = $json->url;
$content = $json->content;
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/'.$url.'/content.htm', $content) === false){
        echo "Save pages failed.";
    }
    else {
        echo "Save pages successful!";
    }
