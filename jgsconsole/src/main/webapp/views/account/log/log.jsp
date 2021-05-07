<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="${ctx}/views/account/log/log.js"></script>
	<style type="text/css">
		#logworkspace .panel-title {
		  font-size: 12px;
		  font-weight: bold;
		  color: #777;
		  height: 16px;
		  line-height: 16px;
			  background:none;
		}
		.pagination .l-btn{width:30px !important;height:30px !important;}
	</style>
  </head>
  
  <body>
  <div style="padding-left:20px;padding-bottom:10px;background:#fff;border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;margin-top:10px;">系统操作日志</span>
  	<div id="logworkspace" >
  		<table id="logDg" style="margin-left:10px;"></table>
  	</div>
  </div>
  </body>
</html>
