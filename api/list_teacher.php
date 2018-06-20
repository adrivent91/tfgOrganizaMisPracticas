<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/teacher_student.php';
	include_once '../application/server/objects/teacher.php';
	include_once '../application/server/objects/subject.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$tch_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($tch_stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$tch_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($tch_stdnt_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$tch_stdnt = new Teacher_Student($db);
	$teacher = new Teacher($db);
	$subject = new Subject($db);

	$tch_stdnt->id_stdnt = $id_student;
	
	$stmt = $tch_stdnt->readOneStudent();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$tch_stdnt_array = array(
				"status"  => "OK"
		);
		
		$tch_stdnt_array["teachers"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$tch_stdnt_item = array(
				"id_tch" => $id_tch,
				"id_sbj" => $id_sbj,
			);
			
			$teacher->id_tch = $id_tch;
			$teacher->all_teacher();
			$tch_stdnt_item['name_tch'] = $teacher->name_tch;
			$tch_stdnt_item['last_name_tch'] = $teacher->last_name_tch;
			$tch_stdnt_item['mail'] = $teacher->mail;
			$subject->id_sbj = $id_sbj;
			$subject->all_subject();
			$tch_stdnt_item['abbrev_sbj'] = $subject->abbrev_sbj;
			
			
			array_push($tch_stdnt_array["teachers"], $tch_stdnt_item);
		}
			
	}
		
	else{
		$tch_stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($tch_stdnt_array));
	
	$database->endConnection();
?>