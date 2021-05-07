package com.neusoft.app;

import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.entity.account.User;
import com.neusoft.app.service.account.AccountService;

public class TestAccountService {
	private static AccountService accountService;  
	
	private static ApplicationContext context;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		accountService = (AccountService)context.getBean("accountService");
    }
	@Test
    public void testfindUserByLoginName() throws Exception{  
        User user = accountService.findUserByLoginName("admin");
        System.out.println(user.toString());
    }
	@Test
    public void testregisterUser() throws Exception{  
        User user = new User();
        user.setUsername("test1");
        user.setPlainPassword("test1");
        accountService.registerUser(user);
        System.out.println(user.toString());
    }
}
