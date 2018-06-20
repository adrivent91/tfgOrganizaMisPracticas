<?php
	include_once '../server/config/connectionDB.php';
	include_once '../server/objects/teacher.php';
	include_once '../server/utilities/jwt_helper.php';
	include_once '../server/utilities/utils.php';
	
	// set ID property of 'student' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_teacher){
			$stdnt_array = array(
					"status"  => "ERROR",
					"type" => "1"
			);
			print_r(json_encode($tch_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_tch != $id_teacher){
			$stdnt_array = array(
					"status"  => "ERROR",
					"type" => "2"
			);
			print_r(json_encode($tch_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$tch = new Teacher($db);
	
	$tch->id_tch= $id_teacher;
	$utils = new Utils();
	
	$passw_old = $_POST['passw_old'];
	if($tch->readOne()){
		$tch->id_tch;
		$tch->passw;

			
			
		if($utils->check_password($passw_old, $tch->passw)){
		
			$passw_new = $_POST['passw_new'];
			$passw_confirm = $_POST['passw_confirm'];
			
			if($passw_confirm == $passw_new){
					
				$hash = $utils->hash_password($passw_confirm);
				$tch->passw = $hash;
					
				$tch->name_tch = $tch->name_tch;
				$tch->last_name_tch = $tch->last_name_tch;
				$tch->mail = $tch->mail;
				$tch->office = $tch->office;
					
				if($tch->update()){
					$tch_array = array(
						"status" => "OK",
						"id_tch" => $tch->id_tch,
						"passw_c" => $passw_confirm,
						"passw" => $tch->passw
					);
				}
				else{
					$tch_array = array(
							"status" => "ERROR",
							"type" => "3"
					);
				}
			}
			else{
				$tch_array = array(
						"status" => "ERROR",
						"type" => "4"
				);
			}
		}
		else{
			$tch_array = array(
					"status" => "ERROR",
					"type" => "4"
			);
		}
	}
	else{
		$tch_array = array(
			"status" => "ERROR",
			"type" => "5"
		);
	}

	print_r(json_encode($tch_array));
	
	$database->endConnection();

?>