<?php


class DBConnector {
	private $conn;
	private static $db = null;

	protected function __construct(){
		//do konfiga mozna to dac
		$servername = "localhost";
		$username = "testrs";
		$db = "testrs";
		$password = "philips";

		// Create connection
		$this->conn = mysqli_connect($servername, $username, $password, $db );

		// Check connection
		if (!$this->conn) {
			$strErr = "Connection failed: " . mysqli_connect_error();
			throw new  Exception( $strErr );
		}
	}	

	public static function getInstance(){
		if(  NULL ===  self::$db  ){
			self::$db  = new DBConnector;
		}
		return self::$db;
	}

	public function query($sql){
		$result = mysqli_query($this->conn, $sql);

		$out = [];
		if (mysqli_num_rows($result) > 0) {
			// output data of each row
			while($row = mysqli_fetch_assoc($result)) {
				$out[] = $row;
			}
		}
		return $out;
	}

	public function execute($txt){
		$this->q( $txt );
		file_put_contents( 'sql.log', $txt , FILE_APPEND | LOCK_EX  );
	}

	public function escape($txt){
		return mysqli_real_escape_string(  $this->conn, $txt  );
	}

	private function q( $sql ){
		if (!mysqli_query($this->conn, $sql)) {
			$strErr = "Error: " . $sql . "<br>" . mysqli_error($this->conn);
			throw new  Exception( $strErr );
		}
		return true;
	}
}
