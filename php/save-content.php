<?php
$json = json_decode($_POST['data']);

if (strlen($json->url) == 0) {
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/content-edit.htm', $json->content) === false){
        echo "Save failed.";
    }
    else {
        echo "Save successful!";
    }
}
else {
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/'.$json->url.'/content-edit.htm', $json->content) === false){
        echo "Save failed.";
    }
    else {
        echo "Save successful!";
    }
}

