package com.neusoft.app.repository.doct;

import static org.junit.Assert.fail;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.junit.Test;

import com.neusoft.app.BaseTest;

public class PatientSearchDAOTest extends BaseTest {

	@Test
	public void testGetPatient() {
		PatientSearchDAO demoDao = (PatientSearchDAO) context.getBean("patientSearchDAO");
		Map condition = new HashMap();
		condition.put("cardid", "320402194411250221");
		//condition.put("name", "刘雪珍");
		Map userMap = demoDao.getPatient(condition);
		JSONObject userObj = JSONObject.fromObject(userMap);
		System.out.println(userObj.toString());
	}

}
