<?php
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/subject_student.php';
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
	
	$sbj_stdnt = new Subject_Student($db);
	
	$sbj_stdnt->regist_num = $_POST['regist_num_create'];
	$sbj_stdnt->regist_year = $_POST['regist_year_create'];
	$sbj_stdnt->stdnt = $_POST['sbjStudent_stdnt_create'];
	$sbj_stdnt->sbj = $_POST['sbjStudent_sbj_create'];
	
	
	if($sbj_stdnt->create()){
	
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


