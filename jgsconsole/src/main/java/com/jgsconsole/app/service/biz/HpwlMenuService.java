package com.jgsconsole.app.service.biz;

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

import com.jgsconsole.app.repository.biz.HpwlMenuDao;
import com.jgsconsole.app.service.BaseLogUtil;
import com.jgsconsole.common.util.DateUtils;
import com.jgsconsole.common.util.UUIDGenerator;

@Service(value = "hpwlMenuService")
public class HpwlMenuService extends BaseLogUtil {
	
	@Autowired
	private HpwlMenuDao hpwlMenuDao;

	public List<Map> execSql(Map map){
		return hpwlMenuDao.execSql(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void enableMenu(Map map) throws Exception {
		hpwlMenuDao.enableMenu(map);
	}
	
	public List<Map> getTreelist(Map map){
		List<Map> data = null;
		data = hpwlMenuDao.getTreelistAdmin(map);
		return data;
	}
	
	public List<Map> getTreeDatalist(Map map){
		List<Map> data = null;
		data = hpwlMenuDao.getTreeDatalistAdmin(map);
		return data;
	}
	
	public List<Map> selectForDelMenus(String MENU_ID){
		return hpwlMenuDao.selectForDelMenus(MENU_ID);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void delMenu(String MENU_ID,String PARENT_ID) throws Exception {
		hpwlMenuDao.delMenu(MENU_ID);
		
		List<Map> dealParentState = hpwlMenuDao.selectForDelMenus(PARENT_ID);
		if(dealParentState.size()==1){
			Map map = new HashMap();
			map.put("PARENT_ID", PARENT_ID);
			hpwlMenuDao.delSetParentState(map);
		}
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void addMenu(Map map,Boolean is_not_first_level) throws Exception {
		hpwlMenuDao.addMenu(map);
		if(is_not_first_level){
			hpwlMenuDao.updateSetMenuState(map);
		}
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void editMenu(Map map) throws Exception {
		hpwlMenuDao.editMenu(map);
		String originalParentId = (String)map.get("OriginalParentId");
		String currentParentId = (String)map.get("PARENT_ID");
		List<Map> children = hpwlMenuDao.selectForDelMenus(originalParentId);
		List<Map> curChildren = hpwlMenuDao.selectForDelMenus(currentParentId);
		if(children.size()==1){
			Map sqlmap = new HashMap();
			sqlmap.put("PARENT_ID", originalParentId);
			hpwlMenuDao.delSetParentState(sqlmap);
		}
		Integer curChildrenLength = curChildren.size();
		if(curChildrenLength>1){
			hpwlMenuDao.updateSetMenuState(map);
		}
	}
}
