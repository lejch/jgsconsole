<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
    <title></title>
    <style type="text/css">
    	*{font-size:9pt;border:0;margin:0;padding:0;}
		body{font-family:'微软雅黑'; margin:0 auto;min-width:980px;}
		ul{display:block;margin:0;padding:0;list-style:none;}
		li{display:block;margin:0;padding:0;list-style: none;}
		img{border:0;}
		dl,dt,dd,span{margin:0;padding:0;display:block;}
		a,a:focus{text-decoration:none;color:#000;outline:none;blr:expression(this.onFocus=this.blur());}
		a:hover{color:#00a4ac;text-decoration:none;}
		 .mainindex{padding:20px; overflow:hidden;}
.welinfo{height:32px; line-height:32px; padding-bottom:8px;}
.welinfo span{float:left;}
.welinfo b{padding-left:8px;}
.welinfo a{padding-left:15px;color:#3186c8;}
.welinfo a:hover{color:#F60;}
.welinfo i{font-style:normal; padding-left:8px;}
.xline{border-bottom:solid 1px #dfe9ee; height:5px;}
.iconlist{padding-left:40px; overflow:hidden;}
.iconlist li{text-align:center; float:left; margin-right:25px; margin-top:25px;}
.iconlist li p{line-height:25px;}
.ibox{clear:both; padding-left:40px; padding-top:18px; overflow:hidden; padding-bottom:18px;}
.ibtn{background:url(../images/ibtnbg.png) repeat-x;border:solid 1px #bfcfe1; height:23px; line-height:23px; display:block; float:left; padding:0 15px; cursor:pointer;}
.ibtn img{margin-top:5px; float:left; padding-right:7px;}
.box{height:15px;}
.infolist{padding-left:40px; padding-bottom:15px;}
.infolist li{ line-height:23px; height:23px; margin-bottom:8px;}
.infolist li span{float:left; display:block; margin-right:10px;}
.uimakerinfo{padding-left:40px; background:url(../images/search.png) no-repeat 10px 15px; padding-top:15px; padding-bottom:20px;}
.umlist{padding-left:40px;}
.umlist li{float:left; background:url(../images/ulist.png) no-repeat 0 5px; padding-left:10px; margin-right:15px;}
    </style>
    <script type="text/javascript" src="hello.js"></script>
</head>

<body>
	<div id="syindex">
		<div class="mainindex">
    
		    <div class="welinfo" >
		    	<span><img src="${ctx}/static/images/sun.png" alt="天气" /></span>
		    	<b id='userInfo'></b>
		    	<a href="javascript:void(0)" onclick="changePassword()">密码修改</a>
		    </div>
		    
		    <div class="welinfo">
		    	<span><img src="${ctx}/static/images/time.png" alt="时间" /></span>
		    	<i id='logInfo'>您上次登录的时间：</i>
		    </div>
		    
		   
			<div class="xline"></div>

		</div>
	</div>
	
</body>
</html>