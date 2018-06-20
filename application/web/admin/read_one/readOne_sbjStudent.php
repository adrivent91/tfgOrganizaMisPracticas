<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/subject_student.php';
	include_once '../../../server/objects/student.php';
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
	
	// get ID of the product to be edited
	$id = isset($_POST['id']) ? $_POST['id'] : die('ERROR: missing ID.');
	
	
	$database = new Database();
	$db = $database->getConnection();
	
	$sbj_stdnt = new Subject_Student($db);
	$stdnt = new Student($db);
	$sbj = new Subject($db);
	
	// set ID property of product to be edited
	$sbj_stdnt->id = $id;
	
	// read the details of product to be edited
	$sbj_stdnt->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"regist_num" => $sbj_stdnt->regist_num,
		"regist_year" => $sbj_stdnt->regist_year,
		"stdnt" => $sbj_stdnt->stdnt,
		"sbj" => $sbj_stdnt->sbj,
				
	);
	
	$stdnt->id_stdnt = $sbj_stdnt->stdnt;
	$stdnt->all_student();
	$admin_array["mail"] = $stdnt->mail;
	
	$sbj->id_sbj = $sbj_stdnt->sbj;
	$sbj->all_subject();
	$admin_array["abbrev_sbj"] = $sbj->abbrev_sbj;
	
	print_r(json_encode($admin_array));

	$database->endConnection();
	?>