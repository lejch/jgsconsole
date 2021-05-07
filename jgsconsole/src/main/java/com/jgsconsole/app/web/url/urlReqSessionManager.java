package com.jgsconsole.app.web.url;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.SimpleSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jgsconsole.common.util.PropertiesUtil;

@Controller
@RequestMapping(value = "/ursm")
public class urlReqSessionManager {
//	public static final String SYSTEM_TIMEOUT_SETTING = PropertiesUtil.getInstance("/application.properties").getConfig("OS.TimeOut");

	@RequestMapping(value="/rc") 
	@ResponseBody
	public Object reqControl(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
//		Session session = SecurityUtils.getSubject().getSession();
		
		String result = "isNotExpired";
		
//		if(isExpired(session)){
//			result="isExpired";
//			System.out.println("session is expired");
//		}else{
//			result="isNotExpired";
//			System.out.println("session is not expired");
//		}
		
		JSONObject json = new JSONObject();
		json.put("result", result);
		return json;
	}
	
//	private Boolean isExpired(Session session){
//		Boolean bool = false;
//		
//		Date lastAccessTime = session.getLastAccessTime();
//		Date curTime = new Date();
//	    long diff = curTime.getTime()-lastAccessTime.getTime();
//	    if(Integer.parseInt(String.valueOf(diff))>=Integer.parseInt(SYSTEM_TIMEOUT_SETTING)){
//	    	bool = true;
//	    }
//		
//		return bool;
//	}

}
