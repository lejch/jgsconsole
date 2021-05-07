<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
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
	<script type="text/javascript" src="${ctx}/views/wlcmConsole/org_user_reg/org_user_reg.js"></script>
	<style type="text/css">
			#hndiszh{overflow:hidden;}
		 .datagrid-body{overflow-x:hidden !important;}
		 .btn_plugin_style{padding:3px 7px;}
		 .btn_A_text{color:#000;margin-left:3px;}
		 .hasSetHpLoop{display:inline-block;position:absolute;top:8px;cursor:pointer;color:green;}
		 .hasSetHpLoop:hover{text-decoration:line-through;}
		 .gonpic{position:absolute;font-size:16px;top:-2px;left:42px;}
	</style>
  </head>
<body>
<div style="border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<div style="background:#fff;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;padding-left:20px;margin-top:10px;">注册人员信息</span>
	   <div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 20px 5px 0px;height:32px;">
	   		<button id="searchBoxBtnCnt" type="button" class="btn btn-default btn-xs" style="padding:4px;">
   				<input id='searchbox' type="text" class="searchInp" />
   				<div id="mm">
					<div data-options="name:'1',selected:true">账号</div>
					<div data-options="name:'2'">昵称</div>
					<div data-options="name:'3'">手机号</div>
				</div>
	   		</button>
	   </div>
	 </div>
	 <div id="orgnewsworkspace" style="background:#fff;padding-left:20px;text-align:center;">
	 		<table id="orgNewsGrid"></table>
	 </div>
	 </div>
</body>
</html>