package com.neusoft.app.account;

import net.sf.json.JSONObject;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.entity.account.User;
import com.neusoft.app.service.account.AccountService;


public class TestUser
{
	ClassPathXmlApplicationContext context = null;
	AccountService as = null;
	@Before
	public void beforTest()
	{
		System.setProperty("spring.profiles.active", "development");
		 context = new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml"});
		 as =  (AccountService) context.getBean("accountService");
	}
	
	@Test
	public void testFindUserByLoginName()
	{
		User user = as.findUserByLoginName("ehr");
		JSONObject userObj = JSONObject.fromObject(user);
		System.out.println("testFindUserByLoginName");
		System.out.println(userObj.toString());
	}
	
	/**
	 * 
	* @Title: testListUser 
	* @Description: 返回用户信息（分页加参数）
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	/*@Test
	public void testListUser()
	{
		Map map = new HashMap();
		map.put("pageSize", 3);
		map.put("pageNum", 2);
		map.put("username", "d");
		List<User> user = as.findUserByParam(map);
		
		System.out.println(user.size());
		
		for(User u: user)
		{
			System.out.println(u);
		}
		
	}*/
	
	/**
	 * 
	* @Title: testDelUser 
	* @Description: 测试参数用户（userId）
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	/*@Test
	public void testDelUser()
	{
		context.delete("4");
		
	}*/
	
	/*@Test
	public void testfindAllUser()
	{
		as.findAllUser();
	}*/
	
	/*
	@Test
	public void testfindAllUser()
	{
		Map map = new HashMap();
		map.put("pageNum", 1);
		map.put("pageSize", 3);
		map.put("USERNAME", "admin");
		map.put("USERALIAS", "admin");
		List<User> map2 = as.findUserByParam(map);
		for(User u:map2)
		{
			System.out.println(u);
		}
	}*/
	
	/*@Test
	public void testfindAllUser()
	{
		User user= as.findUserByLoginName("admin");
		System.out.println(user);
	}*/
}
