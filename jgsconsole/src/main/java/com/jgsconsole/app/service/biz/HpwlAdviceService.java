package com.jgsconsole.app.service.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgsconsole.app.repository.biz.HpwlAdvDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "hpwlAdvService")
public class HpwlAdviceService extends BaseLogUtil {
	
	@Autowired
	private HpwlAdvDao hpwlAdvDao;
	
	public List<Map> getAllOrgAdviceData(){
		return hpwlAdvDao.getAllOrgAdviceData();
	}
	
	public JSONObject getOrgAdvice(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			total = hpwlAdvDao.getOrgAdviceCount();
			rows = hpwlAdvDao.getOrgAdvice(rowbounds,new HashMap());
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){e.printStackTrace();}
		
		return json;
	}
}
