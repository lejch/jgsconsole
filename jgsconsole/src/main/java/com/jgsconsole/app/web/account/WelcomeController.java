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
@RequestMapping(value = {"/{welcome:welcome;?.*}"})
public class WelcomeController{


	@RequestMapping(method = RequestMethod.GET)
	public String login(HttpServletRequest req) {
		return "welcome/login";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String fail(HttpServletRequest req,HttpServletResponse response) throws Exception {
		return "welcome/login";
	}
}