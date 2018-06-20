<?php
	
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/teacher_subject.php';
	include_once '../../server/objects/subject.php';
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
	$id_subject = isset($_POST['id_sbj']) ? $_POST['id_sbj'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$sbj = new Subject($db);
	$studies = new Studies($db);
	$tch_sbj = new Teacher_Subject($db);
	
	// set ID property of product to be edited
	$sbj->id_sbj = $id_subject;
	
	// read the details of product to be edited
	$sbj->readOne();
	
	
	$teacher_array = array(
			"status"  => "OK",
			"abbrev_sbj" => $sbj->abbrev_sbj,
			"name_sbj" => $sbj->name_sbj,
			"credits" => $sbj->credits,
			"course" => $sbj->course,
			"group_sbj" => $sbj->group_sbj,
			"quarter" => $sbj->quarter,
			"stds" => $sbj->stds,
				
	);
	
	$studies->id_stds = $sbj->stds;
	$studies->all_studies();
	$teacher_array["abbrev_stds"] = $studies->abbrev_stds;
	
	$tch_sbj->sbj = $id_subject;
	$teacher_array['average'] = $tch_sbj->average_notes();
			
	$tch_sbj->sbj = $id_subject;
	$teacher_array['num_stdnt'] = $tch_sbj->count_stdnt();
		
	
	print_r(json_encode($teacher_array));
	
	$database->endConnection();
?>