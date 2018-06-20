<?php
	class Student_Faculty{
		private $conn;
		
		public $id_stdnt; 
		public $id_fac;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			
			// select all query
			$query = "SELECT
				st.id_stdnt, f.id_fac, ss.id_stds
			FROM
				Student st, Faculty f, Studies ss
			WHERE ss.fac = f.id_fac
			AND ss.id_stds = st.stds";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		
		//See all the students of a faculty
		public function readOneFaculty(){
			//select one query
			$query = "SELECT
				st.id_stdnt, f.id_fac, ss.id_stds
			FROM
				Student st, Faculty f, Studies ss
			WHERE ss.fac = f.id_fac
			AND ss.id_stds = st.stds
			AND f.id_fac = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'subject' to be updated
			$stmt->bindParam(1, $this->id_fac, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		// used for paging subject_student
		public function count(){
			$query = "SELECT COUNT(*) as total_rows 
			FROM
				Student st, Faculty f, Studies ss
			WHERE st.stds = ss.id_stds
			AND ss.fac = f.id_fac";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
	}
?>