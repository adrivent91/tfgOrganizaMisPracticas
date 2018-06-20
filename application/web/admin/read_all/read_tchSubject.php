<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher_subject.php';
	include_once '../../../server/objects/teacher.php';
	include_once '../../../server/objects/subject.php';
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
	
	$tch_sbj = new Teacher_Subject($db);
	$teacher = new Teacher($db);
	$subject = new Subject($db);
	
	$stmt = $tch_sbj->read();
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
				"sbj" => $sbj,
				"id" => $id
			);
			
			$teacher->id_tch = $tch;
			$teacher->all_teacher();
			$admin_item['mail'] = $teacher->mail;
			
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