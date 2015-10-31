<?php
$json = json_decode($_POST['data']);
$path = "";
$relv_path = "";
if (strlen($json->url) == 0){
    if ($json->carousel == true) {

        $path = $_SERVER['DOCUMENT_ROOT'] . '/img/carousel/';
        $relv_path = '/img/carousel/';
    }
    else {
        $path = $_SERVER['DOCUMENT_ROOT'] . '/img/';
        $relv_path = '/img/';
    }
}
else {
    if ($json->carousel == true) {
        $path = $_SERVER['DOCUMENT_ROOT'].'/'.$json->url.'/img/carousel/';
        $relv_path = '/'.$json->url.'/img/carousel/';
    }
    else {
        $path = $_SERVER['DOCUMENT_ROOT'].'/'.$json->url.'/img/';
        $relv_path = '/'.$json->url.'/img/';
    }
}

if (!is_dir($path)){
    mkdir($path);
}

$response = scan($path, $relv_path);
// This function scans the files folder recursively, and builds a large array
function scan($dir, $relv_dir){
    $files = array();
    // Is there actually such a folder/file?
    if(file_exists($dir)){
        foreach(scandir($dir) as $f) {
            if(!$f || $f[0] == '.') {
                continue; // Ignore hidden files
            }
            if(is_dir($dir . '/' . $f)) {
                continue; // Current folder only
            }
            if(preg_match('/\.(gif|jpe?g|png|svg|bmp|)$/i', $f)) {
                array_push($files, '"'.$relv_dir.$f.'"');
            }
        }
    }
    return $files;
}

if (sizeof($response) > 0) {
// Output the directory listing as JSON
    header('Content-type: application/json');
    echo json_encode($response);
}
else {
    echo 'false';
}