<?php		
	class Studies{
		
		private $conn;
		private $table_name = "Studies";
		
		public $id_stds;
		public $abbrev_stds;
		public $name_stds;
		public $fac;
		public $type_stds;
		public $itinerary;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT 
					ss.id_stds, ss.abbrev_stds, ss.name_stds, ss.fac, ss.type_stds, ss.itinerary
            	FROM 
					" . $this->table_name . " ss
            	LEFT JOIN 
						Faculty f
            			ON ss.fac = f.id_fac";
			
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
			$query = "SELECT id_stds FROM " . $this->table_name . " WHERE id_stds='".$this->id_stds."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_stds);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_stds=$row['id_stds'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_stds > 0){
				//select one query
				$query = "SELECT 
						ss.id_stds, ss.abbrev_stds, ss.name_stds, ss.fac, ss.type_stds, ss.itinerary
	            	FROM 
						" . $this->table_name . " ss
	            	LEFT JOIN 
							Faculty f
	            			ON ss.fac = f.id_fac
					WHERE
		                ss.id_stds = ? ";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'studies' to be updated
				$stmt->bindParam(1, $this->id_stds, PDO::PARAM_INT);
			
				//execute query
				$stmt->execute();
			
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				// set values to object properties
				$this->abbrev_stds = $row['abbrev_stds'];
				$this->name_stds = $row['name_stds'];
				$this->fac = $row['fac'];
				$this->type_stds = $row['type_stds'];
				$this->itinerary = $row['itinerary'];
				
				return true;
			}
			return false;
		}
		
		public function create(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_stds FROM " . $this->table_name . " WHERE abbrev_stds='".$this->abbrev_stds."' AND itinerary='".$this->itinerary."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->abbrev_stds);
			$stmt->bindParam(2, $this->itinerary);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_stds=$row['id_stds'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_stds > 0){
				return false;
			}
			else{
				// query to insert record
				$query = "INSERT INTO
	                " . $this->table_name . "
	            SET
	                abbrev_stds=:abbrev_stds, name_stds=:name_stds, fac=:fac, type_stds=:type_stds, itinerary=:itinerary";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
						
				// sanitize
				$this->abbrev_stds=htmlspecialchars(strip_tags($this->abbrev_stds));
				$this->name_stds=htmlspecialchars(strip_tags($this->name_stds));
				$this->fac=htmlspecialchars(strip_tags($this->fac));
				$this->type_stds=htmlspecialchars(strip_tags($this->type_stds));
				$this->itinerary=htmlspecialchars(strip_tags($this->itinerary));
			
				// bind values
				$stmt->bindParam(":abbrev_stds", $this->abbrev_stds, PDO::PARAM_STR, 7);
				$stmt->bindParam(":name_stds", $this->name_stds, PDO::PARAM_STR, 100);
				$stmt->bindParam(":fac", $this->fac, PDO::PARAM_INT, 8);
				$stmt->bindParam(":type_stds", $this->type_stds, PDO::PARAM_STR);
				$stmt->bindParam(":itinerary", $this->itinerary, PDO::PARAM_STR, 50);
				
				if(empty($this->itinerary)){
					$this->itinerary=NULL;
				}
				
				if($this->abbrev_stds==NULL or $this->name_stds==NULL or $this->fac==NULL or $this->type_stds==NULL){
					return false;
				}
				else{
					$this->type_stds = strtolower($this->type_stds);
					if ($this->type_stds=='grado' or $this->type_stds=='master' or $this->type_stds=='licenciatura'){
						// execute query
						if($stmt->execute()){
							return true;
						}
					}
				}
				
				return false;
			}
		}
		
		// delete the studies
		public function delete(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_stds FROM " . $this->table_name . " WHERE id_stds='".$this->id_stds."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_stds);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_stds=$row['id_stds'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_stds > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_stds = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_stds=htmlspecialchars(strip_tags($this->id_stds));
			
				// bind id of studies to delete
				$stmt->bindParam(1, $this->id_stds, PDO::PARAM_INT, 8);
			
				// execute query
				if($stmt->execute()){
					return true;
				}
			}
			return false;
		}
		
		// update the studies
		function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_stds FROM " . $this->table_name . " WHERE id_stds='".$this->id_stds."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_stds);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_stds=$row['id_stds'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_stds > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                abbrev_stds=:abbrev_stds, name_stds=:name_stds, fac=:fac, type_stds=:type_stds, itinerary=:itinerary
	            WHERE
	                id_stds = :id_stds";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->abbrev_stds=htmlspecialchars(strip_tags($this->abbrev_stds));
				$this->name_stds=htmlspecialchars(strip_tags($this->name_stds));
				$this->fac=htmlspecialchars(strip_tags($this->fac));
				$this->type_stds=htmlspecialchars(strip_tags($this->type_stds));
				$this->itinerary=htmlspecialchars(strip_tags($this->itinerary));
				$this->id_stds=htmlspecialchars(strip_tags($this->id_stds));
			
				// bind new values
				$stmt->bindParam(":abbrev_stds", $this->abbrev_stds, PDO::PARAM_STR, 7);
				$stmt->bindParam(":name_stds", $this->name_stds, PDO::PARAM_STR, 100);
				$stmt->bindParam(":fac", $this->fac, PDO::PARAM_INT, 8);
				$stmt->bindParam(":type_stds", $this->type_stds, PDO::PARAM_STR);
				$stmt->bindParam(":itinerary", $this->itinerary, PDO::PARAM_STR, 50);
				$stmt->bindParam(":id_stds", $this->id_stds, PDO::PARAM_INT, 8);
			
				if($this->id_stds==NULL){
					return false;
				}
				else if($this->abbrev_stds==NULL or $this->name_stds==NULL or $this->fac==NULL or $this->type_stds==NULL){
					return false;
				}
				else{
					$this->type_stds = strtolower($this->type_stds);
					if ($this->type_stds=='grado' or $this->type_stds=='master' or $this->type_stds=='licenciatura'){
						// execute query
						if($stmt->execute()){
							return true;
						}
					}
				}
			}
			return false;
		}
		
		// used for paging studies
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_studies(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_stds = ? limit 0,1";
				
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_stds);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->abbrev_stds = $row['abbrev_stds'];
			$this->name_stds = $row['name_stds'];
			$this->fac = $row['fac'];
			$this->type_stds = $row['type_stds'];
			$this->itinerary = $row['itinerary'];
		}
	}
?>