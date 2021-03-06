<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher.php';
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
	
	$tch = new Teacher($db);
	
	$stmt = $tch->read();
	$num = $stmt->rowCount() + 1;
	
	
	if($num>0){
	
		$admin_array = array(
				"status"  => "OK"
		);
	
		$admin_array["teachers"]=array();
		
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$admin_item = array(
					"name_tch" => $name_tch,
					"last_name_tch" => $last_name_tch,
					"mail" => $mail,
					"office" => $office,
					"id_teacher" => $id_tch
			);
				
			array_push($admin_array["teachers"], $admin_item);
		}
			
		//json_encode($dlv_tch_array);
	}
		
	else{
		$admin_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($admin_array));

	$database->endConnection();
?>