package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface HpwlNewsDao {
	
	public void addOrgNews(Map map);
	
	public void delOrgNews(Map map);
	
	public void delHploop(Map map);
	
	public void publish_newses(String ID);
	
	public void back_publishedNews(String ID);
	
	public void setShowInHomepage(Map map);
	
	public void setHpLoop(Map map);
	
	public void editOrgNews(Map map);
	
	public int getAllTypeNewsCount(Map map);
	
	public List<Map> getAllTypeNews(RowBounds rowbounds,Map map);
	
	public List<Map> getInfoList();
}
