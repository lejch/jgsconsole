package com.neusoft.app;

import org.junit.Before;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BaseTest {
	
	protected static ApplicationContext context;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

}
