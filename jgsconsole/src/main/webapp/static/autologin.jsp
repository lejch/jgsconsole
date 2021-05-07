<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
Object obj =  SecurityUtils.getSubject().getPrincipal();
if(obj!=null){
	SecurityUtils.getSubject().logout();
}
String username = request.getParameter("username");
String password = request.getParameter("password");
String pcardno = request.getParameter("pcardno");
String pcardtype = request.getParameter("pcardtype");
%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title><%=username%>正在登录</title>
<script src="${ctx}/static/jquery/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#loginForm").submit();
});
</script>
</head>
<body>
<form id="loginForm" action="${ctx}/login" method="post" style="display:none;">
	<input type="hidden" id="loginType" name="loginType" value="0"/>
	<input type="text" id="username" name="username"  value="<%=username%>">
	<input type="password" id="password" name="password" value="<%=password%>">
	<input type="text" id="pcardno" name="pcardno" value="<%=pcardno%>">
	<input type="text" id="pcardtype" name="pcardtype" value="<%=pcardtype%>">
</form>
</body>
</html>