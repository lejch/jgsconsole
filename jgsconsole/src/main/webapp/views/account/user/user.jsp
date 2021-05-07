<!DOCTYPE html>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
  <head>
	<style type="text/css">
		.userContainer{
			border-right:1px solid #dfdee0;
			width:65%;
			overflow:hidden;
		}
		.panel-header{
			border-right:1px solid #dfdee0;
		}
		.layout-panel .panel-title {
		  font-size: 12px;
		  font-weight: bold;
		  color: #777;
		  height: 16px;
		  line-height: 16px;
			  background:none;
		}
		.messager-window .panel-title {
		  background:#4899c9;
		  font-size: 14px;
		  font-weight: bold;
		  color: white;
		  height: 40px;
		  line-height: 40px;
		  padding-left:10px !important;
		}
		#userSharedListToolbar .textbox-prompt{
			width:auto !important;
			margin-left:51px !important;
			font-size: 12px;
  			color: #aaa;
		}
		.pagination .l-btn{width:30px;}
		.searchbox .textbox-button-left {
			width:50px;
			border-width: 0 1px 0 0;
		}
		.leftUserDivPanel{
			width:63%;display:inline-block;
			background:#fff;
			overflow:hidden;
			border-radius:6px;
			flex-direction: column;
			box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);
			margin-left: 2px;
    		margin-top: 2px;
		}
		.rightUserDivPanel{
			width:35%;display:inline-block;float:right;
			background:#fff;
			overflow:hidden;
			border-radius:6px;
			flex-direction: column;
			box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);
			margin-right: 2px;
    		margin-top: 2px;
		}
		.panelTitleLR{
			padding:15px;
			color:#8e5151;
			font-size:16px;
			font-weight:bold;
			background:#fff;
			display:inline-block;
		}
		.btn_plugin_style{padding:6px 10px;margin-right:2px;}
		#userToolBars .btn_A_text{color:#000;margin-left:3px;display:none;}
		#userToolBars .btn-default{transition-delay: 0.5s;transition:width 0.5s;}
		body{background:#e9f0f5 !important;}
		
		.sechActive{
			width:191px !important;
			padding:0px 10px;
			height:32px;
			margin-top:2px;
		}
	</style>
  </head>

<body class="easyui-layout">
  <script type="text/javascript" src="${ctx}/views/account/user/user.js"></script>
  <script type="text/javascript" src="${ctx}/static/common/js.map.extend.js"></script>
  
  <div class="leftUserDivPanel">
  	<div style="background:#fff;">
  	   <div class="panelTitleLR">用户列表</div>
	   <div id="userToolBars" class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
	   		<shiro:hasPermission name="userAdd">
	   			<button id='addUser' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" style="border-radius:3px;width:34px;margin-right:10px;" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-plus" ></i>
	   			</button>
			</shiro:hasPermission>
			<button id="searchBoxBtnCnt" type="button" class="btn btn-default btn-xs" style="padding:4px;">
   				<input id='searchbox' type="text" class="searchInp" />
	   		</button>
	   </div>
	 </div>
	 <div id="userInfoContainer" style="background:#fff;padding-left:20px;,padding-right:20px;text-align:center;">
	 		<table id="userSharedList"></table>
	 </div>
  </div>
  <div class="rightUserDivPanel">
  		<div class="panelTitleLR" id="panelTitleRight">角色列表</div>
  		<div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
		</div>
		<div id="userRoleContainer" style="background:#fff;padding-left:20px;,padding-right:20px;text-align:center;">
			<table id="roleUserHasList"></table>
		</div>
  </div>
</body>
</html> 
