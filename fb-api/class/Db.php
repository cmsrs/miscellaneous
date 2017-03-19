<?php

class Db{
	private $_config;
	private $_db;

	public function  __construct( $config  ){
		$this->_config =  $config;
		$this->_db = new MysqliDb ( $config['db']['host'], $config['db']['username'], $config['db']['password'], $config['db']['databaseName']);
	}

	public function deleteAll(){
		$this->_db->delete( $this->_config['db']['tableName'] );
	}
	public function getAll(){
		return $this->_db->get( $this->_config['db']['tableName'] );
	}
 
 

	public function insertData($data){
		foreach( $data as $row ){
			$arrRow = (array)$row;
			$this->insertRow( $arrRow );
		}
		return true;
	}

	private function insertRow( $row ){
		$data = Array (
			"name" => !empty( $row['name']) ? $row['name'] : '',
		    "description" =>  !empty( $row['description']) ? $row['description'] : ''  ,
		    "start_time" =>  !empty( $row['start_time']) ? $row['start_time'] : ''  ,
		    "end_time" =>   !empty( $row['end_time']) ? $row['end_time'] : ''  
		);
		$id = $this->_db->insert ( $this->_config['db']['tableName'] , $data);
		//$err =  $this->_db->getLastErrno();
		//$descErr = $this->_db->getLastError();
		//var_dump(  $descErr );
		//var_dump( $err  );
		//var_dump( $id );
		//die('===========');
		if($id){
			true;
		}
		return false;
	}

}
