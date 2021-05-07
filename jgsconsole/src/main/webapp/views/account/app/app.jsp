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
    <title>子应用管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<script type="text/javascript" src="${ctx}/views/account/app/app.js"></script>
	<style type="text/css">
		.layout-panel .panel-title {
		  font-size: 12px;
		  font-weight: bold;
		  color: #777;
		  height: 16px;
		  line-height: 16px;
			  background:none;
		}
		.pagination .l-btn{width:30px;}
		 .btn_plugin_style{padding:6px 10px;margin-right:2px;}
		 #appToolBars .btn-default{transition-delay: 0.5s;transition:width 0.5s;}
		 .searchInp{
			height:28px;
			border:none;
			margin-right:10px;
			display:none;
		}
		.searchInp:focus{outline:none;}
		#searchbox{
			padding:0px 10px;
			height:32px;
			width:32px;
			margin-top:2px;
			transition:width 1s;
		}
		.sechActive{
			width:191px !important;
			padding:0px 10px;
			height:32px;
			margin-top:2px;
		}
		#searchbox:hover{
			background:#fff;
		}
	</style>
  </head>
  
  <body>
  	<div style="border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<div style="background:#fff;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;padding-left:20px;margin-top:10px;">子应用维护</span>
	   <div id="appToolBars" class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
	   		<shiro:hasPermission name="appAdd">
	   			<button id='addApp' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" style="border-radius:3px;width:34px;margin-right:10px;" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-plus" ></i>
	   			</button>
			</shiro:hasPermission>
			<button id="searchBoxBtnCnt" type="button" class="btn btn-default btn-xs" style="padding:4px;">
   				<input id='searchbox' type="text" class="searchInp" />
	   		</button>
	   </div>
	 </div>
	 <div id="appworkspace" style="background:#fff;padding-left:20px;,padding-right:20px;text-align:center;">
	 		<table id="appDg"></table>
	 </div>
	 </div>
  </body>
</html>
