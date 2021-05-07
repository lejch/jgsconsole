package com.jgsconsole.app.web.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.HpwlMenuService;
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.PropertiesUtil;
import com.jgsconsole.common.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/HpwlMenu")
public class HpwlMenuController {
	
	@Autowired
	public HpwlMenuService hpwlMenuService;
	
    @RequestMapping(value="/searchMenus") 
    @ResponseBody
    public JSONArray searchMenus(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	
    	String appId = PropertiesUtil.getInstance("/application.properties").getConfig("APP_ID");
    	String searchVal = request.getParameter("searchVal");
    	
    	Map sqlMap = new HashMap();
    	sqlMap.put("SEARCHVAL", "%"+searchVal+"%");
    	sqlMap.put("APPID", appId);
    	
    	List<Map> data = hpwlMenuService.execSql(sqlMap);
    	
    	if(data.size()>0){
    		for(int i=0;i<data.size();i++){
    			Map map = data.get(i);
    			map.put("id", map.get("MENU_ID"));
    			map.put("title", map.get("TITLE"));
    			map.put("menuId", map.get("MENU_ID"));
    			map.put("parentId", map.get("PARENT_ID"));
    		}
    	}
    	
    	JSONArray result = JSONArray.fromObject(data);
    	
    	System.out.println(result);
    	response.setContentType("text/html;charset=utf-8");
    	
    	return result;
    }
    
    @RequestMapping(value="/getTreelist") 
    @ResponseBody
    public Object getTreelist(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	
    	String ID = request.getParameter("id");
    	
    	Map sqlmap = new HashMap();
    	sqlmap.put("ID", ID);
    	
    	List<Map> data = hpwlMenuService.getTreelist(sqlmap);
    	
    	for(int i=0;i<data.size();i++){
    		Map map = data.get(i);
    		map.put("id", map.get("MENU_ID"));
    		map.put("state", map.get("STATE"));
    		map.put("ICONCLS", "icon-blank");
    		map.put("iconcls", "icon-blank");
    		map.put("iconCls", "icon-blank");
    	}
    	
    	response.setContentType("text/html;charset=utf-8");
    	
    	return JSONArray.fromObject(data).toString();
    }
    
    @RequestMapping(value="/enableMenu") 
	@ResponseBody
	public Object enableMenu(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String MENU_ID = request.getParameter("MENU_ID");
		String enableFlag = request.getParameter("enableFlag");
		
		List<Map> menuList = hpwlMenuService.selectForDelMenus(MENU_ID);
		
		for(int i=0;i<menuList.size();i++){
			Map menu = menuList.get(i);
			Map map = new HashMap();
			map.put("MENU_ID", menu.get("MENU_ID"));
			map.put("TITLE", menu.get("TITLE"));
			map.put("enableFlag", enableFlag);
			hpwlMenuService.enableMenu(map);
		}
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
    
    @RequestMapping(value="/getTreeDatalist") 
    @ResponseBody
    public Object getTreeDatalist(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	
    	String ID = request.getParameter("id");
    	
    	Map sqlmap = new HashMap();
    	sqlmap.put("ID", ID);
    	
    	List<Map> data = hpwlMenuService.getTreeDatalist(sqlmap);
    	
    	for(int i=0;i<data.size();i++){
			Map map = data.get(i);
			map.put("id", map.get("MENU_ID"));
			map.put("state", map.get("STATE"));
			map.put("ICONCLS", "icon-blank");
		}
    	
    	response.setContentType("text/html;charset=utf-8");
    	
    	return JSONArray.fromObject(data).toString();
    }
	
    @RequestMapping(value="/delMenu") 
	@ResponseBody
	public Object delMenu(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		
		request.setCharacterEncoding("UTF-8");
		
		String MENU_ID = request.getParameter("MENU_ID");
		String PARENT_ID = request.getParameter("PARENT_ID");
		
		hpwlMenuService.delMenu(MENU_ID,PARENT_ID);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
    
    @RequestMapping(value="/addOrEditMenu") 
	@ResponseBody
	public Object addOrEditMenu(HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
		String menu_id = request.getParameter("MENU_ID");
		
		String PARENT_ID = request.getParameter("PARENT_ID");
		String TITLE = request.getParameter("TITLE");
		String ORDER_SORT = request.getParameter("ORDER_SORT");
		String LOCATION = "";
		if(StringUtils.isNotBlank(request.getParameter("LOCATION"))){
			LOCATION = request.getParameter("LOCATION");
		}
		String FLAG = request.getParameter("FLAG");
		String TABLE_ID = request.getParameter("TABLE_ID");
		String TREELEVEL = request.getParameter("TREELEVEL");
		
		Map map = new HashMap();
		map.put("PARENT_ID", PARENT_ID);
		map.put("TITLE", TITLE);
		map.put("ORDER_SORT", ORDER_SORT);
		map.put("LOCATION", LOCATION);
		map.put("FLAG", FLAG);
		map.put("TABLE_ID", TABLE_ID);
		map.put("TREELEVEL", TREELEVEL);
		
		if(StringUtils.isNotBlank(menu_id)){
			map.put("MENU_ID",menu_id);
			
			String OriginalParentId = request.getParameter("OriginalParentId");
			
			map.put("OriginalParentId",OriginalParentId);
			
			hpwlMenuService.editMenu(map);
		}else{
			String MENU_ID = UUIDGenerator.getUUID();
			
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			map.put("CREATOR", user.getUseralias());
			
			map.put("MENU_ID",MENU_ID);
			map.put("STATE", "open");
			
			hpwlMenuService.addMenu(map,StringUtils.isNotBlank(PARENT_ID));
		}
		
		JSONObject json = JSONObject.fromObject(map);
		json.put("id", map.get("MENU_ID"));
		return EnDecodeUtil.enCodeReturns2UTF8(json.toString());
	}
}