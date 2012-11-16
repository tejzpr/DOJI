<?php
/*
 * DOJI : Import Javascript On Demand
 * http://www.tejuspratap.com/doji/
 *
 * Copyright (c) 2009 Tejus Pratap
 * Dual licensed under the MIT and GPL licenses.
*/
class DOJIJSCaller
{
	private $jsPath="";
	private $jsDir="";
	private $jsClass="";
	private $jsFullFunction="";
	private $jsBaseClass="";
	function __construct()
	{
		$this->jsPath=DOJIMain::getJsPath();
	}
	private function readFiles($path)
	{
		if ($handle = opendir($path)) 
			{
			    /* This is the correct way to loop over the directory. */
				ob_clean();
				flush();
		    	while (false !== ($file = readdir($handle))) 
		    	{
		    		if(substr($file,-3)==".js")
		    		{
		    			ob_start();
			    		if(strstr($file,$this->jsBaseClass))
			    		{
			    			readfile($path."/".$file);
			    			echo "\n";
			    		}
			    		ob_end_flush();
		    		}
		    	}
		    	exit;
		    	closedir($handle);
			}
	}
	public function call($functionName)
	{
		$this->jsFullFunction=$functionName;
		$tempjsCaller=explode(".",$this->jsFullFunction);
		$this->jsClass=array_pop($tempjsCaller);
		$this->jsBaseClass=implode(".",$tempjsCaller);
		if(count($tempjsCaller)>0)
		{
			$this->jsDir=implode("/",$tempjsCaller);
		}
		
		$dirPath=$this->jsPath."/".$this->jsDir;
		if(is_dir($dirPath))
		{
			if($this->jsClass!="*")
			{
				$p_FileName=$dirPath."/".$functionName.".js";
				if(file_exists($p_FileName) && is_readable($p_FileName))
				{
					ob_clean();
					flush();
					ob_start("ob_gzhandler");
				    readfile($p_FileName);
				    ob_end_flush();
				    exit;
				}
				else
				{
					throw new Exception("The javascript class could not be read");
				}
			}
			else if($this->jsClass=="*")
			{
					$this->readFiles($dirPath);
			}
		}
		else
		{
			throw new Exception("The javascript class could not be read");
		}
		
	}
}
?>