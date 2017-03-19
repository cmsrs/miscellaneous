<?php

require "./DBConnector.php";

class Stats{
	public static  function show_statistics($param ){
 		$db = DBConnector::getInstance();
		$arrParam =  Stats::parse_data_in(  $param );
		//echo "<pre>"; print_r( $arrParam ); echo "</pre>";

		$sql = Stats::get_sql_raport( $arrParam );
		//print_r( $sql );

		$raport = $db->query($sql);

		echo "<pre>"; print_r( $raport ); echo "</pre>";
		//echo "aaa";
		return  $raport;
	}

	private static   function roman2number($roman){
			    $conv = array(
			        array("letter" => 'I', "number" => 1),
			        array("letter" => 'V', "number" => 5),
			        array("letter" => 'X', "number" => 10),
			        array("letter" => 'L', "number" => 50),
			        array("letter" => 'C', "number" => 100),
			        array("letter" => 'D', "number" => 500),
			        array("letter" => 'M', "number" => 1000),
			        array("letter" => 0, "number" => 0)
			    );
			    $arabic = 0;
			    $state = 0;
			    $sidx = 0;
			    $len = strlen($roman);

			    while ($len >= 0) {
			        $i = 0;
			        $sidx = $len;

			        while ($conv[$i]['number'] > 0) {
			            if (strtoupper(@$roman[$sidx]) == $conv[$i]['letter']) {
			                if ($state > $conv[$i]['number']) {
			                    $arabic -= $conv[$i]['number'];
			                } else {
			                    $arabic += $conv[$i]['number'];
			                    $state = $conv[$i]['number'];
			                }
			            }
			            $i++;
			        }

			        $len--;
											    }

			    return($arabic);
	}


	private static function parse_data_in( $param  ){
		//$paramIn  = "1102.III.1<etad;05>ega";
		//var_dump( $param );
		$strrev = strrev( $param   );
		$explode = explode( ";", $strrev  );

		$age = empty($explode[0]) ? die('problem z parowaniem date') :  $explode[0];
		$date = empty($explode[1]) ? die('problem z parowaniem date') :  $explode[1];


		$out = [];
		if( preg_match('/^age([\>\<])([0-9]+)/', $age, $found ) ){
			$out['age']['sign'] = $found[1];
			$out['age']['val'] = $found[2];

		}

		//echo '==='.$date.'===';
		if( preg_match('/^date([\>\<])(.*)/', $date, $found ) ){



			$out['date']['sign'] = $found[1];
	
			$dateExplode =  explode( '.', $found[2] );
			//var_dump( $dateExplode  );

			$out['date']['val']= $dateExplode[2]."-".  sprintf("%02d", self::roman2number( $dateExplode[1] ) )."-".  sprintf("%02d",   $dateExplode[0] );

		}

		return $out;
	}



	private static function get_sql_raport( $arrParam  ){
		//var_dump( $arrParam  );
		$ageSign  = $arrParam['age']['sign']  ; 
		$ageVal =  $arrParam['age']['val'];

		$dateSign =  $arrParam['date']['sign']  ; 
		$dateVal =  $arrParam['date']['val'];

		$sql = "
SELECT * 
FROM `planes` as `pl`
LEFT JOIN
(
	SELECT avg( `p`.`age` ) as avg_m , `p`.`plane_id`
	FROM `passengers` as `p`
	where true
	and `p`.`sex` = 'm'
	and `p`.`age`  $ageSign $ageVal  
	group by  `p`.`plane_id`
)  as tmp_m ON ( `tmp_m`.`plane_id` = `pl`.`id`  ) 
LEFT JOIN
(
	SELECT avg( `p`.`age` ) as avg_f , `p`.`plane_id`
	FROM `passengers` as `p`
	where true
	and `p`.`sex` = 'f'
	and `p`.`age`  $ageSign $ageVal  
	group by  `p`.`plane_id`
)  as tmp_f ON ( `tmp_f`.`plane_id` = `pl`.`id`  ) 
where	`pl`.`flight_date` $dateSign $dateVal
order by `pl`.`id`
		";
		return $sql;
	}


}

