<%@page import="net.sf.json.JSONObject"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@page import="com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<% String appPath = request.getContextPath();%>
 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<base href="<%=request.getContextPath()%>">
</head>
<body>
<script type="text/javascript">
  	var appPath = "<%=appPath%>";
</script>
<link href="${ctx}/static/bootstrap/bootstrap-datepicker-1.0.1/datepicker.css" type="text/css" rel="stylesheet" />
<script src="${ctx}/static/bootstrap/bootstrap-datepicker-1.0.1/bootstrap-datepicker.js" type="text/javascript"></script>
<script src="${ctx}/static/bootstrap/bootstrap-datepicker-1.0.1/bootstrap-datepicker.zh-CN.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/static/common/jquery.validation.extend.js"></script>
<script type="text/javascript" src="${ctx}/views/account/user/personal_data.js"></script>
<script type="text/javascript">
</script>
<!-- 个人资料 -->
    <form id="personal_Form" method="post" class="form-horizontal">
    	<input type="hidden" id="userId" name="userId" />
    	<div class="control-group">
			<label for="useralias" class="control-label">姓名:</label>
			<div class="controls">
				<input type="text" id="useralias" name="useralias" class="input-large" placeholder="用户名"/>
			</div>
		</div>			
		<div class="control-group">
			<label for=idcard class="control-label">身份证号码:</label>
			<div class="controls">
				<input type="text" name=idcard id="idcard" class="input-large" placeholder="身份证号码"></input>
			</div>
		</div>														
  		<div class="control-group">
			<label for="birthday" class="control-label">生日:</label>
			<div class="controls">
				<input type="text" id="birthday" name="birthday" class="input-large" placeholder="生日"/>
			</div>
		</div>
	    <div class="control-group">
    		<label class="control-label">性别:</label>
			<div class="controls">			
    			<input  type="Radio" name="gender" value="1" id="gender1" style="left"/>男
    			&nbsp;&nbsp;&nbsp;&nbsp;
    			<input  type="Radio" name="gender" value="2" id="gender2" style="left"/>女
    		</div>
    	</div>
    	<div class="control-group">
    		<label for="location" class="control-label">所在地:</label>
			<div class="controls">
				<input type="text" id="location" name="location" class="input-large" placeholder="所在地" />
			</div>
		</div>
    	<div class="control-group">
			<label for="work_unit" class="control-label">工作单位:</label>
			<div class="controls">
				<input type="text" id="work_unit" name="work_unit" class="input-large" placeholder="工作单位" />
			</div>
		</div>
		<div class="control-group">
			<label for="phone" class="control-label">联系电话:</label>
			<div class="controls">
					<input type="text" id="phone" name="phone" class="input-large" placeholder="联系电话" />
			</div>
		</div>
    	<div class="control-group">
			<label for="email" class="control-label">邮箱:</label>
			<div class="controls">
				<input type="text" id="email" name="email" class="input-large" placeholder="邮箱"/>
			</div>
		</div>
		<div class="control-group">
			<label for="unitname" class="control-label">组织机构名称:</label>
			<div class="controls">
				<input type="text" id="unitname" name="unitname" class="input-large uneditable-input" readonly="readonly"/>
			</div>
		</div>
		
	</form>
	<div id="personalData"></div>
</body>
</html>
