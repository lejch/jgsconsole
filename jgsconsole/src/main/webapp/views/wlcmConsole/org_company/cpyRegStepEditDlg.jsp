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
.page h3{height:25px;padding-left:20px;font-size:16px; border-bottom:1px dotted #ccc; margin-bottom:5px;color:#3496f0;}
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
.rshover{margin-left:15px;color: rgb(68, 68, 68);cursor: pointer;display: inline;font-size: 14px;font-stretch: normal;font-style: normal;font-weight: normal;height: auto;line-height: 18px;list-style-image: none;list-style-position: outside;list-style-type: none;text-align: left;}

.inputmark{width:140px;}
#membRegForm table td{padding:10px 20px;text-align:center;height:20px;line-height:20px;border:1px solid #ddd;}
#membRegForm table{border-collapse: collapse;margin:0px auto;}
#membRegForm strong{font-weight:bold;}
</style>
<script>
	$(document).ready(function(){
		$('#membRegForm').form({
			onLoadSuccess:function(node){
				if(node){
					for(var key in node){
						if(key=='CPY_TYPE'){
							$('#qyxz'+node['CPY_TYPE']).attr('checked','checked');
						}else if(key=='CPY_BELONG'){
							$('#sshy'+node['CPY_BELONG']).attr('checked','checked');
							var ckedint = parseInt(node['CPY_BELONG']);
							if(ckedint>3){$('#CPY_TYPE_OTHER'+ckedint).html(node['CPY_BELONG_OTHER']);}
						}else{
							$('#'+key).html(node[key]);
						}
					}
					
					$('#contanifdiv').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
				}
			}
		});
	});
</script>
<div id="contanifdiv" style="height:700px;padding:2px;">
<form id="membRegForm" style="overflow:hidden;" action="" method="post">
	<h3 style="text-align:center;font-size:20px;font-weight:bold;padding-top:15px;">江苏省老年医学学会企业会员申请表</h3>
	<div style="position:relative;height:30px;">
		<div style="display:inline-block;position:absolute;left:30px;"><strong>编号：</strong><span id="HY_ID"></span></div>
		<div style="display:inline-block;position:absolute;right:30px;"><strong>填表日期：</strong><span id="CREATETIME_CN"></span></div>
	</div>
	<table width="626">
		<tr>
			<td rowspan="2"><strong>企业名称</strong></td>
			<td><strong>中文</strong></td><td id="CPY_NAME_CN" class="inputmark"></td>
			<td><strong>成立时间</strong></td><td id="CPY_CREATE_TIME" class="inputmark"></td>
		</tr>
		<tr>
			<td><strong>英文</strong></td><td id="CPY_NAME_EN" class="inputmark"></td>
			<td><strong>工商注册号</strong></td><td id="CPY_GSZCH" class="inputmark"></td>
		</tr>
		<tr>
			<td><strong>企业性质</strong></td>
			<td colspan="4" style="text-align:left !important;padding:5px 10px !important;">
				<input type="radio" name="qyxz" class="qyxz" id="qyxz1" value="1"><label for="qyxz1" style="cursor:pointer;margin-right:10px;">&nbsp;私营</label>
				<input type="radio" name="qyxz" class="qyxz" id="qyxz2" value="2"><label for="qyxz2" style="cursor:pointer;margin-right:10px;">&nbsp;集体</label>
				<input type="radio" name="qyxz" class="qyxz" id="qyxz3" value="3"><label for="qyxz3" style="cursor:pointer;margin-right:10px;">&nbsp;联营</label>
				<input type="radio" name="qyxz" class="qyxz" id="qyxz4" value="4"><label for="qyxz4" style="cursor:pointer;margin-right:10px;">&nbsp;三资</label>
				<input type="radio" name="qyxz" class="qyxz" id="qyxz5" value="5"><label for="qyxz5" style="cursor:pointer;margin-right:10px;">&nbsp;国有</label>
				<input type="radio" name="qyxz" class="qyxz" id="qyxz6" value="6"><label for="qyxz6" style="cursor:pointer;">&nbsp;其他</label>
				<a href="javascript:void(0)" id="CPY_TYPE_OTHER" style="min-width:100px;height:15px;border-bottom:1px solid #777;text-align:center;display:inline-block;"></a>
			</td>
		</tr>
		<tr>
			<td><strong>所属行业</strong></td>
			<td colspan="4" style="text-align:left !important;padding:5px 10px !important;line-height:30px !important;">
				<input type="radio" name="sshy" class="sshy" id="sshy1" value="1"><label for="sshy1" style="cursor:pointer;margin-right:10px;">&nbsp;农林渔牧业</label>
				<input type="radio" name="sshy" class="sshy" id="sshy2" value="2"><label for="sshy2" style="cursor:pointer;margin-right:10px;">&nbsp;商贸</label>
				<input type="radio" name="sshy" class="sshy" id="sshy3" value="3"><label for="sshy3" style="cursor:pointer;margin-right:10px;">&nbsp;房地产</label>
				<input type="radio" name="sshy" class="sshy" id="sshy4" value="4"><label for="sshy4" style="cursor:pointer;">&nbsp;制造业</label>
				<a href="javascript:void(0)" id="CPY_TYPE_OTHER4" style="min-width:100px;height:15px;border-bottom:1px solid #777;text-align:center;display:inline-block;"></a>
				<br/>
				<input type="radio" name="sshy" class="sshy" id="sshy5" value="5"><label for="sshy5" style="cursor:pointer;">&nbsp;服务业</label>
				<a href="javascript:void(0)" id="CPY_TYPE_OTHER5" style="min-width:100px;height:15px;margin-right:10px;border-bottom:1px solid #777;text-align:center;display:inline-block;"></a>
				<input type="radio" name="sshy" class="sshy" id="sshy6" value="6"><label for="sshy6" style="cursor:pointer;">&nbsp;其他行业</label>
				<a href="javascript:void(0)" id="CPY_TYPE_OTHER6" style="min-width:100px;height:15px;border-bottom:1px solid #777;text-align:center;display:inline-block;"></a>
			</td>
		</tr>
		<tr>
			<td><strong>单位地址</strong></td><td colspan="2" id="CPY_ADDR"></td>
			<td><strong>邮政编码</strong></td><td id="CPY_UB"></td>
		</tr>
	</table>
	<table width="626" style="margin-top:-1px;">
		<tr><td colspan="4"><strong>法人（负责人）情况</strong></td></tr>
		<tr>
			<td><strong>姓名</strong></td>
			<td><strong>职务</strong></td>
			<td colspan="2"><strong>联系电话（办公/手机）</strong></td>
		</tr>
		<tr>
			<td id="FR_NAME"></td>
			<td id="FR_ZW"></td>
			<td colspan="2"><span id="FR_BGDH"></span> / <span id="FR_PHONE"></span></td>
		</tr>
		<tr><td colspan="4"><strong>联系人情况</strong></td></tr>
		<tr>
			<td><strong>姓名</strong></td>
			<td><strong>职务</strong></td>
			<td><strong>联系电话（办公/手机）</strong></td>
			<td><strong>办公邮箱</strong></td>
		</tr>
		<tr>
			<td id="LXR_NAME"></td>
			<td id="LXR_ZW"></td>
			<td><span id="LXR_BGDH"></span> / <span id="LXR_PHONE"></span></td>
			<td id="LXR_EMAIL"></td>
		</tr>
		<tr>
			<td><strong>单位简介</strong></td>
			<td colspan="3" style="text-align:left;"><pre id="JL"></pre></td>
		</tr>
	</table>
	<br/>
</form>
</div>
</body>
</html>
