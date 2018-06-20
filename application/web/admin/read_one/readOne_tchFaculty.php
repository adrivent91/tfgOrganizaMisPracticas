<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher_faculty.php';
	include_once '../../../server/objects/teacher.php';
	include_once '../../../server/objects/faculty.php';
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
	
	$tch_fac = new Teacher_Faculty($db);
	$tch = new Teacher($db);
	$fac = new Faculty($db);
	
	// set ID property of product to be edited
	$tch_fac->id = $id;
	
	// read the details of product to be edited
	$tch_fac->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"fac" => $tch_fac->fac,
		"tch" => $tch_fac->tch,
				
	);
	
	$tch->id_tch = $tch_fac->tch;
	$tch->all_teacher();
	$admin_array["mail"] = $tch->mail;
	
	$fac->id_fac = $tch_fac->fac;
	$fac->all_faculty();
	$admin_array["name_fac"] = $fac->name_fac;
	
	print_r(json_encode($admin_array));
	
	$database->endConnection();
	?>