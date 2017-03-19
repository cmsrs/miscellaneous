<?php

$arrConfig =  require_once 'config.php';
require 'class/Main.php';


$main = new Main( $arrConfig  );
$main->process();
