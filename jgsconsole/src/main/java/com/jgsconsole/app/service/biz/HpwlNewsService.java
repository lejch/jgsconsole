package com.jgsconsole.app.service.biz;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jgsconsole.app.repository.biz.HpwlNewsDao;
import com.jgsconsole.app.service.BaseLogUtil;
import com.jgsconsole.common.util.DateUtils;
import com.jgsconsole.common.util.UUIDGenerator;

@Service(value = "hpwlNewsService")
public class HpwlNewsService extends BaseLogUtil {
	
	@Autowired
	private HpwlNewsDao hpwlNewsDao;

	public void addOrgNews(Map map){
		hpwlNewsDao.addOrgNews(map);
	}
	
	public void editOrgNews(Map map){
		hpwlNewsDao.editOrgNews(map);
	}
	
	public void setHpLoop(Map map){hpwlNewsDao.setHpLoop(map);}
	
	public void setShowInHomepage(Map map){hpwlNewsDao.setShowInHomepage(map);}
	
	public void delOrgNews(Map map){hpwlNewsDao.delOrgNews(map);}
	
	public void delHploop(Map map,String filestr){hpwlNewsDao.delHploop(map);delete(filestr);}
	
	public void publish_newses(String ID){hpwlNewsDao.publish_newses(ID);}
	
	public void back_publishedNews(String ID){hpwlNewsDao.back_publishedNews(ID);}
	
	public JSONObject getAllTypeNews(RowBounds rowbounds,String type) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;
		
		try{
			json = new JSONObject();
			
			Map map = new HashMap();
			map.put("TYPE", type);
			total = hpwlNewsDao.getAllTypeNewsCount(map);
			rows = hpwlNewsDao.getAllTypeNews(rowbounds,map);
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		}catch(Exception e){}
		
		return json;
	}
	
	public boolean delete(String fileName) {
		File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
            return false;
        }
    }
	
	public List<Map> getInfoList(){
		return hpwlNewsDao.getInfoList();
	}
}
