<?php
	include_once '../server/config/connectionDB.php';
	include_once '../server/objects/teacher.php';
	include_once '../server/utilities/utils.php';
	include_once '../server/utilities/jwt_helper.php';
	
	$database = new Database();
	$db = $database->getConnection();
	
	$tch = new Teacher($db);
	$util = new Utils();
		
	// set MAIL and PASSW property of 'student' to be edited
	$tch->mail = isset($_POST['mail_login']) ? $_POST['mail_login'] : die();
	$password = isset($_POST['passw_login']) ? $_POST['passw_login'] : die();	
	
	if($tch->login()){
		if($tch->id_tch > 0){
			
			if($util->check_password($password, $tch->passw)){
				
				$tokenData = array();
				$tokenData['id'] = $tch->id_tch;
				$token = JWT::encode($tokenData);

				//create array
				$tch_array = array(
					"status"  => "OK",
					"id_tch" => $tch->id_tch,
					"token" => $token
				);
			}
			else{
				$tch_array = array(
						"status"  => "ERROR"
				);
			}
		}
		else{
			$tch_array = array(
			"status"  => "ERROR"
			);
		}
	}
	else{
		$tch_array = array(
			"status"  => "ERROR"
			);
	}
	
	print_r(json_encode($tch_array));	

	$database->endConnection();
?>