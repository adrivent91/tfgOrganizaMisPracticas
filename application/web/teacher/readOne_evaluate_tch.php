<?php
	
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/student.php';
	include_once '../../server/objects/delivery.php';
	include_once '../../server/objects/subject.php';
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
	
	
	// get ID of the product to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	$id_delivery = isset($_POST['id_dlv']) ? $_POST['id_dlv'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$stdnt = new Student($db);
	$dlv = new Delivery($db);
	$note_dlv = new Note_Delivery($db);
	$subject = new Subject($db);
	
	$stdnt->id_stdnt = $id_student;

	// read the details of product to be edited
	$stdnt->readOne();	
	
	$teacher_array = array(
			"status"  => "OK",
			"mail" => $stdnt->mail,
	);
	
	$dlv->id_dlv = $id_delivery;
	$dlv->readOne();
	$teacher_array["percent"] = $dlv->percent;
	$teacher_array["type_dlv"] = $dlv->type_dlv;
	$teacher_array["name_dlv"] = $dlv->name_dlv;
	
	$subject->id_sbj = $dlv->sbj;
	$subject->all_subject();
	$teacher_array["sbj"] = $subject->id_sbj;
	$teacher_array["abbrev_sbj"] = $subject->abbrev_sbj;
	
	$note_dlv->dlv = $id_delivery;
	$note_dlv->stdnt = $id_student;
	$note_dlv->readOne_noteDelivery();
	$teacher_array["note"] = $note_dlv->note;
	$teacher_array["tch_comment_note"] = $note_dlv->tch_comment_note;
	
	print_r(json_encode($teacher_array));
	
	$database->endConnection();
?>