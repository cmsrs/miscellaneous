<?php

require '../class/Main.php';


class MainTests extends PHPUnit_Framework_TestCase
{
	    private $main;
	    private $_config;

		protected function setUp(){
			$arrConfig =  require_once '../config_test.php';
			$this->_config =  $arrConfig;
			$this->main = new  Main( $arrConfig ); 
			$this->main->_db->deleteAll(); //kasowanie rekordow przed uruchomieniem testow
		}
	 
		protected function tearDown(){
			$this->main = NULL;
		}
	 
		public function testProcess(){
			$result = $this->main->process();
			$this->assertTrue($result);

			$this->assertNotEmpty(  $this->_config['arrFbEventIds'] );

			$allData = $this->main->_db->getAll();

			$this->assertNotEmpty(  $allData );
			$this->assertInternalType('array',  $allData  );
			//sprawdzamy czy tyle samo jest rekordow w db co w configu
			$this->assertEquals( count( $allData ), count($this->_config['arrFbEventIds'] )  );
			$this->assertArrayHasKey( 0,  $allData);
			$this->assertArrayHasKey( 'name',  $allData[0] );
			$this->assertNotEmpty(  $allData[0]['name']   );
		}
	 
}
