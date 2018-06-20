<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/studies.php';
	include_once '../../../server/objects/student.php';
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
	
	$studies = new Studies($db);
	$stdnt = new Student($db);
	
	$stmt = $stdnt->read();
	$num = $stmt->rowCount() + 1;
	
	
	if($num>0){
	
		$admin_array = array(
				"status"  => "OK"
		);
	
		$admin_array["students"]=array();
		
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$admin_item = array(
					"name_stdnt" => $name_stdnt,
					"last_name_stdnt" => $last_name_stdnt,
					"mail" => $mail,
					"stds" => $stds,
					"id_stdnt" => $id_stdnt
			);
			
			$studies->id_stds = $stds;
			$studies->all_studies();
			$admin_item['abbrev_stds'] = $studies->abbrev_stds;
			
			array_push($admin_array["students"], $admin_item);
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