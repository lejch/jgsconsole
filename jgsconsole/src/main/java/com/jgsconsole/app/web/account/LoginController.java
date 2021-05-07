package com.jgsconsole.app.web.account;
import java.util.HashMap;
import java.util.Map;

import javax.naming.AuthenticationException;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jgsconsole.app.service.BaseLogUtil;
/**
 * LoginController负责打开登录页面(GET请求)和登录出错页面(POST请求)，

 * 真正登录的POST请求由Filter完成,
 * 
 * @author calvin
 */
@Controller
//@RequestMapping(value = "/login")
@RequestMapping(value = {"/{login:login;?.*}"})
public class LoginController{


	@RequestMapping(method = RequestMethod.GET)
	public String login(HttpServletRequest req) {
		return "account/login";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String fail(HttpServletRequest req,HttpServletResponse response) throws Exception {
		String exceptionClassName = (String)req.getAttribute("shiroLoginFailure");
		String error = "";
		if(UnknownAccountException.class.getName().equals(exceptionClassName)) {  
            error = "用户名或密码错误,请重新检查！";  
        }else if(IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {  
            error = "用户名或密码错误,请重新检查！";  
        }else if(exceptionClassName.trim().equals("org.apache.shiro.authc.AuthenticationException")){
        	error = "用户名或密码错误,请重新检查！";  
        }else if(exceptionClassName != null) {
    		error = exceptionClassName;
        }
		req.getSession().setAttribute("error", error);
		
		response.sendRedirect("");
//		return "account/login";
		return null;
	}
}