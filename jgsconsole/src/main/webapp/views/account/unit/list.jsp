<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
  <head>
	<title>组织机构管理</title>
	<style type="text/css">
		#unitDiv .panel-title {
		  font-size: 12px;
		  font-weight: bold;
		  color: #777;
		  height: 16px;
		  line-height: 16px;
			  background:none;
		}
		#unitDiv .panel-tool a{
			display: inline-block;
			width: 16px;
			height: 16px;
			opacity: 0.6;
			filter: alpha(opacity=60);
			margin: 0 0 0 2px;
		}
		#unitDiv .panel-body{
			overflow: auto;
			border-top-width: 0;
			padding: 0;
		}
	</style>
  </head>

  <body>
  <link rel="stylesheet" href="${ctx}/static/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"/>
  <script type="text/javascript" src="${ctx}/static/ztree/js/jquery.ztree.all-3.5.min.js"></script>
  <script type="text/javascript" src="${ctx}/views/account/unit/list.js"></script>
  <script type="text/javascript" src="${ctx}/static/common/js.map.extend.js"></script>
  
 	<div id="unitDiv" class="easyui-layout" style="width:100%;height:100%;">
 		<div id="mainContent" data-options="region:'west',split:true" title="组织机构目录树" style="width:200px;">
			<div id="treeContainer">
		    	<div id="menuTree" class="ztree"></div>
            </div>
            <div id="rMenu" class="easyui-menu" style="width:120px;">
					<div id="addUnit" icon="icon-add">添加</div>					
					<div id="deleteUnit" icon="icon-remove">删除</div>
			</div>
	</div>
	
	<div data-options="region:'center',title:'组织机构信息'" style="width:100%;">
		<div id="menuInfo" style="display:block;overflow-y:hidden;width:100%;margin-top:10px;">   
			<form id="MenuInfoForm" method="post" style="margin:5px;display:none;width:98%;" class="form-horizontal">
				<input type="hidden" id="UNIT_CODE" name="UNIT_CODE"/>
				<input type="hidden" id="PARENT_CODE" name="PARENT_CODE"/>
				<div class="control-group" style="width:80%;">
					<label class="control-label" style="width: 100px !important;" for="UNIT_NAME" >组织机构名称</label>
					<div class="controls" style="margin-left: 100px !important;width:82%;">
						<input type="text" name="UNIT_NAME" id="UNIT_NAME" style="width: 100%;"/>
					</div>
				</div>
				<div class="control-group" style="width:80%;">
					<label class="control-label" style="width: 80px !important;" for="DESCRIPTION">描述</label>
					<div class="controls" style="margin-left: 100px !important;width:82%;">
						<textarea rows="3" name="DESCRIPTION" id="DESCRIPTION" style="width:100%;"></textarea>
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						<button id="save" type="button" class="btn btn-primary" data-loading-text="正在保存...">保存</button>
						<button id="reset" type="button" class="btn">重置</button>
						<button id="refresh" type="button" class="btn" >刷新</button>
					</div>
				</div>
			</form>
		</div>
	</div>
 </div>
</body>
</html> 
