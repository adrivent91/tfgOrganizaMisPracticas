<?php 
	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/delivery_teacher.php';
	include_once '../../server/objects/student.php';
	include_once '../../server/objects/note_delivery.php';
	include_once '../../server/utilities/jwt_helper.php';
	
	
	// set ID property of 'student' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	$id_delivery = isset($_POST['id_dlv']) ? $_POST['id_dlv'] : die();
	
	
	//var_dump($id_student); return;  // para depurar
	
	try {
		$token_from_post=$_POST['token'];
		$token=JWT::decode($token_from_post);
		if($token->id != $id_teacher){
			$dlv_tch_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($dlv_tch_array));
			return;  // muy importante el return, pq print_r continua
		}
		
	} catch (Exception $e) {
		if($token->id_tch != $id_teacher){
			$dlv_tch_array = array(
					"status"  => "ERROR"
			);
			print_r(json_encode($dlv_tch_array));
		}
		return;
	}

	
	$database = new Database();
	$db = $database->getConnection();
	
	$dlv_tch = new Delivery_Teacher($db);
	$stdnt = new Student($db);
	$note_dlv = new Note_Delivery($db);
	
	$dlv_tch->id_dlv = $id_delivery;

	$stmt = $dlv_tch->read_one_delivery();
	$num = $stmt->rowCount() + 1;
	
	
	if($num > 0){
		$dlv_tch_array = array(
				"status"  => "OK"
		);
		
		
		$dlv_tch_array["deliveries"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$dlv_tch_item = array(
					"name_dlv" => $name_dlv,
					"sbj" => $id_sbj,
					"abbrev_sbj" => $abbrev_sbj,
					"id_stdnt" => $id_stdnt,
			);
			
			$stdnt->id_stdnt = $id_stdnt;
			$stdnt->all_student();
			$dlv_tch_item['name_stdnt'] = $stdnt->name_stdnt;
			$dlv_tch_item['last_name_stdnt'] = $stdnt->last_name_stdnt;
			
			$note_dlv->dlv = $id_delivery;
			$note_dlv->stdnt = $id_stdnt;
			$note_dlv->readOne_noteDelivery();
			$dlv_tch_item['note'] = $note_dlv->note;
			$dlv_tch_item['tch_comment_note'] = $note_dlv->tch_comment_note;
			
			array_push($dlv_tch_array["deliveries"], $dlv_tch_item);
		}
			
		//json_encode($dlv_tch_array);
	}
		
	else{
		$dlv_tch_array = array(
			"status"  => "ERROR"
		);
	}
	
	

	print_r(json_encode($dlv_tch_array));
	
	$database->endConnection();
?>