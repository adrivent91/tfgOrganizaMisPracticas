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
			$teacher_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($teacher_array));
			return;  // muy importante el return, pq print_r continua
		}
		
	} catch (Exception $e) {
		if($token->id_tch != $id_teacher){
			$teacher_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($teacher_array));
		}
		return;
	}
	
	// get ID of the product to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	$studies = new Studies($db);
	$tch_stdnt = new Teacher_Student($db);
	
	// set ID property of product to be edited
	$stdnt->id_stdnt = $id_student;
	
	// read the details of product to be edited
	$stdnt->readOne();
	
	
	$teacher_array = array(
			"status"  => "OK",
			"name_stdnt" => $stdnt->name_stdnt,
			"last_name_stdnt" => $stdnt->last_name_stdnt,
			"mail" => $stdnt->mail,
			"stds" => $stdnt->stds,
				
	);
	
	$studies->id_stds = $stdnt->stds;
	$studies->all_studies();
	$teacher_array["name_stds"] = $studies->abbrev_stds;
	
	$tch_stdnt->id_stdnt = $id_student;
	$teacher_array['num_sbj'] = $tch_stdnt->count_sbj();
	
	$tch_stdnt->id_stdnt = $id_student;
	$stmt = $tch_stdnt->deliv_stdnt();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		
		$teacher_array["deliveries"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$tch_item = array(
				"dlv" => $id_dlv,
				"name_dlv" => $name_dlv, 
				"note" => $note, 
				"percent" => $percent,
				"sbj" => $id_sbj,
				"abbrev_sbj" => $abbrev_sbj
			);
			
			array_push($teacher_array["deliveries"], $tch_item);
		}
			
		//json_encode($dlv_tch_array);
	}
		
	
	print_r(json_encode($teacher_array));
	
	$database->endConnection();
?>