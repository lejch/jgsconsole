package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.repository.BizRepository;
import com.jgsconsole.app.repository.MyBatisRepository;

@BizRepository
public interface HpwlMenuDao {
	
	public Integer addMenu(Map map);
	
	public Integer editMenu(Map map);
	
	public Integer delMenu(String MENU_ID);
	
	public List<Map> selectForDelMenus(String MENU_ID);
	
	public List<Map> getTreelistAdmin(Map map);
	
	public List<Map> getTreeDatalistAdmin(Map map);
	
	public List<Map> execSql(Map map);

	public void enableMenu(Map map);
	
	public void updateSetMenuState(Map map);
	
	public void delSetParentState(Map map);
	
}
