<?php
	class Delivery_Student{
		private $conn;
		
		public $id_dlv;
		public $id_stdnt;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			$query = "SELECT
				d.id_dlv, d.deliver_date, d.name_dlv, d.type_dlv, d.sbj, sb.abbrev_sbj, st.id_stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
			ORDER BY d.id_dlv";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		
		//See all the deliveries of a student
		public function readOneStudent(){
			//select one query
			$query = "SELECT
				d.id_dlv, d.deliver_date, d.type_dlv, d.name_dlv, d.sbj, sb.abbrev_sbj, st.id_stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
            AND st.id_stdnt = ? 
			ORDER BY d.deliver_date";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		//See all the students of a delivery
		public function readOneDelivery(){
			//select one query
			$query = "SELECT
				d.id_dlv, d.deliver_date, d.type_dlv, d.name_dlv, d.sbj, sb.abbrev_sbj, st.id_stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
            AND d.id_dlv = ? 
			ORDER BY d.deliver_date";
		
			// prepare query statement
			$stmt = $this->conn->prepare($query);
		
			// bind id of 'delivery' to be updated
			$stmt->bindParam(1, $this->id_dlv, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function readOne_dlvStdnt(){
			//select one query
			$query = "SELECT
				d.deliver_date, d.rise_date, d.type_dlv, d.name_dlv, d.tch_comment, d.percent, d.sbj, sb.abbrev_sbj, st.id_stdnt
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
            AND st.id_stdnt = ?
			AND d.id_dlv = ?
			ORDER BY d.deliver_date";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'delivery' to be updated
			$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->id_dlv, PDO::PARAM_INT);
			
			//execute query
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->deliver_date = $row['deliver_date'];
			$this->rise_date = $row['rise_date'];
			$this->type_dlv = $row['type_dlv'];
			$this->name_dlv = $row['name_dlv'];
			$this->tch_comment = $row['tch_comment'];
			$this->percent = $row['percent'];
			$this->abbrev_sbj = $row['abbrev_sbj'];
			$this->sbj = $row['sbj'];
			
			return $stmt;
		}
		
		// read subject_student with pagination
		public function readPaging($stdnt_id,$from_record_num, $records_per_page){
		
			// select query
			$query = "SELECT
				d.id_dlv, d.deliver_date, d.type_dlv, d.name_dlv, d.sbj, sb.abbrev_sbj, st.id_stdnt, st.name_stdnt, st.last_name_stdnt
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
            AND st.id_stdnt = ? 
			ORDER BY d.deliver_date
            LIMIT ?, ?";
		
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
		
			// bind variable values
			$stmt->bindParam(1, $stdnt_id, PDO::PARAM_INT);
			$stmt->bindParam(2, $from_record_num, PDO::PARAM_INT);
			$stmt->bindParam(3, $records_per_page, PDO::PARAM_INT);
		
			// execute query
			$stmt->execute();
		
			// return values from database
			return $stmt;
		}
		
		// used for paging subject_student
		public function count($stdnt_id){
			$query = "SELECT
				count(*) as total_rows
			FROM
				Delivery d, Student st, Subject_Student sbst, Subject sb
			WHERE st.id_stdnt = sbst.stdnt
			AND d.sbj = sbst.sbj 
			AND d.sbj = sb.id_sbj
            AND st.id_stdnt = ?";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $stdnt_id, PDO::PARAM_INT);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['total_rows'];
		}
	}
?>