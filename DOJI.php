<?php
require_once("./library/scripts/server/DOJI.main.php");
require_once("./library/scripts/server/DOJI.JS.Caller.php");


$callName=$_GET["call"];
header('Content-Type: text/javascript');
$funcCallObj=new DOJIJSCaller();
$funcCallObj->call($callName);
?>