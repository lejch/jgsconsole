package com.jgsconsole.app.web.account;

import com.jgsconsole.app.entity.account.Role;
import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.app.service.account.AppService;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.common.util.ExcelUtil;
import com.jgsconsole.common.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/AppController")
public class AppController {

	@Autowired
	protected AppService appService;

	@RequestMapping(value="/searchApp") 
	@ResponseBody
	public Object searchApp(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);
		
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum)-1)*limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		String searchOption = request.getParameter("option");
		String searchValue = request.getParameter("value");
		
		Map sqlmap = new HashMap();
		sqlmap.put("SEARCHVAL", "%"+searchValue+"%");
		
		List<Map> result = appService.searchApp(rowbounds, sqlmap);
		
		JSONObject json = new JSONObject();
		json.put("total", appService.getSearchCount(sqlmap));
		json.put("rows", JSONArray.fromObject(result));
		
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	/**
	 * @throws java.io.IOException
	 *
	* @param @param model
	* @param @param request
	* @return String    返回类型
	* @throws
	 */
	@RequestMapping(value = "listApp")
	@ResponseBody
	public Object listApp(ServletRequest request,ServletResponse response) throws IOException {
		try
		{
			//查询参数
			Map map = new HashMap();
			String pageNum = request.getParameter("page");
			String pageSize = request.getParameter("rows");
			map.put("pageNum", pageNum);
			map.put("pageSize", pageSize);

			int limit = Integer.valueOf(pageSize);
			int offset = (Integer.valueOf(pageNum)-1)*limit;
			RowBounds rowbounds = new RowBounds(offset, limit);

			List<Map> userList = appService.findAppByParam(rowbounds,map);

			JSONObject json = new JSONObject();
			json.put("total", appService.getCount(map));
			json.put("rows", JSONArray.fromObject(userList));

			return json;
		} catch (Exception e)
		{
			return null;
		}
	}
	
	@RequestMapping(value="/addOrEditApp") 
	@ResponseBody
	public Object addOrEditApp(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String app_id = request.getParameter("ID");
		
		String APP_CODE = request.getParameter("APP_CODE");
		String IP = request.getParameter("IP");
		String PORT = request.getParameter("PORT");
		String APP_NAME = request.getParameter("APP_NAME");
		String APP_KEY = request.getParameter("APP_KEY");
		String FLAG = request.getParameter("FLAG");
		String DESCRIPTION = request.getParameter("DESCRIPTION");
		String iconCls = request.getParameter("ICONCLS");
		
		Map map = new HashMap();
		map.put("APP_CODE", APP_CODE);
		map.put("IP", IP);
		map.put("PORT", PORT);
		map.put("APP_NAME", APP_NAME);
		map.put("APP_KEY", APP_KEY);
		map.put("FLAG", FLAG);
		map.put("DESCRIPTION", DESCRIPTION);
		map.put("iconCls", iconCls);
		
		if(app_id==""){
			map.put("ID",APP_CODE);
			
			appService.addApp(map);
		}else{
			map.put("ID",app_id);
			
			appService.editApp(map);
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value="/delApp") 
	@ResponseBody
	public Object delApp(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String TITLE = request.getParameter("TITLE");
		
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("TITLE", TITLE);
		
		appService.delApp(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value="/enableApp") 
	@ResponseBody
	public Object enableApp(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String FLAG = request.getParameter("FLAG");
		String TITLE = request.getParameter("TITLE");
		
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("FLAG", FLAG);
		map.put("TITLE", TITLE);
		
		appService.enableApp(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
}
