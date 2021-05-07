<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@page import="com.jgsconsole.common.util.PropertiesUtil"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%
String path = request.getContextPath();
String WEBTRANS = "";
if(StringUtils.isNotBlank(PropertiesUtil.getInstance("/webtrans.properties").getConfig("biz.uri"))){WEBTRANS=PropertiesUtil.getInstance("/webtrans.properties").getConfig("biz.uri");}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<script type="text/javascript" src="${ctx}/views/wlcmConsole/xh_file/xh_file.js"></script>
	<style type="text/css">
		 .l-btn{width:30px;}
		 .datagrid-td-rownumber{height:70px;}
		 .layui-layer-content{overflow:hidden;}
	</style>
	<script>var appPath="${ctx}";
			var WEB_TRANS='<%=WEBTRANS%>';
			if(WEB_TRANS==null||WEB_TRANS==''){WEB_TRANS=appPath;}
	</script>
  </head>
<body>
<div style="border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<div style="background:#fff;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;padding-left:20px;margin-top:10px;">学会文件</span>
	   <div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 20px 5px 0px;height:32px;">
	   		<shiro:hasPermission name="xhUp">
	   			<button id='upxh' type="button" class="btn btn-default btn-xs btn_plugin_style" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">
	   				<i class="glyphicon glyphicon-cloud-upload" ></i>
	   			</button>
			</shiro:hasPermission>
	   </div>
	 </div>
	 <div id="orgnewsworkspace" style="background:#fff;padding-left:20px;text-align:center;">
	 		<table id="orgDownLoad"></table>
	 </div>
	 </div>
</body>
</html>