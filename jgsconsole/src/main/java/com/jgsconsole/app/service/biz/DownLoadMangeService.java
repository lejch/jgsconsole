package com.jgsconsole.app.service.biz;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jgsconsole.app.repository.biz.DownLoadMangeDao;
import com.jgsconsole.app.service.BaseLogUtil;

@Service(value = "downLoadMangeService")
public class DownLoadMangeService extends BaseLogUtil {
	
	@Autowired
	private DownLoadMangeDao downLoadMangeDao;

	public void insertUploadFile(Map map){
		downLoadMangeDao.insertUploadFile(map);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public void delUpFile(Map map,String filePath,Boolean hasPdf2del,String pdfFilePath){
		try{
			downLoadMangeDao.delUpFile(map);
			delete(filePath);
			if(hasPdf2del){
				delete(pdfFilePath);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public JSONObject getDownloadList(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			total = downLoadMangeDao.getDownloadListCount();
			rows = downLoadMangeDao.getDownloadList(rowbounds, new HashMap());

			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}

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
}
