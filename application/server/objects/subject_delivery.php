<?php
	class Subject_Delivery{
		private $conn;
		
		public $id_sbj;
		public $id_dlv;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				sb.id_sbj, sb.abbrev_sbj, d.id_dlv, d.name_dlv, d.deliver_date, d.type_dlv
			FROM	Subject sb, Delivery d
			WHERE sb.id_sbj = d.sbj";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		//See all the deliveries of a subject
		public function readOneSubject(){
			//select one query
			$query = "SELECT
				sb.id_sbj, sb.abbrev_sbj, d.name_dlv, d.id_dlv, d.deliver_date, d.type_dlv
			FROM	Subject sb, Delivery d
			WHERE sb.id_sbj = d.sbj 
            AND sb.id_sbj = ? ";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'subject' to be updated
    		$stmt->bindParam(1, $this->id_sbj, PDO::PARAM_INT);
    		
    		//execute query
    		$stmt->execute();
    		
    		return $stmt;
		}
		
	}
?>