<?php
//Creates new section. Does not overwrite existing files.
$json = json_decode($_POST['data']);
$name = $json->name;
$dir = $_SERVER["DOCUMENT_ROOT"] ."/".$name;

$templates = $_SERVER["DOCUMENT_ROOT"]."/php/templates";

if (!file_exists($dir)){
    mkdir($dir, 0777, true);
}

function copyFile($from, $to){
    if (!file_exists($to)){
        file_put_contents($to, file_get_contents($from));
    }
}

copyFile($templates.'/section-content.htm', $dir.'/content.htm');
copyFile($templates.'/section-edit.php', $dir.'/edit.php');
copyFile($templates.'/section-index.php', $dir.'/index.php');