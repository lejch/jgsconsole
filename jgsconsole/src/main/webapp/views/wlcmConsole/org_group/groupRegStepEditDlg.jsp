<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body style="overflow:hidden;">
<style type="text/css">
#membRegForm *{font-weight:400;list-style:none;
font :12px/1.2 Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}}
#membRegForm input{padding:0px;}
.page{padding-left:10px;width:590px;height:500px;float:left;}
.page h3{height:30px;padding-left:20px;font-size:16px; border-bottom:1px dotted #ccc; margin-bottom:5px;color:#3496f0;}
.page p{line-height:24px;}
.page p label{font-size:12px; display:block;}
.easyui-textbox{width:200px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset;transition:border 0.2s linear 0s, box-shadow 0.2s linear 0s;}
#membRegForm textarea:focus,input[type="text"]:focus{border-color:rgba(82, 168, 236, 0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);outline:0 none;}
#membRegForm input,textarea{font-weight:normal;}
#membRegForm textarea{padding:5px;font-size:12px;}
#membRegForm table,th,td{font-size:12px;text-align:left;padding:1px}
#membRegForm th{width:80px;padding-left:20px;}
.textbox .textbox-text{font-size:13px;}
#membRegForm h3 em{color:#777;}
.inputmark{}
.rshover{margin-left:15px;color: rgb(68, 68, 68);cursor: pointer;display: inline;font-size: 14px;font-stretch: normal;font-style: normal;font-weight: normal;height: auto;line-height: 18px;list-style-image: none;list-style-position: outside;list-style-type: none;text-align: left;}
</style>

   <form id="membRegForm" style="overflow:hidden;height:560px;" action="" method="post">
		<div class="items">
			<div class="page" id="mrform1">
               <h3>团体基本资料</h3>
               <table style="height:128px;">
			<tr>
			 	<th>单位名称</th>
			 	<td><input name="DWMC" id="DWMC" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th>成立日期</th>
			 	<td><input id="CLRQ" name="CLRQ" type="text" style="width:170px;font-size:14px;" class="easyui-textbox"></td>
		    </tr>
		    <tr>
		    	<th>注册资本</th>
			 	<td><input name="ZCZB" id="ZCZB" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th>职工人数</th>
	 	<td><input name="ZGRS" id="ZGRS" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	</tr>
		    <tr>
	 	<th>详细地址</th>
	 	<td><input name="XXDZ" id="XXDZ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th>会员数量</th>
	 	<td><input name="HYSL" id="HYSL" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 </tr>
			 <tr>
			 <th>单位网址</th>
	 	<td><input name="DWWZ" id="DWWZ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th>传真</th>
	 	<td><input name="CZ" id="CZ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	</tr>
			 <tr>
			 <th>分支机构数量</th>
	 	<td><input name="FZJGSL" id="FZJGSL" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th>邮编</th>
	 	<td><input name="YZBM" id="YZBM" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	</tr>
			</table>
			<h3>业务范围</h3>
	<table>
	<tr>
	 	<th>业务范围</th>
	 	<td style="padding-top:10px;">
	 		<textarea id="JL" name="JL" data-options="multiline:true" class="easyui-textbox" style="font-size:12px;width:455px;height:230px"></textarea>
	 	</td>
    </tr>
</table>
            </div>
<div class="page" id="mrform2">
	<h3>团体法人资料</h3>
	<table style="height:128px;">
			<tr>
		 	<th>法人姓名</th>
		 	<td><input name="FRXM" id="FRXM" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th>电话</th>
		 	<td><input name="DH" id="DH" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th>性别</th>
		 	<td><input name="SEX" id="SEX" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th>手机</th>
		 	<td><input name="PHONE" id="PHONE" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th>职务/职称</th>
		 	<td><input name="ZWZC" id="ZWZC" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th>E-mail</th>
		 	<td><input name="EMAIL" id="EMAIL" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th>联系人</th>
		 	<td><input name="LXR" id="LXR" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th>联系人电话</th>
		 	<td><input name="LXRDH" id="LXRDH" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th>联系人手机</th>
		 	<td><input name="LXRSJ" id="LXRSJ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		</table>
</div>
</form>
</body>
</html>
