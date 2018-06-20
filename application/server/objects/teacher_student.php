<?php
	class Teacher_Student{
		private $conn;
		
		public $id_tch;
		public $id_stdnt;
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT sb.id_sbj, sb.abbrev_sbj, t.id_tch, st.id_stdnt
				FROM Teacher t, Student st, Subject sb, Subject_Student ss, Teacher_Subject ts
				WHERE ss.stdnt = st.id_stdnt
				and ss.sbj = sb.id_sbj
				and ts.tch = t.id_tch
				and ts.sbj = sb.id_sbj";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
		}
		
		
		//See all the students of a teacher
		public function readOneTeacher(){
			//select one query
			$query = "SELECT sb.id_sbj, sb.abbrev_sbj, t.id_tch, st.id_stdnt
				FROM Teacher t, Student st, Subject sb, Subject_Student ss, Teacher_Subject ts
				WHERE ss.stdnt = st.id_stdnt
				and ss.sbj = sb.id_sbj
				and ts.tch = t.id_tch
				and ts.sbj = sb.id_sbj
				and t.id_tch = ? ";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'teacher' to be updated
    		$stmt->bindParam(1, $this->id_tch, PDO::PARAM_INT);
    		
    		//execute query
    		$stmt->execute();
    		
    		return $stmt;
		}
		
		//See all the teachers of a student
		public function readOneStudent(){
			//select one query
			$query = "SELECT sb.id_sbj, sb.abbrev_sbj, t.id_tch, st.id_stdnt
				FROM Teacher t, Student st, Subject sb, Subject_Student ss, Teacher_Subject ts
				WHERE ss.stdnt = st.id_stdnt
				and ss.sbj = sb.id_sbj
				and ts.tch = t.id_tch
				and ts.sbj = sb.id_sbj
				and st.id_stdnt = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function readSubject_tchStudent(){
			
			$query="SELECT sb.id_sbj, sb.abbrev_sbj, t.id_tch, st.id_stdnt
				FROM Teacher t, Student st, Subject sb, Subject_Student ss, Teacher_Subject ts
				WHERE ss.stdnt = st.id_stdnt
				and ss.sbj = sb.id_sbj
				and ts.tch = t.id_tch
				and ts.sbj = sb.id_sbj
				and st.id_stdnt = ?
                and t.id_tch = ?";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->id_stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->id_tch, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function count_sbj(){
			$query = "SELECT ss.stdnt, count(ss.sbj) as num_sbj FROM Subject_Student ss WHERE ss.stdnt = ?";
		
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_stdnt);
			
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			return $row['num_sbj'];
		}
		
		public function deliv_stdnt(){
			$query = "SELECT d.id_dlv, d.name_dlv, nd.id, nd.note, d.percent, sb.id_sbj, sb.abbrev_sbj
				FROM Delivery d, Note_Delivery nd, Student s, Subject sb
				WHERE s.id_stdnt = ?
				AND nd.dlv = d.id_dlv
				AND nd.stdnt = s.id_stdnt
				AND d.sbj = sb.id_sbj";
				
			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->id_stdnt);
			
			$stmt->execute();
			
			return $stmt;
		}
	}
?>