<?php
$json = json_decode($_POST['data']);
date_default_timezone_set('America/Los_Angeles');
$time = date("Y-m-d__h-i-sa");

if (strlen($json->url) == 0) {
    $contents = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/content-edit.htm');
    if ($contents === false){
        echo "Published failed.";
        return;
    }
    $backupPath = $_SERVER['DOCUMENT_ROOT'].'/backups/content_'.$time.'.htm';
    if (!is_dir(dirname($backupPath))){
        mkdir(dirname($backupPath), 0755, true);
    }
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'].'/backups/content_'.$time.'.htm', $contents) === false){
        echo "Published failed.";
        return;
    }
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'].'/content.htm', $contents) === false){
        echo "Published failed.";
        return;
    }
    unlink($_SERVER['DOCUMENT_ROOT'].'/content-edit.htm');
    echo "Publish successful!";
}
else {
    $contents = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/'.$json->url.'/content-edit.htm');
    if ($contents === false){
        echo "Published failed.";
        return;
    }
    $backupPath = $_SERVER['DOCUMENT_ROOT'].'/backups/'.$json->url.'/content_'.$time.'.htm';
    if (!is_dir(dirname($backupPath))){
        mkdir(dirname($backupPath), 0755, true);
    }

    if (file_put_contents($backupPath, $contents) === false){
        echo "Published failed.";
        return;
    }
    if (file_put_contents($_SERVER['DOCUMENT_ROOT'].'/'.$json->url.'/content.htm', $contents) === false){
        echo "Published failed.";
        return;
    }
    unlink($_SERVER['DOCUMENT_ROOT'].'/'.$json->url.'/content-edit.htm');
    echo "Publish successful!";
}