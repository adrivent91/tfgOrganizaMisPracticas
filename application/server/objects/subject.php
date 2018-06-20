<?php
	class Subject{
		private $conn;
		private $table_name = "Subject";
		
		public $id_sbj;
		public $abbrev_sbj;
		public $name_sbj;
		public $credits;
		public $course;
		public $group_sbj;
		public $quarter;
		public $stds;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT
               sb.id_sbj, sb.abbrev_sbj, sb.name_sbj, sb.credits, sb.course, sb.group_sbj, sb.quarter, sb.stds
            FROM
                " . $this->table_name . " sb
                LEFT JOIN
                		Studies ss
                		ON sb.stds = ss.id_stds
            ORDER BY
            	sb.id_sbj DESC";
			
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
			$query = "SELECT id_sbj FROM " . $this->table_name . " WHERE id_sbj='".$this->id_sbj."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_sbj);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_sbj=$row['id_sbj'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_sbj > 0){
				//select one query
				$query = "SELECT
	               sb.id_sbj, sb.abbrev_sbj, sb.name_sbj, sb.credits, sb.course, sb.group_sbj, sb.quarter, sb.stds
	            FROM
	                " . $this->table_name . " sb
	                LEFT JOIN
	                		Studies ss
	                		ON sb.stds = ss.id_stds
				WHERE
	                sb.id_sbj = ? ";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'subject' to be updated
				$stmt->bindParam(1, $this->id_sbj, PDO::PARAM_INT);
			
				//execute query
				$stmt->execute();
			
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				// set values to object properties
				$this->abbrev_sbj = $row['abbrev_sbj'];
				$this->name_sbj = $row['name_sbj'];
				$this->credits = $row['credits'];
				$this->course = $row['course'];
				$this->group_sbj = $row['group_sbj'];
				$this->quarter = $row['quarter'];
				$this->stds = $row['stds'];
				
				return true;
			}
			else{
				return false;
			}
		}
		
		public function create(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO EXISTENTE
			 */
			$query = "SELECT id_sbj FROM " . $this->table_name . " WHERE abbrev_sbj='".$this->abbrev_sbj."' AND course='".$this->course."' AND group_sbj = '".$this->group_sbj."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->abbrev_sbj);
			$stmt->bindParam(2, $this->course);
			$stmt->bindParam(3, $this->group_sbj);
			
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_sbj=$row['id_sbj'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_sbj > 0){
				return false;
			}
			else{
				// query to insert record
				$query = "INSERT INTO
	                " . $this->table_name . "
	            SET
	                abbrev_sbj=:abbrev_sbj, name_sbj=:name_sbj, credits=:credits, course=:course, group_sbj=:group_sbj, quarter=:quarter, stds=:stds";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
					
				// sanitize
				$this->abbrev_sbj=htmlspecialchars(strip_tags($this->abbrev_sbj));
				$this->name_sbj=htmlspecialchars(strip_tags($this->name_sbj));
				$this->credits=htmlspecialchars(strip_tags($this->credits));
				$this->course=htmlspecialchars(strip_tags($this->course));
				$this->group_sbj=htmlspecialchars(strip_tags($this->group_sbj));
				$this->quarter=htmlspecialchars(strip_tags($this->quarter));
				$this->stds=htmlspecialchars(strip_tags($this->stds));
			
				// bind values
				$stmt->bindParam(":abbrev_sbj", $this->abbrev_sbj, PDO::PARAM_STR, 7);
				$stmt->bindParam(":name_sbj", $this->name_sbj, PDO::PARAM_STR, 100);
				$stmt->bindParam(":credits", $this->credits, PDO::PARAM_INT);
				$stmt->bindParam(":course", $this->course, PDO::PARAM_INT, 1);
				$stmt->bindParam(":group_sbj", $this->group_sbj, PDO::PARAM_STR, 1);
				$stmt->bindParam(":quarter" , $this->quarter, PDO::PARAM_STR);
				$stmt->bindParam("stds", $this->stds, PDO::PARAM_INT, 8);
				
				if(empty($this->group_sbj)){
					$this->group_sbj='A';
				}
				if($this->abbrev_sbj==NULL or $this->name_sbj==NULL or $this->credits==NULL or $this->course==NULL or
						$this->quarter==NULL or $this->stds==NULL){
					return false;
				}
				else{
					$this->quarter=strtolower($this->quarter);
					if($this->quarter=='primer' or $this->quarter=='segundo' or $this->quarter=='anual'){
						if($this->course>='1' and $this->course<='5'){
							if($this->credits < 12){
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
		}
		
		// delete the subject
		public function delete(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_sbj FROM " . $this->table_name . " WHERE id_sbj='".$this->id_sbj."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_sbj);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_sbj=$row['id_sbj'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_sbj > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_sbj = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_sbj=htmlspecialchars(strip_tags($this->id_sbj));
			
				// bind id of subject to delete
				$stmt->bindParam(1, $this->id_sbj, PDO::PARAM_INT, 8);
			
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
		
		// update the subject
		function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_sbj FROM " . $this->table_name . " WHERE id_sbj='".$this->id_sbj."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_sbj);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_sbj=$row['id_sbj'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_sbj > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                abbrev_sbj=:abbrev_sbj, name_sbj=:name_sbj, credits=:credits, course=:course, group_sbj=:group_sbj, quarter=:quarter, stds=:stds
	            WHERE
	                id_sbj = :id_sbj";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->abbrev_sbj=htmlspecialchars(strip_tags($this->abbrev_sbj));
				$this->name_sbj=htmlspecialchars(strip_tags($this->name_sbj));
				$this->credits=htmlspecialchars(strip_tags($this->credits));
				$this->course=htmlspecialchars(strip_tags($this->course));
				$this->group_sbj=htmlspecialchars(strip_tags($this->group_sbj));
				$this->quarter=htmlspecialchars(strip_tags($this->quarter));
				$this->stds=htmlspecialchars(strip_tags($this->stds));
				$this->id_sbj=htmlspecialchars(strip_tags($this->id_sbj));
			
				// bind new values
				$stmt->bindParam(":abbrev_sbj", $this->abbrev_sbj, PDO::PARAM_STR, 7);
				$stmt->bindParam(":name_sbj", $this->name_sbj, PDO::PARAM_STR, 100);
				$stmt->bindParam(":credits", $this->credits, PDO::PARAM_INT);
				$stmt->bindParam(":course", $this->course, PDO::PARAM_INT, 1);
				$stmt->bindParam(":group_sbj", $this->group_sbj, PDO::PARAM_STR, 1);
				$stmt->bindParam(":quarter" , $this->quarter, PDO::PARAM_STR);
				$stmt->bindParam("stds", $this->stds, PDO::PARAM_INT, 8);
				$stmt->bindParam(":id_sbj", $this->id_sbj, PDO::PARAM_INT, 8);
			
				if($this->id_sbj==NULL){
					return false;
				}
				else if($this->abbrev_sbj==NULL or $this->name_sbj==NULL or $this->credits==NULL or $this->course==NULL or
						$this->quarter==NULL or $this->stds==NULL){
					return false;
				}
				else{
					$this->quarter=strtolower($this->quarter);
					if($this->quarter=='primer' or $this->quarter=='segundo' or $this->quarter=='anual'){
						if($this->course>='1' and $this->course<='5'){
							if($this->credits < 12){
								// execute query
								if($stmt->execute()){
									return true;
								}
							}
						}
					}
				}
			
			}
			
			return false;
			
		}
		
		// used for paging subject
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_subject(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_sbj = ? limit 0,1";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_sbj);
			$stmt->execute();
		
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->abbrev_sbj = $row['abbrev_sbj'];
			$this->name_sbj = $row['name_sbj'];
			$this->credits = $row['credits'];
			$this->course = $row['course'];
			$this->group_sbj = $row['group_sbj'];
		}
		
	}
?>