<?php 

	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/teacher.php';
	include_once '../../server/objects/teacher_faculty.php';
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
	
	$tch = new Teacher($db);
	$tchFaculty = new Teacher_Faculty($db);
	//$faculty = new Faculty($db);
	
	$tch->id_tch= $id_teacher;
	
	if($tch->readOne()){
		$tch_array = array(
			"status" => "OK",
			"name_tch" => $tch->name_tch,
			"last_name_tch" => $tch->last_name_tch,
			"mail" => $tch->mail,
			"office" => $tch-> office,
		);
		
		$tch_array["faculties"]=array();
		
		
		$tchFaculty->tch = $id_teacher;
		
		$stmt_aux = $tchFaculty->readOneTeacher();
		$num_aux = $stmt_aux->rowCount() + 1;
		
		if($num_aux > 0){
			while($row_aux=$stmt_aux->fetch(PDO::FETCH_ASSOC)){
				extract($row_aux);
			
				$tch_item = array(
					"fac" => $fac,
					"name_fac" => $name_fac
				);
				array_push($tch_array["faculties"], $tch_item);
			}
		}
		
		
			
	}	
	else{
		$tch_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($tch_array));
	
	$database->endConnection();
?>