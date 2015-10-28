<?php
session_start();
try{
	/*Add user later*/
	date_default_timezone_set('America/Los_Angeles');
	$t = date("Y-m-d__h-i-sa/");
	$dir = $_POST['file'];
	$slashfilenameorjustslash = substr($dir, strrpos($dir, "/"));
	$dir = substr($dir, 0, strrpos($dir, "/"));
	$newdir = "bkup/" . $t . $dir;
	
	
	if (!is_dir($newdir)){
		mkdir($newdir, 0777, true);/*true to recursively make all necessary directories*/
	}
	/*Deletes file from base directory*/
	rename ($_POST['file'], "bkup/" . $t . $_POST['file']);
	/*Deletes thumbnail if exists*/
	if (is_file($dir . '/.thumbnails' . $slashfilenameorjustslash)){
		if (!is_dir($newdir . '/.thumbnails')){
			mkdir($newdir . '/.thumbnails', 0777, true);
		}
		rename ($dir . '/.thumbnails' . $slashfilenameorjustslash, $newdir . '/.thumbnails' . $slashfilenameorjustslash);
	}
	/*Deletes originals and their thumbnails if exists*/
	if (is_file($dir . '/originals' . $slashfilenameorjustslash)){
		if (!is_dir($newdir . '/originals')){
			mkdir($newdir . '/originals', 0777, true);
		}
		rename ($dir . '/originals' . $slashfilenameorjustslash, $newdir . '/originals' . $slashfilenameorjustslash);
	}
	if (is_file($dir . '/originals/.thumbnails' . $slashfilenameorjustslash)){
		if (!is_dir($newdir . '/originals/.thumbnails')){
			mkdir($newdir . '/originals/.thumbnails', 0777, true);
		}
		rename ($dir . '/originals/.thumbnails' . $slashfilenameorjustslash, $newdir . '/originals/.thumbnails' . $slashfilenameorjustslash);
	}
	
	
	
	
}
catch (Exception $e){
	echo("fail");
}
?>