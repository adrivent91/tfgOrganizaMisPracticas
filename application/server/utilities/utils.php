<?php 
	class Utils{
		
		private $C="jhaj18ajkhajNBahgajbn1uh17hj";
		
		public function __construct() {
			
		}
		
		//HASHEA LA CONTRASE„A
	    public function hash_password($passw) {
	    	return password_hash($passw . $this->C, PASSWORD_BCRYPT );
	    }
	    
	    //VERIFICA LA HASH
	    public function check_password($passw, $hash) {
	    	//echo $C;
	    	return password_verify($passw . $this->C, $hash);
	    } 
	   
	}
	    
?>