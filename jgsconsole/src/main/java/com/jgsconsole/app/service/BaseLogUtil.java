package com.jgsconsole.app.service;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.RowBounds;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jgsconsole.app.repository.account.LogDao;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.common.util.PropertiesUtil;
import com.jgsconsole.common.util.SpringContextHolder;
import com.jgsconsole.common.util.UUIDGenerator;

public class BaseLogUtil {
	
	@Autowired
	private LogDao logDao;
	
	public String DEFALUT_OPEATE_TYPE = "操作日志";
	public String DEFALUT_LOGIN_TYPE = "登陆日志";
	public String DEFALUT_STRING_ENABLE = "启用";
	public String DEFALUT_STRING_DISABLE = "停用";
	public String DEFALUT_STRING_INSERT = "新增";
	public String DEFALUT_STRING_UPDATE = "修改";
	public String DEFALUT_STRING_DELETE = "删除";
	public String DEFALUT_STRING_CANCEL = "取消了";
	public String DEFALUT_STRING_ALLOT = "分配";
	public String DEFALUT_STRING_DISBIND = "解除分配的";
	public String DEFALUT_STRING_CHANGEPWD = "修改了登陆密码";
	public String DEFALUT_STRING_PWD = "登陆密码";
	public String DEFALUT_STRING_RESET = "重置了用户";
	public String DEFALUT_STRING_PERMISSION = "的权限";
	public String DEFALUT_STRING_LOGIN = "成功登陆系统";
	public String DEFALUT_SPECIAL_PERMISSION = "调整了特殊权限";
	public String DEFALUT_DEL_SPECIAL_PERMISSION = "的特殊权限";
	public String DEFALUT_USER_ROLE = "为";
	public String DEFALUT_PART_MENU = "菜单";
	public String DEFALUT_PART_APP = "子应用";
	public String DEFALUT_STRING_USER = "用户";
	public String DEFALUT_STRING_ROLE = "角色";
	
	public void insertLogs(String logType,String describe) throws Exception{
		Map map = getDefalutLogInfo(logType,describe);
		String ip = getIpAddr();
		map.put("IP", ip);
		map.put("OPEATE_DETAIL", "");
		logDao.insertLog(map);
	}
	
	public void insertLogs(String logType,String describe,String OPEATE_DETAIL) throws Exception{
		Map map = getDefalutLogInfo(logType,describe);
		String ip = getIpAddr();
		map.put("IP", ip);
		map.put("OPEATE_DETAIL", OPEATE_DETAIL);
		logDao.insertLog(map);
	}
	
	public void insertLoginLog(String logType,String describe,String ip) throws Exception{
		Map map = getDefalutLogInfo(logType,describe);
		map.put("IP", ip);
		map.put("OPEATE_DETAIL", "");
		LogDao insertUtil = (LogDao)SpringContextHolder.getBean("logDao");
		insertUtil.insertLog(map);
	}
	
	public Map getDefalutLogInfo(String logType,String describe) throws Exception{
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		String user_name =  user.getUsername();
		String user_alias = user.getUseralias();
		String user_id = user.getUserId();
		String description = user_alias+"："+describe;
		String id = UUIDGenerator.getUUID();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = df.format(new Date());
		
		Map map = new HashMap();
		map.put("ID", id);
		map.put("OPEARTER", user_name);
		map.put("LOG_TYPE", logType);
		map.put("TIME", time);
		map.put("DESCRIBE", description);
		map.put("USER_ID", user_id);
		
		return map;
	}
	
	public String getIpAddr() throws Exception {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		String ipAddress = request.getHeader("x-forwarded-for");
			if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getHeader("Proxy-Client-IP");
			}
			if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getHeader("WL-Proxy-Client-IP");
			}
			if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
				ipAddress = request.getRemoteAddr();
				if(ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1") || ipAddress.equals("0:0:0:0:0:0:0:1%0")){
					//根据网卡取本机配置的IP
					InetAddress inet=null;
					try {
						inet = InetAddress.getLocalHost();
					} catch (UnknownHostException e) {
						e.printStackTrace();
					}
					ipAddress= inet.getHostAddress();
				}
			}
			//对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
			if(ipAddress!=null && ipAddress.length()>15){ //"***.***.***.***".length() = 15
				if(ipAddress.indexOf(",")>0){
					ipAddress = ipAddress.substring(0,ipAddress.indexOf(","));
				}
			}
			return ipAddress; 
	}
	
	public String getIpAddr(HttpServletRequest request) throws Exception {
		String ipAddress = request.getHeader("x-forwarded-for");
		if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if(ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1") || ipAddress.equals("0:0:0:0:0:0:0:1%0")){
				//根据网卡取本机配置的IP
				InetAddress inet=null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ipAddress= inet.getHostAddress();
			}
		}
		//对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if(ipAddress!=null && ipAddress.length()>15){ //"***.***.***.***".length() = 15
			if(ipAddress.indexOf(",")>0){
				ipAddress = ipAddress.substring(0,ipAddress.indexOf(","));
			}
		}
		return ipAddress; 
	}
}