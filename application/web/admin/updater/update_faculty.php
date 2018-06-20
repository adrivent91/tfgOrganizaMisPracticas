<?php
	
	// include database and object files
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

	$database = new Database();
	$db = $database->getConnection();
	
	$fac = new Faculty($db);
 
 	$fac->id_fac = $_POST['id_fac_ed'];
 	$fac->name_fac = $_POST['name_fac_ed'];
	$fac->address = $_POST['address_ed'];
	$fac->phone = $_POST['phone_ed'];
	$fac->postal_code = $_POST['postal_code_ed'];
	
	if($fac->update()){
	
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


