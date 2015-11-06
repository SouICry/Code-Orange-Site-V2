<?php
$json = json_decode($_POST['data']);
$content = $json->content;
$new = $json->new;


if ($new == 'false'){
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/php/menu.php', $content) === false){
        echo "Save sections failed.";
    }
    else {
        echo "Save sections successful!";
    }
}
else {
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/php/menu-edit.php', $content) === false){
        echo "Save sections failed.";
    }
    else {
        echo "Save sections successful!";
    }
}