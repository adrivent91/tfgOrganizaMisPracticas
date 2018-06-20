<?php
	/**
	 * Class to generate the connection to the database
	 * @author adrianaVentura
	 */
	class Database{
		
		// data necessary for the connection with the database
		private $user = "dbo_op";
		private $passw = "secret123_dbo_op";
		private $server = "localhost";
		private $database_name = 'ORGANIZ_PRACTICAS';
		public $conn;
		
		/**
		 * Create connection with the database
		 * Create a new PDO and execute it. Throw exception if can not run
		 * @return Ambigous <NULL, PDO>
		 */
		public function  getConnection(){
			$this->conn = null;
			
			try{
				$this->conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->database_name, $this->user, $this->passw);
				$this->conn->exec("set names utf8");
			}catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
			
			return $this->conn;
		}
		
		/**
		 * End the connection with the database
		 */
		public function endConnection(){
			$this->conn = null;
		}
	}
?>