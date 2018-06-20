<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher_faculty.php';
	include_once '../../../server/objects/teacher.php';
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
	
	$tch_fac = new Teacher_Faculty($db);
	$teacher = new Teacher($db);
	$faculty = new Faculty($db);
	
	$stmt = $tch_fac->read();
	$num = $stmt->rowCount() + 1;
	
	
	if($num>0){
	
		$admin_array = array(
				"status"  => "OK"
		);
		
		$admin_array["contents"]=array();
	
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
	
			$admin_item = array(
				"tch" => $tch,
				"fac" => $fac,
				"id" => $id
			);
			
			$teacher->id_tch = $tch;
			$teacher->all_teacher();
			$admin_item['mail'] = $teacher->mail;
			
			$faculty->id_fac = $fac;
			$faculty->all_faculty();
			$admin_item['name_fac'] = $faculty->name_fac;
			
			array_push($admin_array["contents"], $admin_item);
		}

	}
		
	else{
		$admin_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($admin_array));
			
	$database->endConnection();
?>