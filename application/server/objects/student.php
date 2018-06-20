<?php
	class Student{
		private $conn;
		private $table_name = "Student";
		
		public $id_stdnt;
		public $name_stdnt;
		public $last_name_stdnt;
		public $mail;
		public $passw;
		public $stds;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT
               st.id_stdnt, st.name_stdnt, st.last_name_stdnt, st.mail, st.passw, st.stds
            FROM
                " . $this->table_name . " st 
                LEFT JOIN
                		Studies ss 
                		ON st.stds = ss.id_stds
            ORDER BY
            	st.id_stdnt DESC";
			
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
			$query = "SELECT id_stdnt FROM " . $this->table_name . " WHERE id_stdnt='".$this->id_stdnt."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_stdnt);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_stdnt=$row['id_stdnt'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_stdnt > 0){
				//select one query
				$query = "SELECT
	               st.id_stdnt, st.name_stdnt, st.last_name_stdnt, st.mail, st.passw, st.stds
	            FROM
	                " . $this->table_name . " st 
	                LEFT JOIN
	                		Studies ss 
	                		ON st.stds = ss.id_stds
				WHERE
	                st.id_stdnt = ? ";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'student' to be updated
				$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT);
			
				//execute query
				$stmt->execute();
			
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				// set values to object properties
				$this->name_stdnt = $row['name_stdnt'];
				$this->last_name_stdnt = $row['last_name_stdnt'];
				$this->mail = $row['mail'];
				$this->passw = $row['passw'];
				$this->stds = $row['stds'];
				
				return true;
			}
			else{
				return false;
			}
		}
		
		
		public function create(){
			
			/**
			 * NO ES NECESARIO COMPROBAR EXISTENCIA PORQUE MAIL ES UNIQUE
			 */
				
			// query to insert record
			$query = "INSERT INTO
                " . $this->table_name . "
            SET
                name_stdnt=:name_stdnt, last_name_stdnt=:last_name_stdnt, mail=:mail, passw =:passw, stds =:stds";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			// sanitize
			$this->name_stdnt=htmlspecialchars(strip_tags($this->name_stdnt));
			$this->last_name_stdnt=htmlspecialchars(strip_tags($this->last_name_stdnt));
			$this->mail=htmlspecialchars(strip_tags($this->mail));
			$this->passw=htmlspecialchars(strip_tags($this->passw));
			$this->stds=htmlspecialchars(strip_tags($this->stds));
		
			// bind values
			$stmt->bindParam(":name_stdnt", $this->name_stdnt, PDO::PARAM_STR, 50);
			$stmt->bindParam(":last_name_stdnt", $this->last_name_stdnt, PDO::PARAM_STR, 50);
			$stmt->bindParam(":mail", $this->mail, PDO::PARAM_STR, 50);
			$stmt->bindParam(":passw", $this->passw, PDO::PARAM_STR, 60);
			$stmt->bindParam(":stds", $this->stds, PDO::PARAM_INT, 8);
			
			if($this->name_stdnt==NULL or $this->last_name_stdnt==NULL or $this->mail==NULL or $this->passw==NULL or $this->stds==NULL){
				return false;
			}
			else{
				// execute query
				if($stmt->execute()){
					return true;
				}
			}
		
			return false;
		}
		
		// delete the student
		public function delete(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_stdnt FROM " . $this->table_name . " WHERE id_stdnt='".$this->id_stdnt."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_stdnt);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_stdnt=$row['id_stdnt'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_stdnt > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_stdnt = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_stdnt=htmlspecialchars(strip_tags($this->id_stdnt));
			
				// bind id of student to delete
				$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT, 8);
			
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
		
		// update the student
		function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_stdnt FROM " . $this->table_name . " WHERE id_stdnt='".$this->id_stdnt."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_stdnt);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_stdnt=$row['id_stdnt'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_stdnt > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                name_stdnt=:name_stdnt, last_name_stdnt=:last_name_stdnt, mail=:mail, passw =:passw, stds =:stds
	            WHERE
	                id_stdnt = :id_stdnt";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->name_stdnt=htmlspecialchars(strip_tags($this->name_stdnt));
				$this->last_name_stdnt=htmlspecialchars(strip_tags($this->last_name_stdnt));
				$this->mail=htmlspecialchars(strip_tags($this->mail));
				$this->passw=htmlspecialchars(strip_tags($this->passw));
				$this->stds=htmlspecialchars(strip_tags($this->stds));
				$this->id_stdnt=htmlspecialchars(strip_tags($this->id_stdnt));
			
				// bind new values
				$stmt->bindParam(":name_stdnt", $this->name_stdnt, PDO::PARAM_STR, 50);
				$stmt->bindParam(":last_name_stdnt", $this->last_name_stdnt, PDO::PARAM_STR, 50);
				$stmt->bindParam(":mail", $this->mail, PDO::PARAM_STR, 50);
				$stmt->bindParam(":passw", $this->passw, PDO::PARAM_STR, 60);
				$stmt->bindParam(":stds", $this->stds, PDO::PARAM_INT, 8);
				$stmt->bindParam(":id_stdnt", $this->id_stdnt, PDO::PARAM_INT, 8);
			
				if($this->id_stdnt==NULL){
					return false;
				}
				else if($this->name_stdnt==NULL or $this->last_name_stdnt==NULL or $this->mail==NULL or $this->passw==NULL or $this->stds==NULL){
					return false;
				}// execute the query
				if($stmt->execute()){
					return true;
				}
			
				return false;
			}
			else{
				return false;
			}
		}
		
		public function login(){
			// select all query
			$query = "SELECT
				id_stdnt, passw
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
			$this->id_stdnt = $row['id_stdnt'];
			$this->passw = $row['passw'];
				
			return $stmt;
		}
		
		
		// used for paging student
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_student(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_stdnt = ? limit 0,1";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_stdnt);
			$stmt->execute();
		
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->name_stdnt = $row['name_stdnt'];
			$this->last_name_stdnt = $row['last_name_stdnt'];
			$this->mail = $row['mail'];
			$this->passw = $row['passw'];
			$this->stds = $row['stds'];
		
		}
		
		
	}
?>