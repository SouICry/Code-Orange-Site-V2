<?php
session_start();
try{	
	if (array_key_exists('curr_dir', $_POST)){
		$_SESSION['curr_dir'] = $_POST['curr_dir'];
	}
	if (array_key_exists('overwrite_files', $_POST)){
		$_SESSION['overwrite_files'] = $_POST['overwrite_files'];
	}
	if (array_key_exists('get_val', $_POST)){
		echo $_SESSION[$_POST['get_val']];
	}
}
catch (Exception $e){
	echo("Error: Session update failed.");
}
?>