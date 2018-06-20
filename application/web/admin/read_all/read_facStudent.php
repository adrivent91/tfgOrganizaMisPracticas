<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/student_faculty.php';
	include_once '../../../server/objects/faculty.php';
	include_once '../../../server/objects/student.php';
	include_once '../../../server/objects/studies.php';
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
	
	$stdnt_fac = new Student_Faculty($db);
	$faculty = new Faculty($db);
	$student = new Student($db);
	$studies = new Studies($db);
	
	
	$stmt = $stdnt_fac->read();
	$num = $stmt->rowCount() + 1;
	
	
	if($num>0){
	
		$admin_array = array(
				"status"  => "OK"
		);
		
		$admin_array["contents"]=array();
		
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
	
			$admin_item = array(
				"fac" => $id_fac,
				"stdnt" => $id_stdnt,
				"id" => $id
			);
			
			$faculty->id_fac = $id_fac;
			$faculty->all_faculty();
			$admin_item['name_fac'] = $faculty->name_fac;
		
			$student->id_stdnt = $id_stdnt;
			$student->all_student();
			$admin_item['mail'] = $student->mail;
			
			$student->id_stdnt = $id_stdnt;
			$student->all_student();
			$studies->id_stds = $student->stds;
			$studies->all_studies();
			$admin_item['abbrev_stds'] = $studies->abbrev_stds;
			
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