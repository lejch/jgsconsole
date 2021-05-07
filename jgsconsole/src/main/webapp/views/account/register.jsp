<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<html>
<head>
	<script>
		$(document).ready(function() {
			$("#username").focus();
			//为registerForm注册validate函数
			$("#registerForm").validate({
				rules: {
					username: {
						remote: "${ctx}/register/checkLoginName"
					}
				},
				messages: {
					username: {
						remote: "用户登录名已存在"
					}
				}
			});
		});
	</script>
	
	<style type="text/css">
	.spn-red
	{
		color:red;
	}
	</style>
</head>

<body>
 <div class="container img-polaroid" style="font-family:'微软雅黑';margin:50px auto;width: 600px; padding: 5% 0;">
	<form id="registerForm" action="${ctx}/register" method="post" class="form-horizontal">
		<fieldset>
			<span style="width:100%;text-align:center;display:block;font-weight:bold;font-size:15px;padding:5px 0;">用户注册</span>
			<div class="control-group">
				<label for="username" class="control-label"><span class="spn-red">*</span>用户名:</label>
				<div class="controls">
					<input type="text" id="username" name="username"  class="input-large required" placeholder="登录名" minlength="3"/>
				</div>
			</div>
			<div class="control-group">
				<label for="useralias" class="control-label"><span class="spn-red">*</span>登录名:</label>
				<div class="controls">
					<input type="text" id="useralias" name="useralias" class="input-large required" minlength="3" placeholder="全球唯一"/>
				</div>
			</div>
			<div class="control-group">
				<label for="idcard" class="control-label"><span class="spn-red">*</span>身份证号:</label>
				<div class="controls">
					<input type="text" id="idcard" name="idcard" class="input-large required" minlength="15" placeholder="全球唯一"/>
				</div>
			</div>		
			<div class="control-group">
	    		<label class="control-label"><span class="spn-red">*</span>性别:</label>
				<div class="controls">			
	    			<input  type="Radio" name="gender" value="1" id="gender1" checked="true" style="left"/>男
	    			&nbsp;&nbsp;&nbsp;&nbsp;
	    			<input  type="Radio" name="gender" value="2" id="gender2" style="left"/>女
	    		</div>
    		</div>
			<div class="control-group">
				<label for="email" class="control-label"><span class="spn-red">*</span>邮箱:</label>
				<div class="controls">
					<input type="text" id="email" name="email" class="input-large email" placeholder="邮箱"/>
				</div>
			</div>
			<div class="control-group">
				<label for="plainPassword" class="control-label"><span class="spn-red">*</span>密码:</label>
				<div class="controls">
					<input type="password" id="password" name="password" class="input-large required" placeholder="密码"/>
				</div>
			</div>
			<div class="control-group">
				<label for="confirmPassword" class="control-label"><span class="spn-red">*</span>确认密码:</label>
				<div class="controls">
					<input type="password" id="plainPassword" name="plainPassword" class="input-large required" placeholder="确认密码" equalTo="#password"/>
				</div>
			</div>
			<div style="width:100%;text-align:center;display:block;font-weight:bold;font-size:15px;padding:5px 0">
				<input id="submit_btn" class="btn btn-primary" type="submit" value="提交"/>&nbsp;	
				<input id="cancel_btn" class="btn btn-primary" type="button" value="返回" onclick="history.back()"/>
			</div>
		</fieldset>
	</form>
</div>
 <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a class="a" href="#">Back to top</a></p>
        <p>&copy; 2013 Company, Inc. &middot; <a class="a" href="#">Privacy</a> &middot; <a class="a" href="#">Terms</a></p>
      </footer>
</body>
</html>
