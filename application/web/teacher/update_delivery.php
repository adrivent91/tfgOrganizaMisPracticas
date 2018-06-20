<?php
	// include database and object files
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/delivery.php';
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
	
	$dlv = new Delivery($db);

	$dlv->id_dlv = $_POST['id_dlv_ed'];
		 	
	$dlv->name_dlv = $_POST['name_dlv_ed'];
	$dlv->type_dlv = $_POST['type_dlv_ed'];
	$dlv->percent = $_POST['percent_ed'];
	$dlv->rise_date = $_POST['rise_date_ed'];
	$dlv->deliver_date = $_POST['deliver_date_ed'];
	$dlv->tch_comment = $_POST['tch_comment_ed'];
	$dlv->sbj = $_POST['subject_teacher_ed'];
	
	if($dlv->update()){
		$teacher_array = array(
			"status"  => "OK"
		);
	}
	else{
		$teacher_array = array(
			"status"  => "ERROR"
		);
	}
	
	print_r(json_encode($teacher_array));
	$database->endConnection();
?>	


