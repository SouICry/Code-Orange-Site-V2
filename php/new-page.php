<?php
//Creates the new directories (base, img, carousel) and copies over template/existing files
$json = json_decode($_POST["data"]);
$url = $json->url;
$type = $json->type;
$copy = $json->copyPageURL;
$orphan = ($json->orphan == "true" ? true : false);

$new_dir = $_SERVER["DOCUMENT_ROOT"] ."/".$url;

$templates = $_SERVER["DOCUMENT_ROOT"]."/php/templates";

if (!file_exists($new_dir."/img/carousel")){
    mkdir($new_dir."/img/carousel", 0777, true);
}

function copyFile($from, $to){
    if (!file_exists($to)){
        file_put_contents($to, file_get_contents($from));
    }
}

if ($type == "Copy existing page"){
    if (!file_exists($new_dir."/content.htm")) {
        copyFile($_SERVER["DOCUMENT_ROOT"] . "/" . $copy . "/content.htm", $new_dir . "/content.htm");
        copyFile($_SERVER["DOCUMENT_ROOT"] . "/" . $copy . "/content.htm", $new_dir . "/content-edit.htm");
    }
    if($orphan) {
        copyFile($templates."/orphan-edit.php", $new_dir."/edit.php");
        copyFile($templates."/orphan-index.php", $new_dir."/index.php");
    }
    else {
        copyFile($templates."/content-edit.php", $new_dir."/edit.php");
        copyFile($templates."/content-index.php", $new_dir."/index.php");
    }
}
else if ($type == "Content page (2 column template)"){
    if (!file_exists($new_dir."/content.htm")) {
        copyFile($templates . "/content-2-column.htm", $new_dir . "/content.htm");
        copyFile($templates . "/content-2-column.htm", $new_dir . "/content-edit.htm");
    }
    if($orphan) {
        copyFile($templates."/orphan-edit.php", $new_dir."/edit.php");
        copyFile($templates."/orphan-index.php", $new_dir."/index.php");
    }
    else {
        copyFile($templates."/content-edit.php", $new_dir."/edit.php");
        copyFile($templates."/content-index.php", $new_dir."/index.php");
    }
}
else if ($type == "Content page (1 column template)"){
    if (!file_exists($new_dir."/content.htm")) {
        copyFile($templates . "/content-1-column.htm", $new_dir . "/content.htm");
        copyFile($templates . "/content-1-column.htm", $new_dir . "/content-edit.htm");
    }
    if($orphan) {
        copyFile($templates."/orphan-edit.php", $new_dir."/edit.php");
        copyFile($templates."/orphan-index.php", $new_dir."/index.php");
    }
    else {
        copyFile($templates."/content-edit.php", $new_dir."/edit.php");
        copyFile($templates."/content-index.php", $new_dir."/index.php");
    }
}
else if ($type == "Full image-background page"){
    if (!file_exists($new_dir."/content.htm")) {
        copyFile($templates . "/content-full-page.htm", $new_dir . "/content.htm");
        copyFile($templates . "/content-full-page.htm", $new_dir . "/content-edit.htm");
    }
    if($orphan) {
        copyFile($templates."/orphan-edit.php", $new_dir."/edit.php");
        copyFile($templates."/orphan-index.php", $new_dir."/index.php");
    }
    else {
        copyFile($templates."/content-edit.php", $new_dir."/edit.php");
        copyFile($templates."/content-index.php", $new_dir."/index.php");
    }
}

echo "Create page successful!";
