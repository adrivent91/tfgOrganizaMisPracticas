<?php
	include_once '../Application/server/config/connectionDB.php';
	include_once '../Application/server/objects/student.php';
	include_once '../Application/server/utilities/utils.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	$util = new Utils();
		
	// set MAIL and PASSW property of 'student' to be edited
	$stdnt->mail = isset($_POST['mail']) ? $_POST['mail'] : die();
	$password = isset($_POST['passw']) ? $_POST['passw'] : die();	
	
	if($stdnt->login()){
		if($stdnt->id_stdnt>0){
			
			
			if($util->check_password($password, $stdnt->passw)){
				
				$tokenData = array();
				$tokenData['id'] = $stdnt->id_stdnt;
				$token = JWT::encode($tokenData);

				//create array
				$stdnt_array = array(
					"status"  => "OK",
					"id_stdnt" => $stdnt->id_stdnt,
					"token" => $token
				);
			}
			else{
				$stdnt_array = array(
						"status"  => "ERROR"
				);
			}
		}
		else{
			$stdnt_array = array(
			"status"  => "ERROR"
			);
		}
	}
	else{
		$stdnt_array = array(
			"status"  => "ERROR"
			);
	}
	
	print_r(json_encode($stdnt_array));	

	$database->endConnection();
?>