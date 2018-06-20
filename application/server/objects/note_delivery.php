<?php
	class Note_Delivery{
		private $conn;
		private $table_name = "Note_Delivery";
		
		public $id;
		public $note;
		public $tch_comment_note;
		public $dlv; 
		public $stdnt;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		
		public function read(){
			// select all query
			$query = "SELECT
				nd.id, nd.note, nd.tch_comment_note, nd.dlv, d.type_dlv, d.name_dlv, d.deliver_date, d.sbj, sb.abbrev_sbj, nd.stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE nd.dlv = d.id_dlv
            AND d.sbj = sbst.sbj
			AND d.sbj = sb.id_sbj
            AND nd.stdnt = st.id_stdnt
			AND nd.stdnt = sbst.stdnt";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		
		//See all the deliveries of a student
		public function readOneStudent(){
			
			 // NO ES NECESARIO HACER COMPROBACION DE EXISTENCIA, SE COMPRUEBA DESPUES
			 
			//select one query
			$query = "SELECT
				nd.id, nd.note, nd.tch_comment_note, nd.dlv, d.type_dlv, d.name_dlv, d.deliver_date, d.sbj, sb.abbrev_sbj, nd.stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE nd.dlv = d.id_dlv
            AND d.sbj = sbst.sbj
			AND d.sbj = sb.id_sbj
            AND nd.stdnt = st.id_stdnt
			AND nd.stdnt = sbst.stdnt
            AND st.id_stdnt = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		//See all the deliveries of a student
		public function readOneStudent_subject(){
			
			 // NO ES NECESARIO HACER COMPROBACION DE EXISTENCIA, SE COMPRUEBA DESPUES
			 
			//select one query
			$query = "SELECT
				nd.id, nd.note, nd.tch_comment_note, nd.dlv, d.name_dlv, d.type_dlv, d.deliver_date, d.sbj, sb.abbrev_sbj, nd.stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE nd.dlv = d.id_dlv
            AND d.sbj = sbst.sbj
			AND d.sbj = sb.id_sbj
            AND nd.stdnt = st.id_stdnt
			AND nd.stdnt = sbst.stdnt
			AND nd.stdnt = ?
			AND d.sbj = ?";
		
			// prepare query statement
			$stmt = $this->conn->prepare($query);
		
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->sbj, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		//See all the students of a delivery
		public function readOneDelivery(){
			
			 // NO ES NECESARIO HACER COMPROBACION DE EXISTENCIA, SE COMPRUEBA DESPUES
			 
			//select one query
			$query = "SELECT
				nd.id, nd.note, nd.tch_comment_note, nd.dlv, d.name_dlv, d.type_dlv,d.deliver_date, d.sbj, sb.abbrev_sbj, nd.stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE nd.dlv = d.id_dlv
            AND d.sbj = sbst.sbj
			AND d.sbj = sb.id_sbj
            AND nd.stdnt = st.id_stdnt
			AND nd.stdnt = sbst.stdnt
            AND d.id_dlv = ? ";
		
			// prepare query statement
			$stmt = $this->conn->prepare($query);
		
			// bind id of 'delivery' to be updated
			$stmt->bindParam(1, $this->dlv, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function readOne_noteDelivery(){
			//select one query
			$query = "SELECT
				nd.id, nd.note, nd.tch_comment_note, nd.dlv, d.name_dlv, d.type_dlv, d.percent, d.sbj, sb.abbrev_sbj, nd.stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE nd.dlv = d.id_dlv
            AND d.sbj = sbst.sbj
			AND d.sbj = sb.id_sbj
            AND nd.stdnt = st.id_stdnt
			AND nd.stdnt = sbst.stdnt
            AND st.id_stdnt = ?
			AND d.id_dlv = ?
			ORDER BY d.deliver_date";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'delivery' to be updated
			$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->dlv, PDO::PARAM_INT);
				
			//execute query
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->note = $row['note'];
			$this->tch_comment_note = $row['tch_comment_note'];
			$this->dlv = $row['dlv'];
				
			return $stmt;
		}
		
		public function create(){
			
			 //	EVITAR SELECCION DE UN ELEMENTO EXISTENTE
			 
			$query = "SELECT id FROM " . $this->table_name . " WHERE dlv='".$this->dlv."' AND stdnt='".$this->stdnt."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->dlv);
			$stmt->bindParam(2, $this->stdnt);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id > 0){
				return false;
			}
			else{
				
				 //	EVITAR PROBLEMAS DE ASIGNACION
				 
				$query = "SELECT nd.id, dlv.id_dlv, stdnt.id_stdnt
						FROM Note_Delivery nd, Student stdnt, Subject_Student ss, Subject sbj, Delivery dlv
						WHERE dlv.id_dlv = '".$this->dlv."' AND stdnt.id_stdnt='".$this->stdnt."' 
						AND dlv.sbj = sbj.id_sbj AND ss.stdnt = stdnt.id_stdnt AND ss.sbj = sbj.id_sbj ";
				
				// prepare query
				$stmt = $this->conn->prepare($query);
				
				$stmt->bindParam(1, $this->dlv);
				$stmt->bindParam(2, $this->stdnt);
				$stmt->execute();
				
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . $this->conn->errorInfo());
				}
					
				if($this->id > 0){
					// query to insert record
					$query = "INSERT INTO " . $this->table_name . "
		            SET
		                note=:note, tch_comment_note=:tch_comment_note, dlv=:dlv, stdnt=:stdnt";
				
					// prepare query
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->note=htmlspecialchars(strip_tags($this->note));
					$this->tch_comment_note=htmlspecialchars(strip_tags($this->tch_comment_note));
					$this->dlv=htmlspecialchars(strip_tags($this->dlv));
					$this->stdnt=htmlspecialchars(strip_tags($this->stdnt));
				
					// bind values
					$stmt->bindParam(":note", $this->note, PDO::PARAM_INT, 3);
					$stmt->bindParam(":tch_comment_note", $this->tch_comment_note, PDO::PARAM_STR, 150);
					$stmt->bindParam(":dlv", $this->dlv, PDO::PARAM_INT, 8);
					$stmt->bindParam(":stdnt", $this->stdnt, PDO::PARAM_INT, 8);
						
					if(empty($this->tch_comment_note)){
						$this->tch_comment_note=NULL;
					}
					
					if($this->note==NULL or $this->dlv==NULL or $this->stdnt==NULL){
						return false;
					}
					else{
						if($this->note>='0' and $this->note<='100'){
							// execute query
							if($stmt->execute()){
								return true;
							}
						}
					}
				
					return false;
				}
			}
		}
		
		// delete the note_delivery
		public function delete(){
			
			 //	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id=$row['id'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id=htmlspecialchars(strip_tags($this->id));
			
				// bind id of note_delivery to delete
				$stmt->bindParam(1, $this->id, PDO::PARAM_INT, 8);
			
				// execute query
				if($stmt->execute()){
					return true;
				}
			
				return false;
			}
			else{
				return false;
			}
		
		}
		
		// update the note_delivery
		function update(){
			
			 //	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id=$row['id'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id > 0){
				
				 //	EVITAR PROBLEMAS DE ASIGNACION
				 
				$query = "SELECT nd.id, dlv.id_dlv, stdnt.id_stdnt
						FROM Note_Delivery nd, Student stdnt, Subject_Student ss, Subject sbj, Delivery dlv
						WHERE dlv.id_dlv = '".$this->dlv."' AND stdnt.id_stdnt='".$this->stdnt."'
						AND dlv.sbj = sbj.id_sbj AND ss.stdnt = stdnt.id_stdnt AND ss.sbj = sbj.id_sbj ";
				
				// prepare query
				$stmt = $this->conn->prepare($query);
				
				$stmt->bindParam(1, $this->dlv);
				$stmt->bindParam(2, $this->stdnt);
				$stmt->execute();
				
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . $this->conn->errorInfo());
				}
					
				if($this->id > 0){
					// update query
					$query = "UPDATE
		                " . $this->table_name . "
		            SET
		                note=:note, tch_comment_note=:tch_comment_note, dlv=:dlv, stdnt=:stdnt
		            WHERE
		                id = :id";
				
					// prepare query statement
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->note=htmlspecialchars(strip_tags($this->note));
					$this->tch_comment_note=htmlspecialchars(strip_tags($this->tch_comment_note));
					$this->dlv=htmlspecialchars(strip_tags($this->dlv));
					$this->stdnt=htmlspecialchars(strip_tags($this->stdnt));
					$this->id=htmlspecialchars(strip_tags($this->id));
				
					// bind new values
					$stmt->bindParam(":note", $this->note, PDO::PARAM_INT, 3);
					$stmt->bindParam(":tch_comment_note", $this->tch_comment_note, PDO::PARAM_STR, 150);
					$stmt->bindParam(":dlv", $this->dlv, PDO::PARAM_INT, 8);
					$stmt->bindParam(":stdnt", $this->stdnt, PDO::PARAM_INT, 8);
					$stmt->bindParam(":id", $this->id, PDO::PARAM_INT, 8);
				
					if($this->id==NULL){
						return false;
					}
					else if($this->note==NULL or $this->dlv==NULL or $this->stdnt==NULL){
						return false;
					}
					else{
						if($this->note>='0' and $this->note<='100'){
							// execute query
							if($stmt->execute()){
								return true;
							}
						}
					}
					
				}
			}
			
			return false;
		}
		
		
		
		// used for paging note_delivery
		public function count($stdnt_id){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . " WHERE id_stdnt=?";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1,$stdnt_id, PDO::PARAM_INT);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		
		// used for paging note_delivery
		public function count_app($stdnt_id, $sbj_id){
			$query = "SELECT
				COUNT (*) as total_rows
			FROM
				" . $this->table_name . " nd, Delivery d, Student st, Subject_Student sbst, Subject sb
				WHERE nd.dlv = d.id_dlv
	            AND d.sbj = sbst.sbj
				AND d.sbj = sb.id_sbj
	            AND nd.stdnt = st.id_stdnt
				AND nd.stdnt = sbst.stdnt
				AND nd.stdnt = ?
				AND d.sbj = ?";
			
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1,$stdnt_id, PDO::PARAM_INT);
			$stmt->bindParam(2,$sbj_id, PDO::PARAM_INT);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		
		public function all_note_delivery(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE dlv = ? and stdnt = ?limit 0,1";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->dlv,PDO::PARAM_INT);
			$stmt->bindParam(2, $this->stdnt,PDO::PARAM_INT);
			$stmt->execute();
		
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->note = $row['note'];
			$this->tch_comment_note = $row['tch_comment_note'];
		
		}
		
		public function all_note_delivery_id(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id = ? limit 0,1";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id,PDO::PARAM_INT);
			$stmt->execute();
		
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->note = $row['note'];
			$this->tch_comment_note = $row['tch_comment_note'];
			$this->stdnt = $row['stdnt'];
			$this->dlv = $row['dlv'];
		
		}
		
		public function search_id(){
			$query = "SELECT nd.id
				FROM Note_Delivery nd
				WHERE nd.dlv = ?
				AND nd.stdnt = ?";
				
			$stmt = $this->conn->prepare( $query );
			
			$stmt->bindParam(1, $this->dlv,PDO::PARAM_INT);
			$stmt->bindParam(2, $this->stdnt,PDO::PARAM_INT);
			
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			return $row['id'];
		}
	}
?>