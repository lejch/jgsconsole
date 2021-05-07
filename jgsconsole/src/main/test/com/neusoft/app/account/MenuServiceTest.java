package com.neusoft.app.account;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.Test;

import com.neusoft.app.BaseTest;
import com.neusoft.app.repository.account.MenuDao;
import com.neusoft.app.service.account.MenuService;

public class MenuServiceTest extends BaseTest {

	//@Test
	public void testGetLeftTreeData() {
		MenuService menuService = (MenuService) context.getBean("menuService");
		JSONArray arr = menuService.getLeftTreeData();
		System.out.println("testGetLeftTreeData");
		System.out.println(arr.toString());
	}
	
	@Test
	public void testGetTreeData() {
		MenuDao menuDao = (MenuDao) context.getBean("menuDao");
		List list = menuDao.getTreeData();
		System.out.println(list.size());
		JSONArray userObj = JSONArray.fromObject(list);
		System.out.println("testGetTreeData");
		System.out.println(userObj.toString());
	}

}
