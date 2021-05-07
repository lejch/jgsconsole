<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@page import="net.sf.json.JSONArray"%>

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
<script type="text/javascript" src="${ctx}/views/account/user/userAddEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="addUserForm" method="post">
			<fieldset>
				<input type="hidden" id="USER_ID" name="USER_ID" />
				<input type="hidden" id="UNITCODE" name="UNITCODE"/>
				<input type="hidden" id="CREATER" name="CREATER"/>
				 <table>
					 <tr>
					    <th>账号</th>
					    <td><input name="USER_NAME" id="USER_NAME" class="easyui-textbox easyui-validatebox" type="text" data-options="required:true" validType="userNameCheck"/></td>
					    <th>用户名</th>
					    <td><input name="USER_ALIAS" id="USER_ALIAS" class="easyui-textbox easyui-validatebox" type="text" data-options="required:true"/></td>
					 </tr>
					 <tr>
						<th>邮箱</th>
						<td><input name="EMAIL"  class="easyui-textbox easyui-validatebox" id="EMAIL" type="text" data-options="validType:'email'"/></td>
						<th>联系方式</th>
						<td><input name="PHONE"  class="easyui-textbox" id="PHONE" type="text" /></td>
					 </tr>
					 <tr>
						<th>固定电话</th>
						<td><input name="HOMEPHONE"  class="easyui-textbox" id="HOMEPHONE" type="text" /></td>
						<th>组织机构</th>
						<td><input name="unitCode"  class="easyui-textbox" id="unitCode" type="text" /></td>
					 </tr>
					 <tr>
						<th>密码</th>
						<td><input name="PASSWORD"  class="easyui-textbox" id="PASSWORD" type="password" data-options="required:true"/></td>
						<th>确认密码</th>
						<td><input name="plainPassword"  class="easyui-textbox" id="plainPassword" type="password" required="required" validType="equals['#PASSWORD']"/></td>
					 </tr>
					
				 </table>
			</fieldset>
		</form>
	</div>
</div>
