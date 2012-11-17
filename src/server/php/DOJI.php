<?php
/*
 * DOJI : Import Javascript On Demand
 * http://tejus.me/doji/
 *
 * Copyright Tejus Pratap
 * Dual licensed under the MIT and GPL licenses.
*/
require_once("./lib/DOJI.main.php");
require_once("./lib/DOJI.JS.Caller.php");


$callName=$_GET["call"];
header('Content-Type: text/javascript');
$funcCallObj=new DOJIJSCaller();
$funcCallObj->call($callName);
?>