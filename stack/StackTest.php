<?php

require 'Stack.php';

class StackTest extends PHPUnit_Framework_TestCase{

	private $stack;

	protected function setUp(){
		$this->stack = new Stack;		
	}
	protected function tearDown(){
		$this->stack = null;		
	}
	public function testStack(){
		$a = 1;
		$b = 2;

		$out0 = $this->stack->pop();
		$this->assertNull( $out0 );

		$this->stack->push( $a );
		$out1 = $this->stack->pop();
		$this->assertEquals($a, $out1 );

		$this->stack->push( $b );
		$out2 = $this->stack->pop();
		$this->assertEquals($b, $out2 );

		$out3 = $this->stack->pop();
		$this->assertNull( $out3 );


		$this->stack->push( $a );
		$this->stack->push( $a );
		$this->stack->push( $a );
		$this->stack->push( $b );
	

		$this->assertEquals($b, $this->stack->pop() );
		$this->assertEquals($a, $this->stack->pop() );
		$this->assertEquals($a, $this->stack->pop() );
		$this->assertEquals($a, $this->stack->pop() );
		$this->assertNull( $this->stack->pop() );
	}

}
