package com.neusoft.app;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.service.doct.DoctService;

public class TestDoct {
	private static DoctService doctService;  
	
	private static ApplicationContext context;
	@Before
	public void setUp() throws Exception {
		
		//指定Sping环境配置
		System.setProperty("spring.profiles.active", "development");
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		doctService = (DoctService)context.getBean("doctService");
    }
	@Test
    public void testgetJBXXData() throws Exception{
		Map map = new HashMap();
		//map.put("condition", "where rownum=1");
		List<Map> result = doctService.getGridData(map);
		System.out.println(result.toString());
    }
}
