<?php
	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/student.php';
	include_once '../application/server/utilities/jwt_helper.php';
	include_once '../application/server/utilities/utils.php';
	
	// set ID property of 'student' to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$stdnt_array = array(
					"status"  => "ERROR",
					"type" => "1"
			);
			print_r(json_encode($stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$stdnt_array = array(
					"status"  => "ERROR",
					"type" => "2"
			);
			print_r(json_encode($stdnt_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	
	$stdnt->id_stdnt= $id_student;
	$utils = new Utils();
	
	$passw_old= $_POST['passw_old'];
	if($stdnt->readOne()){
		$stdnt->id_stdnt;
		$stdnt->passw;
		//echo $stdnt->name_stdnt;
			
			
		if($utils->check_password($passw_old, $stdnt->passw)){
		
			$passw_new = $_POST['passw_new'];
			$passw_confirm = $_POST['passw_confirm'];
			
			if($passw_confirm == $passw_new){
					
				$hash = $utils->hash_password($passw_confirm);
				$stdnt->passw = $hash;
					
				$stdnt->name_stdnt = $stdnt->name_stdnt;
				$stdnt->last_name_stdnt = $stdnt->last_name_stdnt;
				$stdnt->mail = $stdnt->mail;
					
				if($stdnt->update()){
					$stdnt_array = array(
						"status" => "OK",
						"id_stdnt" => $stdnt->id_stdnt,
						"passw_c" => $passw_confirm,
						"passw" => $stdnt->passw
					);
				}
				else{
					$stdnt_array = array(
							"status" => "ERROR",
							"type" => "3"
					);
				}
			}
			else{
				$stdnt_array = array(
						"status" => "ERROR",
						"type" => "4"
				);
			}
		}
		else{
			$stdnt_array = array(
					"status" => "ERROR",
					"type" => "4"
			);
		}
	}
	else{
		$stdnt_array = array(
			"status" => "ERROR",
			"type" => "5"
		);
	}

	print_r(json_encode($stdnt_array));
	
	$database->endConnection();

?>