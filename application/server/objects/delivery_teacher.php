<?php
	class Delivery_Teacher{
		private $conn;
		
		public $id_dlv;
		public $id_tch;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read_deliveries_tch(){
			$query="SELECT d.id_dlv, d.deliver_date, d.percent, d.rise_date, d.name_dlv, d.type_dlv, 
					s.id_sbj, s.abbrev_sbj
					FROM Teacher t, Delivery d, Teacher_Subject ts, Subject s
					WHERE d.sbj = ts.sbj
					AND s.id_sbj = ts.sbj
					AND t.id_tch = ts.tch
					AND t.id_tch = ?
					ORDER BY d.deliver_date";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
			
		}
		
		public function read_deliveries_compl_tch(){
			$query="SELECT d.id_dlv, d.deliver_date, d.percent, d.rise_date, d.name_dlv, d.type_dlv, 
					s.id_sbj, s.abbrev_sbj
					FROM Teacher t, Delivery d, Teacher_Subject ts, Subject s
					WHERE d.sbj = ts.sbj
					AND s.id_sbj = ts.sbj
					AND t.id_tch = ts.tch
					AND t.id_tch = ?
					ORDER BY s.abbrev_sbj";
					
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function read_one_delivery(){
			$query="SELECT d.name_dlv, s.mail, s.id_stdnt, sb.id_sbj, sb.abbrev_sbj
					FROM Delivery d, Subject_Student ss, Student s, Subject sb
					WHERE d.id_dlv = ?
					AND d.sbj = sb.id_sbj
					AND ss.stdnt = s.id_stdnt
					AND ss.sbj = sb.id_sbj";
  					
  			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_dlv, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function average_notes_without_percent(){
			$query = "SELECT DISTINCT((SUM(nd.note))/ COUNT(DISTINCT st.id_stdnt)) as 'average'
				FROM Teacher t, Delivery d, Note_Delivery nd, Subject s,  Teacher_Subject ts, Student st
				WHERE nd.dlv = d.id_dlv
    			and st.id_stdnt = nd.stdnt
    			and d.sbj = s.id_sbj
   			 	and ts.tch = t.id_tch
  			  	and ts.sbj = s.id_sbj
  			  	and t.id_tch = ?
   				and s.id_sbj = ?
   				and d.id_dlv = ?";
				
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
			
			// bind variable values
			$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->sbj, PDO::PARAM_INT);
			$stmt->bindParam(3, $this->id_dlv, PDO::PARAM_INT);
			
			$stmt->execute();
			
			//get retrieved row
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			return $row['average'];
		}
		
		
	}
?>