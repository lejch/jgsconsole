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
<script type="text/javascript">
$(document).ready(function(){
	$.extend($.fn.validatebox.defaults.rules, {
	    equals: {
	        validator: function(value,param){
	            return value == $(param[0]).val();
	        },
	        message: '两次输入的密码不匹配！'
	    }
	});
});
</script>
<script type="text/javascript" src="${ctx}/views/account/user/userPasswordEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="changeUserPasswordForm" method="post">
			<fieldset>
				 <table>
				 	<tr>
				 		<th>现用密码</th>
				 		<td><input name="PASSWORD" class="easyui-textbox" id="PASSWORD" type="password" data-options="required:true" /></td>
				 	</tr>
					 <tr>
						<th>新密码</th>
						<td><input name="plainPassword"  class="easyui-textbox" id="plainPassword" type="password" data-options="required:true"/></td>
					</tr>
					<tr>
						<th>确认密码</th>
						<td><input name="surePassword"  class="easyui-textbox" id="surePassword" type="password" required="required" validType="equals['#plainPassword']"/></td>
					 </tr>
				 </table>
			</fieldset>
		</form>
	</div>
</div>