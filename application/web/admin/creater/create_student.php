<?php
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/student.php';
	include_once '../../../server/utilities/jwt_helper.php';
	include_once '../../../server/utilities/utils.php';
	
	// set ID property of 'student' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	
	//var_dump($id_student); return;  // para depurar
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_teacher){
			$admin_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($admin_array));
			return;  // muy importante el return, pq print_r continua
		}
		
	} catch (Exception $e) {
		if($token->id_tch != $id_teacher){
			$admin_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($admin_array));
		}
		return;
	}

	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	$utils = new Utils();
	
	$stdnt->name_stdnt = $_POST['name_stdnt_create'];
	$stdnt->last_name_stdnt = $_POST['last_name_stdnt_create'];
	$stdnt->mail= $_POST['mail_stdnt_create'];
	$hash = $utils->hash_password($_POST['passw_stdnt_create']);
	$stdnt->passw = $hash;
	$stdnt->stds = $_POST['stds_stdnt_create'];
	
	if($stdnt->create()){
	
		$admin_array = array(
			"status"  => "OK"
		);
	}
	else{
		$admin_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($admin_array));
	$database->endConnection();
?>


