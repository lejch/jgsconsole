package com.neusoft.app.demo;

import com.neusoft.app.repository.demo.BizDataSourceDao;
import net.sf.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Map;

public class TestBizDataSourceDao {

	private static ApplicationContext context;
	private BizDataSourceDao bizDao;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		bizDao = (BizDataSourceDao)context.getBean("bizDataSourceDao");
    }
	
	@Test
	public void testGetTask1() {
		Map map = bizDao.getTask1();
		JSONObject obj = JSONObject.fromObject(map);
		System.out.println(obj.toString());
	}

}
