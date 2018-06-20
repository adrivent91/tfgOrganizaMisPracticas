<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/subject_student.php';
	include_once '../../../server/objects/subject.php';
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
	
	$sbj_stdnt = new Subject_Student($db);
	$subject = new Subject($db);
	$student = new Student($db);
	
	$stmt = $sbj_stdnt->read();
	$num = $stmt->rowCount() + 1;
	
	if($num>0){
	
		$admin_array = array(
				"status"  => "OK"
		);
		
		$admin_array["contents"]=array();
	
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	
			extract($row);
	
			$admin_item = array(
				"regist_num" => $regist_num,
				"regist_year" => $regist_year,
				"stdnt" => $stdnt,
				"sbj" => $sbj,
				"id" => $id,
			);
			
			$student->id_stdnt = $stdnt;
			$student->all_student();
			$admin_item['mail'] = $student->mail;
		
			$subject->id_sbj = $sbj;
			$subject->all_subject();
			$admin_item['abbrev_sbj'] = $subject->abbrev_sbj;
			
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