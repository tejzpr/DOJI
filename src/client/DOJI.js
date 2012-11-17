/*
 * DOJI : Import Javascript On Demand
 * http://tejus.me/doji/
 *
 * Copyright Tejus Pratap
 * Dual licensed under the MIT and GPL licenses.
*/
var Calledgroup=new Array();
var CalledgroupCounter=0;
function doji_registernamespace(ns)
{
	var nsParts = ns.split(".");
	var root = window;
	for(var i=0; i<nsParts.length; i++)
	{
		if(typeof root[nsParts[i]] == "undefined")
		root[nsParts[i]] = new Object();
		root = root[nsParts[i]];
	}
}

function doji_in_array(needle, haystack, argStrict) 
{
    var key = '', strict = !!argStrict;
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
    return false;
}
doji_registernamespace("DOJI.dimport");
DOJI.dimport=function(functionName)
{
	var dojiService='./DOJI.php';
	var returnValue=null;
	if(functionName==undefined)
	{
		return false;
	}
	else
	{
		var calledArguments=new Array();
		var arguMentCounter=0;
		//var jsarguments="";
		if(DOJI.dimport.arguments.length>1)
		{
			for(var i=1;i<=DOJI.dimport.arguments.length-1;i++)
			{
				if(typeof(DOJI.dimport.arguments[i])=="string")
				{
					calledArguments[arguMentCounter++]='"'+DOJI.dimport.arguments[i]+'"';
				}
				else
				{
					calledArguments[arguMentCounter++]=DOJI.dimport.arguments[i];
				}
			}
		}
		
		var jsarguments=calledArguments.join(',');
		try
		{
			if(typeof(eval(functionName))=="object")
			{
				eval("function caller(){return eval("+functionName+");}");	
				returnValue=true;
			}
			if(typeof(eval(functionName))=="function")
			{
				if(jsarguments.length!="0")
				{
					eval("function caller(){return eval("+functionName+")("+jsarguments+");}");
				}
				else
				{
					eval("function caller(){return eval("+functionName+")();}");
				}
				returnValue=true;
			}
			else
			{
				throw "No function";
			}
		}
		catch(e)
		{
			var curObj=this;
			if(!doji_in_array(functionName,Calledgroup))
			{
				$.ajax({
					url:dojiService+"?call="+escape(functionName),
					async:false,
					type:"GET",
					success:function(responsetext)
					{
						if(functionName.indexOf("*")!=-1)
						{
							var namespac=functionName.slice(0,functionName.length-2);
							doji_registernamespace(namespac);
							Calledgroup[CalledgroupCounter++]=functionName;
							var head=document.getElementsByTagName("body")[0];
							var script = document.createElement("script");
							script.setAttribute('type','text/javascript');
							script.setAttribute('call',functionName);
							script.text=responsetext;
							head.appendChild(script);
							returnValue=true;
						}
						else
						{
							doji_registernamespace(functionName);
							try
							{	
								if(typeof(eval("("+responsetext+")"))=="object")
								{
									var head=document.getElementsByTagName("body")[0];
									var script = document.createElement("script");
									script.setAttribute('type','text/javascript');
									script.text=functionName+"="+responsetext;
									head.appendChild(script);
									returnValue=true;
								}
								else
								{
									var head=document.getElementsByTagName("body")[0];
									var script = document.createElement("script");
									script.setAttribute('type','text/javascript');
									script.setAttribute('call',functionName);
									script.text=responsetext;//+"eval("+functionName+")("+jsarguments+")";
									head.appendChild(script);
									returnValue=true;
								}
							}
							catch(e)
							{
								try
								{
									var head=document.getElementsByTagName("body")[0];
									var script = document.createElement("script");
									script.setAttribute('type','text/javascript');
									script.setAttribute('call',functionName);
									script.text=responsetext;//+"eval("+functionName+")("+jsarguments+")";
									head.appendChild(script);
									returnValue=true;
								}
								catch(e)
								{
									alert("JS import error ("+functionName+"): "+e.message);
									returnValue=e.message;
								}
							}
						}
					}
				});
			}
			else
			{
				returnValue=true;
			}
		}
		return returnValue;
	}
}


doji_registernamespace("DOJI.execute");
DOJI.execute=function(functionName)
{
	var dojiService='./DOJI.php';
	var returnValue=null;
	if(functionName==undefined)
	{
		return false;
	}
	else
	{
		var calledArguments=new Array();
		var arguMentCounter=0;
		//var jsarguments="";
		if(DOJI.execute.arguments.length>1)
		{
			for(var i=1;i<=DOJI.execute.arguments.length-1;i++)
			{
				if(typeof(DOJI.execute.arguments[i])=="string")
				{
					calledArguments[arguMentCounter++]='"'+DOJI.execute.arguments[i]+'"';
				}
				else
				{
					calledArguments[arguMentCounter++]=DOJI.execute.arguments[i];
				}
			}
		}
		
		var jsarguments=calledArguments.join(',');
		try
		{
			if(typeof(eval(functionName))=="object")
			{
				eval("function caller(){return eval("+functionName+");}");	
				returnValue=caller();
			}
			if(typeof(eval(functionName))=="function")
			{
				if(jsarguments.length!="0")
				{
					eval("function caller(){return eval("+functionName+")("+jsarguments+");}");
				}
				else
				{
					eval("function caller(){return eval("+functionName+")();}");
				}
				returnValue=caller();
			}
			else
			{
				throw "No function";
			}
		}
		catch(e)
		{
			var curObj=this;
			if(!doji_in_array(functionName,Calledgroup))
			{
				$.ajax({
					url:dojiService+"?call="+escape(functionName),
					async:false,
					type:"GET",
					success:function(responsetext)
					{
							doji_registernamespace(functionName);
							try
							{	
								if(typeof(eval("("+responsetext+")"))=="object")
								{
									var head=document.getElementsByTagName("body")[0];
									var script = document.createElement("script");
									script.setAttribute('type','text/javascript');
									script.text=functionName+"="+responsetext;
									head.appendChild(script);
									eval("function caller(){return eval("+functionName+");}");	
									returnValue=caller();
								}
								else
								{
									var head=document.getElementsByTagName("body")[0];
									var script = document.createElement("script");
									script.setAttribute('type','text/javascript');
									script.setAttribute('call',functionName);
									script.text=responsetext;//+"eval("+functionName+")("+jsarguments+")";
									head.appendChild(script);
									if(jsarguments.length!="0")
									{
										eval("function caller(){return eval("+functionName+")("+jsarguments+");}");
									}
									else
									{
										eval("function caller(){return eval("+functionName+")();}");
									}	
									returnValue=caller();
								}
							}
							catch(e)
							{
								alert("JS Call evaluation error ("+functionName+"): "+e.message);
								returnValue=e.message;
							}
					}
				});
			}
			else
			{
				returnValue=true;
			}
		}
		return returnValue;
	}
}


