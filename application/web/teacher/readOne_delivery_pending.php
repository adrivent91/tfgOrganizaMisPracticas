<?php
	
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/delivery.php';
	include_once '../../server/objects/subject.php';
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
	$id_delivery = isset($_POST['id_dlv']) ? $_POST['id_dlv'] : die();
	
	$database = new Database();
	$db = $database->getConnection();
	
	$dlv = new Delivery($db);
	$subject = new Subject($db);
	
	// set ID property of product to be edited
	$dlv->id_dlv = $id_delivery;
	
	// read the details of product to be edited
	$dlv->readOne();
	
	
	$teacher_array = array(
			"status"  => "OK",
			"name_dlv" => $dlv->name_dlv,
			"percent" => $dlv->percent,
			"sbj" => $dlv->sbj,
			"rise_date" => $dlv->rise_date,
			"deliver_date" => $dlv->deliver_date,
			"type_dlv" => $dlv->type_dlv,
			"tch_comment" => $dlv->tch_comment,
				
	);
	
	$subject->id_sbj = $dlv->sbj;
	$subject->all_subject();
	$teacher_array['abbrev_sbj'] = $subject->abbrev_sbj;
	
	
	print_r(json_encode($teacher_array));
	
	$database->endConnection();
?>