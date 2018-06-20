<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher.php';
	include_once '../../../server/utilities/jwt_helper.php';
	
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
	
	$teacher = new Teacher($db);
 
 	$teacher->id_tch = $_POST['id_tch_ed'];
 	$teacher->name_tch = $_POST['name_tch_ed'];
	$teacher->last_name_tch = $_POST['last_name_tch_ed'];
	$teacher->mail = $_POST['mail_tch_ed'];
	$teacher->passw = $_POST['passw_tch_ed'];
	$teacher->office = $_POST['office_tch_ed'];
	
	if($teacher->update()){
	
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


