<?php
$json = json_decode($_POST['data']);

if (file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$json->filePath)) {
    echo "true";
}
else {
    echo "false";
}