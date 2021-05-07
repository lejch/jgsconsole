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
<%
String appPath = request.getContextPath();

//检查是否已登录
Object obj =  SecurityUtils.getSubject().getPrincipal();
if(obj!=null){//如果已登录，就注销登录
	SecurityUtils.getSubject().logout();
}

String errorMsg = "";
if(request.getAttribute("shiroLoginFailure")!=null){
	errorMsg = (String)request.getSession().getAttribute("error");
}
%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<html>
  <head>     	  
	<title>江苏省老年医学学会</title>
	<script src="${ctx}/static/jquery/jquery.min.js" type="text/javascript"></script>
    <link href="${ctx}/static/css/newlgn.css" rel="stylesheet">
	<STYLE>
	body{
		background: #ebebeb;
		font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\9ED1\4F53",Arial,sans-serif;
		color: #222;
		font-size: 12px;
	}
	*{padding: 0px;margin: 0px;}
	.top_div{
		background: #1caece;
		width: 100%;
		height: 400px;
	}
	.ipt{
		border: 1px solid #d3d3d3;
		padding: 10px 10px;
		width: 290px;
		border-radius: 4px;
		padding-left: 35px;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	.ipt:focus{
		border-color: #66afe9;
		outline: 0;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
	}
	.u_logo{
		background: url("${ctx}/static/imagess/username.png") no-repeat;
		padding: 10px 10px;
		position: absolute;
		top: 43px;
		left: 40px;
	
	}
	.p_logo{
		background: url("${ctx}/static/imagess/password.png") no-repeat;
		padding: 10px 10px;
		position: absolute;
		top: 12px;
		left: 40px;
	}
	a{
		text-decoration: none;
	}
	.tou{
		background: url("${ctx}/static/imagess/tou.png") no-repeat;
		width: 97px;
		height: 92px;
		position: absolute;
		top: -87px;
		left: 140px;
	}
	.left_hand{
		background: url("${ctx}/static/imagess/left_hand.png") no-repeat;
		width: 32px;
		height: 37px;
		position: absolute;
		top: -38px;
		left: 150px;
	}
	.right_hand{
		background: url("${ctx}/static/imagess/right_hand.png") no-repeat;
		width: 32px;
		height: 37px;
		position: absolute;
		top: -38px;
		right: -64px;
	}
	.initial_left_hand{
		background: url("${ctx}/static/imagess/hand.png") no-repeat;
		width: 30px;
		height: 20px;
		position: absolute;
		top: -12px;
		left: 100px;
	}
	.initial_right_hand{
		background: url("${ctx}/static/imagess/hand.png") no-repeat;
		width: 30px;
		height: 20px;
		position: absolute;
		top: -12px;
		right: -112px;
	}
	.left_handing{
		background: url("${ctx}/static/imagess/left-handing.png") no-repeat;
		width: 30px;
		height: 20px;
		position: absolute;
		top: -24px;
		left: 139px;
	}
	.right_handinging{
		background: url("${ctx}/static/imagess/right_handing.png") no-repeat;
		width: 30px;
		height: 20px;
		position: absolute;
		top: -21px;
		left: 210px;
	}
	
	</STYLE>
     
<SCRIPT type="text/javascript">
$(function(){
	//得到焦点
	$("#password").focus(function(){
		$("#left_hand").animate({
			left: "150",
			top: " -38"
		},{step: function(){
			if(parseInt($("#left_hand").css("left"))>140){
				$("#left_hand").attr("class","left_hand");
			}
		}}, 2000);
		$("#right_hand").animate({
			right: "-64",
			top: "-38px"
		},{step: function(){
			if(parseInt($("#right_hand").css("right"))> -70){
				$("#right_hand").attr("class","right_hand");
			}
		}}, 2000);
	});
	//失去焦点
	$("#password").blur(function(){
		$("#left_hand").attr("class","initial_left_hand");
		$("#left_hand").attr("style","left:100px;top:-12px;");
		$("#right_hand").attr("class","initial_right_hand");
		$("#right_hand").attr("style","right:-112px;top:-12px");
	});
});
</SCRIPT>
    
    <script type="text/javascript">
    	//用于避免重复提交
    	var sumbitted = false;
    	$(document).ready(function() {
    		if(getCookie('username')){
    			$('#username').focus();
    			$('#username').val(getCookie('username'));
    		}
    		var errorMsg = '<%=errorMsg%>';
    		if(errorMsg!=''||errorMsg!=null){
    			document.getElementById('authenticationResult').innerHTML = errorMsg;
    		}
    			$('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
    		$(window).resize(function(){  
    	    	$('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
    	    });
    		
		});
		/**
		*提交表单
		*/
		function submit_form(formid,buttonid){
			setCookie('username', $('#username').val());
		  if (!sumbitted){
		  	  document.getElementById(formid).submit();
		  	  document.getElementById(buttonid).disabled=true;
			  sumbitted = true;
		  }
		}
		/**
		*回车提交操作
		*/
		function enterToSubmit(evt,formid,buttonid){
		  if (evt.keyCode == 13){
		    submit_form(formid,buttonid);
		  }
		}
		function delCookie(name) {
		    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
		}

		function getCookie(name) {
		    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		    if (arr != null) return unescape(arr[2]);
		    return null;
		}

		function setCookie(name, value) {
		    var Days = 10;           //此 cookie 将被保存 10 天
		    var exp = new Date();    //new Date("December 31, 9998");
		    exp.setTime(exp.getTime() + Days * 24 * 3600000);
		    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		}
	</script>

<META name="GENERATOR" content="MSHTML 11.00.9600.17496">  </head>
  
<body onkeydown="enterToSubmit(event,'loginForm','submit_btn')">
	<DIV class="top_div"></DIV>
<DIV style="background: rgb(255, 255, 255); margin: -100px auto auto; border: 1px solid rgb(231, 231, 231); border-image: none; width: 400px; height: 200px; text-align: center;">
<DIV style="width: 165px; height: 96px; position: absolute;">
<DIV class="tou"></DIV>
<DIV class="initial_left_hand" id="left_hand"></DIV>
<DIV class="initial_right_hand" id="right_hand"></DIV></DIV>
<form id="loginForm" method="post" name="login" action="${ctx}/login" autoComplete="off">
<P style="padding: 30px 0px 10px; position: relative;">
	<SPAN class="u_logo"></SPAN>
	<INPUT class="ipt" type="text"  name="username" id="username"  placeholder="请输入用户名或邮箱" value="" required> 
</P>

<P style="position: relative;">
	<SPAN class="p_logo"></SPAN>         
	<INPUT class="ipt" name="password" id="password" type="password" placeholder="请输入密码" value="" required>   
</P>
</form>
<p id='authenticationResult' style='display:block;width:343px;height:20px;margin-top:5px;color:red;'></p>
		    	
<DIV style="height: 50px; line-height: 50px; margin-top: 10px; border-top-color: rgb(231, 231, 231); border-top-width: 1px; border-top-style: solid;">
<P style="margin: 0px 35px 20px 45px;"><SPAN style="float: left;"><A style="color: rgb(204, 204, 204);" href="#">忘记密码?</A></SPAN> 
<SPAN style="float: right;">
	<a id="submit_btn" 
	style="background: rgb(0, 142, 173); padding: 7px 10px; border-radius: 4px; border: 1px solid rgb(26, 117, 152); border-image: none; color: rgb(255, 255, 255); font-weight: bold;" 
	onclick="submit_form('loginForm','submit_btn');" >登录</a> 
</SPAN>         </P></DIV>

</DIV>
<div style="text-align:center;">
<A id="browersCan" style="color:red; margin-right: 10px;">请用chrome、firefox浏览器！</A>  
</div>
    
    <div class="logintop">    
	    <span>欢迎登录</span>    
	    <ul>
		    <li><a href="javascript:void(0)">帮助</a></li>
		    <li><a href="javascript:void(0)">关于</a></li>
	    </ul>    
    </div>
    
    <div class="loginbm">Copyright © 2018 江苏省老年医学学会</div>
    
  </body>
</html>




