<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/studies.php';
	include_once '../../../server/utilities/jwt_helper.php';
	
	// set ID property of 'studies' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	
	//var_dump($id_studies); return;  // para depurar
	
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
	
	$studies = new Studies($db);
 
 	$studies->id_stds = $_POST['id_stds_ed'];
 	$studies->abbrev_stds = $_POST['abbrev_stds_ed'];
	$studies->name_stds = $_POST['name_stds_ed'];
	$studies->type_stds = $_POST['type_stds_ed'];
	if($_POST['itinerary_ed'] == "null"){
		$studies->itinerary = null;
	}
	else{
		$studies->itinerary = $_POST['itinerary_ed'];
	}
	
	$studies->fac = $_POST['fac_stds_ed'];
	
	if($studies->update()){
	
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


