<?php
	class Student_Studies{
		private $conn;
		
		public $id_stdnt;
		public $id_stds;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				st.id_stdnt, st.name_stdnt, st.last_name_stdnt, ss.id_stds, ss.abbrev_stds, ss.type_stds, ss.itinerary
			FROM	Student st, Studies ss
			WHERE ss.id_stds = st.stds";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		//See all the students of a studies
		public function readOneStudies(){
			//select one query
			$query = "SELECT
				st.id_stdnt, st.name_stdnt, st.last_name_stdnt, ss.id_stds, ss.abbrev_stds, ss.type_stds, ss.itinerary
			FROM	Student st, Studies ss
			WHERE ss.id_stds = st.stds
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