package com.neusoft.app.demo;

import java.util.Map;

import net.sf.json.JSONObject;

import org.junit.Test;

import com.neusoft.app.BaseTest;
import com.neusoft.app.entity.account.User;
import com.neusoft.app.repository.demo.DemoDao;

public class TestDemoService extends BaseTest {
	

	@Test
	public void testGetUserMap() {
		DemoDao demoDao = (DemoDao) context.getBean("demoDao");
		Map userMap = demoDao.getUserMap("3de379e1-d425-4b0e-9452-0fc9659c65d0");
		JSONObject userObj = JSONObject.fromObject(userMap);
		System.out.println("testGetUserMap");
		System.out.println(userObj.toString());
	}
	
	@Test
	public void testGetUser() {
		DemoDao demoDao = (DemoDao) context.getBean("demoDao");
		User user = demoDao.getUser("3de379e1-d425-4b0e-9452-0fc9659c65d0");
		JSONObject userObj = JSONObject.fromObject(user);
		System.out.println("testGetUser");
		System.out.println(userObj.toString());
	}

}
