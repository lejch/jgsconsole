package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface UserRegDao {
	
	public List<Map> getMsgForWork(String sql);
	
	public List<Map> getAllRegGroupData();
	
	public int getUserRegCount();
	
	public List<Map> getUserRegList(RowBounds rowbounds,Map map);
	
	public int getUserRegBySearchCount1(Map map);
	public List<Map> getUserRegBySearch1(RowBounds rowbounds,Map map);
	public int getUserRegBySearchCount2(Map map);
	public List<Map> getUserRegBySearch2(RowBounds rowbounds,Map map);
	public int getUserRegBySearchCount3(Map map);
	public List<Map> getUserRegBySearch3(RowBounds rowbounds,Map map);
	
	public void getBkPhone(Map map);
	
	public void initUnbindLog(Map map);
	
	public void disZh(Map map);
	public void enableZh(Map map);
	
	public List<Map> getUserOperationed(String target_id);
	
	public void changePassword(Map map);
	
	public List<Map> getGrhysq(Map map);
	public List<Map> getLshysq(Map map);
	public List<Map> getTthysq(Map map);
	public List<Map> getQyhysq(Map map);
}
