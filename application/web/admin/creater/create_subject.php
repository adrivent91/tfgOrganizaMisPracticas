<?php
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/subject.php';
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
	
	$sbj = new Subject($db);
	

	$sbj->abbrev_sbj = $_POST['abbrev_sbj_create'];
	$sbj->name_sbj = $_POST['name_sbj_create'];
	$sbj->credits= $_POST['credits_create'];
	$sbj->course = $_POST['course_create'];
	$sbj->group_sbj = $_POST['group_sbj_create'];
	$sbj->quarter = $_POST['quarter_create'];
	$sbj->stds = $_POST['stds_sbj_create'];
	
	if($sbj->create()){
	
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


