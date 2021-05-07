$(document).ready(function(){
	$('#syindex').css('height',(parent.cth-100)+'px');
	document.getElementById('userInfo').innerHTML=USER_ALIAS+' '+welcomeWods+'欢迎使用信息管理系统';
	
	$.ajax({
		type: "POST",
		url: appPath+'/user/getLstLoginfo',
		timeout: 30*1000,
		dataType: "json",
		success: function(json){
			if(json){
				document.getElementById('logInfo').innerHTML="您上次登录的时间："+json[0]['TIME'];
			}
		},
		error:function(xhr,textStatus,errorThrown){
		}
	});
	
});
		
function Optlstclick(obj){
	var index = $(obj).attr('indx');
	parent.syclick(index);
}