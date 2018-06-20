<?php
	
	// include database and object files
	include_once '../../../server/config/connectionDB.php';
	include_once '../../../server/objects/teacher_student.php';
	include_once '../../../server/objects/teacher.php';
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
	
	$tch_stdnt = new Teacher_Student($db);
	$teacher = new Teacher($db);
	$student = new Student($db);
	

	$stmt = $tch_stdnt->read();
	$num = $stmt->rowCount() + 1;
	
	
	if($num>0){
	
		
		$admin_array = array(
				"status"  => "OK"
		);
		
		
		$admin_array["contents"]=array();
	
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
	
			$admin_item = array(
				"tch" => $id_tch,
				"stdnt" => $id_stdnt,
				"id" => $id
			);
			
			$teacher->id_tch = $id_tch;
			$teacher->all_teacher();
			$admin_item['mail_tch'] = $teacher->mail;
			
			$student->id_stdnt = $id_stdnt;
			$student->all_student();
			$admin_item['mail_stdnt'] = $student->mail;
			
			$tch_stdnt->id_stdnt = $id_stdnt;
			$tch_stdnt->id_tch = $id_tch;
			$stmt_aux = $tch_stdnt->readSubject_tchStudent();
			$num_aux = $stmt_aux->rowCount() + 1;
			
			
			if($num_aux >0){
				$admin_item["subjects"]=array();
				while ($row_aux= $stmt_aux->fetch(PDO::FETCH_ASSOC)){
					extract($row_aux);
					
					$admin_aux = array(
						"abbrev_sbj" => $abbrev_sbj
					);
				}
				array_push($admin_item["subjects"], $admin_aux);
				
				array_push($admin_array["contents"], $admin_item);
			}
			
			//array_push($admin_array["contents"], $admin_item);
			
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