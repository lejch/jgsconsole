package com.jgsconsole.app.web.account;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.utils.DateProvider;

import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.UUIDGenerator;

@Controller
@RequestMapping(value = "/role")
public class RoleController
{
	@Autowired
	protected AccountService accountService;
	
	private DateProvider dateProvider = DateProvider.DEFAULT;
	
	@RequestMapping(value="/checkRoleName") 
	@ResponseBody
	public Object checkRoleName(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String rolename = request.getParameter("name");
		String app_id = request.getParameter("app_id");
		
		Map map = new HashMap();
		map.put("ROLE_NAME", rolename);
		map.put("APP_ID", app_id);
		
		List<Map> result = accountService.checkRoleName(map);
		
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
	
	@RequestMapping(value="/getRoles") 
	@ResponseBody
	public Object getRoles(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String TYPE = request.getParameter("TYPE");
		String ROLE_ID = request.getParameter("id");
		
		Map map = new HashMap();
		map.put("TYPE", TYPE);
		map.put("ROLE_ID", ROLE_ID);
		
		
		List<Map> data = accountService.getRoles(map);
		
		for(int i=0;i<data.size();i++){
			Map idmap = data.get(i);
			idmap.put("id", idmap.get("ROLE_ID"));
			idmap.put("state", idmap.get("STATE"));
			idmap.put("ICONCLS", "icon-blank");
			idmap.put("iconCls", "icon-blank");
			idmap.put("iconcls", "icon-blank");
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data).toString();
	}
	
	@RequestMapping(value="/getRolesForUser") 
	@ResponseBody
	public Object getRolesForUser(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
//		String APP_ID = request.getParameter("APP_ID");//currentUserId 登录user Id
		String EDIT_USER_ID = request.getParameter("EDIT_USER_ID");//要分配角色的用户Id
		
		Map queryParam = new HashMap();
//		queryParam.put("APP_ID", APP_ID);
		queryParam.put("EDIT_USER_ID", EDIT_USER_ID);
		
		List<Map> data = accountService.getRolesForUser(queryParam);
		
		for(int i=0;i<data.size();i++){
			Map map = data.get(i);
			map.put("id", map.get("ROLE_ID"));
			map.put("ICONCLS", "icon-blank");
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data).toString();
	}
	
	@RequestMapping(value="/addOrEditRole") 
	@ResponseBody
	public Object addOrEditRole(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
		String role_id = request.getParameter("ROLE_ID");
		
		String ROLE_TYPE = request.getParameter("ROLE_TYPE");
		String APP_ID = request.getParameter("APP_ID");
		String ROLE_NAME = request.getParameter("ROLE_NAME");
		String PARENT_ID = request.getParameter("PARENT_ID");
		String CREATE_TIME = new SimpleDateFormat("yyyy-MM-dd").format(dateProvider.getDate());
		String ROLE_DESCRIPTION = request.getParameter("ROLE_DESCRIPTION");
		
		Map map = new HashMap();
		map.put("ROLE_TYPE", ROLE_TYPE);
		map.put("APP_ID", APP_ID);
		map.put("ROLE_NAME", ROLE_NAME);
		map.put("PARENT_ID", PARENT_ID);
		map.put("ROLE_DESCRIPTION", ROLE_DESCRIPTION);
		
		if(role_id==""){
			String ROLE_ID = UUIDGenerator.getUUID();
			
			map.put("ROLE_ID",ROLE_ID);
			map.put("CREATE_TIME", CREATE_TIME);
			map.put("STATE", "open");
			map.put("id", ROLE_ID);
			
			accountService.addRole(map);
		}else{
			String OriginalParentId = request.getParameter("OriginalParentId");
			
			map.put("OriginalParentId",OriginalParentId);
			map.put("ROLE_ID",role_id);
			map.put("UPDATE_TIME", CREATE_TIME);
			map.put("id", role_id);
			
			accountService.editRole(map);
		}
		
		String json = JSONObject.fromObject(map).toString();
    	return EnDecodeUtil.enCodeReturns2UTF8(json);
	}
	
	@RequestMapping(value="/delRole") 
	@ResponseBody
	public Object delRole(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String ROLE_ID = request.getParameter("ROLE_ID");
		String PARENT_ID = request.getParameter("PARENT_ID");
		
		Map map = new HashMap();
		map.put("ROLE_ID", ROLE_ID);
		map.put("PARENT_ID",PARENT_ID);
		
		accountService.delRole(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value="/getPermission") 
	@ResponseBody
	public Object getPermission(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String parent_id = request.getParameter("id");
		
		String role_id = request.getParameter("ROLE_ID");
		String user_id = request.getParameter("USER_ID");
		
		Map queryData = new HashMap();
		queryData.put("parent_id", parent_id);
		queryData.put("role_id", role_id);
		queryData.put("USER_ID", user_id);
		
		List<Map> data = accountService.getPermission(queryData);
		
		for(int i=0;i<data.size();i++){
			Map map = data.get(i);
			map.put("id", map.get("MENU_ID"));
			map.put("ICONCLS", "icon-blank");
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data).toString();
	}
	
	@RequestMapping(value="/changePermissions") 
	@ResponseBody
	public Object changePermissions(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String menuIds = request.getParameter("menuIds");
		String role_id = request.getParameter("role_id");
		String role_name = request.getParameter("role_name");
		
		accountService.changePermissions(menuIds,role_id,role_name);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]");
	}
	
}