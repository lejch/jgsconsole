<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<style>
	#myEditor h1{
            font-family: "微软雅黑";
            font-weight: normal;
        }
        #myEditor .btn {
            display: inline-block;
            *display: inline;
            padding: 4px 12px;
            margin-bottom: 0;
            *margin-left: .3em;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            text-align: center;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
            vertical-align: middle;
            cursor: pointer;
            background-color: #f5f5f5;
            *background-color: #e6e6e6;
            background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
            background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
            background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
            background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
            background-repeat: repeat-x;
            border: 1px solid #cccccc;
            *border: 0;
            border-color: #e6e6e6 #e6e6e6 #bfbfbf;
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
            border-bottom-color: #b3b3b3;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
            filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
            *zoom: 1;
            -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
            -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        #myEditor .btn:hover,
        #myEditor .btn:focus,
        #myEditor .btn:active,
        #myEditor .btn.active,
        #myEditor .btn.disabled,
        #myEditor .btn[disabled] {
            color: #333333;
            background-color: #e6e6e6;
            *background-color: #d9d9d9;
        }

        .btn:active,
        .btn.active {
            background-color: #cccccc \9;
        }

        .btn:first-child {
            *margin-left: 0;
        }

        #myEditor .btn:hover,
        #myEditor .btn:focus {
            color: #333333;
            text-decoration: none;
            background-position: 0 -15px;
            -webkit-transition: background-position 0.1s linear;
            -moz-transition: background-position 0.1s linear;
            -o-transition: background-position 0.1s linear;
            transition: background-position 0.1s linear;
        }

        #myEditor .btn:focus {
            outline: thin dotted #333;
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
        }

        #myEditor .btn.active,
        #myEditor .btn:active {
            background-image: none;
            outline: 0;
            -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
            -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        #myEditor .btn.disabled,
        #myEditor .btn[disabled] {
            cursor: default;
            background-image: none;
            opacity: 0.65;
            filter: alpha(opacity=65);
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
        }
        .webui-popover-content{width:100%;}
        .edui-container{margin-top:5px;margin-left:-2px;}
        .upCrpPic{width:500px;height:400px;line-height:400px;border:1px solid #ddd;overflow:hidden;margin-left:20px;margin-top:40px;position:relative;}
        .croppedImg{height:400px;}
</style>
<link rel="stylesheet" type="text/css" href="${ctx}/static/croppic/assets/css/croppic.css">
<script type="text/javascript" src="${ctx}/static/croppic/croppic4news.min.js"></script>
<script type="text/javascript" src="${ctx}/views/wlcmConsole/org_news/setHpLoopEditDlg.js"></script>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;">
		<form id="SETHPLPFORM" style="text-align:center;">
			<input name="SET_HPIC_URI" id="SET_HPIC_URI"  type="hidden"/>
			<input name="ID" id="ID"  type="hidden"/>
			<input name="rowIndex" id="rowIndex"  type="hidden"/>
		</form>
		<div style="display:inline-block;position:absolute;top:5px;left:10px;">首页封面：</div>
		<div id="upCroppic" class="upCrpPic" style="text-align:center;font-size:18px;">点击右上角按钮，上传图片</div>
		<div id="preLoadCroppic" class="upCrpPic" style="display:none;"></div>
		<div class="alert alert-info" role="alert" style="width:360px;position:absolute;top:50px;right:10px;padding:3px;">
			  <a href="#" class="alert-link">以下为<strong style="font-size:13px;color:red;">文中已上传图片</strong>,可点击相应图片裁剪,设置封面<br/>
			  若要上传图片设置封面,请点击上方的<strong style="font-size:13px;color:red;">切换为上传图片</strong>按钮</a>
		</div>
		<div id="imgInArticl" style="overflow-y:auto;width:375px;height:300px;position:absolute;top:100px;right:10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本文中并未上传图片，请使用左侧功能设置封面并保存！</div>
		<div id="newDlsPp" style="display:inline-block;width:10px;height:0px;position:absolute;bottom:-30px;right:200px;"></div>
		<button id="chagCrpcBtn" type="button" class="btn btn-success" style="position:absolute;right:20px;top:10px;">切换为上传图片</button>
	</div>
</div>
