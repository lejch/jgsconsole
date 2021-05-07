package com.neusoft.app;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.service.doct.DoctService;
import com.neusoft.app.service.doct.PatientSearchService;

public class TestPatientSearch extends BaseTest {
	private static PatientSearchService psService;  
	
	@Test
    public void testgetPatient() throws Exception{
		psService = (PatientSearchService)context.getBean("patientSearchService");
		Map map = new HashMap();
		map.put("name", "孙文娟");
		System.out.println(psService.getPatient(map));
    }
}
