<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<style>
	textarea:focus, input[type="text"]:focus{
	    border-color: rgba(82, 168, 236, 0.8);
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
	    outline: 0 none;
		}
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
	legend {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    border-color: #E5E5E5;
	    border-image: none;
	    border-style: none none solid;
	    border-width: 0 0 1px;
	    color: #999999;
	    line-height: 20px;
	    display: block;
	    margin-bottom: 10px;
	    padding: 0;
	    width: 100%;
	}
	input, textarea {
	    font-weight: normal;
	}
	table ,th,td{
		text-align:left;
		padding: 6px;
	}
</style>
<script type="text/javascript" src="${ctx}/views/account/role/roleEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="editRoleForm" method="post">
			<fieldset>
				<input name="ROLE_ID" id="ROLE_ID"  type="hidden"/>
				<input name="ROLE_TYPE" id="ROLE_TYPE"  type="hidden"/>
				<input name="APP_ID" id="APP_ID"  type="hidden"/>
				<input name="PARENT_ID" id="PARENT_ID"  type="hidden"/>
				<input name="OriginalParentId" id="OriginalParentId"  type="hidden"/>
				 <table>
					 <tr>
					    <th>角色名称</th>
					    <td><input name="ROLE_NAME" id="ROLE_NAME" class="easyui-textbox" type="text" data-options="required:true"/></td>
						<th>父角色名称</th>
						<td><input name="PID"  class="easyui-textbox" id="PID" type="text" required="required"/></td>
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
