<?php
	
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
	
	// set ID property of 'student' to be edited
	$id_teacher_one = isset($_POST['tch']) ? $_POST['tch'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$tch = new Teacher($db);
	
	// set ID property of product to be edited
	$tch->id_tch = $id_teacher_one;
	
	// read the details of product to be edited
	$tch->readOne();
	
	$admin_array = array(
			"status"  => "OK",
			"name_tch" => $tch->name_tch,
			"last_name_tch" => $tch->last_name_tch,
			"mail" => $tch->mail,
			"passw" => $tch->passw,
			"office" => $tch->office
				
	);
	
	print_r(json_encode($admin_array));

	$database->endConnection();
?>