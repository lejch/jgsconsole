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
	<script type="text/javascript" src="${ctx}/views/wlcmConsole/org_company/companyReg.js"></script>
	<style type="text/css">
		 #orgnewsworkspace .datagrid-body{overflow-x:hidden !important;}
		 .btn_plugin_style{padding:3px 7px;}
		 .btn_A_text{color:#000;margin-left:3px;}
		 .hasSetHpLoop{display:inline-block;position:absolute;top:8px;cursor:pointer;color:green;}
		 .hasSetHpLoop:hover{text-decoration:line-through;}
		 .gonpic{position:absolute;font-size:16px;top:-2px;left:42px;}
		 #hndiszh{overflow:hidden;}
		 #grcxhy{text-align:right;padding:0 15px 12px;padding-top:5px;user-select: none;}
    	 #grcxhy a{height:28px;line-height:28px;margin:5px 5px 0;padding:0 15px;border-color:#1E9FFF;background-color:#1E9FFF;color:#fff;border-radius:2px;font-weight:400;
        		   display:inline-block;vertical-align:top;cursor:pointer;text-decoration:none;}
		 #grcxhy a:hover{opacity:.9;text-decoration:none;}
		 #dcgrhy{text-align:right;padding:0 15px 12px;padding-top:5px;user-select: none;}
    	 #dcgrhy a{height:28px;line-height:28px;margin:5px 5px 0;padding:0 15px;border-color:#4cae4c;background-color:#4cae4c;color:#fff;border-radius:2px;font-weight:400;
        		   display:inline-block;vertical-align:top;cursor:pointer;text-decoration:none;}
		 #dcgrhy a:hover{opacity:.9;text-decoration:none;}
	</style>
  </head>
<body>
<div style="border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-right:2px;margin-top: 2px;">
  	<div style="background:#fff;">
  	<span style="display:inline-block;font-size:20px;font-weight:bold;padding-left:20px;margin-top:10px;">企业会员申请信息</span>
  	<i class="glyphicon glyphicon-info-sign" style="font-size:16px;cursor:pointer;" id="xmtips"></i>
	   <div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 20px 5px 0px;height:32px;">
	   		<shiro:hasPermission name="groupRegExport">
	   			<button id='exportAllGrouprReg' style="margin-right:10px;border-radius:3px !important;padding:0px 8px !important;" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="LigatureSymbols LigatureSymbolsTt" style="font-size:21px;"></i>
	   			</button>
			</shiro:hasPermission>
			<button id="searchBoxBtnCnt" type="button" class="btn btn-default btn-xs" style="padding:4px;">
   				<input id='searchbox' type="text" class="searchInp" />
   				<div id="mm">
					<div data-options="name:'1',selected:true">会员号</div>
					<div data-options="name:'2'">企业名称(中)</div>
					<div data-options="name:'3'">企业名称(英)</div>
					<div data-options="name:'4'">申请人</div>
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