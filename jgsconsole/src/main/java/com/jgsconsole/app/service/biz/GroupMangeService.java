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

import com.jgsconsole.app.repository.biz.GroupMangeDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "groupMangeService")
public class GroupMangeService extends BaseLogUtil {
	
	@Autowired
	private GroupMangeDao groupMangeDao;
	
	public JSONObject getGroupRegBySearch(RowBounds rowbounds,Map map,String searchOption) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			String searchval = (String)map.get("searchVal");
			if(StringUtils.isNotBlank(searchval)){
				map.put("SEARCHVAL", "%"+searchval+"%");
				if(searchOption.equals("1")){
					total = groupMangeDao.getUserRegBySearchCount1(map);
					rows = groupMangeDao.getUserRegBySearch1(rowbounds,map);
				}else if(searchOption.equals("2")){
					total = groupMangeDao.getUserRegBySearchCount2(map);
					rows = groupMangeDao.getUserRegBySearch2(rowbounds,map);
				}else if(searchOption.equals("3")){
					total = groupMangeDao.getUserRegBySearchCount3(map);
					rows = groupMangeDao.getUserRegBySearch3(rowbounds,map);
				}else{
					total = groupMangeDao.getGroupRegCount();
					rows = groupMangeDao.getGroupRegList(rowbounds,new HashMap());
				}
			}else{
				total = groupMangeDao.getGroupRegCount();
				rows = groupMangeDao.getGroupRegList(rowbounds,new HashMap());
			}
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void passGroupReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		groupMangeDao.passGroupReg(map);
		groupMangeDao.initRegSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void refuseGroupReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		groupMangeDao.refuseGroupReg(map);
		groupMangeDao.initRegRefuse(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkGroupReg(Map map){
		groupMangeDao.getBkGroupReg(map);
		groupMangeDao.delInitRegSuccess(map);
	}
	
	public List<Map> getAllRegGroupData(){
		return groupMangeDao.getAllRegGroupData();
	}

	public JSONObject getGroupReg(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			total = groupMangeDao.getGroupRegCount();
			rows = groupMangeDao.getGroupRegList(rowbounds,new HashMap());
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public List<Map> getGroupHz(Map map){
		return groupMangeDao.getGroupHz(map);
	}
	
}
