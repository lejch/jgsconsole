package com.jgsconsole.app.web.biz;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.apache.poi.xwpf.converter.core.BasicURIResolver;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
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
import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.PropertiesUtil;
import com.jgsconsole.common.util.UUIDGenerator;

@Controller
@RequestMapping("/HpwlNews")
public class HpwlNewsController {

	@Autowired
	public HpwlNewsService hpwlNewsService;
	
	@RequestMapping(value="/img_save_to_file", method = RequestMethod.POST) 
    @ResponseBody
    public Object img_save_to_file(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	response.setContentType("text/html;charset=utf-8");
    	
    	System.out.println("<--- start img_save_to_file --->");
    	
    	String picPath = "";  
    	String newPath = "";  
    	
    	String filePath = null;
    	
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
    	MultipartFile file = multipartRequest.getFile("img");
    	
    	String fileType = ".gif,.png,.jpg,.jpeg,.bmp";
    	
    	JSONObject result = null;
    	
    	if (!file.isEmpty()) {
    		String rls = "success";
    		
    		String fileName = file.getOriginalFilename();  
    		String suffix = fileName.substring(fileName.lastIndexOf("."));  
    		String newFileName = null;
    		
    		if(fileType.indexOf(suffix.toLowerCase())>0){
    			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");  
    			Random ran = new Random();
    			newFileName = formatter.format(new Date())  
    					+ String.valueOf(ran.nextInt(100000)) + suffix;  
    			
    			try {  
    				// 文件保存路径  
    				filePath = request.getSession().getServletContext().getRealPath("/")+"homepic/";
    				newPath = newFileName;
    				File dtoryFile = new File(filePath);
    				if(!dtoryFile.exists()  && !dtoryFile.isDirectory())      
    				{       
    					dtoryFile.mkdirs();   
    				}
    				// 转存文件  
    				file.transferTo(new File(filePath+newFileName));
    			} catch (Exception e) {  
    				e.printStackTrace();  
    				result = new JSONObject();
    				result.put("status", "error");
    				result.put("message", "图片上传异常");
    			}
    			
    		}else{
    			result = new JSONObject();
    			result.put("status", "error");
				result.put("message", "不允许的文件格式");
    		}
    		
    		
    		if(result==null){
    			
    			File picture = new File(filePath+newFileName);
                BufferedImage sourceImg =ImageIO.read(new FileInputStream(picture)); 
                
                result = new JSONObject();
    			result.put("status", "success");
        		result.put("url", request.getContextPath()+"/homepic/"+newFileName);
        		result.put("width", sourceImg.getWidth());
        		result.put("height", sourceImg.getHeight());
    		}
    		
    		System.out.println(result);
    	}
    	
    	return result;
    }
    
    @RequestMapping(value="/img_crop_to_file", method = RequestMethod.POST) 
    @ResponseBody
    public Object img_crop_to_file(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	response.setContentType("text/html;charset=utf-8");
    	
    	System.out.println("<--- start img_crop_to_file --->");
    	
    	JSONObject result = new JSONObject();
    	
    	String imgUrl = request.getParameter("imgUrl");
    	String imgInitW = request.getParameter("imgInitW");
    	String imgInitH = request.getParameter("imgInitH");
    	
    	System.out.println(imgInitW);
    	System.out.println(imgInitH);
    	
    	String imgW = request.getParameter("imgW");
    	String imgH = request.getParameter("imgH");
    	Double imgWd = Double.valueOf(imgW);
    	Double imgHd = Double.valueOf(imgH);
    	int imgWi = imgWd.intValue();
    	int imgHi = imgHd.intValue();
    	int imgX1 = Integer.parseInt(request.getParameter("imgX1"));
    	int imgY1 = Integer.parseInt(request.getParameter("imgY1"));
    	String cropW_o = String.valueOf(request.getParameter("cropW"));
    	String cropH_o = String.valueOf(request.getParameter("cropH"));
    	String[] cropW_before = cropW_o.split("\\.");
    	String[] cropH_before = cropH_o.split("\\.");
    	int cropW = Integer.parseInt(cropW_before[0]);
    	int cropH = Integer.parseInt(cropH_before[0]);
    	
    	String urlFix = imgUrl.substring(0,imgUrl.lastIndexOf("/"));
    	String fileName = imgUrl.substring(imgUrl.lastIndexOf("/")+1);
    	String houzhui = imgUrl.substring(imgUrl.lastIndexOf("."));
    	String houzhuixx = imgUrl.substring(imgUrl.lastIndexOf(".")+1).toLowerCase();
    	
    	String filePath = request.getSession().getServletContext().getRealPath("/")+"homepic/";
    	
    	String newFileName = fileName.replaceAll(houzhui, "_scale"+houzhui);
    	String newCropFileName = fileName.replaceAll(houzhui, "_crop"+houzhui);
    	
    	try{
//	    	ImgUtils.scale(filePath+fileName, filePath+newFileName, imgHi,imgWi, false ,Integer.parseInt(imgInitW) ,Integer.parseInt(imgInitH));
	    	
	    	BufferedImage bufferedimage = null;//ImageIO.read(new File(filePath+newFileName));
	    	
	    	bufferedimage = ImgUtils.newcropImage(filePath+fileName, imgHi,imgWi, imgX1, imgY1, imgX1+cropW, imgY1+cropH,Integer.parseInt(imgInitW) ,Integer.parseInt(imgInitH));
	    	
	    	ImageIO.write(bufferedimage, houzhuixx, new File(filePath+newCropFileName));
	    	
	    	result.put("status", "success");
	    	result.put("url", urlFix+"/"+newCropFileName);
    	}catch(Exception e){
    		e.printStackTrace();
    		result.put("status", "error");
    		result.put("message","裁剪图片错误，请稍后重试！");
    	}
    	
    	System.out.println(result);
    	
    	return result;
    }
    @RequestMapping(value="/preimg_crop_to_file", method = RequestMethod.POST) 
    @ResponseBody
    public Object preimg_crop_to_file(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	response.setContentType("text/html;charset=utf-8");
    	
    	JSONObject result = new JSONObject();
    	
    	String imgUrl = request.getParameter("imgUrl");
    	String imgInitW = request.getParameter("imgInitW");
    	String imgInitH = request.getParameter("imgInitH");
    	String imgW = request.getParameter("imgW");
    	String imgH = request.getParameter("imgH");
    	Double imgWd = Double.valueOf(imgW);
    	Double imgHd = Double.valueOf(imgH);
    	int imgWi = imgWd.intValue();
    	int imgHi = imgHd.intValue();
    	int imgX1 = Integer.parseInt(request.getParameter("imgX1"));
    	int imgY1 = Integer.parseInt(request.getParameter("imgY1"));
    	String cropW_o = String.valueOf(request.getParameter("cropW"));
    	String cropH_o = String.valueOf(request.getParameter("cropH"));
    	String[] cropW_before = cropW_o.split("\\.");
    	String[] cropH_before = cropH_o.split("\\.");
    	int cropW = Integer.parseInt(cropW_before[0]);
    	int cropH = Integer.parseInt(cropH_before[0]);
    	
    	String urlFix = imgUrl.substring(0,imgUrl.lastIndexOf("/"));
    	String fileName = imgUrl.substring(imgUrl.lastIndexOf("/")+1);
    	String houzhui = imgUrl.substring(imgUrl.lastIndexOf("."));
    	String houzhuixx = imgUrl.substring(imgUrl.lastIndexOf(".")+1).toLowerCase();
    	
    	String filePath = request.getSession().getServletContext().getRealPath("/")+"upload/";
    	String newfilePath = request.getSession().getServletContext().getRealPath("/")+"homepic/";
    	
    	String newFileName = fileName.replaceAll(houzhui, "_scale"+houzhui);
    	String newCropFileName = fileName.replaceAll(houzhui, "_crop"+houzhui);
    	
    	try{
//    		ImgUtils.scale(filePath+fileName, filePath+newFileName, imgHi,imgWi, false,Integer.parseInt(imgInitW) ,Integer.parseInt(imgInitH));
    		
    		BufferedImage bufferedimage = null;
    		
    		bufferedimage = ImgUtils.newcropImage(filePath+fileName, imgHi,imgWi, imgX1, imgY1, imgX1+cropW, imgY1+cropH,Integer.parseInt(imgInitW) ,Integer.parseInt(imgInitH));
    		
    		ImageIO.write(bufferedimage, houzhuixx, new File(newfilePath+newCropFileName));
    		
    		result.put("status", "success");
    		result.put("url", urlFix.replace("/upload", "/homepic")+"/"+newCropFileName);
    	}catch(Exception e){
    		e.printStackTrace();
    		result.put("status", "error");
    		result.put("message","裁剪图片错误，请稍后重试！");
    	}
    	
    	System.out.println(result);
    	
    	return result;
    }

	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	@ResponseBody
	public String fileUpload(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");

		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));

		String rls = "";
		if (!file.isEmpty()) {
			try {
				// 文件保存路径
				String filePath = request.getSession().getServletContext().getRealPath("/")
						+ "importFiles/"+ user.getUsername()+ "/"+ newFileName + "/";
				String resultPath = "/importFiles/" + user.getUsername() + "/"+ newFileName + "/";
				
				File dtoryFile = new File(filePath);
				if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {
					dtoryFile.mkdirs();
				}
				// 转存文件
				file.transferTo(new File(filePath + file.getOriginalFilename()));
				rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/docxUpload", method = RequestMethod.POST)
	@ResponseBody
	public String docxUpload(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/"+ newFileName + "/";
		String sourceFileName = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				File dtoryFile = new File(filePath);
				if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
				// 转存文件
				sourceFileName = filePath + file.getOriginalFilename();
				file.transferTo(new File(sourceFileName));
				rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			String imagePath = filePath + "/image";
			String targetFileName = filePath + "/target.html";
			
			OutputStreamWriter outputStreamWriter = null;
			try {
				XWPFDocument document = new XWPFDocument(new FileInputStream(sourceFileName));
				XHTMLOptions options = XHTMLOptions.create();
				// 存放图片的文件夹
				options.setExtractor(new FileImageExtractor(new File(imagePath)));
				// html中图片的路径
				options.URIResolver(new BasicURIResolver("/jgsconsole"+resultPath+"image"));
				outputStreamWriter = new OutputStreamWriter(new FileOutputStream(targetFileName), "utf-8");
				XHTMLConverter xhtmlConverter = (XHTMLConverter) XHTMLConverter.getInstance();
				xhtmlConverter.convert(document, outputStreamWriter, options);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			finally{if(outputStreamWriter!=null){try{outputStreamWriter.close();outputStreamWriter=null;}catch(IOException e){e.printStackTrace();}}}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", StringEscapeUtils.unescapeHtml(readfile(targetFileName)));
				map.put("TITLE", file.getOriginalFilename());
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "1");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
				hpwlNewsService.delete(targetFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/docxUpload2", method = RequestMethod.POST)
	@ResponseBody
	public String docxUpload2(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/"+ newFileName + "/";
		String sourceFileName = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				File dtoryFile = new File(filePath);
				if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
				// 转存文件
				sourceFileName = filePath + file.getOriginalFilename();
				file.transferTo(new File(sourceFileName));
				rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			String imagePath = filePath + "/image";
			String targetFileName = filePath + "/target.html";
			
			OutputStreamWriter outputStreamWriter = null;
			try {
				XWPFDocument document = new XWPFDocument(new FileInputStream(sourceFileName));
				XHTMLOptions options = XHTMLOptions.create();
				// 存放图片的文件夹
				options.setExtractor(new FileImageExtractor(new File(imagePath)));
				// html中图片的路径
				options.URIResolver(new BasicURIResolver("/jgsconsole"+resultPath+"image"));
				outputStreamWriter = new OutputStreamWriter(new FileOutputStream(targetFileName), "utf-8");
				XHTMLConverter xhtmlConverter = (XHTMLConverter) XHTMLConverter.getInstance();
				xhtmlConverter.convert(document, outputStreamWriter, options);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			finally{if(outputStreamWriter!=null){try{outputStreamWriter.close();outputStreamWriter=null;}catch(IOException e){e.printStackTrace();}}}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", StringEscapeUtils.unescapeHtml(readfile(targetFileName)));
				map.put("TITLE", file.getOriginalFilename());
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "2");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
				hpwlNewsService.delete(targetFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/docxUpload3", method = RequestMethod.POST)
	@ResponseBody
	public String docxUpload3(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/"+ newFileName + "/";
		String sourceFileName = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				File dtoryFile = new File(filePath);
				if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
				// 转存文件
				sourceFileName = filePath + file.getOriginalFilename();
				file.transferTo(new File(sourceFileName));
				rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			String imagePath = filePath + "/image";
			String targetFileName = filePath + "/target.html";
			
			OutputStreamWriter outputStreamWriter = null;
			try {
				XWPFDocument document = new XWPFDocument(new FileInputStream(sourceFileName));
				XHTMLOptions options = XHTMLOptions.create();
				// 存放图片的文件夹
				options.setExtractor(new FileImageExtractor(new File(imagePath)));
				// html中图片的路径
				options.URIResolver(new BasicURIResolver("/jgsconsole"+resultPath+"image"));
				outputStreamWriter = new OutputStreamWriter(new FileOutputStream(targetFileName), "utf-8");
				XHTMLConverter xhtmlConverter = (XHTMLConverter) XHTMLConverter.getInstance();
				xhtmlConverter.convert(document, outputStreamWriter, options);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			finally{if(outputStreamWriter!=null){try{outputStreamWriter.close();outputStreamWriter=null;}catch(IOException e){e.printStackTrace();}}}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", StringEscapeUtils.unescapeHtml(readfile(targetFileName)));
				map.put("TITLE", file.getOriginalFilename());
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "3");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
				hpwlNewsService.delete(targetFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/docxUpload4", method = RequestMethod.POST)
	@ResponseBody
	public String docxUpload4(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/"+ newFileName + "/";
		String sourceFileName = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				File dtoryFile = new File(filePath);
				if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
				// 转存文件
				sourceFileName = filePath + file.getOriginalFilename();
				file.transferTo(new File(sourceFileName));
				rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			String imagePath = filePath + "/image";
			String targetFileName = filePath + "/target.html";
			
			OutputStreamWriter outputStreamWriter = null;
			try {
				XWPFDocument document = new XWPFDocument(new FileInputStream(sourceFileName));
				XHTMLOptions options = XHTMLOptions.create();
				// 存放图片的文件夹
				options.setExtractor(new FileImageExtractor(new File(imagePath)));
				// html中图片的路径
				options.URIResolver(new BasicURIResolver("/jgsconsole"+resultPath+"image"));
				outputStreamWriter = new OutputStreamWriter(new FileOutputStream(targetFileName), "utf-8");
				XHTMLConverter xhtmlConverter = (XHTMLConverter) XHTMLConverter.getInstance();
				xhtmlConverter.convert(document, outputStreamWriter, options);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			finally{if(outputStreamWriter!=null){try{outputStreamWriter.close();outputStreamWriter=null;}catch(IOException e){e.printStackTrace();}}}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", StringEscapeUtils.unescapeHtml(readfile(targetFileName)));
				map.put("TITLE", file.getOriginalFilename());
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "4");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
				hpwlNewsService.delete(targetFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";}
			
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	public static String readfile(String filePath) {
	    File file = new File(filePath);
	    InputStream input = null;
	    try {
	        input = new FileInputStream(file);
	    } catch (FileNotFoundException e) {
	        e.printStackTrace();
	    }
	    StringBuffer buffer = new StringBuffer();
	    byte[] bytes = new byte[1024];
	    try {
	        for (int n; (n = input.read(bytes)) != -1;) {
	            buffer.append(new String(bytes, 0, n, "utf8"));
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return buffer.toString();
	}

	@RequestMapping(value = "/delOrgNews")
	@ResponseBody
	public Object delOrgNews(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		Map map = new HashMap();
		String ID = request.getParameter("ID");
		map.put("ID", ID);

		hpwlNewsService.delOrgNews(map);

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/setShowInHomepage")
	@ResponseBody
	public Object setShowInHomepage(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		Map map = new HashMap();
		String ID = request.getParameter("ID");
		String IS_SHOWN = request.getParameter("IS_SHOWN");
		map.put("ID", ID);
		map.put("IS_SHOWN", IS_SHOWN);
		
		hpwlNewsService.setShowInHomepage(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}

	@RequestMapping(value = "/getAllTypeNews")
	@ResponseBody
	public Object getAllTypeNews(HttpServletRequest request,HttpServletResponse response) throws Exception {
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

		String type = request.getParameter("type");

		data = hpwlNewsService.getAllTypeNews(rowbounds,type);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/getInfoList")
	@ResponseBody
	public Object getInfoList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		List<Map> data = hpwlNewsService.getInfoList();
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}

	@RequestMapping(value = "/addOrEditOrgNews")
	@ResponseBody
	public Object addOrEditOrgNews(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");

		String org_news_id = request.getParameter("ID");

		String CREATE_TIME = request.getParameter("CREATE_TIME");
		String DATETIME = request.getParameter("DATETIME");
		String UMHTML = request.getParameter("UMHTML");
		String TITLE = request.getParameter("TITLE");
		String IS_SHOWN = request.getParameter("IS_SHOWN");
		String CREATOR = request.getParameter("CREATOR");
		String ATTACHMENT = request.getParameter("ATTACHMENT");
		if (StringUtils.isNotBlank(ATTACHMENT)) {
			ATTACHMENT = ATTACHMENT.substring(0, ATTACHMENT.length() - 1);
		}
		String img_fix = PropertiesUtil.getInstance("/application.properties").getConfig("img_fix");
		System.out.println(PropertiesUtil.getInstance("/application.properties").getConfig("img_fix"));
		
		String img_fixed = PropertiesUtil.getInstance("/application.properties").getConfig("img_fixed");
		System.out.println(PropertiesUtil.getInstance("/application.properties").getConfig("img_fixed"));
		
		if(UMHTML.indexOf(img_fixed)==-1){
			UMHTML = UMHTML.replaceAll(img_fix, img_fixed);
		}
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		String OPERATOR = user.getUseralias();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String QUICK_IMG = "";
		String QUICK_DESC = null;
		if(StringUtils.isNotBlank(UMHTML)) {
			while (UMHTML.indexOf("<p><br/></p>") == 0) {
				UMHTML = UMHTML.replaceFirst("<p><br/></p>", "");
			}
			int quick_img_index = UMHTML.indexOf("src=");
			if(quick_img_index>=0){
				String qucik_img_str = UMHTML.substring(quick_img_index+5);
				QUICK_IMG = qucik_img_str.substring(0,qucik_img_str.indexOf("\""));
			}
			int quick_desc_index =  UMHTML.indexOf("<p>");
			if(quick_desc_index>=0){
				String qucik_desc_str = UMHTML.substring(quick_desc_index+3);
				String HAS_QUICK_DESC_CORRECT = qucik_desc_str.substring(0, 1);
				
				while(HAS_QUICK_DESC_CORRECT.equals("<")){
					quick_desc_index = qucik_desc_str.indexOf("<p>");
					if(quick_desc_index<0){QUICK_DESC = TITLE;break;}
					qucik_desc_str = qucik_desc_str.substring(quick_desc_index+3);
					HAS_QUICK_DESC_CORRECT = qucik_desc_str.substring(0, 1);
				}
				if(quick_desc_index>=0){
					QUICK_DESC = qucik_desc_str.substring(0,qucik_desc_str.indexOf("</p>"));
					if(QUICK_DESC.length()>100){QUICK_DESC=QUICK_DESC.substring(0,100)+"...";}
				}
			}
		}else{
			UMHTML="<p></p>";
			QUICK_DESC = TITLE;
		}
		Map map = new HashMap();
		map.put("CREATE_TIME", CREATE_TIME);
		map.put("DATETIME", DATETIME);
		map.put("CONTENT", UMHTML);
		map.put("TITLE", TITLE);
		map.put("IS_SHOWN", IS_SHOWN);
		map.put("CREATOR", CREATOR);
		map.put("OPERATOR", OPERATOR);
		map.put("ATTACHMENT", ATTACHMENT);
		map.put("QUICK_IMG", QUICK_IMG);
		map.put("QUICK_DESC", QUICK_DESC);
		map.put("OPERATE_TIME", sdf.format(new Date()));

		Integer result = null;
		if (StringUtils.isNotBlank(org_news_id)) {
			map.put("ID", org_news_id);

			hpwlNewsService.editOrgNews(map);
		} else {
			String ORG_ID = UUIDGenerator.getUUID();
			map.put("ID", ORG_ID);
			String TYPE = request.getParameter("TYPE");
			map.put("TYPE", TYPE);

			hpwlNewsService.addOrgNews(map);
		}

		JSONObject json = JSONObject.fromObject(map);
		return EnDecodeUtil.enCodeReturns2UTF8(json.toString());
	}
	
	@RequestMapping(value = "/setHpLoop")
	@ResponseBody
	public Object setHpLoop(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
		String SET_HPIC_URI = request.getParameter("SET_HPIC_URI");
		String ID = request.getParameter("ID");
		
		Map map = new HashMap();
		map.put("IS_SET_HPIC", "0");
		map.put("SET_HPIC_URI", SET_HPIC_URI);
		map.put("ID", ID);
		
		hpwlNewsService.setHpLoop(map);
		
		JSONObject json = new JSONObject();
		json.put("IS_SET_HPIC", "0");
		json.put("SET_HPIC_URI", SET_HPIC_URI);
		
		return EnDecodeUtil.enCodeReturns2UTF8(json.toString());
	}
	
	@RequestMapping(value = "/delHploop")
	@ResponseBody
	public Object delHploop(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
		String SET_HPIC_URI = request.getParameter("imgsrc");
		String ID = request.getParameter("ID");
		
		Map map = new HashMap();
		map.put("ID", ID);
		
		
		hpwlNewsService.delHploop(map,request.getSession().getServletContext().getRealPath("/")+"homepic"+SET_HPIC_URI.substring(SET_HPIC_URI.lastIndexOf("/")));
		
		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/publish_newses")
	@ResponseBody
	public Object publish_newses(HttpServletRequest request,HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		response.setContentType("text/html;charset=utf-8");
		
		String ID = request.getParameter("ID");
		String result = "[{'result':'success'}]";
		try{
			hpwlNewsService.publish_newses(ID);
		}catch(Exception e){
			e.printStackTrace();
			result = "[{'result':'error'}]";
		}
		
		return JSONArray.fromObject(result).toString();
	}
	
	@RequestMapping(value = "/back_publishedNews")
	@ResponseBody
	public Object back_publishedNews(HttpServletRequest request,HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		response.setContentType("text/html;charset=utf-8");
		
		String ID = request.getParameter("ID");
		String result = "[{'result':'success'}]";
		try{
			hpwlNewsService.back_publishedNews(ID);
		}catch(Exception e){
			e.printStackTrace();
			result = "[{'result':'error'}]";
		}
		
		return JSONArray.fromObject(result).toString();
	}
	
	public void deleteDir(String dirPath)//文件夹删除
	{
		File file = new File(dirPath);
		if(file.isFile())
		{
			file.delete();
		}else
		{
			File[] files = file.listFiles();
			if(files == null)
			{
				file.delete();
			}else
			{
				for (int i = 0; i < files.length; i++) 
				{
					deleteDir(files[i].getAbsolutePath());
				}
				file.delete();
			}
		}
	}
	
	@RequestMapping(value = "/pdfUpload", method = RequestMethod.POST)
	@ResponseBody
	public String pdfUpload(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径 /jgsconsole/importFiles/admin/PDFIN_2020022010430429326349/
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/PDFIN_"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/PDFIN_"+ newFileName + "/";
		String sourceFileName = null;
		String unknownFile = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				unknownFile = file.getOriginalFilename();
				//pdf判断
				String last_fix = unknownFile.substring(unknownFile.lastIndexOf('.')+1).toLowerCase();
				System.out.println(file.getOriginalFilename());
				System.out.println(last_fix);
				if(last_fix.equals("pdf")) {
					File dtoryFile = new File(filePath);
					if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
					// 转存文件
					sourceFileName = filePath + unknownFile;
					file.transferTo(new File(sourceFileName));
					rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
				}else {
					rls = "{'result':'上传失败！不是支持的文件格式','resultPath':'','resultFlag':'error'}";
				}
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", PdfToHtml.PdfToImage(sourceFileName, filePath,resultPath).toString());
				String orgnm = file.getOriginalFilename();
				map.put("TITLE", orgnm.substring(0, orgnm.lastIndexOf(".")));
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "/jgsconsole"+resultPath+"image_0.jpg");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "1");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";deleteDir("/jgsconsole"+resultPath);}
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/pdfUpload2", method = RequestMethod.POST)
	@ResponseBody
	public String pdfUpload2(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径 /jgsconsole/importFiles/admin/PDFIN_2020022010430429326349/
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/PDFIN_"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/PDFIN_"+ newFileName + "/";
		String sourceFileName = null;
		String unknownFile = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				unknownFile = file.getOriginalFilename();
				//pdf判断
				String last_fix = unknownFile.substring(unknownFile.lastIndexOf('.')+1).toLowerCase();
				System.out.println(file.getOriginalFilename());
				System.out.println(last_fix);
				if(last_fix.equals("pdf")) {
					File dtoryFile = new File(filePath);
					if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
					// 转存文件
					sourceFileName = filePath + unknownFile;
					file.transferTo(new File(sourceFileName));
					rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
				}else {
					rls = "{'result':'上传失败！不是支持的文件格式','resultPath':'','resultFlag':'error'}";
				}
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", PdfToHtml.PdfToImage(sourceFileName, filePath,resultPath).toString());
				String orgnm = file.getOriginalFilename();
				map.put("TITLE", orgnm.substring(0, orgnm.lastIndexOf(".")));
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "/jgsconsole"+resultPath+"image_0.jpg");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "2");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";deleteDir("/jgsconsole"+resultPath);}
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/pdfUpload3", method = RequestMethod.POST)
	@ResponseBody
	public String pdfUpload3(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径 /jgsconsole/importFiles/admin/PDFIN_2020022010430429326349/
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/PDFIN_"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/PDFIN_"+ newFileName + "/";
		String sourceFileName = null;
		String unknownFile = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				unknownFile = file.getOriginalFilename();
				//pdf判断
				String last_fix = unknownFile.substring(unknownFile.lastIndexOf('.')+1).toLowerCase();
				System.out.println(file.getOriginalFilename());
				System.out.println(last_fix);
				if(last_fix.equals("pdf")) {
					File dtoryFile = new File(filePath);
					if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
					// 转存文件
					sourceFileName = filePath + unknownFile;
					file.transferTo(new File(sourceFileName));
					rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
				}else {
					rls = "{'result':'上传失败！不是支持的文件格式','resultPath':'','resultFlag':'error'}";
				}
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", PdfToHtml.PdfToImage(sourceFileName, filePath,resultPath).toString());
				String orgnm = file.getOriginalFilename();
				map.put("TITLE", orgnm.substring(0, orgnm.lastIndexOf(".")));
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "/jgsconsole"+resultPath+"image_0.jpg");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "3");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";deleteDir("/jgsconsole"+resultPath);}
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/pdfUpload4", method = RequestMethod.POST)
	@ResponseBody
	public String pdfUpload4(@RequestParam("file") MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Random ran = new Random();
		String newFileName = formatter.format(new Date()) + String.valueOf(ran.nextInt(100000));
		
		//文件保存路径 /jgsconsole/importFiles/admin/PDFIN_2020022010430429326349/
		String filePath = request.getSession().getServletContext().getRealPath("/") + "importFiles/"+ user.getUsername()+ "/PDFIN_"+ newFileName + "/";
		//图片保存路径前缀
		String resultPath = "/importFiles/" + user.getUsername() + "/PDFIN_"+ newFileName + "/";
		String sourceFileName = null;
		String unknownFile = null;
		String rls = "";
		if (!file.isEmpty()) {
			try {
				unknownFile = file.getOriginalFilename();
				//pdf判断
				String last_fix = unknownFile.substring(unknownFile.lastIndexOf('.')+1).toLowerCase();
				System.out.println(file.getOriginalFilename());
				System.out.println(last_fix);
				if(last_fix.equals("pdf")) {
					File dtoryFile = new File(filePath);
					if (!dtoryFile.exists() && !dtoryFile.isDirectory()) {dtoryFile.mkdirs();}
					// 转存文件
					sourceFileName = filePath + unknownFile;
					file.transferTo(new File(sourceFileName));
					rls = "{'result':'上传成功！','resultPath':'" + resultPath+ "','resultFlag':'success'}";
				}else {
					rls = "{'result':'上传失败！不是支持的文件格式','resultPath':'','resultFlag':'error'}";
				}
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";
			}
			
			try{
				Date cur_date = new Date();
				Map map = new HashMap();
				map.put("CREATE_TIME", sdf.format(cur_date));
				map.put("DATETIME", sdf1.format(cur_date));
				map.put("CONTENT", PdfToHtml.PdfToImage(sourceFileName, filePath,resultPath).toString());
				String orgnm = file.getOriginalFilename();
				map.put("TITLE", orgnm.substring(0, orgnm.lastIndexOf(".")));
				map.put("IS_SHOWN", "1");
				map.put("CREATOR", user.getUseralias());
				map.put("OPERATOR", user.getUseralias());
				map.put("QUICK_IMG", "/jgsconsole"+resultPath+"image_0.jpg");
				map.put("QUICK_DESC", "");
				map.put("OPERATE_TIME", sdf.format(cur_date));
				map.put("ID", UUIDGenerator.getUUID().toString());
				map.put("TYPE", "4");
				hpwlNewsService.addOrgNews(map);
				
				hpwlNewsService.delete(sourceFileName);
			}catch(Exception e){e.printStackTrace();rls = "{'result':'上传失败！','resultPath':'','resultFlag':'error'}";deleteDir("/jgsconsole"+resultPath);}
		}
		return JSONObject.fromObject(rls).toString();
	}
}