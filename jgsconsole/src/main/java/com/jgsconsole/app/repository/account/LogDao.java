package com.jgsconsole.app.repository.account;

import com.jgsconsole.app.repository.MyBatisRepository;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;


/**
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * 
 * @author calvin
 */
@MyBatisRepository
public interface LogDao {

	List<Map> listLog(RowBounds rowbounds, Map map);
	
	Integer getCount(Map map);
	
	void insertLog(Map map);
	
	public List<Map> hasAddResult(@Param("rmlist") List<Map> rmlist);
	
}