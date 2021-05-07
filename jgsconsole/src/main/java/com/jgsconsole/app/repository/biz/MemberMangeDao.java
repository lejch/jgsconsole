package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface MemberMangeDao {
	public void delInitRegSuccess(Map map);
	
	public void delInitCouncilSuccess(Map map);
	
	public void getBkMebReg(Map map);
	
	public void allowApplyCli(Map map);
	
	public void initApplyCli(Map map);
	
	public void getBkCouncil(Map map);
	
	public void getBkAllowCil(Map map);
	
	public void delAllowCilMsg(Map map);
	
	public void bk_council_record(Map map);
	
	public void refuse_council_record(Map map);
	
	public void initRegSuccess(Map map);
	
	public void initCouncilSuccess(Map map);
	
	public void initRegRefuse(Map map);
	
	public void initCouncilRefuse(Map map);
	
	public void passMebReg(Map map);
	
	public void passCouncil(Map map);
	
	public void pass_council_record(Map map);
	
	public void refuseMebReg(Map map);
	
	public void refuseCouncil(Map map);
	
	public List<Map> getAllRegMemberData();
	
	public int getMemberRegCount();
	
	public List<Map> getMemberRegList(RowBounds rowbounds,Map map);

	public int getUserRegBySearchCount1(Map map);

	public List<Map> getUserRegBySearch1(RowBounds rowbounds, Map map);

	public int getUserRegBySearchCount2(Map map);

	public List<Map> getUserRegBySearch2(RowBounds rowbounds, Map map);
	
	public int getUserRegBySearchCount3(Map map);
	
	public List<Map> getUserRegBySearch3(RowBounds rowbounds, Map map);
	
	public int getUserRegBySearchCount4(Map map);
	
	public List<Map> getUserRegBySearch4(RowBounds rowbounds, Map map);
	
	public int getUserRegBySearchCount5(Map map);
	
	public List<Map> getUserRegBySearch5(RowBounds rowbounds, Map map);
	
	public List<Map> getLiShiList(String userid);
	
	public List<Map> getMbrHz(Map map);
	
	public List<Map> getCilHz(Map map);
}
