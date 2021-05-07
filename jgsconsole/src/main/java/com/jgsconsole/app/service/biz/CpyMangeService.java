package com.jgsconsole.app.service.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jgsconsole.app.repository.biz.CpyMangeDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "cpyMangeService")
public class CpyMangeService extends BaseLogUtil {
	
	@Autowired
	private CpyMangeDao cpyMangeDao;
	
	public JSONObject getCpyRegBySearch(RowBounds rowbounds,Map map,String searchOption) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			String searchval = (String)map.get("searchVal");
			if(StringUtils.isNotBlank(searchval)){
				map.put("SEARCHVAL", "%"+searchval+"%");
				if(searchOption.equals("1")){
					total = cpyMangeDao.getUserRegBySearchCount1(map);
					rows = cpyMangeDao.getUserRegBySearch1(rowbounds,map);
				}else if(searchOption.equals("2")){
					total = cpyMangeDao.getUserRegBySearchCount2(map);
					rows = cpyMangeDao.getUserRegBySearch2(rowbounds,map);
				}else if(searchOption.equals("3")){
					total = cpyMangeDao.getUserRegBySearchCount3(map);
					rows = cpyMangeDao.getUserRegBySearch3(rowbounds,map);
				}else if(searchOption.equals("4")){
					total = cpyMangeDao.getUserRegBySearchCount4(map);
					rows = cpyMangeDao.getUserRegBySearch4(rowbounds,map);
				}else{
					total = cpyMangeDao.getCpyRegCount();
					rows = cpyMangeDao.getCpyRegList(rowbounds,new HashMap());
				}
			}else{
				total = cpyMangeDao.getCpyRegCount();
				rows = cpyMangeDao.getCpyRegList(rowbounds,new HashMap());
			}
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void passGroupReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		cpyMangeDao.passGroupReg(map);
		cpyMangeDao.initRegSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void refuseGroupReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		cpyMangeDao.refuseGroupReg(map);
		cpyMangeDao.initRegRefuse(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkGroupReg(Map map){
		cpyMangeDao.getBkGroupReg(map);
		cpyMangeDao.delInitRegSuccess(map);
	}
	
	public List<Map> getAllRegGroupData(){
		return cpyMangeDao.getAllRegGroupData();
	}

	public JSONObject getCpyReg(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			total = cpyMangeDao.getCpyRegCount();
			rows = cpyMangeDao.getCpyRegList(rowbounds,new HashMap());
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public List<Map> getGroupHz(Map map){
		return cpyMangeDao.getGroupHz(map);
	}
	
}
