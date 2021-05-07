<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%String easyuiThemeName="metro";Cookie cookies[] =request.getCookies();if(cookies!=null&&cookies.length>0){for(Cookie cookie : cookies){if(cookie.getName().equals("cookiesColor")){easyuiThemeName = cookie.getValue();break;}}}%>
<script src="${ctx}/static/jquery/jquery.min.js" type="text/javascript"></script>
<script src="${ctx}/static/jsonForIE7/json2.js" type="text/javascript"></script>
<link href="${ctx}/static/loginPage/styles.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${ctx}/static/common/common.js"></script>   
<link rel="stylesheet" type="text/css" href="${ctx}/static/AnimateCss/animate.min.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap-3.3.5/css/bootstrap-theme.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap-3.3.5/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/easyui/themes/metro/easyui.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/easyui/themes/icon.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/jqueryWebUIPopover/jquery.webui-popover.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/js/style.css">
<script type="text/javascript" src="${ctx}/static/easyui/easyloader.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/static/js/bootstrap-switch.min.css">
<script type="text/javascript" src="${ctx}/static/js/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/static/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx}/static/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/static/jquery/jqueryUtil.js"></script>
<script type="text/javascript" src="${ctx}/static/jqueryWebUIPopover/jquery.webui-popover.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/static/hoverAnimation/css/component.css" />
<script type="text/javascript" src="${ctx}/static/hoverAnimation/js/modernizr.custom.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/static/iOS-Overlay/css/iosOverlay.css" />
<script type="text/javascript" src="${ctx}/static/iOS-Overlay/js/modernizr-2.0.6.min.js"></script>
<script type="text/javascript" src="${ctx}/static/iOS-Overlay/js/iosOverlay.js"></script>
<script type="text/javascript" src="${ctx}/static/iOS-Overlay/js/spin.min.js"></script>
<script type="text/javascript" src="${ctx}/static/iOS-Overlay/js/prettify.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/static/sweetAlert/sweetalert.css" />
<script type="text/javascript" src="${ctx}/static/sweetAlert/sweetalert.min.js"></script>
<script type="text/javascript" src="${ctx}/static/common/easyui.extend.js"></script>
<link href="${ctx}/static/umeditor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
<script type="text/javascript" charset="utf-8" src="${ctx}/static/umeditor/umeditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/static/umeditor/umeditor.js"></script>
<script type="text/javascript" src="${ctx}/static/ueditor/lang/zh-cn/zh-cn.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/static/scollbarPlugin/jquery.mCustomScrollbar.css">
<script type="text/javascript" src="${ctx}/static/scollbarPlugin/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="${ctx}/static/layer/layer.js"></script>
<style type="text/css">body{font-family:helvetica,tahoma,verdana,sans-serif;font-size:13px;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;}</style>