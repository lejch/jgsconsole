<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
<script type="text/javascript" charset="utf-8">
	var centerTabs;
	var tabsMenu;
	var ht = null;
	var cth = null;
	$(document).ready(function(){
		if(typeof(window.innerHeight)!="undefined"){
	        ht = window.innerHeight-50;
	    }
	    if(typeof(window.innerHeight)=="undefined"){
	        ht = document.documentElement.clientHeight-50;
	    }
	    $('#mainPanelStyle').css("cssText",'height:'+ht+'px !important;padding:1px 0px 0px 0px;background:#e9f0f5;');
	    cth = ht-30;
	    $('#centerTabs').css("cssText",'height:'+cth+'px !important;');
	    
	    $('#firstPageLogin').css("cssText",'width:100%;border:0;height:'+(cth-40)+'px !important;');
	    
		centerTabs = $('#centerTabs').tabs({
			border : false,
			showHeader : false,
			height:cth
		});
		
		var chldsl = document.getElementById('childSys');
		if(chldsl.children){
			chldsl.firstChild.firstChild.click();
		}
	});

	function addTabNew(node,obj) {
		$('.tmldivxaactive').removeClass('tmldivxaactive');
		$(obj).addClass('tmldivxaactive');
		var nodes=node.split("||");
		$("#plTtleshow").html("<div class='rftpFront' />"+
				"<div class='hi-icon-wrap hi-icon-effect-6 rtf_div' onclick='refreshTab(this)' rft="+nodes[0]+">"+
					"<a href='javascript:void(0)' class='hi-icon hi-icon-refresh'></a>"+
				"</div>"
			 );
		if (centerTabs.tabs('exists', nodes[0])) {
			centerTabs.tabs('select', nodes[0]);
		} else {
			var allTabs = centerTabs.tabs('tabs');
			$.each(allTabs, function() {
				var opt = $(this).panel('options');
				if(opt.title!='首页'){
					centerTabs.tabs('close', opt.title);
				}
			});
			centerTabs.tabs('add', {
				title : nodes[0],
				closable : true,
				content : "<iframe src="+nodes[2]+" frameborder=\"0\" style=\"border:0;background:#e9f0f5;width:100%;height:"+cth+"px;\"></iframe>"
			});
		}
	}
	function syclick(index){
		var node = Menus[index]['title']+"||"+Menus[index]['icon']+"||"+Menus[index]['location'];
		var nodes=node.split("||");
		$("#plTtleshow").html("<div class='rftpFront' />"+
			"<div class='hi-icon-wrap hi-icon-effect-6 rtf_div' onclick='refreshTab(this)' rft="+nodes[0]+">"+
				"<a href='javascript:void(0)' class='hi-icon hi-icon-refresh'></a>"+
			"</div>"
		 );
		if (centerTabs.tabs('exists', nodes[0])) {
			centerTabs.tabs('select', nodes[0]);
		} else {
			var allTabs = centerTabs.tabs('tabs');
			$.each(allTabs, function() {
				var opt = $(this).panel('options');
				if(opt.title!='首页'){
					centerTabs.tabs('close', opt.title);
				}
			});
			centerTabs.tabs('add', {
				height:100,
				title : nodes[0],
				closable : true,
				content : "<iframe src="+nodes[2]+" frameborder=\"0\" style=\"border:0;width:100%;height:"+cth+"px;\"></iframe>"
			});
		}
	}
	function backTSY(){
		$('.newlgnTreeBtnSelected').removeClass('newlgnTreeBtnSelected');
		var tab = centerTabs.tabs('select', '首页');
		$("#plTtleshow").html("<li onclick='backTSY();'><a href='javascript:void(0)'>首页</a><div class='backTriangle'></div></li>");
	}
	function refreshTab(obj) {
		var title = $(obj).attr('rft');
		var tab = centerTabs.tabs('getTab', title);
		centerTabs.tabs('update', {
			tab : tab,
			options : tab.panel('options')
		});
	}
</script>
<style>
#centerTabs > .tabs-panels > .panel > div{    width: 95% !important;
    height: 100% !important;
    margin: 10px auto !important;}
    .tmldivxaactive{color:#5eaeea !important;}</style>
<div id="mainPanelStyle" style="">
	<div id="topMenuList" class="tmldivx"></div>
	<div id="plTtleshow" class="plTtleshowd" style="width:95%;margin-left:auto;margin-right:auto;margin-bottom:0px;margin-top:8px;"></div>
	<div id="centerTabs" style="margin-top:-5px;height:100%;width:100%;">
		<div title="首页" border="false" style="width:90%;height:100%;overflow:hidden;margin-bottom:20px;margin-right:20px;margin-top:10px;margin-left:20px;box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5);border-radius:6px;">
			<iframe id="firstPageLogin" src="views/helloEditDlg.jsp" frameborder="0" style="border:0;width:100%;"></iframe>
		</div>
	</div>
</div>