<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/orgNewsDlg.css">
<script type="text/javascript" src="${ctx}/views/wlcmConsole/org_news/org_newsEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;">
		<div id="widthOptions"></div>
		<form id="orgNewsEditForm" method="post">
			<input name="ID" id="ID"  type="hidden"/>
			<input name="ATTACHMENT" id="ATTACHMENT"  type="hidden"/>
			<input name="CREATE_TIME" id="CREATE_TIME"  type="hidden"/>
			<input name="DATETIME" id="DATETIME"  type="hidden"/>
			<input name="IS_SHOWN" id="IS_SHOWN"  type="hidden"/>
			<input name="UMHTML" id="UMHTML"  type="hidden"/>
			<input name="UP_BTN_HAS_CLICKED" id="UP_BTN_HAS_CLICKED" value="1" type="hidden"/>
			<input name="TYPE" id="TYPE" value="3" type="hidden"/>
			<table style="margin-top:5px;margin-left:10px;">
				 <tr>
				    <th>标题</th>
					<td><input name="TITLE" id="TITLE" style="width:563px;" data-options="required:true" class="easyui-textbox easyui-validatebox" type="text"/></td>
				</tr>
			</table>
			<table style="margin-left:10px;">
				<tr>
					<th>日期</th>
					<td><input name="fbrq" class="easyui-textbox" id="fbrq" type="text" required="required"/></td>
					<th>时间</th>
					<td><input name="fbsj" class="easyui-textbox" id="fbsj" type="text" required="required"/></td>
					<th>发布人</th>
					<td><input name="CREATOR" id="CREATOR" style="width:70px;" required="required" class="easyui-textbox easyui-validatebox" type="text"/></td>
				 	<th>首页显示</th>
				 	<td><input id="isShown" required="required"></td>
				 </tr>
			</table>
		</form>
		<script type="text/plain" id="myEditor"></script>
		<table style="margin-top:10px;margin-left:auto;margin-right:auto;">
			<tr>
				<th>附件</th>
				<td><div id="upFj_files" style="border:1px solid #ddd;line-height:30px;height:60px;"></div></td>
				<td><button type="button" class="btn btn-warning" id="upfjbtn">上传附件</button></td>
			</tr>
		</table>
	</div>
</div>
