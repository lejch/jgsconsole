package com.jgsconsole.app.web.biz;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.CpyMangeService;

@Controller
@RequestMapping("/cpymg")
public class CpyMangeController {

	@Autowired
	public CpyMangeService cpyMangeService;
	
	@RequestMapping(value = "/getCpyRegBySearch")
	@ResponseBody
	public Object getCpyRegBySearch(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		JSONObject data = null;
		
		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);
		map.put("searchVal", request.getParameter("searchVal"));
		String searchOption = request.getParameter("searchOption");
		
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		data = cpyMangeService.getCpyRegBySearch(rowbounds,map,searchOption);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
	
	@RequestMapping(value = "/getBkGroupReg")
	@ResponseBody
	public Object getBkGroupReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		String MSGID = request.getParameter("MSGID");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("MSGID", MSGID);
		
		cpyMangeService.getBkGroupReg(map);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/passGroupReg")
	@ResponseBody
	public Object passGroupReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		String hynum = request.getParameter("hynum");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("HY_ID", hynum);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("SHUSER", user.getUseralias());
		map.put("SHUSERID", user.getUserId());
		
		cpyMangeService.passGroupReg(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/refuseGroupReg")
	@ResponseBody
	public Object refuseGroupReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		String disreason = request.getParameter("disreason");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("TTSH_ERR_REASON", disreason);
		map.put("USERID", USERID);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("SHUSER", user.getUseralias());
		map.put("SHUSERID", user.getUserId());
		
		cpyMangeService.refuseGroupReg(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/getCpyReg")
	@ResponseBody
	public Object getCpyReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONObject data = null;

		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);

		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);

		data = cpyMangeService.getCpyReg(rowbounds);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/getCpyHz")
	@ResponseBody
	public Object getCpyHz(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String starttime = request.getParameter("starttime");
		String endtime = request.getParameter("endtime");
		Map map = new HashMap();
		map.put("starttime", starttime+" 00:00:00");
		map.put("endtime", endtime+" 23:59:59");
		
		List<Map> data = cpyMangeService.getGroupHz(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}
	
	private static String[] cpyTypeTransList = {"","私营","集体","联营","三资","国有","其他"};
	private static String[] cpyBelongTransList = {"","农林渔牧业","商贸","房地产","制造业","服务","其他行业"};
	
	@RequestMapping(value = "/exportAllGroupReg")
	@ResponseBody
	public Object exportAllGroupReg(HttpServletRequest request,HttpServletResponse response){
		OutputStream servletOS = null;
		try{
	    String[] cellTitle = {"序号","会员号","企业名称(中文)","企业名称(英文)","成立时间","工商注册号","企业性质","企业性质补充","所属行业","所属行业补充","单位地址","邮编","法人姓名","法人职务","法人办公电话","法人手机","联系人姓名","联系人职务","联系人办公电话","联系人手机","联系人电子邮件","业务范围"};
	    
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
	    String data = request.getParameter("data");
	    String starttime = request.getParameter("starttime");
	    String endtime = request.getParameter("endtime");
		String str1=URLDecoder.decode(data, "UTF-8");
		System.out.println(str1);
		
		JSONArray json = JSONArray.fromObject(str1);
		
	    XSSFWorkbook workBook = null;
	    workBook = new XSSFWorkbook();
	    
	    XSSFCellStyle style =  workBook.createCellStyle();	
		style.setAlignment(XSSFCellStyle.ALIGN_CENTER); //文字水平居中
		style.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);//文字垂直居中
	    
	    XSSFSheet sheet = workBook.createSheet();
	    workBook.setSheetName(0,"企业会员汇总表");
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, cellTitle.length-1));
	    XSSFRow tableTitleRow1 = sheet.createRow(0);
	    tableTitleRow1.createCell(0).setCellStyle(style);
	    tableTitleRow1.getCell(0).setCellValue("企业会员汇总表");
	    
	    sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, cellTitle.length-1));
	    XSSFRow tableTitleRow2 = sheet.createRow(1);
	    tableTitleRow2.createCell(0).setCellStyle(style);
	    tableTitleRow2.getCell(0).setCellValue("制表日期："+sdf.format(new Date())+"      汇总日期："+starttime+" - "+endtime);
	    
	    XSSFRow titleRow = sheet.createRow(2);
	    for(int i=0;i<cellTitle.length;i++){
	        titleRow.createCell(i).setCellValue(cellTitle[i]);
	    }
	    for(int i=0;i<json.size();i++){
	    	JSONObject map = json.getJSONObject(i);
	        XSSFRow row = sheet.createRow(i+3);
	        row.createCell(0).setCellValue((i+1));
	        row.createCell(1).setCellValue(map.getString("HY_ID"));
	        row.createCell(2).setCellValue(map.getString("CPY_NAME_CN"));
	        row.createCell(3).setCellValue(map.getString("CPY_NAME_EN"));
	        row.createCell(4).setCellValue(map.getString("CPY_CREATE_TIME"));
	        row.createCell(5).setCellValue(map.getString("CPY_GSZCH"));
	        row.createCell(6).setCellValue(cpyTypeTransList[Integer.parseInt(map.getString("CPY_TYPE"))]);
	        row.createCell(7).setCellValue(map.getString("CPY_TYPE_OTHER"));
	        row.createCell(8).setCellValue(cpyBelongTransList[Integer.parseInt(map.getString("CPY_BELONG"))]);
	        row.createCell(9).setCellValue(map.getString("CPY_BELONG_OTHER"));
	        row.createCell(10).setCellValue(map.getString("CPY_ADDR"));
	        row.createCell(11).setCellValue(map.getString("CPY_UB"));
	        row.createCell(12).setCellValue(map.getString("FR_NAME"));
    		row.createCell(13).setCellValue(map.getString("FR_ZW"));
			row.createCell(14).setCellValue(map.getString("FR_BGDH"));
			row.createCell(15).setCellValue(map.getString("FR_PHONE"));
			row.createCell(16).setCellValue(map.getString("LXR_NAME"));
			row.createCell(17).setCellValue(map.getString("LXR_ZW"));
			row.createCell(18).setCellValue(map.getString("LXR_BGDH"));
			row.createCell(19).setCellValue(map.getString("LXR_PHONE"));
			row.createCell(20).setCellValue(map.getString("LXR_EMAIL"));
			row.createCell(21).setCellValue(map.getString("JL"));
	    }
	    
	    //文件输出流
	    String exportFileName = "企业会员汇总表";
	    response.reset();
        response.setContentType("multipart/form-data");   
    	response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(exportFileName+".xlsx", "UTF-8"));
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
	
}