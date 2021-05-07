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
	    border-color: #FFFFFF;
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
<script type="text/javascript" src="${ctx}/views/account/app/appEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="editAPPForm" method="post">
			<fieldset>
				<input type="hidden" id="ID" name="ID" />
				<input type="hidden" id="FLAG" name="FLAG" />
				 <table>
					 <tr>
					    <th>应用发布名称</th>
					    <td><input name="APP_CODE" id="APP_CODE" class="easyui-textbox" type="text" data-options="required:true"/></td>
					    <th>ip地址</th>
					    <td><input name="IP" id="IP" class="easyui-textbox" type="text" data-options="required:true"/></td>
					 </tr>
					 <tr>
						<th>端口号</th>
						<td><input name="PORT"  class="easyui-textbox" id="PORT" type="text" data-options="required:true"/></td>
						<th>子应用名称</th>
						<td><input name="APP_NAME"  class="easyui-textbox" id="APP_NAME" type="text" data-options="required:true"/></td>
					 </tr>
					 <tr>
						<th>通信密钥</th>
						<td><input name="APP_KEY"  class="easyui-textbox" id="APP_KEY" type="text" data-options="required:true"/></td>
						<th>是否启用</th>
						<td><input name="isused"  class="easyui-textbox" id="isused" type="text" data-options="required:true"/></td>
					 </tr>
					 <tr>
					 	<th>图标</th>
						<td><input id="ICONCLS" class="easyui-combobox" name="ICONCLS" type="text"/></td>
					 </tr>
					 <tr>
						<th>描述</th>
						<td colspan="3">
						<textarea id="DESCRIPTION" name="DESCRIPTION" class="easyui-textbox" data-options="multiline:true" style="font-size:12px;width:435px;height:100px"></textarea>
						</td>
					</tr>
				 </table>
			</fieldset>
		</form>
	</div>
</div>
