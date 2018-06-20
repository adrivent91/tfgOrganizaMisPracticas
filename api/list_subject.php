<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/subject_student.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$sbj_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($sbj_stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$sbj_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($sbj_stdnt_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$sbj_stdnt = new Subject_Student($db);
	
	// set ID property of 'student' to be edited
	$sbj_stdnt->stdnt = $id_student;
	
	$stmt = $sbj_stdnt->readOneStudent();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$sbj_stdnt_array = array(
				"status"  => "OK"
		);
		
		$sbj_stdnt_array["subjects"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$sbj_stdnt_item = array(
					"sbj" => $sbj,
					"abbrev_sbj" => $abbrev_sbj,
					"course" => $course,
					"group_sbj" => $group_sbj,
					"name_sbj" => $name_sbj,
			);
			
			$sbj_stdnt->sbj = $sbj;
			$sbj_stdnt_item['average'] = $sbj_stdnt->average_notes();
			
			array_push($sbj_stdnt_array["subjects"], $sbj_stdnt_item);
		}
			
		//json_encode($dlv_stdnt_array);
	}
		
	else{
		$sbj_stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($sbj_stdnt_array));
	
	$database->endConnection();
?>