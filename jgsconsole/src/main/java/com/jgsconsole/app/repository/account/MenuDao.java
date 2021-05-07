package com.jgsconsole.app.repository.account;

import java.util.List;
import java.util.Map;

import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.repository.MyBatisRepository;

@MyBatisRepository
public interface MenuDao {
	
	public Integer addMenu(Map map);
	
	public Integer editMenu(Map map);
	
	public Integer delMenu(String MENU_ID);
	
	public Integer delSpecialPermissionMenu(String MENU_ID);
	
	public List<Map> selectForDelMenus(String MENU_ID);
	
	public List<Map> getTreelistAdmin(Map map);
	
	public List<Map> getTreeDatalistAdmin(Map map);
	
	public List<Map> execSql(Map map);

	public void enableMenu(Map map);
	
	public void delMenuRoleHas(Map map);
	
	public void insertMenu(Menu menu);
	
	public void updateMenu(Menu menu);
	
	public void updateSetMenuState(Map map);
	
	public void updateAppId(Map map);
	
	public void delSetParentState(Map map);
	
}
