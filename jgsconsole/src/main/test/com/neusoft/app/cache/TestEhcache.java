package com.neusoft.app.cache;

import java.sql.SQLException;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.entity.account.Menu;
import com.neusoft.app.entity.account.User;
import com.neusoft.app.service.account.AccountService;


public class TestEhcache
{	
	
	private static ApplicationContext context;
	private static AccountService as;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		 System.setProperty("spring.profiles.active", "development");
		 context = new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml"});
		 as =  (AccountService) context.getBean("accountService");
	}
	
	/**
	 * 
	* @Title: testEhcache 
	* @Description: TODO
	* @param     设定文件 
	* @return void    返回类型 
	 * @throws SQLException 
	* @throws
	* 测试结果：凡是第一次查询过的数据，再次查询将先从cache中查找
	 */
	/*@Test
	public void testEhcache()
	{
		Map map = new HashMap();
		map.put("pageSize", 3);
		map.put("pageNum", 1);
		List<Menu> menu=  as.findMeun(map);
		System.out.println("------采用ehcache缓存后-----");
		as.findMeun(map);
		System.out.println("------修改传参后-----");
		map.put("pageNum", 2);
		as.findMeun(map);
		System.out.println("------修改传参再次采用ehcache-----");
		map.put("pageNum", 1);
		as.findMeun(map);
		map.put("pageNum", 2);
		as.findMeun(map);
	}*/
	
	/*@Test
	public void testEhcache() throws SQLException
	{
		Map map = new HashMap();
		String pageNum = "1";
		String pageSize = "3";
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum)-1)*limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		map.put("pageSize", pageSize);
		map.put("pageNum", pageNum);
		as.listRole(rowbounds, map);
		System.out.println("------采用ehcache缓存后-----");
		as.listRole(rowbounds, map);
		
		System.out.println("------修改数据-----");
		Map roleMap = new HashMap();
		roleMap.put("ROLE_ID", "1");
		roleMap.put("ROLE_DESCRIPTION", "1");
		roleMap.put("ROLE_NAME", "业务角色");
		roleMap.put("UPDATE_TIME", "20130308182740453");
		as.updateRole(roleMap);
		System.out.println("------修改数据库数据-----");
		as.listRole(rowbounds, map);
		
	}*/
}
