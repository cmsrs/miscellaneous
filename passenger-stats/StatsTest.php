<?php

require './Stats.php';


class StatsTests extends PHPUnit_Framework_TestCase{

	public function testShow_statistics(){
		$param = "1102.III.1>etad;53<ega";
		//to jest odwrocone tj age<35;date>1.III.2011
		Stats::show_statistics($param );
	}



}

