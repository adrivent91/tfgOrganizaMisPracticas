<?php
	class Teacher{
		private $conn;
		private $table_name = "Teacher";
		
		public $id_tch;
		public $name_tch;
		public $last_name_tch;
		public $mail;
		public $passw;
		public $office;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT 
					t.id_tch, t.name_tch, t.last_name_tch, t.mail, t.passw, t.office
            FROM 
					" . $this->table_name . " t 
			WHERE t.id_tch > 1";
			
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
			$query = "SELECT id_tch FROM " . $this->table_name . " WHERE id_tch='".$this->id_tch."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_tch);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_tch=$row['id_tch'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_tch > 0){
				//select one query
				$query = "SELECT
						t.id_tch, t.name_tch, t.last_name_tch, t.mail, t.passw, t.office
	            FROM
						" . $this->table_name . " t
				WHERE t.id_tch = ? ";
				
				// prepare query statement
				$stmt = $this->conn->prepare($query);
				
				// bind id of 'teacher' to be updated
	    		$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT);
	    		
	    		//execute query
	    		$stmt->execute();
	    		
	    		//get retrieved row
	    		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	    		
	    		// set values to object properties
	    		$this->name_tch = $row['name_tch'];
	    		$this->last_name_tch = $row['last_name_tch'];
	    		$this->mail = $row['mail'];
	    		$this->passw = $row['passw'];
	    		$this->office = $row['office'];
	    		
	    		return true;
			}
			else{
				return false;
			}
		}
		
		
		public function create(){
			/**
			 * NO ES NECESARIO HACER COMPROBACION DE EXISTENCIA PORQUE MAIL ES UNIQUE
			 */
			// query to insert record
			$query = "INSERT INTO
                " . $this->table_name . "
            SET
                name_tch=:name_tch, last_name_tch=:last_name_tch, mail=:mail, passw=:passw, office=:office";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			// sanitize
			$this->name_tch=htmlspecialchars(strip_tags($this->name_tch));
			$this->last_name_tch=htmlspecialchars(strip_tags($this->last_name_tch));
			$this->mail=htmlspecialchars(strip_tags($this->mail));
			$this->passw=htmlspecialchars(strip_tags($this->passw));
			$this->office=htmlspecialchars(strip_tags($this->office));
				
			// bind values
			$stmt->bindParam(":name_tch", $this->name_tch, PDO::PARAM_STR, 50);
			$stmt->bindParam(":last_name_tch", $this->last_name_tch, PDO::PARAM_STR, 50);
			$stmt->bindParam(":mail", $this->mail, PDO::PARAM_STR, 50);
			$stmt->bindParam(":passw", $this->passw, PDO::PARAM_STR, 60);
			$stmt->bindParam(":office", $this->office, PDO::PARAM_INT, 3);
				
			if($this->name_tch==NULL or $this->last_name_tch==NULL or $this->mail==NULL or $this->passw==NULL or $this->office==NULL){
				return false;
			}
			else{
				// execute query
				if($stmt->execute()) {
					return true;
				}
			}
				
			return false;
		}
		
		// delete the teacher
		public function delete(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_tch FROM " . $this->table_name . " WHERE id_tch='".$this->id_tch."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_tch);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_tch=$row['id_tch'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_tch > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_tch = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_tch=htmlspecialchars(strip_tags($this->id_tch));
			
				// bind id of teacher to delete
				$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT, 8);
			
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
		
		// update the teacher
		public function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_tch FROM " . $this->table_name . " WHERE id_tch='".$this->id_tch."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_tch);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_tch=$row['id_tch'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_tch > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                name_tch=:name_tch, last_name_tch=:last_name_tch, mail=:mail, passw=:passw, office=:office
	            WHERE
	                id_tch = :id_tch";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->name_tch=htmlspecialchars(strip_tags($this->name_tch));
				$this->last_name_tch=htmlspecialchars(strip_tags($this->last_name_tch));
				$this->mail=htmlspecialchars(strip_tags($this->mail));
				$this->passw=htmlspecialchars(strip_tags($this->passw));
				$this->office=htmlspecialchars(strip_tags($this->office));
				$this->id_tch=htmlspecialchars(strip_tags($this->id_tch));
			
				// bind new values
				$stmt->bindParam(":name_tch", $this->name_tch, PDO::PARAM_STR, 50);
				$stmt->bindParam(":last_name_tch", $this->last_name_tch, PDO::PARAM_STR, 50);
				$stmt->bindParam(":mail", $this->mail, PDO::PARAM_STR, 50);
				$stmt->bindParam(":passw", $this->passw, PDO::PARAM_STR, 60);
				$stmt->bindParam(":office", $this->office, PDO::PARAM_INT, 3);
				$stmt->bindParam(":id_tch", $this->id_tch, PDO::PARAM_INT, 8);
					
				if($this->id_tch==NULL){
					return false;
				}
				else if($this->name_tch==NULL or $this->last_name_tch==NULL or $this->mail==NULL or $this->passw==NULL or $this->office==NULL){
					return false;
				}
				else {// execute the query
					if($stmt->execute()){
						return true;
					}
				}
			}
			return false;
		}
		
		
		public function login(){
			// select query
			$query = "SELECT
				id_tch, passw
			FROM
				" . $this->table_name . "
			WHERE mail = '".$this->mail."'";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind mail and passw of 'student' to be updated
			$stmt->bindParam(1, $this->mail, PDO::PARAM_STR);
			//$stmt->bindParam(2, $this->passw, PDO::PARAM_STR);
				
			//execute query
			$stmt->execute();
				
			//get retrieved row
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			// set values to object properties
			$this->id_tch = $row['id_tch'];
			$this->passw = $row['passw'];
				
			return $stmt;
		}
		
		
		// used for paging teachers
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . " WHERE id_tch > 1";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_teacher(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_tch = ? limit 0,1";
				
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_tch);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->mail = $row['mail'];
			$this->passw = $row['passw'];
			$this->name_tch = $row['name_tch'];
			$this->last_name_tch = $row['last_name_tch'];
			$this->office = $row['office'];
		}
		
		
	}
?>