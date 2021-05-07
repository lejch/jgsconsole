package com.jgsconsole.app.web.biz;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.HpwlNewsService;
import com.jgsconsole.app.service.biz.MemberMangeService;
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.UUIDGenerator;

@Controller
@RequestMapping("/membermg")
public class MemberMangeController {

	@Autowired
	public MemberMangeService memberMangeService;
	
	@RequestMapping(value = "/getMemberRegBySearch")
	@ResponseBody
	public Object getMemberRegBySearch(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
		
		data = memberMangeService.getMemberRegBySearch(rowbounds,map,searchOption);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
	
	@RequestMapping(value = "/getBkMebReg")
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
		
		memberMangeService.getBkMebReg(map);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/allowApplyLs")
	@ResponseBody
	public Object allowApplyLs(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("ALLOWCLI_USER", user.getUseralias());
		map.put("ALLOWCLI_USERID", user.getUserId());
		map.put("MSGID", UUID.randomUUID().toString());
		
		memberMangeService.allowApplyLs(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/getBkCouncil")
	@ResponseBody
	public Object getBkCouncil(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		String MSGID = request.getParameter("MSGID");
		String clid = request.getParameter("clid");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("MSGID", MSGID);
		map.put("clid", clid);
		
		memberMangeService.getBkCouncil(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/getBkAllowCil")
	@ResponseBody
	public Object getBkAllowCil(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String USERID = request.getParameter("USERID");
		String MSGID = request.getParameter("MSGID");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("MSGID", MSGID);
		
		memberMangeService.getBkAllowCil(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/passMebReg")
	@ResponseBody
	public Object passMebReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
		
		memberMangeService.passMebReg(map);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/refuseMebReg")
	@ResponseBody
	public Object refuseMebReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String disreason = request.getParameter("disreason");
		String USERID = request.getParameter("USERID");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("disreason", disreason);
		map.put("USERID", USERID);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("SHUSER", user.getUseralias());
		map.put("SHUSERID", user.getUserId());
		
		memberMangeService.refuseMebReg(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/passCouncil")
	@ResponseBody
	public Object passCouncil(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String clid = request.getParameter("clid");
		String USERID = request.getParameter("USERID");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("clid", clid);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("CIL_USER", user.getUseralias());
		map.put("CLIUSERID", user.getUserId());
		
		memberMangeService.passCouncil(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/refuseCouncil")
	@ResponseBody
	public Object refuseCouncil(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("ID");
		String clid = request.getParameter("clid");
		String USERID = request.getParameter("USERID");
		String disreason = request.getParameter("disreason");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("USERID", USERID);
		map.put("clid", clid);
		map.put("disreason", disreason);
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("CIL_USER", user.getUseralias());
		map.put("CLIUSERID", user.getUserId());
		
		memberMangeService.refuseCouncil(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/getMemberReg")
	@ResponseBody
	public Object getMemberReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
		
		data = memberMangeService.getMemberReg(rowbounds);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
	
	@RequestMapping(value = "/getLiShiList")
	@ResponseBody
	public Object getLiShiList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String userid = request.getParameter("userid");
		
		List<Map> data = memberMangeService.getLiShiList(userid);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}
	
	@RequestMapping(value = "/getCilHz")
	@ResponseBody
	public Object getCilHz(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String starttime = request.getParameter("starttime");
		String endtime = request.getParameter("endtime");
		Map map = new HashMap();
		map.put("starttime", starttime+" 00:00:00");
		map.put("endtime", endtime+" 23:59:59");
		
		List<Map> data = memberMangeService.getCilHz(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}
	@RequestMapping(value = "/getMbrHz")
	@ResponseBody
	public Object getMbrHz(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String starttime = request.getParameter("starttime");
		String endtime = request.getParameter("endtime");
		Map map = new HashMap();
		map.put("starttime", starttime+" 00:00:00");
		map.put("endtime", endtime+" 23:59:59");
		
		List<Map> data = memberMangeService.getMbrHz(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}
	
	@RequestMapping(value = "/exportAllMemberReg")
	@ResponseBody
	public Object exportAllMemberReg(HttpServletRequest request,HttpServletResponse response){
		OutputStream servletOS = null;
		try{
	    String[] cellTitle = {"序号","会员号","姓名","出生年月","性别","专业","工作单位","单位职务、职称","地址","邮编","联系电话","手机","电子邮件"};
	    
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
	    workBook.setSheetName(0,"个人会员汇总表");
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, cellTitle.length-1));
	    XSSFRow tableTitleRow1 = sheet.createRow(0);
	    tableTitleRow1.createCell(0).setCellStyle(style);
	    tableTitleRow1.getCell(0).setCellValue("个人会员汇总表");
	    
	    
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
	        row.createCell(2).setCellValue(map.getString("NAME"));
	        row.createCell(3).setCellValue(map.getString("BIRTH"));
	        row.createCell(4).setCellValue(map.getString("SEX"));
	        row.createCell(5).setCellValue(map.getString("SXZY"));
	        row.createCell(6).setCellValue(map.getString("GZDW"));
	        row.createCell(7).setCellValue(map.getString("DWZWZC"));
	        row.createCell(8).setCellValue(map.getString("LXDZ"));
	        row.createCell(9).setCellValue(map.getString("YZBM"));
	        row.createCell(10).setCellValue(map.getString("GZDH"));
	        row.createCell(11).setCellValue(map.getString("PHONE"));
	        row.createCell(12).setCellValue(map.getString("EMAIL"));
	    }
	    
	    //文件输出流
	    String exportFileName = "个人会员汇总表";
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
	
	@RequestMapping(value = "/exportAllCilReg")
	@ResponseBody
	public Object exportAllCilReg(HttpServletRequest request,HttpServletResponse response){
		OutputStream servletOS = null;
		try{
			String[] cellTitle = {"序号","会员号","姓名","出生年月","性别","专业","工作单位","单位职务、职称","地址","邮编","联系电话","手机","电子邮件"};
			
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
			workBook.setSheetName(0,"理事会员汇总表");
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, cellTitle.length-1));
			XSSFRow tableTitleRow1 = sheet.createRow(0);
			tableTitleRow1.createCell(0).setCellStyle(style);
			tableTitleRow1.getCell(0).setCellValue("理事会员汇总表");
			
			
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
				row.createCell(2).setCellValue(map.getString("NAME"));
				row.createCell(3).setCellValue(map.getString("BIRTH"));
				row.createCell(4).setCellValue(map.getString("SEX"));
				row.createCell(5).setCellValue(map.getString("SXZY"));
				row.createCell(6).setCellValue(map.getString("GZDW"));
				row.createCell(7).setCellValue(map.getString("DWZWZC"));
				row.createCell(8).setCellValue(map.getString("LXDZ"));
				row.createCell(9).setCellValue(map.getString("YZBM"));
				row.createCell(10).setCellValue(map.getString("GZDH"));
				row.createCell(11).setCellValue(map.getString("PHONE"));
				row.createCell(12).setCellValue(map.getString("EMAIL"));
			}
			
			//文件输出流
			String exportFileName = "理事会员汇总表";
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