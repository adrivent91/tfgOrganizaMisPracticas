<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/studies.php';
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
	$id_sbj = isset($_POST['id_sbj']) ? $_POST['id_sbj'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stds = new Studies($db);
	$sbj = new Subject($db);
	
	// set ID property of product to be edited
	$sbj->id_sbj = $id_sbj;
	
	// read the details of product to be edited
	$sbj->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"abbrev_sbj" => $sbj->abbrev_sbj,
		"name_sbj" => $sbj->name_sbj,
		"credits" => $sbj->credits,
		"course" => $sbj->course,
		"group_sbj" => $sbj->group_sbj,
		"quarter" => $sbj->quarter,
		"stds" => $sbj->stds,
				
	);
	
	$stds->id_stds = $sbj->stds;
	$stds->all_studies();
	$admin_array["abbrev_stds"] = $stds->abbrev_stds;
	
	print_r(json_encode($admin_array));
	
	$database->endConnection();
	?>