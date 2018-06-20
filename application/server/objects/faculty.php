<?php
	class Faculty{
		private $conn;
		private $table_name = "Faculty";
		
		public $id_fac;
		public $address;
		public $phone;
		public $postal_code;
		public $name_fac;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT 
					f.id_fac, f.address, f.phone, f.postal_code, f.name_fac
            FROM 
					" . $this->table_name . " f";
		
			
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
			$query = "SELECT id_fac FROM " . $this->table_name . " WHERE id_fac='".$this->id_fac."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_fac);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_fac=$row['id_fac'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_fac > 0){
				//select one query
				$query = "SELECT
						f.id_fac, f.address, f.phone, f.postal_code, f.name_fac
	            FROM
						" . $this->table_name . " f
				WHERE
	                f.id_fac = ? ";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'faculty' to be updated
				$stmt->bindParam(1, $this->id_fac, PDO::PARAM_INT);
			
				//execute query
				$stmt->execute();
			
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				// set values to object properties
				$this->address = $row['address'];
				$this->phone = $row['phone'];
				$this->postal_code = $row['postal_code'];
				$this->name_fac = $row['name_fac'];
				
				return true;
			}
			else{
				return false;
			}
		}
		
		public function create(){
			/**
			 * NO ES NECESARIO HACER COMPROBACION DE EXISTENCIA, PORQUE NAME_FAC ES UNIQUE
			 */
			// query to insert record
			$query = "INSERT INTO
                " . $this->table_name . "
            SET
                address=:address, phone=:phone, postal_code=:postal_code, name_fac=:name_fac";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			// sanitize
			$this->address=htmlspecialchars(strip_tags($this->address));
			$this->phone=htmlspecialchars(strip_tags($this->phone));
			$this->postal_code=htmlspecialchars(strip_tags($this->postal_code));
			$this->name_fac=htmlspecialchars(strip_tags($this->name_fac));
			
			// bind values
			$stmt->bindParam(":address", $this->address, PDO::PARAM_STR, 100);
			$stmt->bindParam(":phone", $this->phone, PDO::PARAM_INT, 9);
			$stmt->bindParam(":postal_code", $this->postal_code, PDO::PARAM_INT, 5);
			$stmt->bindParam(":name_fac", $this->name_fac, PDO::PARAM_STR, 100);
			
			if($this->address==NULL or $this->phone==NULL or $this->postal_code==NULL or $this->name_fac==NULL){
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
		
		// delete the faculty
		public function delete(){
			
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_fac FROM " . $this->table_name . " WHERE id_fac='".$this->id_fac."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_fac);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_fac=$row['id_fac'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_fac > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_fac = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_fac=htmlspecialchars(strip_tags($this->id_fac));
			
				// bind id of teacher to delete
				$stmt->bindParam(1, $this->id_fac, PDO::PARAM_INT, 8);
			
				// execute query
				if($stmt->execute()){
					return true;
				}
			
				return false;	
			}
			else {
				return false;
			} 
		}
		
		// update the faculty
		function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_fac FROM " . $this->table_name . " WHERE id_fac= '".$this->id_fac."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_fac);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_fac=$row['id_fac'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_fac > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                address=:address, phone=:phone, postal_code=:postal_code, name_fac=:name_fac
	            WHERE
	                id_fac = :id_fac";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->address=htmlspecialchars(strip_tags($this->address));
				$this->phone=htmlspecialchars(strip_tags($this->phone));
				$this->postal_code=htmlspecialchars(strip_tags($this->postal_code));
				$this->name_fac=htmlspecialchars(strip_tags($this->name_fac));
				$this->id_fac=htmlspecialchars(strip_tags($this->id_fac));
			
				// bind new values
				$stmt->bindParam(":address", $this->address, PDO::PARAM_STR, 100);
				$stmt->bindParam(":phone", $this->phone, PDO::PARAM_INT, 9);
				$stmt->bindParam(":postal_code", $this->postal_code, PDO::PARAM_INT, 5);
				$stmt->bindParam(":name_fac", $this->name_fac, PDO::PARAM_STR, 100);
				$stmt->bindParam(":id_fac", $this->id_fac, PDO::PARAM_INT, 8);
				
				if($this->id_fac==NULL){
					return false;
				}
				
				// execute the query
				if($stmt->execute()){
					return true;
				}
			
				return false;
			}
			else{
				return false;
			}
		}
		
		// used for paging faculties
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_faculty(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_fac = ? limit 0,1";
			
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_fac);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			 
			$this->name_fac = $row['name_fac'];
			$this->address = $row['address'];
			$this->phone = $row['phone'];
			$this->postal_code = $row['postal_code'];
		}
		
	}
?>