package com.neusoft.app;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.service.demo.DemoService;
import com.neusoft.app.service.document.DocumentDataService;

public class TestDemo {
	private static DemoService demoService;  
	private static DocumentDataService documentDataService;
	private static ApplicationContext context;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		demoService = (DemoService)context.getBean("demoService");
		documentDataService = (DocumentDataService)context.getBean("documentDataService");
    }
	@Test
    public void testfindUserByLoginName() throws Exception{
		JSONObject json=documentDataService.getDefaultInitJsonBySql("SELECT BAH FROM CYXJ WHERE BZFXDM");
		System.out.println("json:"+json);
    }
}
