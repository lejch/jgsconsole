package com.jgsconsole.app.web.biz;

import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.aspose.cells.Workbook;
import com.aspose.words.*;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.service.biz.XhFileService;

@Controller
@RequestMapping("/xhf")
public class XhFileController {

	@Autowired
	public XhFileService xhFileService;
	
	private String allowed2Pdf = "doc,docx,xls,xlsx,bmp,gif,jpg,png";
	
	public boolean getLicense4Word() {  
        boolean result=false;try{new com.aspose.words.License().setLicense(Test.class.getClassLoader().getResourceAsStream("license.xml"));result = true;}catch(Exception e){e.printStackTrace();}return result;  
    }
	
	public boolean getLicense4Excel() {  
		boolean result=false;try{new com.aspose.cells.License().setLicense(Test.class.getClassLoader().getResourceAsStream("xlsxlicense.xml"));result = true;}catch(Exception e){e.printStackTrace();}return result;  
	}
	
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	@ResponseBody
	public String fileUpload(@RequestParam("file") MultipartFile file,HttpServletRequest request,HttpServletResponse response) {
		// 判断文件是否为空
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");

		String rls = "";
		if (!file.isEmpty()) {
			try {
				ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
				Random ran = new Random();
				String newFileName = formatter.format(new Date())+String.valueOf(ran.nextInt(100000));
				String ORIGIAL_FILE_NAME = file.getOriginalFilename();
				
				String FILE_SIZE = convertStorage(file.getSize());
				
				String TITLE = ORIGIAL_FILE_NAME.substring(0,ORIGIAL_FILE_NAME.lastIndexOf("."));
				String FILE_TYPE = ORIGIAL_FILE_NAME.substring(ORIGIAL_FILE_NAME.lastIndexOf(".")+1);  
				// 文件保存路径
				String filePath = request.getSession().getServletContext().getRealPath("/")+"xhfiles/";
				String pdfFilePath = request.getSession().getServletContext().getRealPath("/")+"previewpdf/";
				
				String finalFullFileUri = filePath + newFileName+"."+FILE_TYPE;
				// 转存文件
				file.transferTo(new File(finalFullFileUri));
				
				Map map = new HashMap();
				map.put("PDF_LOC", "");
				/* doc index = 0
				 * docx index = 4
				 * xls index = 9
				 * xlsx index = 13 */
				int allowed_index_num = allowed2Pdf.indexOf(FILE_TYPE.toLowerCase());
				if(allowed_index_num>=0){
					//生成 word -> pdf
					if(allowed_index_num==0||allowed_index_num==4){
						if(getLicense4Word()){ 
							Document document = new Document(finalFullFileUri);
							try{
							document.save(pdfFilePath + newFileName+".pdf", com.aspose.words.SaveFormat.PDF);
							map.put("PDF_LOC","previewpdf/"+newFileName+".pdf");
							}catch(Exception e){e.printStackTrace();}
				        }
					}
					//生成 excel -> pdf
					if(allowed_index_num==9||allowed_index_num==13){
						if(getLicense4Excel()){ 
							Workbook workbook = new Workbook(finalFullFileUri);
							try{
								com.aspose.cells.PdfSaveOptions xlsSaveOption = new com.aspose.cells.PdfSaveOptions();
					            xlsSaveOption.setOnePagePerSheet(true);
								workbook.save(pdfFilePath + newFileName+".pdf", xlsSaveOption);
								map.put("PDF_LOC","previewpdf/"+newFileName+".pdf");
							}catch(Exception e){e.printStackTrace();}
						}
					}
				}
				
				map.put("ID",UUID.randomUUID().toString());
				map.put("TITLE",TITLE);
				map.put("FILE_TYPE",FILE_TYPE);
				map.put("FILE_SIZE",FILE_SIZE);
				map.put("FLAG","0");
				map.put("CREATE_TIME",formatter1.format(new Date()));
				map.put("FILE_LOC","xhfiles/"+newFileName+"."+FILE_TYPE);
				map.put("CREATOR",user.getUseralias());
				System.out.println(map);
				xhFileService.insertUploadFile(map);
				
				rls = "{'result':'上传成功！','resultMap':"+JSONObject.fromObject(map)+",'resultFlag':'success'}";
			} catch (Exception e) {
				e.printStackTrace();
				rls = "{'result':'上传失败！','resultMap':'','resultFlag':'error'}";
			}
		}
		return JSONObject.fromObject(rls).toString();
	}
	
	@RequestMapping(value = "/getXhFile")
	@ResponseBody
	public Object getDownloadList(HttpServletRequest request,HttpServletResponse response) throws Exception {
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

		data = xhFileService.getXhFile(rowbounds);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/delUpFile")
	@ResponseBody
	public Object delUpFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		Map map = new HashMap();
		String ID = request.getParameter("ID");
		String UPURI = request.getParameter("UPURI");
		int index_suffix = UPURI.lastIndexOf(".");
		int hasPdf = allowed2Pdf.indexOf(UPURI.substring(index_suffix+1));
		String pdffilepath = "";
		Boolean hasPdf2del = false;
		if(hasPdf>=0&&hasPdf<18){
			hasPdf2del = true;
			pdffilepath = UPURI.substring(0, index_suffix)+".pdf";
			pdffilepath = pdffilepath.replaceAll("xhfiles", "previewpdf");
		}
		map.put("ID", ID);

		xhFileService.delUpFile(map,request.getSession().getServletContext().getRealPath("/")+UPURI,hasPdf2del,request.getSession().getServletContext().getRealPath("/")+pdffilepath);
		

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject("[{'result':'success'}]").toString();
	}
	
	@RequestMapping(value = "/setXhfileCanDld")
	@ResponseBody
	public Object setXhfileCanDld(HttpServletRequest request,HttpServletResponse response){
		String result = "[{'result':'success'}]";
		try{
			request.setCharacterEncoding("UTF-8");
			Map map = new HashMap();
			String ID = request.getParameter("ID");
			String CAN_DLD = request.getParameter("CAN_DLD");
			map.put("ID", ID);
			map.put("CAN_DLD", CAN_DLD);
			
			xhFileService.setXhfileCanDld(map);
		response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			e.printStackTrace();
			result = "[{'result':'error'}]";
		}
		
		return JSONArray.fromObject(result).toString();
	}
	
	public String convertStorage(long size) {
        long kb = 1024;
        long mb = kb * 1024;
        long gb = mb * 1024;
 
        if (size >= gb) {
            return String.format("%.1f GB", (float) size / gb);
        } else if (size >= mb) {
            float f = (float) size / mb;
            return String.format(f > 100 ? "%.0f MB" : "%.1f MB", f);
        } else if (size >= kb) {
            float f = (float) size / kb;
            return String.format(f > 100 ? "%.0f KB" : "%.1f KB", f);
        } else
            return String.format("%d B", size);
    }

}