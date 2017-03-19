<?php

require 'OverlapCalculator.php';


class OverlapCalculatorExtends extends OverlapCalculator{
	public function validateData( $data ){
		return parent::validateData( $data );
	}
	public function sortData( $data  ){
		return parent::sortData( $data );
	}
	public function countItemOverlapByKey( $data, $key ){
		return parent::countItemOverlapByKey( $data, $key );
	}
}

class OverlapCalculatorTest  extends PHPUnit_Framework_TestCase {

    private $obj;
	private $intervals = array(
			array('from' => 12345, 'to' => 13455),
			array('from' => 13013, 'to' => 13201),
			array( 'from' => 12, 'to' => 20  ),
			array( 'from' => 3, 'to'=> 17 ),
			array( 'from' => 13013, 'to'=> 13201  )
		);


    protected function setUp(){
        $this->obj = new  OverlapCalculatorExtends;
	}

	protected function tearDown(){
	    $this->obj = null;
	}


	public function testGetMaxOverlap(){
		$intervals = $this->intervals; 

		$intervals[0]['from'] = '1b';
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertFalse( $out );

		$intervals = array(); 
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertFalse( $out );

		$intervals = $this->intervals; 
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertEquals( $out, 2 );

		$intervals = array(
			array( 'from' =>  1,  'to' =>  3 ),
			array( 'from' =>  4,  'to' => 7 )
		);
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertEquals( $out, 0 );


		
		$intervals = array(
			array( 'from' =>  1,  'to' =>  3 ),
			array( 'from' =>  1,  'to' => 7 )
		);
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertEquals( $out, 1 );



		$intervals = array(
			array( 'from' =>  1,  'to' =>  3 ),
			array( 'from' =>  3,  'to' => 7 )
		);
		$out = $this->obj->GetMaxOverlap($intervals);
		$this->assertEquals( $out, 0 );




	}

	public function   testCountItemOverlapByKey(){
		$data = $this->intervals; 
		$key = 100;
		try{
			$this->obj->countItemOverlapByKey( $data, $key );
		}catch( Exception  $e ){
			$msgExp = $e->getMessage();
			$this->assertContains(   (string)$key, $msgExp );
		}

		$dataSort = $this->obj->sortData( $data );
		$ans = array( 0=>1,  1=>1,  2=>2,  3=>1,  4=>1 );
		foreach( $ans as $k=>$a  ){
			$aFun = $this->obj->countItemOverlapByKey( $dataSort, $k );
			$this->assertEquals( $aFun, $a );
		}


	}

	
	public function testSortData(){
		$intervals = $this->intervals; 

		$out = $this->obj->sortData( $intervals );
		$this->assertGreaterThanOrEqual( $out[0]['from'] ,  $out[1]['from']  );


		$intervals[0]['from'] =  $intervals[1]['from'];
		$out = $this->obj->sortData( $intervals );
		$this->assertGreaterThanOrEqual( $out[0]['from'] ,  $out[1]['from']  );

		$intervals[2] = array( 'from' => 12, 'to' => 20  );
		$intervals[3] = array( 'from' => 3, 'to'=> 17 );
		$out = $this->obj->sortData( $intervals );
		//print_r( $out  );

		$this->assertEquals( $out[0]['from'], 3 );
		$this->assertEquals( $out[1]['from'], 12 );
	}




	public function testValidateData(){
		$intervals = $this->intervals; 

		$out = $this->obj->validateData($intervals);
		$this->assertTrue( $out );

		$intervals[2] = array( 'from' => 12  );

		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_KEY );


		$intervals[2] = array( 'from' => 12, 'to' => ''  );

		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_KEY );

		$intervals[2] = array( 'from' => 12, 'to' => 'aa'  );

		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_NUMERIC );


		$intervals[2] = array( 'from' => 12, 'to' => 12  );

		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_LOGIC );

		$intervals = array(); 
		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_EMPTY );

		$intervals = 1321; 
		$out2 = $this->obj->validateData($intervals);
		$this->assertEquals( $out2, OverlapCalculator::ERR_CODE_EMPTY );

	}
}
