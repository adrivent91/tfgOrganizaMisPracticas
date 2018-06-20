<?php
	class Subject_Student{
		
		private $conn;
		private $table_name = "Subject_Student";
		
		public $id; //ident.table
		public $regist_num;
		public $regist_year;
		public $stdnt; 
		public $sbj;
		
		
		//constructor
		public function __construct($db){
			$this->conn = $db;
		}
		
		public function read(){
			// select all query
			
			$query = "SELECT
				sbst.id, sbst.regist_num, sbst.regist_year, sbst.stdnt, sbst.sbj, sb.abbrev_sbj, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " sbst, Subject sb, Student st
			WHERE sbst.stdnt = st.id_stdnt
			AND sbst.sbj = sb.id_sbj ";
			
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
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
		
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			$this->id=$row['id'];
				
			if (!$query){
				die('Error: ' . $this->conn->errorInfo());
			}
				
			if($this->id > 0){
				//select one query
				$query = "SELECT
				ss.id, ss.regist_num, ss.regist_year, ss.sbj, ss.stdnt
				FROM
					" . $this->table_name . " ss, Student st, Subject sb
				WHERE ss.stdnt = st.id_stdnt
				AND ss.sbj = sb.id_sbj
	            AND ss.id = ?";
					
				// prepare query statement
				$stmt = $this->conn->prepare($query);
					
				// bind id of 'faculty' to be updated
				$stmt->bindParam(1, $this->id, PDO::PARAM_INT);
					
				//execute query
				$stmt->execute();
					
				//get retrieved row
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
					
				// set values to object properties
				$this->regist_num = $row['regist_num'];
				$this->regist_year = $row['regist_year'];
				$this->sbj = $row['sbj'];
				$this->stdnt = $row['stdnt'];
		
				return true;
			}
			else{
				return false;
			}
		}
		
		//See all the subjects of a student
		public function readOneStudent(){
			//select one query
			$query = "SELECT
				sbst.id, sbst.regist_num, sbst.regist_year, sbst.stdnt, sbst.sbj, sb.abbrev_sbj, sb.name_sbj,
					sb.course, sb.credits, sb.group_sbj, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " sbst, Subject sb, Student st
			WHERE sbst.stdnt = st.id_stdnt
			AND sbst.sbj = sb.id_sbj 
            AND sbst.stdnt = ? 
			ORDER BY sb.abbrev_sbj";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// bind id of 'student' to be updated
    		$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
    		
    		//execute query
    		$stmt->execute();
    		
    		return $stmt;
		}
		
		//See all the students of a subject
		public function readOneSubject(){
			//select one query
			$query = "SELECT
				sbst.id, sbst.regist_num, sbst.regist_year, sbst.stdnt, sbst.sbj, sb.abbrev_sbj, st.name_stdnt, st.last_name_stdnt
			FROM
				" . $this->table_name . " sbst, Subject sb, Student st
			WHERE sbst.stdnt = st.id_stdnt
			AND sbst.sbj = sb.id_sbj
            AND sbst.sbj = ? ";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'subject' to be updated
			$stmt->bindParam(1, $this->sbj, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
		
			return $stmt;
		}
		
		public function readOne_sbjStdnt(){
			//select one query
			$query = "SELECT
				sbst.id, sbst.regist_num, sbst.regist_year, sbst.stdnt, sbst.sbj, sb.abbrev_sbj, sb.name_sbj,
					sb.course, sb.credits, sb.group_sbj
			FROM
				" . $this->table_name . " sbst, Subject sb, Student st
			WHERE sbst.stdnt = st.id_stdnt
			AND sbst.sbj = sb.id_sbj
			AND sbst.stdnt = ?
			AND sbst.sbj = ?";
		
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
		
			// bind variable values
			$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->sbj, PDO::PARAM_INT);
		
			// execute query
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->regist_num = $row['regist_num'];
			$this->regist_year = $row['regist_year'];
			
			// return values from database
			return $stmt;
		}
		
		public function readSubject_tchStudent(){
			$query = "SELECT ss.sbj, sb.abbrev_sbj, t.id_tch, ss.stdnt
				FROM " . $this->table_name . " ss, Teacher t, Student st, Subject sb, Teacher_Subject ts
				WHERE ss.stdnt = st.id_stdnt
				and ss.sbj = sb.id_sbj
				and ts.tch = t.id_tch
				and ts.sbj = sb.id_sbj
				and ss.sbj = ?
				and ss.stdnt = ?";
				
			// prepare query statement
			$stmt = $this->conn->prepare($query);
				
			// bind id of 'student' to be updated
			$stmt->bindParam(1, $this->sbj, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->stdnt, PDO::PARAM_INT);
		
			//execute query
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
		
			return $row['id_tch'];
		}
		
		public function notes_sbj(){
		
			$query = "SELECT nd.id
				FROM " . $this->table_name . " ss, Delivery d, Note_Delivery nd
				WHERE nd.stdnt = ss.stdnt 
				AND ss.sbj = d.sbj
				AND nd.dlv = d.id_dlv
				AND ss.stdnt = ?
				AND ss.sbj = ?";
			
				// prepare query statement
				$stmt = $this->conn->prepare( $query );
				
				// bind variable values
				$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
				$stmt->bindParam(2, $this->sbj, PDO::PARAM_INT);
				
				$stmt->execute();
				
				//$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
				return $stmt;
		}
		
		public function average_notes(){
			$query = "SELECT SUM(nd.note * (d.percent/100)) as 'average'
				FROM " . $this->table_name . " ss, Delivery d, Note_Delivery nd
				WHERE nd.stdnt = ss.stdnt AND
				ss.sbj = d.sbj AND
				nd.dlv = d.id_dlv
				and ss.stdnt = ?
				and ss.sbj = ?";
				
			// prepare query statement
			$stmt = $this->conn->prepare( $query );
			
			// bind variable values
			$stmt->bindParam(1, $this->stdnt, PDO::PARAM_INT);
			$stmt->bindParam(2, $this->sbj, PDO::PARAM_INT);
			
			$stmt->execute();
			
			//get retrieved row
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			return $row['average'];
		}
		
		public function create(){
			
			/**
			 *	EVITAR REPETICIONES
			 */
			$query = "SELECT id FROM " . $this->table_name . " WHERE sbj='".$this->sbj."' AND stdnt='".$this->stdnt."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->sbj);
			$stmt->bindParam(2, $this->stdnt);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
				
			if($this->id > 0){
				return false;
			}
			else{
				/**
				 *	EVITAR PROBLEMAS DE ASIGNACION
				 */
				$query = "SELECT ss.id, sbj.id_sbj, stdnt.id_stdnt
						FROM Subject_Student ss, Subject sbj, Student stdnt
						WHERE sbj.id_sbj = '".$this->sbj."' AND stdnt.id_stdnt = '".$this->stdnt."' 
						AND sbj.stds = stdnt.stds";
				
				// prepare query
				$stmt = $this->conn->prepare($query);
				
				$stmt->bindParam(1, $this->sbj);
				$stmt->bindParam(2, $this->stdnt);
				$stmt->execute();
				
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . mysqli_error($this->conn));
				}
				
				if($this->id > 0){
				
					$query = "INSERT INTO
		                " . $this->table_name . "
		            SET
		                regist_num=:regist_num, regist_year=:regist_year, stdnt=:stdnt, sbj=:sbj";
				
					// prepare query
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->regist_num=htmlspecialchars(strip_tags($this->regist_num));
					$this->regist_year=htmlspecialchars(strip_tags($this->regist_year));
					$this->stdnt=htmlspecialchars(strip_tags($this->stdnt));
					$this->sbj=htmlspecialchars(strip_tags($this->sbj));
				
					// bind values
					$stmt->bindParam(":regist_num", $this->regist_num, PDO::PARAM_INT, 1);
					$stmt->bindParam(":regist_year", $this->regist_year,  PDO::PARAM_INT, 4);
					$stmt->bindParam(":stdnt", $this->stdnt, PDO::PARAM_INT, 8);
					$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
	
					if(empty($this->regist_num)){
						$this->regist_num=1;
					}
						
					if($this->regist_year==NULL or $this->stdnt==NULL or $this->sbj==NULL){
						return false;
					}
					else{
						if($this->regist_num>='1' and $this->regist_num<='6'){
							if($this->regist_year >= '2000'){
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
		
		// delete the subject_student
		public function delete(){
			/**
			 *	EVITAR ASIGNACION DE UN ELEMENTO INEXISTENTE
			 */
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
			
			// prepare query
			$stmt = $this->conn->prepare($query);
			
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
			
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			$this->id=$row['id'];
				
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
			
			if($this->id > 0){
				// delete query
				$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				// sanitize
				$this->id=htmlspecialchars(strip_tags($this->id));
			
				// bind id of subject_student to delete
				$stmt->bindParam(1, $this->id, PDO::PARAM_INT, 8);
			
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
		
		// update the subject_student
		function update(){
			/**
			*	EVITAR ASIGNACION DE UN ELEMENTO INEXISTENTE
			*/
			$query = "SELECT id FROM " . $this->table_name . " WHERE id='".$this->id."'";
				
			// prepare query
			$stmt = $this->conn->prepare($query);
				
			$stmt->bindParam(1, $this->id);
			$stmt->execute();
				
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
				
			$this->id=$row['id'];
			
			if (!$query){
				die('Error: ' . mysqli_error($this->conn));
			}
				
			if($this->id > 0){
				/**
				 *	EVITAR PROBLEMAS DE ASIGNACION
				 */
				$query = "SELECT ss.id, sbj.id_sbj, stdnt.id_stdnt
					FROM Subject_Student ss, Subject sbj, Student stdnt
					WHERE sbj.id_sbj = '".$this->sbj."' AND stdnt.id_stdnt = '".$this->stdnt."'
					AND sbj.stds = stdnt.stds";
			
				// prepare query
				$stmt = $this->conn->prepare($query);
			
				$stmt->bindParam(1, $this->sbj);
				$stmt->bindParam(2, $this->stdnt);
				$stmt->execute();
			
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
				$this->id=$row['id'];
					
				if (!$query){
					die('Error: ' . mysqli_error($this->conn));
				}
			
				if($this->id > 0){
					// update query
					$query = "UPDATE
		                " . $this->table_name . "
		            SET
		                 regist_num=:regist_num, regist_year=:regist_year, stdnt=:stdnt, sbj=:sbj
		            WHERE
		                id = :id";
				
					// prepare query statement
					$stmt = $this->conn->prepare($query);
				
					// sanitize
					$this->regist_num=htmlspecialchars(strip_tags($this->regist_num));
					$this->regist_year=htmlspecialchars(strip_tags($this->regist_year));
					$this->stdnt=htmlspecialchars(strip_tags($this->stdnt));
					$this->sbj=htmlspecialchars(strip_tags($this->sbj));
					$this->id=htmlspecialchars(strip_tags($this->id));
				
					// bind new values
					$stmt->bindParam(":regist_num", $this->regist_num, PDO::PARAM_INT, 1);
					$stmt->bindParam(":regist_year", $this->regist_year,  PDO::PARAM_INT, 4);
					$stmt->bindParam(":stdnt", $this->stdnt, PDO::PARAM_INT, 8);
					$stmt->bindParam(":sbj", $this->sbj, PDO::PARAM_INT, 8);
					$stmt->bindParam(":id", $this->id, PDO::PARAM_INT, 8);
				
					if($this->id==NULL){
						return false;
					}
				
					else if($this->regist_year==NULL or $this->stdnt==NULL or $this->sbj==NULL){
						return false;
					}
					else{
						if($this->regist_num>='1' and $this->regist_num<='6'){
							if($this->regist_year >= '2000'){
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
		
	}
?>