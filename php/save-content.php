<?php
$json = json_decode($_POST['data']);
$str = $json->content;
$str = str_replace("ESCAPED_AMPERSAND", "&amp;", $str);

if (strlen($json->url) > 0) {
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/'.$json->url.'/content-edit.htm', $str) === false){
        echo "Save failed.";
    }
    else {
        echo "Save successful!";
    }
}
else {
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/content-edit.htm', $str) === false){
        echo "Save failed.";
    }
    else {
        echo "Save successful!";
    }
}

