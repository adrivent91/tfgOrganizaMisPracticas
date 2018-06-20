<?php
	
	include_once '../../../server/config/connectionDB.php';
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
	$id_faculty = isset($_POST['id_fac']) ? $_POST['id_fac'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$fac = new Faculty($db);
	
	// set ID property of product to be edited
	$fac->id_fac = $id_faculty;
	
	// read the details of product to be edited
	$fac->readOne();
	
	$admin_array = array(
			"status"  => "OK",
			"name_fac" => $fac->name_fac,
			"address" => $fac->address,
			"phone" => $fac->phone,
			"postal_code" => $fac->postal_code
				
	);
	
	print_r(json_encode($admin_array));
	
	$database->endConnection();
?>