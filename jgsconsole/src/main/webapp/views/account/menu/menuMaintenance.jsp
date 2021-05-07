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
    <title>菜单管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<script type="text/javascript" src="${ctx}/views/account/menu/menuMaintenance.js"></script>
	<style type="text/css">
		 .btn_plugin_style{padding-left:7px;padding-right:7px;}
		 .btn_A_text{color:#000;margin-left:3px;display:none;}
		 .btn-default{transition-delay: 0.5s;transition:width 0.5s;width:34px;}
		 #userToolBars button:first-child{border-radius: 3px 0px 0px 3px;}
		 #userToolBars button:last-child{border-radius: 0px 3px 3px 0px;}
	</style>
  </head>
<body>
	<div style="border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<div style="background:#fff;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;padding-left:20px;margin-top:10px;">后台菜单配置</span>
	   <div id="userToolBars" class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
	   		<shiro:hasPermission name="menuAdd">
	   			<button id='addMenu' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-plus" ></i>
	   			</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="menuEdit">
				<button id='editMenu' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-edit" ></i>
	   			</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="menuDel">
				<button id='delMenu' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-trash" ></i>
	   			</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="menuInUse">
				<button id='inUseMenu' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-ok" ></i>
	   			</button>
			</shiro:hasPermission>
	   </div>
	 </div>
	 <div id="treeworkspace" style="background:#fff;padding-left:20px;padding-bottom:30px;text-align:center;">
	 		<table id="menuGrid"></table>
	 </div>
	 </div>
</body>
</html>
