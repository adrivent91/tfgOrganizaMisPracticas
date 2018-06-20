<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/delivery_student.php';
	include_once '../application/server/objects/note_delivery.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	$id_dlv = isset($_POST['id_dlv']) ? $_POST['id_dlv'] : die();
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_student){
			$dlv_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($dlv_stdnt_array));
			return;  // muy importante el return, pq print_r continua
		}
	
	} catch (Exception $e) {
		if($token->id_stdnt != $id_student){
			$dlv_stdnt_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($dlv_stdnt_array));
		}
		return;
	}
	
	$database = new Database();
	$db = $database->getConnection();
	
	$dlv_stdnt = new Delivery_Student($db);
	$note_dlv = new Note_Delivery($db);
	
	$dlv_stdnt->id_stdnt= $id_student;
	$dlv_stdnt->id_dlv = $id_dlv;
	
	
	if($dlv_stdnt->readOne_dlvStdnt()){
		$dlv_stdnt_array = array(
			"status" => "OK",
			"name_dlv" => $dlv_stdnt->name_dlv,
			"rise_date" => $dlv_stdnt->rise_date,
			"deliver_date" => $dlv_stdnt->deliver_date,
			"type_dlv" => $dlv_stdnt->type_dlv,
			"percent" => $dlv_stdnt->percent,
			"tch_comment" => $dlv_stdnt->tch_comment,
			"abbrev_sbj" => $dlv_stdnt->abbrev_sbj,
			"sbj" => $dlv_stdnt->sbj	
		);
		
		$note_dlv->stdnt = $id_student;
		$note_dlv->dlv = $id_dlv;
		
		$dlv_stdnt_array["note_dlv"]=array();
		
		if($note_dlv->readOne_noteDelivery()){
			$dlv_stdnt_item = array(
				"note" => $note_dlv->note,
				"tch_comment_note" => $note_dlv->tch_comment_note
			);
			
			array_push($dlv_stdnt_array["note_dlv"], $dlv_stdnt_item);
		}
	}
		
	else{
		$dlv_stdnt_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($dlv_stdnt_array));
	
	$database->endConnection();
?>