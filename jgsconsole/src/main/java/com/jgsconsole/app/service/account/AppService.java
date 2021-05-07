package com.jgsconsole.app.service.account;

import com.jgsconsole.app.repository.account.AppDao;
import com.jgsconsole.app.service.BaseLogUtil;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service(value = "appService")
public class AppService extends BaseLogUtil {
	private static Logger logger = LoggerFactory.getLogger(AppService.class);
	@Autowired
	private AppDao appDao;

	@Transactional
	public List<Map> findAppByParam(RowBounds rowbounds,Map map)
	{
		return appDao.findAppByParam(rowbounds, map);
	}
	
	@Transactional
	public List<Map> searchApp(RowBounds rowbounds,Map map)
	{
		return appDao.searchApp(rowbounds, map);
	}

	public Integer getSearchCount(Map map)
	{
		return appDao.getSearchCount(map);
	}
	
	public Integer getCount(Map map)
	{
		return appDao.getCount(map);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void addApp(Map map) throws Exception
	{
		appDao.addApp(map);
		appDao.addAppToSYS_MENU(map);
		appDao.addAppToSYS_ROLE(map);
		String describe = DEFALUT_STRING_INSERT+DEFALUT_PART_APP+" "+(String) map.get("APP_NAME");
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void editApp(Map map) throws Exception
	{
		appDao.editApp(map);
		appDao.editAppToMenuRoot(map);
		appDao.editAppToOtherMenus(map);
		appDao.editAppToRoleRoot(map);
		appDao.editAppToOtherRoles(map);
		appDao.editUserCreator(map);
		String describe = DEFALUT_STRING_UPDATE+DEFALUT_PART_APP+" "+(String) map.get("APP_NAME");
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void delApp(Map map) throws Exception
	{
		String ID = (String) map.get("ID");
		List<Map> menus = appDao.getSYS_MENU(ID);
		List<Map> roles = appDao.getSYS_ROLE(ID);
		List<Map> users = appDao.getSYS_USER(ID);
		
		appDao.delApp(ID);
		appDao.delAppToSYS_MENU(ID);
		appDao.delAppToSYS_ROLE(ID);
		appDao.delAppCreatedUser(ID);
		
		int menuSize = menus.size();
		int roleSize = roles.size();
		int userSize = users.size();
		
		if(menuSize>0){
			appDao.delsys_role_menu(menus);
			appDao.delsys_user_menu(menus);
		}
		
		if(roleSize>0){
			appDao.delsys_user_role(roles);
			appDao.delsys_role_menu_roleid(roles);
		}
		
		if(userSize>0){
			appDao.delsys_user_role_userid(users);
			appDao.delsys_user_menu_userid(users);
		}
		
		String describe = DEFALUT_STRING_DELETE+DEFALUT_PART_APP+" "+(String) map.get("TITLE");
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void enableApp(Map map) throws Exception
	{
		String FLAG = (String) map.get("FLAG");
		String describe = null;
		
		appDao.enableApp(map);
		if(FLAG.equals("0")){
			describe = DEFALUT_STRING_ENABLE+DEFALUT_PART_APP+" "+(String) map.get("TITLE");
		}else{
			describe = DEFALUT_STRING_DISABLE+DEFALUT_PART_APP+" "+(String) map.get("TITLE");
		}
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
}