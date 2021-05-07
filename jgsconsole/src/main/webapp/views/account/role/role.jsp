<!DOCTYPE html>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
  <head>
	<style type="text/css">
		.roleContainer{width:45%;border-right:1px solid #dfdee0;}
		.panel-header{background-color: #ffffff;border-right:1px solid #dfdee0;}
		.layout-panel .panel-title {font-size: 12px;font-weight: bold;color: #777;height: 16px;line-height:16px;background:none;}
		.layout{background:#e9f0f5 !important;}
		.leftRoleDivPanel{
			width:48%;display:inline-block;background:#fff;border-radius:6px;flex-direction: column;overflow:hidden;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-left: 2px;margin-top: 2px;
		}
		.rightRoleDivPanel{
			width:50%;display:inline-block;float:right;background:#fff;overflow:hidden;border-radius:6px;flex-direction: column;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);margin-right: 2px;margin-top: 2px;
		}
		.panelTitleLR{padding:15px;color:#8e5151;font-size:16px;font-weight:bold;background:#fff;display:inline-block;}
		.btn_plugin_style{padding:7px 7px;margin-right:2px;}
		.btn_A_text{color:#000;margin-left:3px;display:none;}
		.btn-default{transition-delay: 0.5s;transition:width 0.5s;width:34px;}
		.split_Line{margin-top: -5px;margin-bottom: 3px;height:0px;border-top:1px solid #ddd;}
		.datagrid-body{overflow-x:hidden;}
		#userToolBars button:first-child{border-radius: 3px 0px 0px 3px;}
		 #userToolBars button:last-child{border-radius: 0px 3px 3px 0px;}
	</style>
  </head>

<body class="easyui-layout">
  <script type="text/javascript" src="${ctx}/views/account/role/role.js"></script>
  <script type="text/javascript" src="${ctx}/static/common/js.map.extend.js"></script>
  
  <div class="leftRoleDivPanel">
  	<div style="background:#fff;">
  	   <div class="panelTitleLR">角色列表</div>
	   <div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
	   		<shiro:hasPermission name="roleAdd">
	   			<button id='addRole' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-plus" ></i>
	   			</button>
			</shiro:hasPermission>
	   </div>
	 </div>
	 <div id="roleInfoContainer" style="background:#fff;padding-left:20px;,padding-right:20px;text-align:center;">
	 		<table id="roleInfoTree"></table>
	 </div>
  </div>
  <div class="rightRoleDivPanel">
  		<div class="panelTitleLR" id="panelTitleRight">权限列表</div>
  		<div class="btn-group btn-group-sm" role="group" style="float:right;padding:5px 10px 5px 0px;">
			<shiro:hasPermission name="savePermission">
				<button id='savePermission' type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)" class="btn btn-default btn-xs btn_plugin_style">
	   				<i class="glyphicon glyphicon-floppy-saved" ></i>
	   			</button>
			</shiro:hasPermission>
		</div>
		<div id="rolePmsContainer" style="background:#fff;padding-left:20px;,padding-right:20px;text-align:center;">
			<table id="rolePermissionTree"></table>
		</div>
  </div>

</body>
</html> 
