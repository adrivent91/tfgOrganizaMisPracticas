<?php
	// include database and object files
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/note_delivery.php';
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


	$database = new Database();
	$db = $database->getConnection();
	
	$note_dlv = new Note_Delivery($db);
	
	$note_dlv->dlv = $_POST['id_one_dlv_ed'];
	$note_dlv->stdnt = $_POST['id_one_stdnt_ed'];

	
	if($note_dlv->search_id() > 0){
		
		$note_dlv->id = $note_dlv->search_id();
		$note_dlv->note = $_POST['note_eval'];
		$note_dlv->tch_comment_note = $_POST['tch_comment_eval'];
		$note_dlv->dlv = $_POST['id_one_dlv_ed'];
		$note_dlv->stdnt = $_POST['id_one_stdnt_ed'];
		
		if($note_dlv->update()){
	
			$teacher_array = array(
				"status"  => "OK",
				
			);
		}
		else{
			$teacher_array = array(
				"status"  => "ERROR"
			);
		}
	}
	else{
		
		$note_dlv->note = $_POST['note_eval'];
		$note_dlv->tch_comment_note = $_POST['tch_comment_eval'];
		$note_dlv->dlv = $_POST['id_one_dlv_ed'];
		$note_dlv->stdnt = $_POST['id_one_stdnt_ed'];
		
		
		
		if($note_dlv->create()){
	
			$teacher_array = array(
				"status"  => "OK",
				
			);
		}
		else{
			$teacher_array = array(
				"status"  => "ERROR"
			);
		}
	
	}
		 	
	
	print_r(json_encode($teacher_array));
	$database->endConnection();
?>	


