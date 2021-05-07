<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>
<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
	<title>403 - 用户权限不足</title>
    <script>
        function url(url){
            if(window.top==window.self){//不存在父页面
                window.location.href = url;
            }else{
                window.top.location.href = url;
            }
        }
    </script>
    <style>
    	body{background:#f1f1f1;}
    	.err-container {padding: 1rem .625rem;}
		.text-center{text-align:center !important;}
		.err-code-container{position:relative;width: 280px;height: 280px;border-radius: 50%;border: 2px solid #01bcd4;margin: 0 auto 1.5rem;}
		.err-code-container .err-code{width: 220px;position: absolute;left: 30;text-align: center;vertical-align: middle;top: 30;height: 220px;border-radius: 50%;background-color: #01bcd4;color: #fff;}
		.err-code-container h1{margin-bottom: .5rem;font-size: 5.625rem;font-weight: 300;}
		.page-err h2 {font-size: 1.875rem;line-height: 2.5rem;margin-bottom: 1.5rem;font-weight: 300;opacity:.8;}
		.ant-btn {line-height: 30px;text-decoration: none;}
		.ant-btn, .ant-btn:active, .ant-btn:focus {outline: 0;}
		.ant-btn {line-height: 1.71428571;display: inline-block;font-weight: 400;text-align: center;touch-action: manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:0 15px;font-size:14px;border-radius:6px;height:32px;user-select:none;transition:all .3s cubic-bezier(.645,.045,.355,1);position:relative;color:rgba(0,0,0,.65);background-color:#fff;border-color:#d9d9d9;}
		.ant-btn>i,.ant-btn>span{pointer-events:none;}
		.ant-btn:not([disabled]):hover{text-decoration:none;}
		.ant-btn.active,.ant-btn:active,.ant-btn:focus,.ant-btn:hover{background:#fff;text-decoration:none;}
		.ant-btn:focus,.ant-btn:hover{color:#40a9ff;background-color:#fff;border-color:#40a9ff;}
		.ant-btn{line-height:30px;}
		a:active,a:hover{outline:0;text-decoration:none;}
		a:hover{color:#40a9ff;}
    </style>
</head>

<body>
	<div class="err-container text-center">
		<div class="err-code-container">
			<div class="err-code">
				<h1>403</h1>
			</div>
		</div>
		<h2>您无权访问该网页，请与管理员联系！（用户权限不足）</h2>
		<a href="#" class="ant-btn" onclick="javascript:url('<c:url value="/"/>');"><span>返回首页</span></a>
	</div>
</body>
</html>
