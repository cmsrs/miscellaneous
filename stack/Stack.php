<?php
class Stack 
{
	//tablica z elementami stosu
	private $_array = array();
	//liczba elementow stosu 
	private $_top = 0;
	 
	//wloz nowy element na stos
	public function push($x){
		$this->_array[$this->_top] = $x;
		$this->_top++;
	}
	 
	//pobierz element ze stosu
	public function pop(){
		if( !empty($this->_top) ){
			$x = $this->_array[$this->_top-1];
			$this->_top--;
			return $x;
		}
		return NULL;
	}
	 
}
