<?php 

	include_once '../../server/config/connectionDB.php';
	include_once '../../server/objects/delivery_teacher.php';
	include_once '../../server/utilities/jwt_helper.php';
	
	// set ID property of 'student' to be edited
	$id_teacher = isset($_POST['id_tch']) ? $_POST['id_tch'] : die();
	
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
	
	$dlv_tch->id_tch = $id_teacher;

	
	$stmt = $dlv_tch->read_deliveries_tch();
	$num = $stmt->rowCount() + 1;
	
	if($num > 0){
		$dlv_tch_array = array(
				"status"  => "OK"
		);
		
		$dlv_tch_array["deliveries"]=array();
	
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
				
			$dlv_tch_item = array(
					"id_dlv" => $id_dlv,
					"deliver_date" => $deliver_date,
					"type_dlv" => $type_dlv,
					"name_dlv" => $name_dlv,
					"sbj" => $id_sbj,
					"abbrev_sbj" => $abbrev_sbj,
			);
				
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