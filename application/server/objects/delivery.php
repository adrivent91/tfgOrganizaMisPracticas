<?php
	class Delivery{
		private $conn;
		private $table_name = "Delivery";
		
		public $id_dlv;
		public $name_dlv;
		public $percent;
		public $rise_date;
		public $deliver_date;
		public $type_dlv;
		public $tch_comment;
		public $sbj;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
               d.id_dlv, d.percent, d.name_dlv, d.rise_date, d.deliver_date, d.type_dlv, d.tch_comment, d.sbj
            FROM
                " . $this->table_name . " d 
                LEFT JOIN
                		Subject sb
                		ON d.sbj = sb.id_sbj";
			
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
			$query = "SELECT id_dlv FROM " . $this->table_name . " WHERE id_dlv='".$this->id_dlv."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id_dlv);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id_dlv=$row['id_dlv'];
			
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
			
			if($this->id_dlv > 0){
				//select one query
				$query = "SELECT
	               d.id_dlv, d.percent, d.name_dlv, d.rise_date, d.deliver_date, d.type_dlv, d.tch_comment, d.sbj
	            FROM
	                " . $this->table_name . " d 
	                LEFT JOIN
	                		Subject sb
	                		ON d.sbj = sb.id_sbj
				WHERE
	                d.id_dlv = ? ";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'delivery' to be updated
				$stmt->bindParam(1, $this->id_dlv, pdo::PARAM_INT,8);
			
				//execute query
				$stmt->execute();
			
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				// set values to object properties
				$this->name_dlv = $row['name_dlv'];
				$this->percent = $row['percent'];
				$this->rise_date = $row['rise_date'];
				$this->deliver_date = $row['deliver_date'];
				$this->type_dlv = $row['type_dlv'];
				$this->tch_comment = $row['tch_comment'];
				$this->sbj = $row['sbj'];
				
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
			$query = "SELECT id_dlv FROM " . $this->table_name . " WHERE deliver_date='".$this->deliver_date."'
					AND type_dlv='".$this->type_dlv."' AND sbj='".$this->sbj."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->deliver_date);
			$stmt->bindParam(2, $this->type_dlv);
			$stmt->bindParam(3, $this->sbj);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_dlv=$row['id_dlv'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_dlv > 0){
				return false;
			}
			else{
				
				// query to insert record
				$query = "INSERT INTO
	                " . $this->table_name . "
	            SET
	                percent=:percent, rise_date=:rise_date, name_dlv=:name_dlv, deliver_date=:deliver_date, type_dlv=:type_dlv,
	                		tch_comment=:tch_comment, sbj=:sbj";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
					
				// sanitize
				$this->percent=htmlspecialchars(strip_tags($this->percent));
				$this->rise_date=htmlspecialchars(strip_tags($this->rise_date));
				$this->name_dlv=htmlspecialchars(strip_tags($this->name_dlv));
				$this->deliver_date=htmlspecialchars(strip_tags($this->deliver_date));
				$this->type_dlv=htmlspecialchars(strip_tags($this->type_dlv));
				$this->tch_comment=htmlspecialchars(strip_tags($this->tch_comment));
				$this->sbj=htmlspecialchars(strip_tags($this->sbj));
			
				// bind values
				$stmt->bindParam(":percent", $this->percent, PDO::PARAM_INT, 3);
				$stmt->bindParam(":rise_date", $this->rise_date,  PDO::PARAM_STR);
				$stmt->bindParam(":name_dlv", $this->name_dlv,  PDO::PARAM_STR);
				$stmt->bindParam(":deliver_date", $this->deliver_date, PDO::PARAM_STR);
				$stmt->bindParam(":type_dlv", $this->type_dlv, PDO::PARAM_STR);
				$stmt->bindParam(":tch_comment", $this->tch_comment, PDO::PARAM_STR, 150);
				$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
				
				if(empty($this->tch_comment)){
					$this->tch_comment=NULL;	
				}
				
				if($this->percent==NULL or $this->rise_date==NULL or $this->name_dlv==NULL or $this->deliver_date==NULL or $this->type_dlv==NULL or $this->sbj==NULL){
					return false;
				}
				else{
					$this->type_dlv=strtolower($this->type_dlv);
					if($this->type_dlv=='practica' or $this->type_dlv=='ejercicio' or $this->type_dlv=='proyecto' or $this->type_dlv=='examen'){
						if($this->percent>='1' and $this->percent<='100'){
							if($this->rise_date <= $this->deliver_date){
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
		
		// delete the delivery
		public function delete(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_dlv FROM " . $this->table_name . " WHERE id_dlv='".$this->id_dlv."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_dlv);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_dlv=$row['id_dlv'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_dlv > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id_dlv = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id_dlv=htmlspecialchars(strip_tags($this->id_dlv));
			
				// bind id of delivery to delete
				$stmt->bindParam(1, $this->id_dlv, PDO::PARAM_INT, 8);
			
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
		
		// update the delivery
		function update(){
			/**
			 *	EVITAR SELECCION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id_dlv FROM " . $this->table_name . " WHERE id_dlv='".$this->id_dlv."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id_dlv);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id_dlv=$row['id_dlv'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id_dlv > 0){
				// update query
				$query = "UPDATE
	                " . $this->table_name . "
	            SET
	                percent=:percent, rise_date=:rise_date, name_dlv=:name_dlv, deliver_date=:deliver_date, type_dlv=:type_dlv,
	                		tch_comment=:tch_comment, sbj=:sbj
	            WHERE
	                id_dlv = :id_dlv";
			
				// prepare query statement
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->percent=htmlspecialchars(strip_tags($this->percent));
				$this->rise_date=htmlspecialchars(strip_tags($this->rise_date));
				$this->name_dlv=htmlspecialchars(strip_tags($this->name_dlv));
				$this->deliver_date=htmlspecialchars(strip_tags($this->deliver_date));
				$this->type_dlv=htmlspecialchars(strip_tags($this->type_dlv));
				$this->tch_comment=htmlspecialchars(strip_tags($this->tch_comment));
				$this->sbj=htmlspecialchars(strip_tags($this->sbj));
				$this->id_dlv=htmlspecialchars(strip_tags($this->id_dlv));
			
				// bind new values
				$stmt->bindParam(":percent", $this->percent, PDO::PARAM_INT, 3);
				$stmt->bindParam(":rise_date", $this->rise_date,  PDO::PARAM_STR);
				$stmt->bindParam(":name_dlv", $this->name_dlv,  PDO::PARAM_STR);
				$stmt->bindParam(":deliver_date", $this->deliver_date, PDO::PARAM_STR);
				$stmt->bindParam(":type_dlv", $this->type_dlv, PDO::PARAM_STR);
				$stmt->bindParam(":tch_comment", $this->tch_comment, PDO::PARAM_STR, 150);
				$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
				$stmt->bindParam(":id_dlv", $this->id_dlv, PDO::PARAM_INT, 8);
			
				if($this->id_dlv==NULL){
					return false;
				}
				else if($this->percent==NULL or $this->rise_date==NULL or $this->name_dlv==NULL or $this->deliver_date==NULL or $this->type_dlv==NULL or $this->sbj==NULL){
					return false;
				}
				else{
					$this->type_dlv=strtolower($this->type_dlv);
					if($this->type_dlv=='practica' or $this->type_dlv=='ejercicio' or $this->type_dlv=='proyecto' or $this->type_dlv=='examen'){
						if($this->percent>='1' and $this->percent<='100'){
							if($this->rise_date <= $this->deliver_date){
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
			else{
				return false;
			}
		}
		
		// read delivery with pagination
		public function readPaging($from_record_num, $records_per_page){
		
			// select query
			$query = "SELECT
               d.id_dlv, d.percent, d.rise_date, d.name_dlv, d.deliver_date, d.type_dlv, d.tch_comment, d.sbj
            FROM
                " . $this->table_name . " d 
                LEFT JOIN
                		Subject sb
                		ON d.sbj = sb.id_sbj
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
		
		// used for paging delivery
		public function count(){
			$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
		
		public function all_delivery(){
			$query = "SELECT * FROM " . $this->table_name . " WHERE id_dlv = ? limit 0,1";
				
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_dlv);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->percent = $row['percent'];
			$this->type_dlv = $row['type_dlv'];
			$this->name_dlv = $row['name_dlv'];
			$this->deliver_date = $row['deliver_date'];
			$this->rise_date = $row['rise_date'];
			$this->tch_comment = $row['tch_comment'];
			$this->sbj = $row['sbj'];
		
		}
	}
?>