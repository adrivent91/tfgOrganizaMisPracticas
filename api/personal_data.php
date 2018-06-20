<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/student.php';
	include_once '../application/server/objects/studies.php';
	include_once '../application/server/objects/faculty.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($stdnt_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	$studies = new Studies($db);
	$faculty = new Faculty($db);
	
	$stdnt->id_stdnt= $id_student;
	
	
	if($stdnt->readOne()){
		$stdnt_array = array(
			"status" => "OK",
			"name_stdnt" => $stdnt->name_stdnt,
			"last_name_stdnt" => $stdnt->last_name_stdnt,
			"mail" => $stdnt->mail
		);
		
		$studies->id_stds = $stdnt->stds;
		$studies->all_studies();
		$faculty->id_fac = $studies->fac;
		$faculty->all_faculty();
				
		$stdnt_array["info"]=array();
				
		$stdnt_item = array(
			"abbrev_stds" => $studies->abbrev_stds,
			"name_fac" => $faculty->name_fac
		);
		
		array_push($stdnt_array["info"], $stdnt_item);
			
	}	
	else{
		$stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($stdnt_array));
	
	$database->endConnection();
?>