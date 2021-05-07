package com.jgsconsole.app.service.account;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.repository.account.MenuDao;
import com.jgsconsole.app.service.BaseLogUtil;
import com.jgsconsole.common.util.DateUtils;
import com.jgsconsole.common.util.UUIDGenerator;

@Service(value = "menuService")
public class MenuService extends BaseLogUtil {
	
	@Autowired
	private MenuDao menuDao;

	public List<Map> execSql(Map map){
		return menuDao.execSql(map);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void enableMenu(Map map) throws Exception {
		String flag = (String) map.get("enableFlag");
		String MENU_ID = (String) map.get("MENU_ID");
		String describe = null;
		if(flag.equals("0")){
			menuDao.enableMenu(map);
			describe = DEFALUT_STRING_ENABLE+DEFALUT_PART_MENU+" "+(String) map.get("TITLE");
		}else{
			menuDao.enableMenu(map);
			menuDao.delMenuRoleHas(map);
			menuDao.delSpecialPermissionMenu(MENU_ID);
			describe = DEFALUT_STRING_DISABLE+DEFALUT_PART_MENU+" "+(String) map.get("TITLE");
		}
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	public List<Map> getTreelist(Map map){
		List<Map> data = null;
		data = menuDao.getTreelistAdmin(map);
		return data;
	}
	
	public List<Map> getTreeDatalist(Map map){
		List<Map> data = null;
		data = menuDao.getTreeDatalistAdmin(map);
		return data;
	}
	
	public List<Map> selectForDelMenus(String MENU_ID){
		return menuDao.selectForDelMenus(MENU_ID);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void delMenu(Map map) throws Exception {
		String MENU_ID = (String) map.get("MENU_ID");
		
		List<Map> menuList = menuDao.selectForDelMenus(MENU_ID);
		
		for(int i=0;i<menuList.size();i++){
			Map menu = menuList.get(i);
			menuDao.delMenu((String)menu.get("MENU_ID"));
			Map sqlMap = new HashMap();
			sqlMap.put("MENU_ID", (String)menu.get("MENU_ID"));
			menuDao.delMenuRoleHas(sqlMap);
			menuDao.delSpecialPermissionMenu((String)menu.get("MENU_ID"));
			String describe = DEFALUT_STRING_DELETE+DEFALUT_PART_MENU+" "+(String) menu.get("TITLE");
			super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
		}
		List<Map> dealParentState = menuDao.selectForDelMenus((String)map.get("PARENT_ID"));
		if(dealParentState.size()==1){
			menuDao.delSetParentState(map);
		}
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void addMenu(Map map) throws Exception {
		menuDao.addMenu(map);
		menuDao.updateSetMenuState(map);
		String describe = DEFALUT_STRING_INSERT+DEFALUT_PART_MENU+" "+(String) map.get("TITLE");
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void editMenu(Map map) throws Exception {
		menuDao.editMenu(map);
		String originalParentId = (String)map.get("OriginalParentId");
		String currentParentId = (String)map.get("PARENT_ID");
		List<Map> children = menuDao.selectForDelMenus(originalParentId);
		List<Map> curChildren = menuDao.selectForDelMenus(currentParentId);
		if(children.size()==1){
			Map sqlmap = new HashMap();
			sqlmap.put("PARENT_ID", originalParentId);
			menuDao.delSetParentState(sqlmap);
		}
		Integer curChildrenLength = curChildren.size();
		String appId = (String) map.get("APP_ID");
		if(curChildrenLength>0){
			for(int i=0;i<curChildrenLength;i++){
				Map child = curChildren.get(i);
				Map updateMap = new HashMap();
				updateMap.put("MENU_ID", child.get("MENU_ID"));
				updateMap.put("APP_ID", appId);
				menuDao.updateAppId(updateMap);
			}
			if(curChildrenLength>1){
				menuDao.updateSetMenuState(map);
			}
		}
		String describe = DEFALUT_STRING_UPDATE+DEFALUT_PART_MENU+" "+(String) map.get("TITLE");
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public JSONObject addOrEditMenu(JSONObject job) throws Exception{
		String menuid = job.getString("MENU_ID");
		String date = DateUtils.parseDate(new Date(), "yyyyMMddHHmmssSSS");
		Menu menu = new Menu();
		if(menuid==null||menuid.isEmpty()){
			menuid = UUIDGenerator.getUUID();
			menu.setMenuId(menuid);
			menu.setParentId(job.getString("PARENT_ID"));
			menu.setTitle(job.getString("TITLE"));
			menu.setOderSort(job.getString("ORDER_SORT"));
			menu.setLocation(job.getString("LOCATION"));
			menu.setDescription(job.getString("DESCRIPTION"));
			menu.setUpdateTime(date);
			menu.setCreateTime(date);
			menu.setState("open");
			
			menuDao.insertMenu(menu);
			
			job.put("MENU_ID", menuid);
			job.put("status", "1");
			job.put("detail", "添加菜单成功!");
			if(job.getString("PARENT_ID").equals("0")){
				job.put("isParent",true);
			}else{
				job.put("isParent",false);
			}
			return job;
		}else{
			menu.setMenuId(menuid);
			menu.setTitle(job.getString("TITLE"));
			menu.setLocation(job.getString("LOCATION"));
			menu.setDescription(job.getString("DESCRIPTION"));
			menu.setUpdateTime(date);
			menuDao.updateMenu(menu);
			job.put("status", "1");
			job.put("detail", "编辑菜单成功!");
			if(job.getString("PARENT_ID").equals("0")){
				job.put("isParent",true);
			}else{
				job.put("isParent",false);
			}
			return job;
		}
	}
	
	public MenuDao getMenuDao() {
		return menuDao;
	}

	public void setMenuDao(MenuDao menuDao) {
		this.menuDao = menuDao;
	}
	
	

}
