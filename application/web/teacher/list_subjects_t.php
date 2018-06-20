<?php 

	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/teacher_subject.php';
	include_once '../../server/objects/subject.php';
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
	
	$tch_sbj = new Teacher_Subject($db);
	$subject = new Subject($db);
	
	$tch_sbj->tch = $id_teacher;

	
	$stmt = $tch_sbj->readOneTeacher();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$tch_array = array(
				"status"  => "OK"
		);
		
		$tch_array["subjects"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$tch_item = array(
					"sbj" => $sbj,
					"abbrev_sbj" => $abbrev_sbj,
			);
			
			$subject->id_sbj = $sbj;
			$subject->all_subject();
			$tch_item['course'] = $subject->course;
			$tch_item['group_sbj'] = $subject->group_sbj;
			
			$tch_sbj->sbj = $sbj;
			$tch_item['average'] = $tch_sbj->average_notes();
			
			$tch_sbj->sbj = $sbj;
			$tch_item['num_stdnt'] = $tch_sbj->count_stdnt();
				
			array_push($tch_array["subjects"], $tch_item);
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