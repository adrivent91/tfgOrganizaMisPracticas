<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/studies.php';
	include_once '../../../server/objects/student.php';
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
	$id_stdnt = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die('ERROR: missing ID.');
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stds = new Studies($db);
	$stdnt = new Student($db);
	
	// set ID property of product to be edited
	$stdnt->id_stdnt = $id_stdnt;
	
	// read the details of product to be edited
	$stdnt->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"name_stdnt" => $stdnt->name_stdnt,
		"last_name_stdnt" => $stdnt->last_name_stdnt,
		"mail" => $stdnt->mail,
		"passw" => $stdnt->passw,
		"stds" => $stdnt->stds,
				
	);
	
	$stds->id_stds = $stdnt->stds;
	$stds->all_studies();
	$admin_array["abbrev_stds"] = $stds->abbrev_stds;
	
	print_r(json_encode($admin_array));

   
	$database->endConnection();
	?>