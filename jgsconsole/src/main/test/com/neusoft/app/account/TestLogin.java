package com.neusoft.app.account;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springside.modules.utils.Encodes;

import com.neusoft.app.entity.account.User;
import com.neusoft.app.service.account.AccountService;
import com.neusoft.app.service.document.DocumentDataService;
public class TestLogin
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
	
	/**
	 * 
	* @Title: testListUser 
	* @Description: 返回用户信息（分页加参数）
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void testListUser()
	{
//		Map map = new HashMap();
//		map.put("pageSize", 3);
//		map.put("pageNum", 2);
//		map.put("username", "d");
		//User user = 
			System.out.println(as.findUserByCardid1("310115198101140221"));	
		
//		for(User u: user)
//		{
//			System.out.println(u);
//		}
		
	}
	
	/**
	 * 
	* @Title: testListUser 
	* @Description: 返回用户信息（分页加参数）
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void testss()
	{
//		Map map = new HashMap();
//		map.put("pageSize", 3);
//		map.put("pageNum", 2);
//		map.put("username", "d");
		//User user = 
			System.out.println(as.findUserByCardid("310115198101140221"));	
		
//		for(User u: user)
//		{
//			System.out.println(u);
//		}
		
	}	
	
	@Test
	public void testee(){
		
		byte[] salt ;
		salt= Encodes.decodeHex("29260a79471ca419");
		System.out.println(salt);
	}
	

	

}
