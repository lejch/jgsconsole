<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<style>
	.easyui-textbox{
		height: 18px;
		width: 170px;
		line-height: 16px;
	    /*border-radius: 3px 3px 3px 3px;*/
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
	    transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
	}
	
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
<script type="text/javascript" src="${ctx}/views/wlcmConsole/org_menu/menuEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="menuEditForm" method="post">
			<fieldset>
				<input name="MENU_ID" id="MENU_ID"  type="hidden"/>
				<input name="PARENT_ID" id="PARENT_ID"  type="hidden"/>
				<input name="FLAG" id="FLAG"  type="hidden"/>
				<input name="TREELEVEL" id="TREELEVEL"  type="hidden"/>
				<input name="OriginalParentId" id="OriginalParentId"  type="hidden"/>
				 <table>
					 <tr>
					    <th>菜单名称</th>
						<td><input name="TITLE" id="TITLE" required="required" class="easyui-textbox easyui-validatebox" type="text"/></td>
					</tr>
					<tr>
						<th>父菜单名称</th>
						<td><input name="pid"  class="easyui-textbox" id="pid" type="text" required="required"/></td>
					 </tr>
					 <tr>
					    <th>排序编码</th>
						<td><input name="ORDER_SORT" id="ORDER_SORT" type="text" style="width:176px;" class="easyui-numberbox easyui-validatebox" required="required"/></td>
					</tr>
					<tr>	
						<th>是否启用</th>
                        <td><input id="isused" class="easyui-combobox" name="isused" style="width:171px;" data-options="required:true" />
                        </td>
					 </tr>
					  <tr>
					    <th>路径/编码</th>
						<td><input id="LOCATION" name="LOCATION" type="text" class="easyui-textbox" /></td>
					 </tr>
					 <tr>
					    <th>绑定表名</th>
						<td><input name="TABLE_ID" id="TABLE_ID" class="easyui-textbox" type="text"/></td>
					</tr>
				 </table>
			</fieldset>
		</form>
	</div>
</div>
