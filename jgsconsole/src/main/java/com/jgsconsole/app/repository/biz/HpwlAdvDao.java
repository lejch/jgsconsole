package com.jgsconsole.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.repository.BizRepository;

@BizRepository
public interface HpwlAdvDao {
	
	
	public int getOrgAdviceCount();
	
	public List<Map> getOrgAdvice(RowBounds rowbounds,Map map);
	
	public List<Map> getAllOrgAdviceData();
}
