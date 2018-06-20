<?php
	
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/studies.php';
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
	$id_stds = isset($_POST['id_stds']) ? $_POST['id_stds'] : die('ERROR: missing ID.');
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stds = new Studies($db);
	$fac = new Faculty($db);
	
	// set ID property of product to be edited
	$stds->id_stds = $id_stds;
	
	// read the details of product to be edited
	$stds->readOne();
	
	$admin_array = array(
		"status"  => "OK",
		"abbrev_stds" => $stds->abbrev_stds,
		"name_stds" => $stds->name_stds,
		"type_stds" => $stds->type_stds,
		"itinerary" => $stds->itinerary,
		"fac" => $stds->fac,
				
	);
	
	$fac->id_fac = $stds->fac;
	$fac->all_faculty();
	$admin_array["name_fac"] =  $fac->name_fac;
	
	print_r(json_encode($admin_array));
	
	$database->endConnection();
?>