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
	
	$subject = new Subject($db);
 
 	$subject->id_sbj = $_POST['id_sbj_ed'];
 	$subject->abbrev_sbj = $_POST['abbrev_sbj_ed'];
	$subject->name_sbj = $_POST['name_sbj_ed'];
	$subject->credits = $_POST['credits_ed'];
	$subject->course = $_POST['course_ed'];
	$subject->group_sbj = $_POST['group_sbj_ed'];
	$subject->quarter = $_POST['quarter_ed'];
	$subject->stds = $_POST['stds_sbj_ed'];
	
	if($subject->update()){
	
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


