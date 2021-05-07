package com.jgsconsole.app.web.biz;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Hpwlm")
public class HpwlmController {
	
	@RequestMapping("/download")
	public String download(HttpServletRequest request,HttpServletResponse response) throws Exception {
		String fileName = request.getParameter("fileName");
		String fileLocation = request.getParameter("fileLocation");
		String fileType = request.getParameter("fileType");
		
		System.out.println(fileName);
		
		fileName = fileName + "." + fileType;
		System.out.println(fileName);
		
		response.setHeader("Content-Disposition", "attachment;fileName="+ URLEncoder.encode(fileName,"UTF-8"));
		response.setContentType("multipart/form-data;charset=UTF-8");
		try {
			String path = request.getSession().getServletContext().getRealPath("/") + fileLocation;
			
			File file = new File(path);
			
			OutputStream os = response.getOutputStream();
			os.write(FileUtils.readFileToByteArray(file));
			os.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping("/downloadHasName")
	public String downloadHasName(HttpServletRequest request,HttpServletResponse response) throws Exception {
		String fileName = request.getParameter("fileName");
		String fileLocation = request.getParameter("fileLocation");

		response.setHeader("Content-Disposition", "attachment;fileName="+ URLEncoder.encode(fileName,"UTF-8"));
		response.setContentType("multipart/form-data;charset=UTF-8");
		try {
			String path = request.getSession().getServletContext().getRealPath("/")+ fileLocation;

			File file = new File(path);

			OutputStream os = response.getOutputStream();
			os.write(FileUtils.readFileToByteArray(file));
			os.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}