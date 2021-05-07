package com.jgsconsole.app.service.account;

import com.jgsconsole.app.repository.account.AppDao;
import com.jgsconsole.app.repository.account.LogDao;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service(value = "logService")
public class LogService {
	private static Logger logger = LoggerFactory.getLogger(LogService.class);
	@Autowired
	private LogDao logDao;

	@Transactional
	public List<Map> listLog(RowBounds rowbounds,Map map)
	{
		return logDao.listLog(rowbounds, map);
	}
	
	public Integer getCount(Map map)
	{
		return logDao.getCount(map);
	}
	
	public List<Map> hasAddResult(List<Map> list) {
		return logDao.hasAddResult(list);
	}
}