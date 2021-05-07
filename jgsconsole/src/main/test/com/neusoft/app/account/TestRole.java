package com.neusoft.app.account;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.common.util.UUIDGenerator;
import com.neusoft.app.entity.account.Role;
import com.neusoft.app.service.account.AccountService;

public class TestRole
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
	* @Title: testListRole 
	* @Description: 分页展示角色
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	/*@Test
	public void testListRole()
	{
		Map map = new HashMap();
		map.put("pageSize", 3);
		map.put("pageNum", 1);
		List<Role> role = as.listRoles(map);
		
		System.out.println(role.size());
		
		for(Role r: role)
		{
			System.out.println(r);
		}
	}*/
	
	/**
	 * @throws SQLException 
	 * 
	* @Title: testSaveRole 
	* @Description: 测试保存
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	/*@Test
	public void testSaveRole()
	{
		List<Map> list = new ArrayList<Map>();
		Map map = new HashMap();
		map.put("ROLE_ID", UUIDGenerator.getUUID());
		map.put("ROLE_NAME", "name");
		map.put("ROLE_DESCRIPTION", UUIDGenerator.getUUID());
		map.put("CREATE_TIME", "123123");
		map.put("UPDATE_TIME", "12312");
		
		list.add(map);
		
		as.saveRole(list);
		
	}*/
	
	
	/*@Test
	public void testUpdateRole() throws SQLException
	{
		Map map = new HashMap();
		map.put("ROLE_ID", "8ee52592-7fae-49f3-bcf5-9596977accd5");
		map.put("ROLE_NAME", "name");
		map.put("ROLE_DESCRIPTION", UUIDGenerator.getUUID());
		map.put("UPDATE_TIME", "12312");
		
		as.updateRole(map);
	}*/
}
