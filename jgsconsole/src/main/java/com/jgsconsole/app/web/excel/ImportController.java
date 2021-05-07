package com.jgsconsole.app.web.excel;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.jgsconsole.app.service.excel.ImportService;

/**
 * excel数据导入
 * @author lijinchao
 *
 */
@Controller
@RequestMapping(value = "/ImportController")
public class ImportController {
	
	@Autowired
	private ImportService importService;
	
	@RequestMapping(value = "/importUserExcel", method = RequestMethod.POST)
	@ResponseBody
	public Object importUserExcel(HttpServletRequest request,HttpServletResponse response)throws Exception {
		PrintWriter out = null;
		try {
			out = response.getWriter();
			
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");
			String sys_user = request.getParameter("SYS_USRE");
			String biz_type = request.getParameter("BIZ_TYPE");
			
			JSONObject data = new JSONObject();
			data.put("SYS_USRE", sys_user);
			data.put("BIZ_TYPE", biz_type);
			
			JSONObject result = importService.importUserExcel(file, data);
    		out.write(result.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(out!=null){
				out.flush();
				out.close();
			}
		}
		return null;
	}	
}
