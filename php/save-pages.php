<?php
$json = json_decode($_POST['data']);
$url = $json->url;
$content = $json->content;
$new = $json->new;

if ($new == 'false'){
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/'.$url.'/content.htm', $content) === false){
        echo "Save failed.";
    }
    else {
        echo "Save successful!";
    }
}
else {

}