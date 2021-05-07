package com.jgsconsole.app.service.excel;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import com.jgsconsole.app.repository.excel.ImportDao;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.common.util.DateUtils;
import com.jgsconsole.common.util.UUIDGenerator;

/**
 * excel导入处理类
 * @author lijinchao
 */

@Service
public class ImportService {
	
	private static final String CONTENTTYPE_EXCEL0 = "application/vnd.ms-excel";
    private static final String CONTENTTYPE_EXCEL1 = "application/octet-stream";
	
	@Autowired
	private ImportDao importDao;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	private static Logger logger = LoggerFactory.getLogger(ImportService.class);
	
	public JSONObject importUserExcel(CommonsMultipartFile file,JSONObject data){
		String errorMsg = "";
        String IMPXLSSTATUS = "0";//文件是否导入到临时表状态(0:导入失败,1:导入成功)
        String IMPORTBATCH = "0";//保存导入批次是否成功
        String CHECKSTATUS = "0";//数据质量检查状态(0:存在质量问题 1:数据质量正常 2:未开始)
        String IMPDATASTATUS = "0";//导入数据中心状态(0:导入失败,1:导入成功)
        String LOG_ID = UUIDGenerator.getUUID();//导入批次主键
        
        String fileName = file.getOriginalFilename();//上传文件名
        String userId = data.getString("SYS_USRE");//用户ID
        String BIZ_TYPE = data.getString("BIZ_TYPE");//业务类型 
        
        try {
        	String readExcelErrorMsg = readExcelToDB(BIZ_TYPE, file, LOG_ID);//Excel文件导入到临时表
            if(readExcelErrorMsg==null){
                IMPXLSSTATUS = "1";
            }else{
            	IMPXLSSTATUS = "0";
            	errorMsg = readExcelErrorMsg;
            }
        }catch (Exception e) {
        	IMPXLSSTATUS = "0";
        	errorMsg = "文件导入到临时表异常，异常信息为：<br/>"+e.getMessage();
            e.printStackTrace();
        }
        
        //保存导入批次
    	 try {
             String currentdate = DateUtils.parseDate(new Date(), "yyyyMMddHHmmssSSS");
             Map<String,String> map = new HashMap<String,String>();
             map.put("LOG_ID", LOG_ID);
             map.put("BIZ_TYPE", BIZ_TYPE);
             map.put("USER_ID", userId);
             map.put("IMP_TIME", currentdate);
             map.put("XLS_FILE_NAME", fileName);
             map.put("IMPXLS_STATUS", IMPXLSSTATUS);
             map.put("CHECKS_TATUS", "2");
             map.put("IMPDATA_STATUS", IMPDATASTATUS);
             map.put("ERROR_MSG", errorMsg);
             map.put("IMP_DESCRIBE", "用户导入");
             importDao.insertLog(map);

             IMPORTBATCH = "1";
         }catch (Exception e) {
         	 errorMsg = "保存导入批次失败,异常信息为：<br/>"+e.getMessage();
         	 IMPORTBATCH = "0";
             e.printStackTrace();
         }
        
        //调用存储过程导入到真实业务表中
        if(IMPXLSSTATUS.equals("1")&&IMPORTBATCH.equalsIgnoreCase("1")){
            try {
            	SqlSession sqlSession = sqlSessionFactory.openSession();
        		Connection conn = sqlSession.getConnection();
        		
        	   	List ruleMap = importDao.getImportRule(BIZ_TYPE);//查询所选业务类型信息
        	   	Map map = (Map)ruleMap.get(0);
            	String prc = (String)map.get("PRC_NAME");
        		
        		StringBuffer sql = new StringBuffer();
        		sql.append("{call ").append(prc).append("(?,?,?)").append(" }");
        		logger.info(sql.toString());
        		CallableStatement cstmt = conn.prepareCall(sql.toString());
        		cstmt.setString(1, LOG_ID);
        		cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
        		cstmt.registerOutParameter(3, java.sql.Types.VARCHAR);
        		cstmt.execute();
        		
        		String out_success = cstmt.getString(2);//完成标致(0:失败 1:成功)
        		String out_message = cstmt.getString(3);//信息提示
        		
                out_message = out_message.replaceAll("\n", "<br>");
                if("0".equals(out_success)){//失败
                	CHECKSTATUS = "0";
                    IMPDATASTATUS = "0";
                    errorMsg += out_message;
                }else{//成功
                    CHECKSTATUS = "1";
                    IMPDATASTATUS = "1";
                }
            }catch (Exception e) {
            	CHECKSTATUS = "0";
                IMPDATASTATUS = "0";
            	errorMsg = "调用保存数据到真实表中的存储过程失败，异常信息为：<br/>"+e.getMessage();
                e.printStackTrace();
            }
        }
        
        JSONObject result = new JSONObject();
        result.put("IMPXLSSTATUS", IMPXLSSTATUS);
        result.put("IMPORTBATCH", IMPORTBATCH);
        result.put("CHECKSTATUS", CHECKSTATUS);
        result.put("IMPDATASTATUS", IMPDATASTATUS);
        result.put("errorMsg", errorMsg);

        return result;
	}
	
	private String readExcelToDB(String BIZ_TYPE, CommonsMultipartFile file, String LOG_ID) throws Exception{
		if(file == null){
            return "没有选择Excel!";
        }
		
        String fileName = file.getOriginalFilename();//获取文件名
        if(fileName != null && fileName.trim().length()>0){
        	
        	//验证是否为xls文件
            String fileType = file.getContentType();
            if(!fileType.equalsIgnoreCase(CONTENTTYPE_EXCEL0) 
                    && !fileType.equalsIgnoreCase(CONTENTTYPE_EXCEL1)){
                return "非Excel文件!";
            }
            
            InputStream in = null;
            Workbook wb = null;  
			try {
				in = file.getInputStream();
				int index = fileName.lastIndexOf(".");
	            String extensionName = fileName.substring(index);
				if(extensionName.equals(".xls")){
					wb = new HSSFWorkbook(in);  
	            }else if(extensionName.equals(".xlsx")) {  
	                wb = new XSSFWorkbook(in);  
	            }else{
	            	return "非Excel文件!";
	            }
				
				int numberOfSheets = wb.getNumberOfSheets();
                if(numberOfSheets==0){
                    return fileName + "文件中无sheet页!";
                }
                
            	List ruleMaps = importDao.getImportRule(BIZ_TYPE);//查询所选业务类型信息
	            if(ruleMaps==null||ruleMaps.size()==0){
	                return "业务类型\""+BIZ_TYPE+"\"不存在!";
	            }
	            
	            Map ruleMap = (Map)ruleMaps.get(0);
	            String RULE_ID = (String)ruleMap.get("RULE_ID");
	            List ruleDetail = importDao.getImportRuleDetail(RULE_ID);//获取所选业务类型详细信息
	            int size = ruleDetail.size();
	            if(ruleDetail==null||ruleDetail.size()==0){
	            	return "业务类型\""+BIZ_TYPE+"\"的设置为空!";
	            }
	            
	            boolean isError = false;
	            StringBuffer sb = new StringBuffer();
	            for(int i=0;i<ruleDetail.size();i++){//校验上传的Excel文件中的表头与所保存的表头信息是否相同
	            	Map datail = (Map)ruleDetail.get(i);
	            	int xlsColumnI = Integer.parseInt((String)datail.get("XLS_TITLE_COLUMN"));//获取表头所在的列索引
	            	int xlsColumnJ = Integer.parseInt((String)datail.get("XLS_TITLE_LINE"));//获取表头所在的行索引
	            	String cellValue = wb.getSheetAt(0).getRow(xlsColumnJ).getCell(xlsColumnI).getStringCellValue();
	                String tempValue = (String)datail.get("XLS_TITLE_NAME");//表头名称
	                if(!tempValue.equalsIgnoreCase(cellValue)){
	                	isError = true;
	                	String columnI = getExcelColumn(xlsColumnI+1);
	                    String info = "EXCEL中第"+(xlsColumnJ+1)+"行第"+columnI+"列的表头“"+cellValue+"”错误，应为“"+tempValue+"”！";
	                    sb.append(info).append("<br/>");
	                }
	            }
	            if(isError){
	            	return sb.toString();
	            }
	            
	            List roleInfo = importDao.getRoleInfo();//获取角色信息
	            if(roleInfo==null||roleInfo.size()==0){
	            	return "获取角色信息失败！";
	            }
	            
	            List<Map<String,String>> list = new ArrayList<Map<String,String>>();
	            for (int j=0;j<numberOfSheets;j++) {
                  Sheet sheet = wb.getSheetAt(j);
                  int beginRow = Integer.parseInt((String)ruleMap.get("XLS_DATA_BEGIN"));
                  if(j>0) beginRow = 0;//第二三sheet页从第一行开始
                  int rowCount = sheet.getLastRowNum();      
                  for (int k=beginRow;k<=rowCount;k++) {
	                  Map<String,String> map = new HashMap<String,String>();
	                  String key = UUIDGenerator.getUUID();
	                  String keyCol = ((String)ruleMap.get("BIZ_TABLE_KEY")).toUpperCase();
	                  String currentdate = DateUtils.parseDate(new Date(), "yyyyMMddHHmmssSSS");
	                  map.put(keyCol, key);
	                  map.put("LOG_ID", LOG_ID);
	                  map.put("CREATE_DATE", currentdate);
	                  map.put("UPDATE_DATE", currentdate);
	                  
	                  for(int i=0;i<ruleDetail.size();i++){//校验上传的Excel文件中的表头与所保存的表头信息是否相同
	            		  Map datail = (Map)ruleDetail.get(i);
	            		  int xlsColumnI = Integer.parseInt((String)datail.get("XLS_TITLE_COLUMN"));//获取表头所在的列索引
	            		  String contents = null;
	            		  Cell cell = sheet.getRow(k).getCell(xlsColumnI);
	            		  int type = cell.getCellType();
	            		  if(type==0){
	            			  int value = (int)cell.getNumericCellValue();
	            			  contents = String.valueOf(value);
	            		  }else if(type==1){
	            			  contents = cell.getStringCellValue();
	            		  }else{
	            			  String sheetName = sheet.getSheetName();
            				  String columnI = getExcelColumn(xlsColumnI+1);
	            			  return "EXCEL的“"+sheetName+"”页中第"+(k+1)+"行第"+columnI+"列所填的值的类型不支持！";
	            		  }
//	            		  String contents = cell.getStringCellValue();
	            		  
	            		  String columnName = ((String)datail.get("BIZ_TABLE_COLUMN_NAME")).toUpperCase();
	            		  if(contents!=null&&contents.length()>0){
	            			  if(columnName.equals("PASSWORD")){
		            			  //生成加密秘钥
		            			  byte[] salt = Digests.generateSalt(AccountService.SALT_SIZE);
		            			  map.put("SALT", Encodes.encodeHex(salt));
		            			   
		            			  //生成加密后的密码
		            			  byte[] hashPassword = Digests.sha1(contents.getBytes(), salt, AccountService.HASH_INTERATIONS);
		            			  map.put("PASSWORD", Encodes.encodeHex(hashPassword));
		            		  }else if(columnName.equals("ROLE_ID")){
		            			  boolean isHave = true;//excel所填角色是否存在
		            			  for(int r=0;r<roleInfo.size();r++){
		            				 Map roleMap = (Map)roleInfo.get(r); 
		            				 String roleName = (String)roleMap.get("ROLE_NAME");
		            				 if(contents.equalsIgnoreCase(roleName)){
		            					 isHave = false;
		            					 String roleId = (String)roleMap.get("ROLE_ID");
		            					 map.put("ROLE_ID", roleId);
		            					 break;
		            				 }
		            			  }
		            			  if(isHave){
		            				  //所填角色信息不存在
		            				  String sheetName = sheet.getSheetName();
		            				  String columnI = getExcelColumn(xlsColumnI+1);
		            				  return "EXCEL的“"+sheetName+"”页中第"+(k+1)+"行第"+columnI+"列所填的角色名称不存在！";
		            			  }
		            		  }else{
		            			  map.put(columnName, contents); 
		            		  }
	            		  }else{
	            			  String nullAble = (String)datail.get("NULL_ABLE");
                              if("1".equals(nullAble)){
                                  String columnI = getExcelColumn(xlsColumnI+1);
                                  String sheetName = sheet.getSheetName();
                                  return "EXCEL的“"+sheetName+"”页中第"+(k+1)+"行第"+columnI+"列不能为空！";
                              }
                              if(columnName.equals("PASSWORD")){
		            			  //生成加密秘钥
                            	  map.put("SALT", "");
		            		  }
                              map.put(columnName, "");
	            		  }
	  	              }
	                  
	                  list.add(map);
                  }
               }
               if(list.size()==0){
                  return "Excel中无数据！";
               }
               importDao.batchInsertUserData(list);
			} catch (Exception e) {
              throw(e);
            }finally{
                if(null != in){
            	   in.close();
                }
            }
        }
		return null;
	}
	
	/**
	 * 获取相应的列索引的英文字母表示
	 * @param j
	 * @return
	 */
	private static String getExcelColumn(int j){
        String str = "";
        int min = j%26;
        str = String.valueOf((char) (65+min));
        if(j>min){
            str = getExcelColumn((j-min)/26 - 1).concat(str);
        }
        return str;
    }

}
