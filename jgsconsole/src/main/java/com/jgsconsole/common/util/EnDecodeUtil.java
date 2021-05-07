package com.jgsconsole.common.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class EnDecodeUtil {
	public static String enCodeReturns2UTF8(String code) throws Exception{
		String result = null;
		
	    result = URLEncoder.encode("*#@*"+code+"*@#*","UTF-8");
		
		return result.replace("+", "%20");
	}
}
