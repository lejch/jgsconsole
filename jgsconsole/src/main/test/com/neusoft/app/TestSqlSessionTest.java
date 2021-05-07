package com.neusoft.app;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.repository.demo.TestSqlSession;

public class TestSqlSessionTest {

	private static TestSqlSession testSqlSession;  
	
	private static ApplicationContext context;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		testSqlSession = (TestSqlSession)context.getBean("testSqlSession");
    }
	@Test
	public void testQuery() {
		testSqlSession.query();
	}

}
