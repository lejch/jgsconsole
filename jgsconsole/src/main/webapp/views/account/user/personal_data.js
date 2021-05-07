$(document).ready(function(){
	$('#birthday').datepicker({
		language: "zh-CN",
	    format: 'yyyy-mm-dd',
	    autoclose : true
	});
	
	using("form",function(){		
		init();		
	});
	
	initValidation();
	var buttons = {buttons:[{id:'btnSave',name:'保存',style:'btn-primary'},
	                        {id:"btnClose",name:'关闭',style:'btn'}]};
	$('#personalData').modalDialog('setDialogButtons',buttons);//设置对话框的按钮
	//设置按钮的事件
	$('#btnSave').click(function(){
		//验证表单
		if($("#personal_Form").valid() == false)
		{
			return ;
		}
		modifyUser();
	});
	//关闭对话框
	$('#btnClose').click(function(){
		$('#personalData').modalDialog('close');
		$('#birthday').remove();
	});
});

function init()
{
	var USER_NAME = $('#personalData').modalDialog('getData');		
	
	$.ajax({
		url : appPath+'/user/userByLoginName',	
		type : 'POST',
		dataType : "json",
		async: false,
		data:{
			"USER_NAME":USER_NAME
		},
		error : function(xhr,status,errorThrown){
			$.hideprogress();
			
			$.messageBox.alert({title : '错误',content : title+'出现异常',afterClose : function(){
				$('#userModel').modal('hide');
			}}); 
		},		
		success: function(data){				
			$('#personal_Form').form('load',{
				userId:data.userId,
				useralias:data.useralias,
				idcard:data.idcard,
				birthday:changeBirthday(data.birthday),
				gender:data.gender =="1"?"1":"2",
				location:data.location,
				work_unit:data.work_unit,
				phone:data.phone,
				email:data.email,
				unitname:data.unitname
			});				
		}		
	});	
	//转换性别代码
	$('[name="gender"]:radio').each(function() {
		var gender = $('#gender').val;
		if (this.value == gender) 
		{ 
			this.checked = true; 
		} 		
	});
	
}
	
//日期转换方法
function changeBirthday(birthday){
	if(!$.isEmpty(birthday)){
		var date = $.dateParser(birthday,"yyyyMMdd");	
		var dateStr = $.dateFormatToString(date,"yyyy-MM-dd");
		return dateStr;	
	}else{
		return "";
	}
	
	
}	
//为user_Form注册validate函数
function initValidation()
{
		$("#personal_Form").validate({
			rules: {				
				useralias:{
					required:true,
					stringCheck2:true,
					minlength: 2
				},
				idcard:{
					required:true,
					minlength: 15
				},
				phone:{
					minlength: 7
				},
				email:{
					email: true
				}		
			}
		});
}
function modifyUser()
{	
	var userData = {
			userId:$("#userId").val(),
			useralias:$("#useralias").val(),
			idcard:$("#idcard").val(),
			birthday:$("#birthday").val(),
			location:$("#location").val(),
			work_unit:$("#work_unit").val(),
			phone:$("#phone").val(),
			email:$("#email").val()
	};
	
	userData['gender'] = $("input[name='gender']:checked").val();
	
	$.ajax({
		url : appPath+'/user/modifyUser',	
		type : 'POST',
		dataType : "json",
		async: false,
		data:{"data" : $.toJSONString(userData)},
		error : function(xhr,status,errorThrown){
			$.hideprogress();
			
			$.messageBox.alert({title : '错误',content : title+'出现异常',afterClose : function(){
				$('#userModel').modal('hide');
			}}); 
		},		
		success: function(data){
			if(data){
				if(data["flag"] == "true")
				{
					$.messageBox.alert({
						title : '信息',
						content : '保存成功',
						afterClose : function(){
							//关闭对话框
							$('#personalData').modalDialog('close');
							//刷新页面
							window.location.reload();
						}
					});
				}
			}
			else
			{
				$.messageBox.alert({
					title : '信息',
					content : '保存失败',
					afterClose : function(){
						//关闭对话框
						$('#personalData').modalDialog('close');
					}
				});
			}
	    }
	});
}
	
