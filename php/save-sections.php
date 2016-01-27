<?php
$json = json_decode($_POST['data']);
$content = $json->content;

if (file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/php/menu.php', $content) === false){
    echo "Save sections failed.";
}
else {
    echo "Save sections successful!";
}
