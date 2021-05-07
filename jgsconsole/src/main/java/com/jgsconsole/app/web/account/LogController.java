package com.jgsconsole.app.web.account;

import com.jgsconsole.app.service.account.LogService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/LogController")
public class LogController {

	@Autowired
	protected LogService logService;
	
	/**
	 * @throws java.io.IOException
	 *
	* @param @param model
	* @param @param request
	* @return String    返回类型
	* @throws
	 */
	@RequestMapping(value = "listDetailLog")
	@ResponseBody
	public Object listDetailLog(ServletRequest request,ServletResponse response) throws Exception {
		try
		{
			String detail = request.getParameter("detail");
			
			JSONArray detailList = JSONArray.fromObject(detail);
			JSONObject cancelInfo = detailList.getJSONObject(0);
			JSONObject addInfo = detailList.getJSONObject(1);
			String addString = addInfo.getString("addResult");
			String cancelString = cancelInfo.getString("cancelResult");
			
			List<Map> rmlist = new ArrayList();
			if(addString.length()>0){
				String[] addResult = addString.split(",");
				for(int i=0;i<addResult.length;i++){
					Map map = new HashMap();
					map.put("RESULT", addResult[i]);
					map.put("FLAG", "addResult");
					rmlist.add(map);
				}
			}
			if(cancelString.length()>0){
				String[] cancelResult = cancelString.split(",");
				for(int i=0;i<cancelResult.length;i++){
					Map map = new HashMap();
					map.put("RESULT", cancelResult[i]);
					map.put("FLAG", "cancelResult");
					rmlist.add(map);
				}
			}
			if(rmlist.size()>0) {
				List<Map> data = logService.hasAddResult(rmlist);
				return JSONArray.fromObject(data);
			}else {
				return null;
			}
		} catch (Exception e)
		{
			return null;
		}
	}
	
	@RequestMapping(value = "listLog")
	@ResponseBody
	public Object listLog(ServletRequest request,ServletResponse response) throws IOException {
		try
		{
			//查询参数
			Map map = new HashMap();
			String pageNum = request.getParameter("page");
			String pageSize = request.getParameter("rows");
			map.put("pageNum", pageNum);
			map.put("pageSize", pageSize);
			
			int limit = Integer.valueOf(pageSize);
			int offset = (Integer.valueOf(pageNum)-1)*limit;
			RowBounds rowbounds = new RowBounds(offset, limit);
			
			List<Map> logList = logService.listLog(rowbounds,map);
			for(int i=0;i<logList.size();i++){
				Map log = logList.get(i);
				if(log.get("OPEATE_DETAIL")!=null){
					String detail = clobToString((Clob)log.get("OPEATE_DETAIL"));
					log.put("OPEATE_DETAIL", detail);
				}else{
					log.put("OPEATE_DETAIL", "");
				}
			}
			
			JSONObject json = new JSONObject();
			json.put("total", logService.getCount(map));
			json.put("rows", JSONArray.fromObject(logList));
			
			return json;
		} catch (Exception e)
		{
			return null;
		}
	}
	
	public static String clobToString(Clob clob){  
        try{  
            Reader inStream = clob.getCharacterStream();  
            char[] c = new char[(int) clob.length()];  
            inStream.read(c);  
            String data = new String(c);  
            inStream.close();  
            return data;  
        }catch(Exception e){  
            e.printStackTrace();  
            return "";  
        }  
    }
}
