$(function(){
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
