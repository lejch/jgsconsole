package com.jgsconsole.app.web.biz;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jgsconsole.common.util.EnDecodeUtil;
import com.jgsconsole.common.util.PropertiesUtil;
import com.jgsconsole.common.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/HpwlmUp")
public class HpwlmUploadController {
	
    @RequestMapping(value="/uploadImg", method = RequestMethod.POST) 
	@ResponseBody
	public Object uploadImg(HttpServletRequest request, HttpServletResponse response) throws Exception { 
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		
		String picPath = "";  
        String newPath = "";  
        JSONObject result = null;
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
		MultipartFile file = multipartRequest.getFile("upfile");
		
		String fileType = ".gif,.png,.jpg,.jpeg,.bmp";
		
		if (!file.isEmpty()) {
			String rls = "SUCCESS";
			  
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
	                String filePath = request.getSession().getServletContext().getRealPath("/")+"upload/";
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
	                rls = "图片上传异常";
	            }

            }else{
            	rls = "不允许的文件格式";
            }
            
            result = new JSONObject();
            result.put("name", newFileName);
            result.put("originalName", fileName);
            result.put("size", file.getSize());
            result.put("state", rls);
            result.put("type", suffix);
            result.put("url", newPath);
            
            System.out.println(result);
		}
	    
		return EnDecodeUtil.enCodeReturns2UTF8(result.toString());
	}
    
    @RequestMapping(value="/img_save_to_file", method = RequestMethod.POST) 
    @ResponseBody
    public Object img_save_to_file(HttpServletRequest request, HttpServletResponse response) throws Exception { 
    	request.setCharacterEncoding("UTF-8");
    	response.setContentType("text/html;charset=utf-8");
    	
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
    				filePath = request.getSession().getServletContext().getRealPath("/")+"upload/";
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
        		result.put("url", request.getContextPath()+"/upload/"+newFileName);
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
    	int cropW = Integer.parseInt(request.getParameter("cropW"));
    	int cropH = Integer.parseInt(request.getParameter("cropH"));
    	
    	String urlFix = imgUrl.substring(0,imgUrl.lastIndexOf("/"));
    	String fileName = imgUrl.substring(imgUrl.lastIndexOf("/")+1);
    	String houzhui = imgUrl.substring(imgUrl.lastIndexOf("."));
    	String houzhuixx = imgUrl.substring(imgUrl.lastIndexOf(".")+1).toLowerCase();
    	
    	String filePath = request.getSession().getServletContext().getRealPath("/")+"upload/";
    	
    	String newFileName = fileName.replaceAll(houzhui, "_scale"+houzhui);
    	String newCropFileName = fileName.replaceAll(houzhui, "_crop"+houzhui);
    	
    	try{
//	    	ImgUtils.scale(filePath+fileName, filePath+newFileName, imgHi,imgWi, false,Integer.parseInt(imgInitW) ,Integer.parseInt(imgInitH));
	    	
	    	BufferedImage bufferedimage = null;
	    	
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
 
}