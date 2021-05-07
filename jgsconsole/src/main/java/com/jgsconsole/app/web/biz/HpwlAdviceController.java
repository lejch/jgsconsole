package com.jgsconsole.app.web.biz;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.HpwlAdviceService;
import com.jgsconsole.app.service.biz.HpwlNewsService;
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.PropertiesUtil;
import com.jgsconsole.common.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/HpwlAdv")
public class HpwlAdviceController {
	
	@Autowired
	public HpwlAdviceService hpwlAdviceService;
	
	@RequestMapping(value = "/exportAllOrgAdvice")
	@ResponseBody
	public Object exportAllOrgAdvice(HttpServletRequest request,HttpServletResponse response){
		OutputStream servletOS = null;
		try{
	    String[] cellTitle = {"姓名","E-mail","联系方式","主题","正文","反馈提交时间"};
	    
	    List<Map> dataList = hpwlAdviceService.getAllOrgAdviceData();

	    XSSFWorkbook workBook = null;
	    workBook = new XSSFWorkbook();
	    XSSFSheet sheet = workBook.createSheet();
	    workBook.setSheetName(0,"反馈意见列表");
	    XSSFRow titleRow = sheet.createRow(0);
	    for(int i=0;i<cellTitle.length;i++){
	        titleRow.createCell(i).setCellValue(cellTitle[i]);
	    }
	    for(int i=0;i<dataList.size();i++){
	    	Map map = dataList.get(i);
	        XSSFRow row = sheet.createRow(i+1);
	        row.createCell(0).setCellValue((String)map.get("NAME"));
	        row.createCell(1).setCellValue((String)map.get("EMAIL"));
	        row.createCell(2).setCellValue((String)map.get("LINKWAY"));
	        row.createCell(3).setCellValue((String)map.get("TITLE"));
	        row.createCell(4).setCellValue((String)map.get("CONTENT"));
	        row.createCell(5).setCellValue((String)map.get("CREATETIME"));
	    }
	    
	    //文件输出流
	    String exportFileName = "反馈意见列表";
	    response.reset();
        response.setContentType("multipart/form-data");   
    	response.setHeader("Content-Disposition","attachment;filename="+new String(exportFileName.getBytes("utf-8"),"ISO-8859-1")+".xlsx");
        servletOS = response.getOutputStream();
	    workBook.write(servletOS);
	}catch(Exception e){e.printStackTrace();}
	finally{try {
		servletOS.close();
		servletOS = null;
	} catch (IOException e) {
		e.printStackTrace();
	}}
		return null;
	}
	
    @RequestMapping(value="/getOrgAdvice") 
    @ResponseBody
    public Object getOrgAdvice(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	
    	JSONObject data = null;
    	
    	Map map = new HashMap();
    	String pageNum = request.getParameter("page");
    	String pageSize = request.getParameter("rows");
    	map.put("pageNum", pageNum);
    	map.put("pageSize", pageSize);
    	
    	int limit = Integer.valueOf(pageSize);
    	int offset = (Integer.valueOf(pageNum)-1)*limit;
    	RowBounds rowbounds = new RowBounds(offset, limit);
    	
    	data = hpwlAdviceService.getOrgAdvice(rowbounds);
    	
    	response.setContentType("text/html;charset=utf-8");
    	
    	return data;
    }
    
}