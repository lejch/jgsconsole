package com.jgsconsole.app.web.biz;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.UserRegService;

@Controller
@RequestMapping("/userreg")
public class UserRegController {

	@Autowired
	public UserRegService userRegService;
	
	@RequestMapping(value="/getMsgForWork") 
    @ResponseBody
    public Object getMsgForWork(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	String need_msgtable = request.getParameter("need_msgtable");
    	String str1=URLDecoder.decode(need_msgtable, "UTF-8");
		System.out.println(str1);
    	
    	JSONArray json = JSONArray.fromObject(str1);
    	
    	List<Map> data = userRegService.getMsgForWork(json);
    	
    	response.setContentType("text/html;charset=utf-8");
    	
    	return JSONArray.fromObject(data);
    }
	
	@RequestMapping(value = "/getUserOperationed")
	@ResponseBody
	public Object getUserOperationed(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		String id = request.getParameter("id");

		List<Map> data = userRegService.getUserOperationed(id);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject(data);
	}
	
	@RequestMapping(value = "/getUserRegBySearch")
	@ResponseBody
	public Object getUserRegBySearch(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
		
		data = userRegService.getUserRegBySearch(rowbounds,map,searchOption);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
	
	@RequestMapping(value = "/getUserReg")
	@ResponseBody
	public Object getUserReg(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
		
		data = userRegService.getUserReg(rowbounds);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
	
	@RequestMapping(value="/resetPassword") 
	@ResponseBody
	public Object resetPassword(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String user_id = request.getParameter("user_id");
		String user_name = request.getParameter("user_name");
		String resetPwdInput = request.getParameter("resetPwdInput");
		
		JSONObject json = new JSONObject();
		
		String pwd = "";
		
		Map map = new HashMap();
		String[] resetPwds = resetPwdInput.split("=");
		if(resetPwds.length>1){
			map.put(resetPwds[0], resetPwds[1]);
			pwd = resetPwds[1];
		}else{
			map.put(resetPwds[0], "");
		}
		map.put("user_id", user_id);
		map.put("user_name", user_name);
		
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("OPERATE_ID", UUID.randomUUID().toString());
		map.put("OPERATE", user.getUseralias());
		map.put("USER_ID", user.getUserId());
		map.put("TARGET_ID", user_id);
		map.put("LOG_TYPE", "重置用户密码");
		map.put("DESCRIBE", user.getUseralias()+" 重置了账号："+user_name+" 的密码，重置的密码为："+pwd);
		
		userRegService.changePassword(map,pwd);
			
		json.put("result", "success");
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	@RequestMapping(value="/disZh") 
	@ResponseBody
	public Object disZh(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		
		String user_id = request.getParameter("user_id");
		String user_name = request.getParameter("user_name");
		String disReason = request.getParameter("disReason");
		
		JSONObject json = new JSONObject();
		
		String pwd = "";
		
		Map map = new HashMap();
		map.put("user_id", user_id);
		map.put("user_name", user_name);
		map.put("disReason", disReason);
		
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("OPERATE_ID", UUID.randomUUID().toString());
		map.put("OPERATE", user.getUseralias());
		map.put("USER_ID", user.getUserId());
		map.put("TARGET_ID", user_id);
		map.put("LOG_TYPE", "停用用户账号");
		map.put("DESCRIBE", user.getUseralias()+" 停用了账号："+user_name+"，停用原因："+disReason);
		
		userRegService.disZh(map);
		
		json.put("result", "success");
		response.setContentType("text/html;charset=utf-8");
		
		return json;
	}
	
	@RequestMapping(value = "/getBkPhone")
	@ResponseBody
	public Object getBkPhone(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		
		String ID = request.getParameter("id");
		String USER_NAME = request.getParameter("unm");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("OPERATE_ID", UUID.randomUUID().toString());
		map.put("OPERATE", user.getUseralias());
		map.put("USER_ID", user.getUserId());
		map.put("TARGET_ID", ID);
		map.put("LOG_TYPE", "撤销绑定手机号");
		map.put("DESCRIBE", user.getUseralias()+" 撤销了账号："+USER_NAME+" 绑定的手机号");
		
		userRegService.getBkPhone(map);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/enableZh")
	@ResponseBody
	public Object enableZh(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		
		String ID = request.getParameter("id");
		String USER_NAME = request.getParameter("unm");
		Map map = new HashMap();
		map.put("ID", ID);
		map.put("OPERATE_ID", UUID.randomUUID().toString());
		map.put("OPERATE", user.getUseralias());
		map.put("USER_ID", user.getUserId());
		map.put("TARGET_ID", ID);
		map.put("LOG_TYPE", "启用用户账号");
		map.put("DESCRIBE", user.getUseralias()+" 启用了账号："+USER_NAME);
		
		userRegService.enableZh(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/exportAllGroupReg")
	@ResponseBody
	public Object exportAllGroupReg(HttpServletRequest request,HttpServletResponse response){
		OutputStream servletOS = null;
		try{
	    String[] cellTitle = {"会员号",
	    		"单位名称",
	    		"成立日期",
	    		"注册资本",
	    		"职工人数",
	    		"详细地址",
	    		"会员数量",
	    		"单位网址",
	    		"传真",
	    		"分支机构数量",
	    		"邮编",
	    		"法人姓名",
	    		"电话",
	    		"性别",
	    		"手机",
	    		"职务/职称",
	    		"E-mail",
	    		"联系人",
	    		"联系人电话",
	    		"联系人手机",
	    		"业务范围",
	    		"申请提交时间"};
	    
	    List<Map> dataList = userRegService.getAllRegGroupData();

	    XSSFWorkbook workBook = null;
	    workBook = new XSSFWorkbook();
	    XSSFSheet sheet = workBook.createSheet();
	    workBook.setSheetName(0,"申请团队信息");
	    XSSFRow titleRow = sheet.createRow(0);
	    for(int i=0;i<cellTitle.length;i++){
	        titleRow.createCell(i).setCellValue(cellTitle[i]);
	    }
	    for(int i=0;i<dataList.size();i++){
	    	Map map = dataList.get(i);
	        XSSFRow row = sheet.createRow(i+1);
	        row.createCell(0).setCellValue((String)map.get("ID"));
	        row.createCell(1).setCellValue((String)map.get("DWMC"));
	        row.createCell(2).setCellValue((String)map.get("CLRQ"));
	        row.createCell(3).setCellValue((String)map.get("ZCZB"));
	        row.createCell(4).setCellValue((String)map.get("ZGRS"));
	        row.createCell(5).setCellValue((String)map.get("XXDZ"));
	        row.createCell(6).setCellValue((String)map.get("HYSL"));
	        row.createCell(7).setCellValue((String)map.get("DWWZ"));
	        row.createCell(8).setCellValue((String)map.get("CZ"));
	        row.createCell(9).setCellValue((String)map.get("FZJGSL"));
	        row.createCell(10).setCellValue((String)map.get("YZBM"));
	        row.createCell(11).setCellValue((String)map.get("FRXM"));
	        row.createCell(12).setCellValue((String)map.get("DH"));
	        row.createCell(13).setCellValue((String)map.get("SEX"));
	        row.createCell(14).setCellValue((String)map.get("PHONE"));
	        row.createCell(15).setCellValue((String)map.get("ZWZC"));
	        row.createCell(16).setCellValue((String)map.get("EMAIL"));
	        row.createCell(17).setCellValue((String)map.get("LXR"));
	        row.createCell(18).setCellValue((String)map.get("LXRDH"));
	        row.createCell(19).setCellValue((String)map.get("LXRSJ"));
	        row.createCell(20).setCellValue((String)map.get("JL"));
	        row.createCell(21).setCellValue((String)map.get("CREATETIME"));
	    }
	    
	    //文件输出流
	    String exportFileName = "学会团体申请";
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
}