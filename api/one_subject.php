<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/subject_student.php';
	include_once '../application/server/objects/subject.php';
	include_once '../application/server/objects/note_delivery.php';
	include_once '../application/server/objects/delivery.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	$subject = isset($_POST['sbj']) ? $_POST['sbj'] : die();
	
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
	$sub = new Subject($db);
	$note_dlv = new Note_Delivery($db);
	$delivery = new Delivery($db);
	
	$sbj_stdnt->stdnt = $id_student;
	$sbj_stdnt->sbj = $subject;
	
	if($sbj_stdnt->readOne_sbjStdnt()){
		$sbj_stdnt_array = array(
			"status" => "OK",
			"regist_num" => $sbj_stdnt->regist_num,
			"regist_year" => $sbj_stdnt->regist_year
		);
		
		$sub->id_sbj = $sbj_stdnt->sbj;
		$sub->all_subject();
		$sbj_stdnt_array['abbrev_sbj'] = $sub->abbrev_sbj;
		$sbj_stdnt_array['name_sbj'] = $sub->name_sbj;
		$sbj_stdnt_array['course'] = $sub->course;
		$sbj_stdnt_array['credits'] = $sub->credits;
		$sbj_stdnt_array['group_sbj'] = $sub->group_sbj;
		
		
		$sbj_stdnt->stdnt = $id_student;
		$sbj_stdnt->sbj = $subject;
		
		$stmt_aux = $sbj_stdnt->notes_sbj();
		$num_aux = $stmt_aux->rowCount() + 1;
		
		if($num_aux > 0){
			
			$sbj_stdnt_array["notes"]=array();
			
			while($row_aux=$stmt_aux->fetch(PDO::FETCH_ASSOC)){
				extract($row_aux);
				
				$note_dlv->id = $id;
				$note_dlv->all_note_delivery_id();
				$delivery->id_dlv = $note_dlv->dlv;
				$delivery->all_delivery();
				
				$sbj_stdnt_item = array(
					"id_note" => $id,
					"note" => $note_dlv->note,
					"id_dlv" => $note_dlv->dlv,
					"name_dlv" => $delivery->name_dlv,
					"percent" => $delivery->percent
				);
				
				array_push($sbj_stdnt_array["notes"], $sbj_stdnt_item);
			}
			
			$sbj_stdnt_array['average'] = $sbj_stdnt->average_notes();
		}
		else{
			$sbj_stdnt_array = array(
				"status"  => "ERROR"
			);
		}
	}
		
	else{
		$sbj_stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($sbj_stdnt_array));
	
	$database->endConnection();
?>