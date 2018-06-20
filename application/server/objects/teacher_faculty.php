<?php
	class Teacher_Faculty{
		private $conn;
		private $table_name = "Teacher_Faculty";
		
		public $id; //ident.table
		public $tch; 
		public $fac;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				tf.id, tf.tch, tf.fac, f.name_fac, t.mail
			FROM
				" . $this->table_name . " tf, Faculty f, Teacher t
			WHERE tf.tch = t.id_tch
			AND tf.fac = f.id_fac
			ORDER BY
			tf.id";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		
		//See all the teachers of a faculty
		public function readOneFaculty(){
			//select one query
			$query = "SELECT
				tf.id, tf.tch, tf.fac, f.name_fac, t.mail
			FROM
				" . $this->table_name . " tf, Faculty f, Teacher t
			WHERE tf.tch = t.id_tch
			AND tf.fac = f.id_fac
            AND tf.fac = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'subject' to be updated
			$stmt->bindParam(1, $this->fac, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		//See all the faculties of a teacher
		public function readOneTeacher(){
			//select one query
			$query = "SELECT
				tf.id, tf.tch, tf.fac, f.name_fac, t.mail
			FROM
				" . $this->table_name . " tf, Faculty f, Teacher t
			WHERE tf.tch = t.id_tch
			AND tf.fac = f.id_fac
            AND tf.tch = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'subject' to be updated
			$stmt->bindParam(1, $this->tch, PDO::PARAM_INT);
		
			//execute query
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
				tf.id, tf.tch, tf.fac
				FROM
					" . $this->table_name . " tf, Faculty f, Teacher t 
				WHERE tf.tch = t.id_tch
				AND tf.fac = f.id_fac
	            AND tf.id = ?";
					
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
				$this->fac = $row['fac'];
				
				return true;
			}
			else{
				return false;
			}
		}
		
		public function create(){
			
			/**
			*	EVITAR REPETICIONES
			 */
			$query = "SELECT id FROM Teacher_Faculty WHERE fac='".$this->fac."' AND tch='".$this->tch."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->fac);
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
				// query to insert record
				$query = "INSERT INTO
                " . $this->table_name . "
	            SET
	               tch=:tch, fac=:fac";
		
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->tch=htmlspecialchars(strip_tags($this->tch));
				$this->fac=htmlspecialchars(strip_tags($this->fac));
			
				// bind values
				$stmt->bindParam(":tch", $this->tch, PDO::PARAM_INT, 8);
				$stmt->bindParam(":fac", $this->fac, PDO::PARAM_INT, 8);
					
				if($this->tch==NULL or $this->fac==NULL){
					return false;
				}
				else{
					if($this->tch>1){
						// execute query
						if($stmt->execute()){
							return true;
						}
					}
				}
				return false;
			}
			
		}
		
		// delete the teacher_faculty
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
			
				// bind id of teacher_faculty to delete
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
		
		// update the teacher_faculty
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
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                  tch=:tch, fac=:fac
	            WHERE
	                id = :id";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->tch=htmlspecialchars(strip_tags($this->tch));
				$this->fac=htmlspecialchars(strip_tags($this->fac));
				$this->id=htmlspecialchars(strip_tags($this->id));
			
				// bind new values
				$stmt->bindParam(":tch", $this->tch, PDO::PARAM_INT, 8);
				$stmt->bindParam(":fac", $this->fac, PDO::PARAM_INT, 8);
				//$stmt->bindParam(":mail", $this->mail, PDO::PARAM_STR);
				$stmt->bindParam(":id", $this->id, PDO::PARAM_INT, 8);
			
				if($this->id==NULL){
					return false;
				}
			
				else if($this->tch==NULL or $this->fac==NULL){
					return false;
				}
				else{
					if($this->tch>1){
						// execute query
						if($stmt->execute()){
							return true;
						}
					}
				}
			}
			return false;
			
		}
		
		// read teacher_faculty with pagination
		public function readPaging($from_record_num, $records_per_page){
		
			// select query
			$query = "SELECT
				tf.id, tf.tch, tf.fac, f.name_fac, t.mail
			FROM
				" . $this->table_name . " tf, Faculty f, Teacher t
			WHERE tf.tch = t.id_tch
			AND tf.fac = f.id_fac
            LIMIT ?, ?";
		
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
		
			// bind variable values
			$stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
			$stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
		
			// execute query
			$stmt->execute();
		
			// return values from database
			return $stmt;
		}
		
		// used for paging teacher_faculty
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
	}
?>