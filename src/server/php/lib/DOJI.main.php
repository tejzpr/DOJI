<?php
/*
 * DOJI : Import Javascript On Demand
 * http://tejus.me/doji/
 *
 * Copyright Tejus Pratap
 * Dual licensed under the MIT and GPL licenses.
*/
class DOJIMain
{
	function __construct()
	{
		
	}
	static private function doji_get_config()
	{
		try
		{
			$configs = parse_ini_file("../../../doji-config.ini",true);
	    	return $configs["doji"];
		}
		catch(Exception $e)
		{
			echo "doji-config.ini not found";
		}
	}
	static function getJsPath()
	{
		$config = self::doji_get_config();
		return $config["jspath"];
	}
}
?>