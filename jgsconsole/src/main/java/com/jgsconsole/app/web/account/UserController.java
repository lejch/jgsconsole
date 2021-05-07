package com.jgsconsole.app.web.account;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.common.util.CodeUtils;
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.PropertiesUtil;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	
	@Autowired
	protected AccountService accountService;
	
	@RequestMapping(value="/getLstLoginfo") 
	@ResponseBody
	public Object getLstLoginfo(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		
		List<Map> data = null;
		
		data = accountService.getLstLoginfo(user.getUserId());
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data).toString();
	}
	
	@RequestMapping(value="/changeLayout") 
	@ResponseBody
	public Object changeLayout(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String layout = request.getParameter("layout");
		String appId = PropertiesUtil.getInstance("/application.properties").getConfig("APP_ID");
		
		Map map = new HashMap();
		map.put("layout", layout);
		map.put("ID", appId);
		
		accountService.changeLayout(map);
		
		request.getSession().setAttribute("layoutInfo", layout);
		response.setContentType("text/html;charset=utf-8");
		
		JSONObject result = new JSONObject();
		result.put("result", "success");
		
		return result;
	}
	
	@RequestMapping(value="/searchUser") 
	@ResponseBody
	public Object searchUser(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		
		System.out.println(pageNum);
		System.out.println(pageSize);
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);
		
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum)-1)*limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		String searchOption = request.getParameter("option");
		String searchValue = request.getParameter("value");
		
		Map sqlmap = new HashMap();
		String sql = "select * from sys_user "
				+ "where (user_name like '%"+searchValue+"%' or user_alias like '%"+searchValue+"%')"
						+ " and user_name!='admin'";
		sqlmap.put("sql", sql);
		sqlmap.put("SEARCHVAL", "%"+searchValue+"%");
		
		List<Map> result = accountService.searchUser(rowbounds,sqlmap);
		
		JSONObject json = new JSONObject();
		json.put("total", accountService.getCount(sqlmap));
		json.put("rows", JSONArray.fromObject(result));
		
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	@RequestMapping(value="/checkUserName") 
	@ResponseBody
	public Object checkUserName(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String username = request.getParameter("name");
		
		List<Map> result = accountService.checkUserName(username);
		
		String flag = null;
		
		if(result.size()>0){
			flag = "exist";
		}else{
			flag = "unexist";
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		JSONObject json = new JSONObject();
		json.put("result", flag);
		
		return json;
	}
	
	@RequestMapping(value="/getUsers") 
	@ResponseBody
	public Object getUsers(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		List<Map> data = null;
		
		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);
		
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum)-1)*limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		String APP_ID = request.getParameter("APP_ID");
		
		data = accountService.getUsers(rowbounds,map);
		
		JSONObject json = new JSONObject();
		json.put("total", accountService.getUsersCount(map));
		json.put("rows", JSONArray.fromObject(data));
		
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	@RequestMapping(value="/setRoleToUser") 
	@ResponseBody
	public Object setRoleToUser(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String ROLE_ID = request.getParameter("ROLE_ID");
		String USER_ID = request.getParameter("USER_ID");
		String ROLE_NAME = request.getParameter("ROLE_NAME");
		String USER_NAME = request.getParameter("USER_NAME");
		
		Map map = new HashMap();
		map.put("ROLE_ID", ROLE_ID);
		map.put("USER_ID", USER_ID);
		map.put("ROLE_NAME", ROLE_NAME);
		map.put("USER_NAME", USER_NAME);
		
		Integer result = accountService.setRoleToUser(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		JSONObject json = new JSONObject();
		json.put("result", result);
		
		return json;
	}
	
	@RequestMapping(value="/delRoleToUser") 
	@ResponseBody
	public Object delRoleToUser(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String ROLE_ID = request.getParameter("ROLE_ID");
		String USER_ID = request.getParameter("USER_ID");
		String ROLE_NAME = request.getParameter("ROLE_NAME");
		String USER_NAME = request.getParameter("USER_NAME");
		
		Map map = new HashMap();
		map.put("ROLE_ID", ROLE_ID);
		map.put("USER_ID", USER_ID);
		map.put("ROLE_NAME", ROLE_NAME);
		map.put("USER_NAME", USER_NAME);
		
		Integer result = accountService.delRoleToUser(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		JSONObject json = new JSONObject();
		json.put("result", result);
		
		return json;
	}
	
	@RequestMapping(value="/changePassword") 
	@ResponseBody
	public Object changePassword(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		String password = user.getPassword();
		
		String PASSWORD = request.getParameter("PASSWORD");
		String changePassword = accountService.entryptPassword(PASSWORD,user.getSalt());
		
		JSONObject json = new JSONObject();
		
		if(changePassword.equals(password)){
			String surePassword = request.getParameter("surePassword");
			String USER_ID = user.getUserId();
			
			Map map = new HashMap();
			map.put("FLAG", "CHANGEPWD");
			map.put("USER_ID", USER_ID);
			
			accountService.changePassword(map,surePassword);
			
			json.put("result", "密码修改成功！");
		}else{
			json.put("result", "现用密码输入错误！密码修改失败");
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	@RequestMapping(value="/resetPassword") 
	@ResponseBody
	public Object resetPassword(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String USER_ID = request.getParameter("USER_ID");
		String USER_NAME = request.getParameter("USER_NAME");
		String USER_ALIAS = request.getParameter("USER_ALIAS");
		String PASSWORD = request.getParameter("resetPwdInput");
		
		JSONObject json = new JSONObject();
		
		Map map = new HashMap();
		map.put("USER_ID", USER_ID);
		map.put("USER_NAME", USER_NAME);
		map.put("USER_ALIAS", USER_ALIAS);
		map.put("FLAG", "RESETPWD");
		
		accountService.changePassword(map,PASSWORD);
			
		json.put("result", "密码修改成功！");
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	/**
	 * 
	* @Title: delUser 
	* @Description: 删除用户
	* @param request
	* @param response
	* @return
	* @throws IOException   
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping(value = "delUser")
	@ResponseBody
	public Object delUser(ServletRequest request,ServletResponse response) throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		try
		{
			String USER_ID = request.getParameter("USER_ID");
			String USER_ALIAS = request.getParameter("USER_ALIAS");
			
			Map map = new HashMap();
			map.put("USER_ID", USER_ID);
			map.put("USER_ALIAS", USER_ALIAS);
			accountService.delete(map);
			return JSONObject.fromObject(result);
		} catch (Exception e)
		{
			return JSONObject.fromObject(result);
		}
		
	}
	
	@RequestMapping(value = "addUser")
	@ResponseBody
	public Object addUser(ServletRequest request,ServletResponse response) throws Exception {
		ShiroUser curuser =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		
		Map<String,Object> result = new HashMap<String,Object>();
		try
		{
			String USER_ID = request.getParameter("USER_ID");
			String UNITCODE = request.getParameter("UNITCODE");
			String USER_NAME = request.getParameter("USER_NAME");
			String USER_ALIAS = request.getParameter("USER_ALIAS");
			String EMAIL = request.getParameter("EMAIL");
			String APP_ID = request.getParameter("APP_ID");
			String unitCode = request.getParameter("unitCode");
			String LABORATORY = request.getParameter("LABORATORY");
			String PHONE = request.getParameter("PHONE");
			String HOMEPHONE = request.getParameter("HOMEPHONE");
			String CREATOR = request.getParameter("CREATOR");
			String ZONECODE = request.getParameter("ZONECODE");
			String NODE_ID = request.getParameter("NODE_ID");
			String ISNODECM = request.getParameter("ISNODECM");
			
			//构建User对象
			User user = new User();
			user.setUsername(USER_NAME);
			user.setUseralias(USER_ALIAS);
			user.setEmail(EMAIL);
			user.setUnitcode(UNITCODE);
			user.setCreater(curuser.getUserId());
			if(unitCode!=null&&(!unitCode.equals(""))){
				user.setUnitcode(unitCode);
			}
			if(PHONE!=null&&(!PHONE.equals(""))){
				user.setPhone(PHONE);
			}
			if(HOMEPHONE!=null&&(!HOMEPHONE.equals(""))){
				user.setHomephone(HOMEPHONE);
			}
			
			if(USER_ID == null || USER_ID.equals(""))
			{
				String PASSWORD = request.getParameter("PASSWORD");
				String plainPassword = request.getParameter("plainPassword");
				user.setPlainPassword(plainPassword);
				//添加用戶
				accountService.addUser(user);
			}
			else
			{
				user.setUserId(USER_ID);
				accountService.updateUser(user);
			}
			
			String json = JSONObject.fromObject(result).toString();
			return EnDecodeUtil.enCodeReturns2UTF8(json);
		} catch (Exception e)
		{
			String jsone = JSONObject.fromObject(result).toString();
			return EnDecodeUtil.enCodeReturns2UTF8(jsone);
		}
		
	}
	
	/**
	 * 根据登录名查询个人信息
	 * 
	 */
	@RequestMapping(value = "userByLoginName")
	@ResponseBody
	public Object userByLoginName(ServletRequest request,ServletResponse response) throws SQLException {
		
		//获取用户信息
		String loginName = request.getParameter("USER_NAME");
		User  userList= accountService.findUserByLoginName(loginName);		
		JSONObject json = new JSONObject();
		
		json.put("userId", userList.getUserId());
		json.put("useralias", userList.getUseralias());
		json.put("idcard", userList.getIdcard());
		json.put("birthday", userList.getBirthday());
		json.put("gender", userList.getGender());
		json.put("location", userList.getLocation());
		json.put("work_unit", userList.getWork_unit());
		json.put("phone", userList.getPhone());
		json.put("email", userList.getEmail());	
		return json;
	}
	
	
}
