package com.jgsconsole.app.repository.excel;

import java.util.List;
import java.util.Map;

import com.jgsconsole.app.repository.MyBatisRepository;

@MyBatisRepository
public interface ImportDao {
	
	public List getImportRule(String type);
	
	public List getImportRuleDetail(String ruleID);
	
	public void insertLog(Map map);
	
	public void batchInsertUserData(List<Map<String, String>> list);
	
	public List getRoleInfo();

}
