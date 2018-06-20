<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/subject_student.php';
	include_once '../application/server/objects/teacher.php';
	//include_once '../application/server/objects/subject.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	$id_subject = isset($_POST['id_sbj']) ? $_POST['id_sbj'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$sbj_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($sbj_stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$sbj_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($sbj_stdnt_array));
		}
		return;
	}


	$database = new Database();
	$db = $database->getConnection();
	
	$sbj_stdnt = new Subject_Student($db);
	$teacher = new Teacher($db);
	
	$sbj_stdnt->stdnt = $id_student;
	$sbj_stdnt->sbj = $id_subject;


	$teacher->id_tch = $sbj_stdnt->readSubject_tchStudent();
	
	if($teacher->id_tch == null){
		$sbj_stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	else{
		$sbj_stdnt_array = array(
			"status" => "OK",
			"sbj" => $sbj_stdnt->sbj,
			"stdnt" => $sbj_stdnt->stdnt,
			"id_tch" => $teacher->id_tch
		);
	
		$teacher->id_tch = $teacher->id_tch;
		$teacher->all_teacher();
		$sbj_stdnt_array['name_tch'] = $teacher->name_tch;
		$sbj_stdnt_array['last_name_tch'] = $teacher->last_name_tch;
		$sbj_stdnt_array['mail'] = $teacher->mail;
		$sbj_stdnt_array['office'] = $teacher->office;
	}
	
	print_r(json_encode($sbj_stdnt_array));
	
	$database->endConnection();
?>