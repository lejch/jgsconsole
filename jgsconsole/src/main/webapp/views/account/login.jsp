<!DOCTYPE html>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.jgsconsole.app.web.filter.UserFormAuthenticationFilter"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="org.apache.commons.lang.StringUtils"%>
<%
String appPath = request.getContextPath();
Object obj =  SecurityUtils.getSubject().getPrincipal();
if(obj!=null){SecurityUtils.getSubject().logout();}
String errorMsg="";
// if(request.getAttribute("shiroLoginFailure")!=null){errorMsg=(String)request.getSession().getAttribute("error");}
if(StringUtils.isNotBlank((String)request.getSession().getAttribute("error"))){
	errorMsg = (String)request.getSession().getAttribute("error");
}
%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
  <head>  
  	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">   	  
	<title>江苏省老年医学学会</title>
	<link rel="icon" href="${ctx}/static/favicon/favicon.ico" mce_href="${ctx}/static/favicon/favicon.ico" type="image/x-icon">
	<link href="${ctx}/static/loginPage/styles.css" rel="stylesheet">
	<script src="${ctx}/static/jquery/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap-3.3.5/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap-3.3.5/css/bootstrap.min.css">
    <script src="${ctx}/static/layer/layer.js" type="text/javascript"></script>
<script type="text/javascript">
var appPath ="${ctx}";var sumbitted=false;$(document).ready(function(){var isIE = false || !!document.documentMode;$(".container").css({position:"absolute",left:($(window).width()-$(".container").outerWidth())/2,top:($(window).height()-$(".container").outerHeight())/2});if(isIE){isIELogin();}else{if(getCookie('username')){$('#username').val(getCookie('username'));}var errorMsg = '<%=errorMsg%>';if(errorMsg!=''&&errorMsg!=null){document.getElementById('authenticationResult').innerHTML=errorMsg;}}});function submit_form(formid,buttonid){setCookie('username',$('#username').val());if(!sumbitted){IMGVAILDRESULT=false;var username=$('#username').val().trim();var password=$('#password').val().trim();if(username!=null&&username!=''&&password!=null&&password!=''){if(!sumbitted){sumbitted=true;initImgVaild(function(){if(IMGVAILDRESULT){document.getElementById(formid).submit();document.getElementById(buttonid).disabled=true;}else{layer.open({move:false,type:4,resize:false,time:3000,closeBtn:0,area:['250px','30px'],tips:1,shade:[0.01,'#fff'],shadeClose:false,content:['验证码错误或未验证,请重新验证登录!','#submit_btn']});sumbitted=false;}},function(){layer.close(layer.index);sumbitted=false;},'auto');}}}}function CLOSEIMGVAILD(){layer.close(layer.index);}function SETIMGVAILDRESULT(result){IMGVAILDRESULT=result;}function GETIMGVAILDRESULT(){return IMGVAILDRESULT;}var IMGVAILDRESULT=false;function initImgVaild(endCallback,cancelCallback,offset){layer.open({offset:offset,title:false,move:false,type:2,resize:false,shade:[0.1,'#fff'],area:['260px','230px'],shadeClose:false,content:[appPath+'/views/account/imgValidCode3.jsp','no'],end:function(){endCallback();},cancel:function(){cancelCallback();}});}function enterToSubmit(evt,formid,buttonid){if(evt.keyCode==13){submit_form(formid,buttonid);}}function delCookie(name){document.cookie=name+"=;expires="+(new Date(0)).toGMTString();}function getCookie(name){var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if(arr!=null)return unescape(arr[2]);return null;}function setCookie(name,value){var Days=10;var exp=new Date();exp.setTime(exp.getTime()+Days*24*3600000);document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();}
function isIELogin(){
	layer.open({title:false,move:false,id:'loginSupportLy',type:1,resize:false,area:['450px','488px'],shade:[0.9,'#000'],shadeClose:false,closeBtn:0,
	content:'<div class="alert alert-danger alert-dismissible fade in" style="padding:15px !important;" role="alert">'+
	'<h4 style="margin-bottom:5px;font-size:16px;font-weight:bold;color:black;">不支持IE浏览器</h4>'+
	'<p style="font-size:12px;text-indent:2em;margin:5px 0px;">您使用的浏览器是<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>IE浏览器</strong>，建议使用<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>Chrome浏览器</strong>浏览网页！</p>'+
	'<p style="font-size:13px;font-weight:bold;margin-top:10px;color:black;">建议使用浏览器：</p>'+
	'<table class="dataintable browsersupport" style="width:95%;margin:0 auto !important;"><tr><th>Chrome（谷歌浏览器）</th></tr><tr><td class="bsChrome"></td></tr></table>'+
	'<p style="font-size:12px;text-indent:2em;margin:5px 0px;"">其他浏览器，如<strong style="color:red;font-weight:bold;">firefox、safari、360浏览器极速模式、搜狗浏览器极速模式等</strong>都是<strong style="color:red;font-weight:bold;">支持</strong>的。</p>'+
	'<p style="font-size:12px;text-indent:2em;margin:5px 0px;"">若使用<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>等访问，请按下图设置成<strong style="color:red;font-weight:bold;">极速模式</strong></p>'+
	'<table class="dataintable browsersupport" style="width:95%;margin:0 auto !important;"><tr><th>浏览器极速模式设置示意</th></tr><tr><td class="bs360"></td></tr></table>'+
	'<p style="font-size:13px;font-weight:bold;margin-top:15px;position:relative;color:black;">浏览器下载：</p>'+
	'<p style="line-height:20px;margin-bottom:20px;"><img style="height:20px;position:absolute;left:25px;" src="'+appPath+'/static/images/compatible_chrome.png">'+
	'<a href="'+appPath+'/static/chrome/download_chrome.jsp" class="dcrme">Chrome浏览器(点击下载)</a></p></div>'});
}
</script>

<body id="xhtpBdLgn" onkeydown="enterToSubmit(event,'loginForm','submit_btn')">
<div class="htmleaf-container">
	<div class="wrapper">
		<div class="container">
			<h1></h1>
			<p id='authenticationResult'></p>
			<form class="form" id="loginForm" method="post" name="login" action="${ctx}/login" autoComplete="off">
				<input type="text" name="username" id="username" placeholder="请输入用户名" required>
				<input type="password" name="password" id="password" placeholder="请输入密码" required>
				<a id="submit_btn" onclick="submit_form('loginForm','submit_btn');">登 录</a>
			</form>
		</div>
		<ul class="bg-bubbles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
	</div>
</div>
<div class="logintop"><span>欢迎登录</span><ul><li><a href="javascript:void(0)">帮助</a></li><li><a href="javascript:void(0)">关于</a></li></ul></div>
<div class="loginbm">Copyright © 2019 江苏省老年医学学会</div>
</body>
</html>