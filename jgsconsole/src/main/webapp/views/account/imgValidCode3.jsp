<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jgsconsole.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
<%--     <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" /> --%>
    <script type="text/javascript">
var appPath = '${ctx}';
function getCodeTree(){
	$("#codeT3").attr("src",appPath+"/cut/code3?flag="+Math.random());
	$('#codeSelect').empty();
	$('.imgVaildCodes3dv').remove();}
$(document).ready(function(){
	parent.SETIMGVAILDRESULT(false);
	getCodeTree();
	$("#codeT3").bind("click",function(ev){
		var oEvent=ev||event;
		var number=$("#codeSelect option").length;
		if(number>=4){return;}
		var x=oEvent.pageX;
		var y=oEvent.pageY;
		var img=document.getElementById('codeT3');
		var nodex=getNodePosition(img)[0];
		var nodey=getNodePosition(img)[1];
		var xserver=parseInt(x)-parseInt(nodex);
		var yserver=parseInt(y)-parseInt(nodey);
		$("#codeSelect").append("<option value='"+(parseInt(number)+1)+"'>"+xserver+"_"+yserver+"</option>");
		var oDiv=document.createElement('div');
		oDiv.appendChild(document.createTextNode(parseInt(number)+1));
		$(oDiv).attr('class','imgVaildCodes3dv');
		oDiv.style.left=(parseInt(x)-15)+'px';
		oDiv.style.top=(parseInt(y)-15)+'px';
		document.body.appendChild(oDiv);
	});
});
function imgSuccessShow(){$('#mainImgValid').show();}
function cheakOutTree(){
	var txt ="";
	$("#codeSelect option").each(function(){
		var text=$(this).text();
		if(txt==""){txt=text;}else{txt=txt+","+text;}
	});
	$.ajax({type:"post",
			url:appPath+"/cut/verifyCode3",
			data:{"code":txt},
			cache:false,
			dataType:"JSON",
			success:function(data){
				parent.SETIMGVAILDRESULT(data.result);
				parent.CLOSEIMGVAILD();
			}
	});
}
function getNodePosition(node){
	var top=left=0;
	while(node){
		if(node.tagName){
			top=top+node.offsetTop;
			left=left+node.offsetLeft;
			node=node.offsetParent;
		}else{
			node=node.parentNode;
		}
	}
	return [left,top];
}
</script>
	<style>
	.imgVaildCodes3dv{border-radius:50%;text-align:center;font-size:20px;color:#000;font-weight:bold;border:5px solid #000;position:absolute;width:25px;height:25px;}
	.hi-icon{margin:5px !important;width: 30px;height: 30px;}
	.hi-icon:hover{background:none !important;}
	.gctdv{cursor:pointer;padding:0px;display:inline-block;width:30px;height:30px;}
	.hi-icon:before{    font-size: 25px;font-weight: bold;line-height: 20px;}
	.hi-icon-refresh:before {content: "\e031";font-family: 'Glyphicons Halflings';}
	</style>
</head>
<body>
<table style="display:none;" id="mainImgValid"><tr><td colspan="2"><div><img id="codeT3" style="width:256px;" onload="imgSuccessShow()" /></div></td></tr><tr><td><div class="hi-icon-wrap hi-icon-effect-6 gctdv" onclick="getCodeTree();"><a href="javascript:void(0)" class="hi-icon hi-icon-refresh"></a></div></td><td align="right"><button type="button" style="font-size:15px;" class="btn btn-warning btn-xs" onclick="cheakOutTree();">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</button>&nbsp;</td></tr></table><select id="codeSelect" style="display: none;"></select>
</body>
</html>