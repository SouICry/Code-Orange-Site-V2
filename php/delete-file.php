<?php
$json = json_decode($_POST['data']);
$path = '';
$backupPath = '';
if ($json->path[0] == '/') {
    $path = $_SERVER['DOCUMENT_ROOT'].$json->path;
    $backupPath = $_SERVER['DOCUMENT_ROOT'].'/backups'.$json->path;
}
else {
    $path = $_SERVER['DOCUMENT_ROOT'].'/'.$json->path;
    $backupPath = $_SERVER['DOCUMENT_ROOT'].'/backups/'.$json->path;
}

if (!is_dir(dirname($backupPath))){
    mkdir(dirname($backupPath), 0755, true);
}

if (rename($path, $backupPath)){
    echo 'true';
}
else {
    echo 'false';
}

