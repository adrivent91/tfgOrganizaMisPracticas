<?php 

	include_once '../application/server/config/connectionDB.php';
	include_once '../application/server/objects/delivery_student.php';
	include_once '../application/server/objects/note_delivery.php';
	include_once '../application/server/objects/subject.php';
	include_once '../Application/server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_student = isset($_POST['id_stdnt']) ? $_POST['id_stdnt'] : die();
	
	//var_dump($id_student); return;  // para depurar
	
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
	$subject = new Subject($db);
	
	$dlv_stdnt->id_stdnt = $id_student;

	
	$stmt = $dlv_stdnt->readOneStudent();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$dlv_stdnt_array = array(
				"status"  => "OK"
		);
		
		$dlv_stdnt_array["deliveries"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$dlv_stdnt_item = array(
					"id_dlv" => $id_dlv,
					"deliver_date" => $deliver_date,
					"type_dlv" => $type_dlv,
					"name_dlv" => $name_dlv,
					"sbj" => $sbj,
					"abbrev_sbj" => $abbrev_sbj
			);
			
			$subject->id_sbj = $sbj;
			$subject->all_subject();
			$dlv_stdnt_item['name_sbj'] = $subject->name_sbj;
				
			$note_dlv->stdnt = $id_student;
			$note_dlv->dlv = $id_dlv;
			
			$dlv_stdnt_item["note_dlv"]=array();
			
			if($note_dlv->readOne_noteDelivery()){
				$dlv_stdnt_item_note = array(
						"note" => $note_dlv->note,
						"tch_comment_note" => $note_dlv->tch_comment_note
				);
					
				array_push($dlv_stdnt_item["note_dlv"], $dlv_stdnt_item_note);
			}
				
			array_push($dlv_stdnt_array["deliveries"], $dlv_stdnt_item);
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