<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@page import="com.jgsconsole.common.util.PropertiesUtil"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<% 
	ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
	String USER_NAME = user.getUseralias();
%>
<style>
	.webui-popover-content{
		padding:0px 0px !important;
		overflow: auto;
	}
	#userChangePwd:hover i{color:#ddd !important;}
	#userrelg:hover i{color:#ddd !important;}
	#userlgout:hover i{color:#ddd !important;}
</style>
<script type="text/javascript" charset="utf-8">
	function logout(b){$.messager.confirm("提示","确认退出吗?",function(r){if(r){window.location.href=appPath+'/logout';}});}

	$(document).ready(function(){
		var count=1;
		for(var i=0;i<Menus.length;i++){
			if(Menus[i]['opertype']=='0'){
				$('#childSys').append(
						'<li>'+
							'<a href="javascript:void(0)" appcode="'+Menus[i]['app_id']+'">'+
								'<span>'+Menus[i]['title']+'</span>'+
								'<div></div>'+
							'</a>'+
						'</li>');
			}
		}
		updateMsgTable();
		
		$(".nav li a").click(function(){
			$(".nav li a.selected").removeClass("selected")
			$(this).addClass("selected");
			tpclk(this);
		});
	});
	function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
	function initBtnTips1(obj){event.stopPropagation();layer.tips('密码修改','#'+$(obj).attr('id'),{tips:[1,'#58aeec']});}
	function initBtnTips3(obj){event.stopPropagation();layer.tips('退出系统','#'+$(obj).attr('id'),{tips:[1,'#58aeec']});}
</script>

<div class="topleft">	
</div>
<ul id="childSys" class="nav"></ul>
<div id="toprightt" class="topright">    
    <div id="userOperaPanel" class="user">
    <div id="msgforwork" style="display:inline-block;width:40px;
	    background-color:#327695;
	    border-radius: 7px;
	    padding:2px;
	    margin-right:5px;margin-left:5px;position:relative;">
		    <i class="glyphicon glyphicon-envelope" style="top:2px;left:8px;color:#fff;"></i>
		    <b id="msg_for_work_totle">0</b>
	    </div>
    	<div style="display:inline-block;" id="userCPanel">
	    	<span><%=USER_NAME %></span>
	    </div>
	    <div style="display:inline-block;margin-right:15px;" id="userChangePwd" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" onclick="changePassword();">
	    	<i class="glyphicon glyphicon-lock" style="top:2px;left:8px;color:#fff;"></i>
	    </div>
	    <div style="display:inline-block;margin-right:15px;" id="userlgout" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" onclick="logout(true);">
	    	<i class="glyphicon glyphicon-off" style="top:2px;left:8px;color:#fff;"></i>
	    </div>
    </div>    
</div>