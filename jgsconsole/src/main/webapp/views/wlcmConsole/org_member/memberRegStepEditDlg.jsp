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

   <form id="membRegForm" style="overflow:hidden;" action="" method="post">
		<div class="items">
			<div class="page" id="mrform1">
               <h3>基本资料</h3>
               <table style="height:128px;">
			 <tr>
			 	<th>姓名</th>
			 	<td><input name="NAME" id="NAME" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th>性别</th>
			 	<td><input name="SEX" id="SEX" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		    </tr>
		    <tr>
			 	<th>出生年月</th>
			 	<td><input name="BIRTH" id="BIRTH" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th>籍贯</th>
	 	<td><input name="JG" id="JG" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	</tr>
		    <tr>
	 	<th>民族</th>
	 	<td><input name="MZ" id="MZ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th>党派</th>
	 	<td><input name="DP" id="DP" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 </tr>
			 <tr>
	 	<th>身份证号码</th>
	 	<td><input name="SFZ" id="SFZ" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	</tr>
			</table>
			<h3>个人简历和主要业绩</h3>
	<table>
	<tr>
	 	<th>个人简历和主要业绩</th>
	 	<td style="padding-top:10px;">
	 		<textarea id="JL" name="JL" data-options="multiline:true" class="easyui-textbox" style="font-size:12px;width:455px;height:250px"></textarea>
	 	</td>
    </tr>
</table>
            </div>
<div class="page" id="mrform2">
	<h3>教育经历</h3>
	<table style="height:128px;">
			 <tr>
			 	<th>最后毕业院校</th>
			 	<td><input name="ZHBYYX" id="ZHBYYX" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th style="width:100px !important;">所学专业</th>
			 	<td><input name="SXZY" id="SXZY" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		    </tr>
			 <tr>
			 	<th>学历/学位</th>
			 	<td><input name="XL" id="XL" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			 	<th style="width:100px !important;">从事专业</th>
			 	<td><input name="CSZY" id="CSZY" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		    </tr>
		</table>
		<h3>工作情况<br/></h3>
<table style="height:110px;">
	<tr>
	 	<th>工作单位</th>
	 	<td><input name="GZDW" id="GZDW" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:100px !important;">科室</th>
	 	<td><input name="KS" id="KS" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th>单位职务</th>
	 	<td><input name="DWZW" id="DWZW" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:100px !important;">技术职称</th>
	 	<td><input name="JSZC" id="JSZC" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th>是否有其他学会任职及职务</th>
	 	<td><input name="ISRDZX" id="ISRDZX" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>	
</table>
<h3>联系方式<br/></h3>
	<table style="height:110px;">
	<tr>
	 	<th>办公电话</th>
	 	<td><input name="GZDH" id="GZDH" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:100px !important;">手机</th>
	 	<td><input name="PHONE" id="PHONE" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th>E-mail</th>
	 	<td><input name="EMAIL" id="EMAIL" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:100px !important;">邮政编码</th>
	 	<td><input name="YZBM" id="YZBM" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th>联系地址</th>
	 	<td colspan="3"><input name="LXDZ" id="LXDZ" style="width:470px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>	
</table>
</div>
</form>

</body>
</html>
