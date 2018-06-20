<?php
	class Teacher_Subject{
		private $conn;
		private $table_name = "Teacher_Subject";
		
		public $id; //ident.table
		public $tch; 
		public $sbj;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				tst.id, tst.tch, tst.sbj, sb.abbrev_sbj, t.name_tch, t.last_name_tch
			FROM
				" . $this->table_name . " tst, Subject sb, Teacher t
			WHERE tst.tch = t.id_tch
			AND tst.sbj = sb.id_sbj 
			ORDER BY
			tst.id";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		public function readOne(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
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
				//select one query
				$query = "SELECT
				ts.id, ts.tch, ts.sbj
				FROM
					" . $this->table_name . " ts, Subject s, Teacher t
				WHERE ts.tch = t.id_tch
				AND ts.sbj = s.id_sbj
	            AND ts.id = ?";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'faculty' to be updated
				$stmt->bindParam(1, $this->id, PDO::PARAM_INT);
					
				//execute query
				$stmt->execute();
					
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
					
				// set values to object properties
				$this->tch = $row['tch'];
				$this->sbj = $row['sbj'];
		
				return true;
			}
			else{
				return false;
			}
		}
		
		
		//See all the subjects of a teacher
		public function readOneTeacher(){
			//select one query
			$query = "SELECT
				tst.id, tst.tch, tst.sbj, sb.abbrev_sbj, t.name_tch, t.last_name_tch
			FROM
				" . $this->table_name . " tst, Subject sb, Teacher t
			WHERE tst.tch = t.id_tch
			AND tst.sbj = sb.id_sbj 
            AND tst.tch = ? ";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'student' to be updated
    		$stmt->bindParam(1, $this->tch, PDO::PARAM_INT);
    		
    		//execute query
    		$stmt->execute();
    		
    		return $stmt;
		}
		
		//See all the teachers of a subject
		public function readOneSubject(){
			//select one query
			$query = "SELECT
				tst.id, tst.tch, tst.sbj, sb.abbrev_sbj, t.name_tch, t.last_name_tch
			FROM
				" . $this->table_name . " tst, Subject sb, Teacher t
			WHERE tst.tch = t.id_tch
			AND tst.sbj = sb.id_sbj 
            AND tst.sbj = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'subject' to be updated
			$stmt->bindParam(1, $this->sbj, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function create(){
		
			/**
			 *	EVITAR REPETICIONES
			 */
			$query = "SELECT id FROM Teacher_Subject WHERE sbj='".$this->sbj."' AND tch='".$this->tch."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->sbj);
			$stmt->bindParam(2, $this->tch);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
				
			if($this->id > 0){
				return false;
			}
			else{
				/**
				 *	EVITAR PROBLEMAS DE ASIGNACION
				 */
				$query = "SELECT ts.id, sbj.id_sbj, tch.id_tch
						FROM Teacher_Subject ts, Subject sbj, Teacher tch, Studies stds, Teacher_Faculty tf
						WHERE sbj.id_sbj ='".$this->sbj."' 
						AND tch.id_tch ='".$this->tch."' 
						AND sbj.stds = stds.id_stds 
						AND tf.tch = tch.id_tch 
						AND tf.fac = stds.fac";
					
				// prepare query
				$stmt = $this->conn->prepare($query);
					
				$stmt->bindParam(1, $this->sbj);
				$stmt->bindParam(2, $this->tch);
				$stmt->execute();
					
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
					
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . mysqli_error($this->conn));
				}
					
				if($this->id > 0){
					// query to insert record
					$query = "INSERT INTO
		                " . $this->table_name . "
		            SET
		                tch=:tch, sbj=:sbj";
				
					// prepare query
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->tch=htmlspecialchars(strip_tags($this->tch));
					$this->sbj=htmlspecialchars(strip_tags($this->sbj));
				
					// bind values
					$stmt->bindParam(":tch", $this->tch, PDO::PARAM_INT, 8);
					$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
					
					if($this->tch==NULL or $this->sbj==NULL) {
						return false;
					}
					else{
						if($this->tch>1){
							// execute query
							if($stmt->execute()) {
								return true;
							}
						}	
					}
				}
			
				return false;
			}
		}
		
		// delete the teacher_subject
		public function delete(){
			/**
			 *	EVITAR ASIGNACION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
				
			if($this->id > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id=htmlspecialchars(strip_tags($this->id));
			
				// bind id of teacher_subject to delete
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
		
		// update the teacher_subject
		function update(){
			/**
			 *	EVITAR ASIGNACION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
				
			if($this->id > 0){
				/**
				 *	EVITAR PROBLEMAS DE ASIGNACION
				 */
				$query = "SELECT ts.id, sbj.id_sbj, tch.id_tch
						FROM Teacher_Subject ts, Subject sbj, Teacher tch, Studies stds, Teacher_Faculty tf
						WHERE sbj.id_sbj ='".$this->sbj."' AND tch.id_tch ='".$this->tch."' AND
						sbj.stds = stds.id_stds AND tf.tch = tch.id_tch AND tf.fac = stds.fac";
					
				// prepare query
				$stmt = $this->conn->prepare($query);
					
				$stmt->bindParam(1, $this->sbj);
				$stmt->bindParam(2, $this->tch);
				$stmt->execute();
					
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
					
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . mysqli_error($this->conn));
				}
					
				if($this->id > 0){
					// update query
					$query = "UPDATE
		                " . $this->table_name . "
		            SET
		                  tch=:tch, sbj=:sbj
		            WHERE
		                id = :id";
				
					// prepare query statement
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->tch=htmlspecialchars(strip_tags($this->tch));
					$this->sbj=htmlspecialchars(strip_tags($this->sbj));
					$this->id=htmlspecialchars(strip_tags($this->id));
				
					// bind new values
					$stmt->bindParam(":tch", $this->tch, PDO::PARAM_INT, 8);
					$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
					$stmt->bindParam(":id", $this->id, PDO::PARAM_INT, 8);
				
					if($this->id==NULL){
						return false;
					}
				
					if($this->tch==NULL or $this->sbj==NULL) {
						return false;
					}
					else{
						if($this->tch>1){
							// execute query
							if($stmt->execute()) {
								return true;
							}
						}
					}
				}
			}
			return false;
		}
		
		
		// used for paging teacher_subject
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function count_stdnt(){
			$query = "SELECT ss.sbj, count(ss.stdnt) as num_stdnt FROM Subject_Student ss WHERE ss.sbj = ?";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->sbj);
			
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['num_stdnt'];
		}
		
		public function average_notes(){
			$query = "SELECT ss.sbj, COUNT(DISTINCT ss.stdnt), (SUM(nd.note * (d.percent/100)))/(COUNT(DISTINCT ss.stdnt)) as average
					FROM Subject_Student ss, Note_Delivery nd, Delivery d 
					WHERE ss.sbj = ?
    				AND d.sbj = ss.sbj
    				AND nd.dlv = d.id_dlv
    				AND nd.stdnt = ss.stdnt";
				
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
			
			// bind variable values
			$stmt->bindParam(1, $this->sbj, PDO::PARAM_INT);
			
			$stmt->execute();
			
			//get retrieved row
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			return $row['average'];
		}
	}
?>