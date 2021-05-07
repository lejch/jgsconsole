package com.jgsconsole.app.web.account;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.service.account.AccountService;

/**
 * 用户注册的Controller.
 * 
 * @author calvin
 */
@Controller
@RequestMapping(value = "/register")
public class RegisterController {

	@Autowired
	protected AccountService accountService;

	@RequestMapping(method = RequestMethod.GET)
	public String registerForm() {
		return "account/register";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String register(@Valid User user, RedirectAttributes redirectAttributes) throws Exception {
		accountService.registerUser(user);
		redirectAttributes.addFlashAttribute("username", user.getUsername());
		return "redirect:/login";
	}

	/**
	 * Ajax请求校验username是否唯一。
	 */
	@RequestMapping(value = "checkLoginName")
	@ResponseBody
	public String checkLoginName(@RequestParam("username") String username) {
		if (accountService.findUserByLoginName(username) == null) {
			return "true";
		} else {
			return "false";
		}
		
	}
	
	/**
	 * Ajax请求校验username是否唯一。
	 * 修改用户
	 */
	@RequestMapping(value = "checkLoginNameForUpdate")
	@ResponseBody
	public String checkLoginNameForUpdate(@RequestParam("username") String username,ServletRequest request) {
		String USER_NAME = request.getParameter("USER_NAME");
		System.out.println(USER_NAME);
		Map map = new HashMap();
		map.put("USER_NAME", USER_NAME);
		map.put("username", username);
		if (accountService.checkLoginNameForUpdate(map) == null) {
			return "true";
		} else {
			return "false";
		}
		
	}
	
}
