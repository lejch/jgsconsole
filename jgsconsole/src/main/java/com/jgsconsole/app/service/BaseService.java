package com.jgsconsole.app.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.common.util.Page;

public abstract class BaseService {
	
	public abstract List<Map> doGridData(RowBounds rowbounds,Map<String, Object> condition);
	
	public String getGridData(Page page,Map<String, Object> condition){
		
		int limit = Integer.valueOf(page.getPageSize());			//每页显示的记录数
		int offset = (Integer.valueOf(page.getPageNum())-1)*limit; //起始记录数
		RowBounds rowbounds = new RowBounds(offset, limit);
		//返回数据
		JSONObject json = new JSONObject();
		json.put(page.getDatakey(), JSONArray.fromObject(doGridData(rowbounds,condition)));
		json.put(page.getCountkey(), condition.get("_dataCount"));

		return json.toString();
	}

}
