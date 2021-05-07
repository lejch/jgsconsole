package com.jgsconsole.app.service.biz;

import java.util.ArrayList;
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
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import com.jgsconsole.app.repository.biz.GroupMangeDao;
import com.jgsconsole.app.repository.biz.UserRegDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "userRegService")
public class UserRegService extends BaseLogUtil {
	
	@Autowired
	private UserRegDao userRegDao;
	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	public static final int SALT_SIZE = 8;
	
	public List<Map> getAllRegGroupData(){
		return userRegDao.getAllRegGroupData();
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkPhone(Map map){
		userRegDao.getBkPhone(map);
		userRegDao.initUnbindLog(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void enableZh(Map map){
		userRegDao.enableZh(map);
		userRegDao.initUnbindLog(map);
	}

	private void entryptPassword(Map map,String pwd) {
		if(pwd!= null && !pwd.equals(""))
		{
			byte[] salt = Digests.generateSalt(SALT_SIZE);
			map.put("salt", Encodes.encodeHex(salt));
			byte[] hashPassword = Digests.sha1(pwd.getBytes(), salt, HASH_INTERATIONS);
			map.put("surePassword",Encodes.encodeHex(hashPassword));
		}
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void changePassword(Map map,String surePassword) throws Exception
	{
		entryptPassword(map, surePassword);
		userRegDao.changePassword(map);
		userRegDao.initUnbindLog(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void disZh(Map map) throws Exception
	{
		userRegDao.disZh(map);
		userRegDao.initUnbindLog(map);
	}
	
	public List<Map> getUserOperationed(String target_id){
		return userRegDao.getUserOperationed(target_id);
	}
	
	public List<Map> getMsgForWork(JSONArray json){
		List<Map> data = new ArrayList();
		for(int i=0;i<json.size();i++){
			JSONObject jsobj = json.getJSONObject(i);
			String name = jsobj.getString("need_msgtable");
			String id = jsobj.getString("id");
			String app_id = jsobj.getString("app_id");
			Map map = new HashMap();
			map.put("APP_ID", app_id);
			map.put("ID", id);
			if(name.toLowerCase().equals("org_membereg")){
				map.put("name", "个人会员申请");
				data.addAll(userRegDao.getGrhysq(map));
				map.put("name", "理事会员申请");
				data.addAll(userRegDao.getLshysq(map));
			}
			if(name.toLowerCase().equals("org_groupreg")){
				map.put("name", "团体会员申请");
				data.addAll(userRegDao.getTthysq(map));
			}
			if(name.toLowerCase().equals("org_company")){
				map.put("name", "企业会员申请");
				data.addAll(userRegDao.getQyhysq(map));
			}
		}
		return JSONArray.fromObject(data);
	}
	
	public JSONObject getUserReg(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			total = userRegDao.getUserRegCount();
			rows = userRegDao.getUserRegList(rowbounds,new HashMap());
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public JSONObject getUserRegBySearch(RowBounds rowbounds,Map map,String searchOption) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			String searchval = (String)map.get("searchVal");
			if(StringUtils.isNotBlank(searchval)){
				map.put("SEARCHVAL", "%"+searchval+"%");
				if(searchOption.equals("1")){
					total = userRegDao.getUserRegBySearchCount1(map);
					rows = userRegDao.getUserRegBySearch1(rowbounds,map);
				}else if(searchOption.equals("2")){
					total = userRegDao.getUserRegBySearchCount2(map);
					rows = userRegDao.getUserRegBySearch2(rowbounds,map);
				}else if(searchOption.equals("3")){
					total = userRegDao.getUserRegBySearchCount3(map);
					rows = userRegDao.getUserRegBySearch3(rowbounds,map);
				}else{
					total = userRegDao.getUserRegCount();
					rows = userRegDao.getUserRegList(rowbounds,new HashMap());
				}
			}else{
				total = userRegDao.getUserRegCount();
				rows = userRegDao.getUserRegList(rowbounds,new HashMap());
			}
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
}
