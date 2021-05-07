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

import com.jgsconsole.app.repository.biz.MemberMangeDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "memberMangeService")
public class MemberMangeService extends BaseLogUtil {
	
	@Autowired
	private MemberMangeDao memberMangeDao;
	
	public JSONObject getMemberRegBySearch(RowBounds rowbounds,Map map,String searchOption) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			String searchval = (String)map.get("searchVal");
			if(StringUtils.isNotBlank(searchval)){
				map.put("SEARCHVAL", "%"+searchval+"%");
				if(searchOption.equals("1")){
					total = memberMangeDao.getUserRegBySearchCount1(map);
					rows = memberMangeDao.getUserRegBySearch1(rowbounds,map);
				}else if(searchOption.equals("2")){
					total = memberMangeDao.getUserRegBySearchCount2(map);
					rows = memberMangeDao.getUserRegBySearch2(rowbounds,map);
				}else if(searchOption.equals("3")){
					total = memberMangeDao.getUserRegBySearchCount3(map);
					rows = memberMangeDao.getUserRegBySearch3(rowbounds,map);
				}else if(searchOption.equals("4")){
					total = memberMangeDao.getUserRegBySearchCount4(map);
					rows = memberMangeDao.getUserRegBySearch4(rowbounds,map);
				}else if(searchOption.equals("5")){
					total = memberMangeDao.getUserRegBySearchCount5(map);
					rows = memberMangeDao.getUserRegBySearch5(rowbounds,map);
				}else{
					total = memberMangeDao.getMemberRegCount();
					rows = memberMangeDao.getMemberRegList(rowbounds,new HashMap());
				}
			}else{
				total = memberMangeDao.getMemberRegCount();
				rows = memberMangeDao.getMemberRegList(rowbounds,new HashMap());
			}
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public List<Map> getAllRegMemberData(){
		return memberMangeDao.getAllRegMemberData();
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkCouncil(Map map){
		memberMangeDao.getBkCouncil(map);
		memberMangeDao.bk_council_record(map);
		memberMangeDao.delInitCouncilSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkAllowCil(Map map){
		memberMangeDao.getBkAllowCil(map);
		memberMangeDao.delAllowCilMsg(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void getBkMebReg(Map map){
		memberMangeDao.getBkMebReg(map);
		memberMangeDao.delInitRegSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void allowApplyLs(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		memberMangeDao.allowApplyCli(map);
		memberMangeDao.initApplyCli(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void passMebReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		memberMangeDao.passMebReg(map);
		memberMangeDao.initRegSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void passCouncil(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		memberMangeDao.passCouncil(map);
		memberMangeDao.pass_council_record(map);
		memberMangeDao.initCouncilSuccess(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void refuseCouncil(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		memberMangeDao.refuseCouncil(map);
		memberMangeDao.refuse_council_record(map);
		memberMangeDao.initCouncilRefuse(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void refuseMebReg(Map map){
		map.put("MSGID", UUID.randomUUID().toString());
		memberMangeDao.refuseMebReg(map);
		memberMangeDao.initRegRefuse(map);
	}

	public JSONObject getMemberReg(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			total = memberMangeDao.getMemberRegCount();
			rows = memberMangeDao.getMemberRegList(rowbounds,new HashMap());
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public List<Map> getLiShiList(String userid){
		return memberMangeDao.getLiShiList(userid);
	}
	
	public List<Map> getMbrHz(Map map){
		return memberMangeDao.getMbrHz(map);
	}
	
	public List<Map> getCilHz(Map map){
		return memberMangeDao.getCilHz(map);
	}
	
}
