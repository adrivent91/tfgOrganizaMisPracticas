<?php
	class Subject_Studies{
		private $conn;
		
		public $id_sbj;
		public $id_stds;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				sb.id_sbj, sb.abbrev_sbj, ss.id_stds, ss.abbrev_stds, ss.type_stds, ss.itinerary
			FROM	Subject sb, Studies ss
			WHERE ss.id_stds = sb.stds";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		//See all the subjects of a studies
		public function readOneStudies(){
			//select one query
			$query = "SELECT
				sb.id_sbj, sb.abbrev_sbj, ss.id_stds, ss.abbrev_stds, ss.type_stds, ss.itinerary
			FROM	Subject sb, Studies ss
			WHERE ss.id_stds = sb.stds
            AND ss.id_stds = ? ";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'studies' to be updated
    		$stmt->bindParam(1, $this->id_stds, PDO::PARAM_INT);
    		
    		//execute query
    		$stmt->execute();
    		
    		return $stmt;
		}
		
	}
?>