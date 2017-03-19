<?php

require   __DIR__ . '/Fb.php';
require   __DIR__ . '/../lib/MysqliDb.php';
require   __DIR__ . '/Db.php';

class Main{

    private $_config;
	public $_fbEvents;
	public $_db;

    public function  __construct( $config  ){
        $this->_config =  $config;
		$this->_fbEvents = new FbEvents(  $this->_config  );
		$this->_db = new Db(  $this->_config );
   }


	public function process(){
		$dataFb = $this->_fbEvents->getFbData();
		$this->_db->insertData( $dataFb );
		return true;
	}

}
