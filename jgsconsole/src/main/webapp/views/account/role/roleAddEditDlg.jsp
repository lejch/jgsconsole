<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<style>
		table {
	    background-color: transparent;
	    border-collapse: collapse;
	    border-spacing: 0;
	    max-width: 100%;
	}

	fieldset {
	    border: 0 none;
	    margin: 0;
	    padding: 0;
	}
	input, textarea {
	    font-weight: normal;
	}
	table ,th,td{
		text-align:left;
		padding: 6px;
	}
</style>
<script type="text/javascript" src="${ctx}/views/account/role/roleAddEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="addRoleForm" method="post">
			<fieldset>
				<input name="ROLE_ID" id="ROLE_ID"  type="hidden"/>
				<input name="ROLE_TYPE" id="ROLE_TYPE"  type="hidden"/>
				<input name="APP_ID" id="APP_ID"  type="hidden"/>
				<input name="PARENT_ID" id="PARENT_ID"  type="hidden"/>
				 <table>
					 <tr>
					    <th>角色名称</th>
					    <td><input name="ROLE_NAME" id="ROLE_NAME" class="easyui-textbox" type="text" data-options="required:true" validType="roleNameCheck"/></td>
						<th>父角色名称</th>
						<td><input name="PID"  class="easyui-textbox" id="PID" type="text" required="required" readonly="readonly"/></td>
					 </tr>
				    <tr>
				    	<th>角色类型</th>
				    	<td><input name="rollType" id="rollType" class="easyui-textbox" type="text" data-options="required:true"/></td>
				 	</tr>
					 <tr>
						<th>描述</th>
						<td colspan="3">
						<textarea id="ROLE_DESCRIPTION" name="ROLE_DESCRIPTION" class="easyui-textbox" data-options="multiline:true" style="font-size:12px;width:435px;height:100px"></textarea>
						</td></tr>
				 </table>
			</fieldset>
		</form>
	</div>
</div>
