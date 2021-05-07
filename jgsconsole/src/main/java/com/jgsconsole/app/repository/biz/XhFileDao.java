package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface XhFileDao {
	public void setXhfileCanDld(Map map);
	
	public void insertUploadFile(Map map);
	
	public void delUpFile(Map map);
	
	public List<Map> getXhFile(RowBounds rowbounds,Map map);
	public int getXhFileCount();
}
