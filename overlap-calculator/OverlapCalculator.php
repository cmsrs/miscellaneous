<?php

class OverlapCalculator {


	const ERR_CODE_EMPTY = 0;
	const ERR_CODE_KEY = -1;
	const ERR_CODE_NUMERIC = -2;
	const ERR_CODE_LOGIC = -3;


	/**
	 * maxymalna ilosc przedzialow odbywajacych sie w tym samym czasie
	 */
	public function getMaxOverlap($intervals){
		$valid = $this->validateData( $intervals );
		//print_r( $valid );
		if( true !==  $valid  ){
			return false;
		}
		
		$intervalsSort = $this->sortData( $intervals );
		//print_r( $intervalsSort );
		$maxCount = 0;
		foreach( $intervalsSort as $key => $item  ){
			$count =  $this->countItemOverlapByKey(  $intervalsSort, $key );
			//print_r( '  '.$key."=".$count );
			if( $maxCount < $count  ){
				$maxCount = $count;
			}
		}
		
		return $maxCount;
	}

	/**
	 * ilosc powtorzen dla danego klucza tab wej
	 */
	protected function countItemOverlapByKey( $data, $key ){
		if( empty($data[$key]) ){
			throw new Exception( "key: $key not exist in interval" );
		}
		$item = $data[$key];
		unset( $data[$key]  );//exclude one item

		$count = 0;
		foreach( $data as $d  ){
			if( $d['from'] > $item['to'] ){//optymalizacja - zakladamy ze data jest posortowana - te dane wykluczamy
				break;
			}

			if( ( $d['from'] >= $item['from']  &&  $d['from'] < $item['to']     ) || 
			     (     $d['to'] > $item['from']  &&	 $d['to'] < $item['to']   )  ){
				$count++;
			}
		}
		return $count;
	}


	/**
	* walidacja danych wejsciowych
	* zwraca true lub false
	*/
	protected function validateData( $data ){
		if(  empty($data) || !is_array( $data )  ){
			return OverlapCalculator::ERR_CODE_EMPTY; 
		}

		foreach( $data as $d  ){
			if( empty($d['from']) || empty($d['to']) ){
				return OverlapCalculator::ERR_CODE_KEY; 
			}

			if(  !$this->numbersOnly( $d['from'] ) || !$this->numbersOnly( $d['to'] ) ){
				return OverlapCalculator::ERR_CODE_NUMERIC; 
			}

			if( $d['from'] >= $d['to'] ){
				return OverlapCalculator::ERR_CODE_LOGIC; 
			}

		}
		return true;
	}

	/**
	* sortowanie tablicy w zaleznosci od indexu from 
	*/
	protected function sortData( $data  ){
		usort($data, function($a, $b) {
		    return $a['from'] - $b['from'];
		});
		return $data;
	}



	/**
	 * zwraca informacje, czy tylko liczby
	 */
	private function numbersOnly($value){
	    return preg_match('/^([0-9]+)$/', $value);
	}
}
