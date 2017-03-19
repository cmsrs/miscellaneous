<?php

class FbEvents{

	private $_config;
	private  $_appAccessToken;

	public function  __construct( $config  ){
		$this->_config =  $config;
		$this->_appAccessToken = $this->prepateAccessToken();

	}

	public function  getFbData(){
		$out = [];
		foreach( $this->_config['arrFbEventIds'] as  $key => $fbEventId  ){
			$out[ $key ] =  $this->getDataFromFb( $fbEventId  );
		}
		return $out;
	}

	private function prepateAccessToken(){
		return $this->_config['appId'] ."|".$this->_config['appSecret']; 
	}

	private function  getDataFromFb( $fbEventId  ){
		$fbUrl =  $this->getFbEventUrl( $fbEventId  );

		$objData =  $this->getArrFromUrl($fbUrl );
		return  $objData;
	}

	private function getArrFromUrl( $url  ){
		$json = file_get_contents( $url );
		$obj = json_decode($json);
		return $obj;
	}

	private function  getFbEventUrl( $fbEventId  ){
		return 'https://graph.facebook.com/'.$fbEventId.'?access_token='.$this->_appAccessToken;
	}

}
