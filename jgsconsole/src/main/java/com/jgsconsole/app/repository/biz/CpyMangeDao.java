package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface CpyMangeDao {
	
	public void delInitRegSuccess(Map map);
	
	public void getBkGroupReg(Map map);
	
	public void initRegSuccess(Map map);
	
	public void initRegRefuse(Map map);
	
	public void refuseGroupReg(Map map);
	
	public void passGroupReg(Map map);
	
	public List<Map> getAllRegGroupData();
	
	public int getCpyRegCount();
	
	public List<Map> getCpyRegList(RowBounds rowbounds,Map map);

	public int getUserRegBySearchCount1(Map map);

	public List<Map> getUserRegBySearch1(RowBounds rowbounds, Map map);

	public int getUserRegBySearchCount2(Map map);

	public List<Map> getUserRegBySearch2(RowBounds rowbounds, Map map);
	
	public int getUserRegBySearchCount3(Map map);
	
	public List<Map> getUserRegBySearch3(RowBounds rowbounds, Map map);
	
	public int getUserRegBySearchCount4(Map map);
	
	public List<Map> getUserRegBySearch4(RowBounds rowbounds, Map map);
	
	public List<Map> getGroupHz(Map map);
}
