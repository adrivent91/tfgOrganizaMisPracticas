<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher_subject.php';
	include_once '../../../server/objects/teacher.php';
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
	
	$tch_sbj = new Teacher_Subject($db);
	$tch = new Teacher($db);
	$sbj = new Subject($db);
	
	// set ID property of product to be edited
	$tch_sbj->id = $id;
	
	// read the details of product to be edited
	$tch_sbj->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"tch" => $tch_sbj->tch,
		"sbj" => $tch_sbj->sbj,
				
	);
	
	$tch->id_tch = $tch_sbj->tch;
	$tch->all_teacher();
	$admin_array["mail"] = $tch->mail;
	
	$sbj->id_sbj = $tch_sbj->sbj;
	$sbj->all_subject();
	$admin_array["abbrev_sbj"] = $sbj->abbrev_sbj;
	
	print_r(json_encode($admin_array));
	
	
	$database->endConnection();
	?>