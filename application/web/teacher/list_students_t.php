<?php 

	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/teacher_student.php';
	include_once '../../server/objects/student.php';
	include_once '../../server/objects/studies.php';
	include_once '../../server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	
	//var_dump($id_student); return;  // para depurar
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_teacher){
			$tch_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($tch_array));
			return;  // muy importante el return, pq print_r continua
		}
		
	} catch (Exception $e) {
		if($token->id_tch != $id_teacher){
			$tch_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($tch_array));
		}
		return;
	}
	
	
	$database = new Database();
	$db = $database->getConnection();
	
	$tch_stdnt = new Teacher_Student($db);
	$student = new Student($db);
	$studies = new Studies($db);
	
	$tch_stdnt->id_tch = $id_teacher;

	
	$stmt = $tch_stdnt->readOneTeacher();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$tch_array = array(
				"status"  => "OK"
		);
		
		$tch_array["students"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$tch_item = array(
					"stdnt" => $id_stdnt,
			);
			
			$student->id_stdnt = $id_stdnt;
			$student->all_student();
			$tch_item['name_stdnt'] = $student->name_stdnt;
			$tch_item['last_name_stdnt'] = $student->last_name_stdnt;
			$tch_item['mail'] = $student->mail;
			
			$studies->id_stds = $student->stds;
			$studies->all_studies();
			$tch_item['name_stds'] = $studies->name_stds;
			
			$tch_stdnt->id_stdnt = $id_stdnt;
			$tch_item['num_sbj'] = $tch_stdnt->count_sbj();
				
			array_push($tch_array["students"], $tch_item);
		}
			
		//json_encode($dlv_tch_array);
	}
		
	else{
		$tch_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($tch_array));
	
	$database->endConnection();
?>