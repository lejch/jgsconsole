$(function() {
	var prevVal = "";
	$.extend($.fn.validatebox.defaults.rules, {
	    equals: {
	        validator: function(value,param){
	            return value == $(param[0]).val();
	        },
	        message: '两次输入的密码不匹配！'
	    },
	    userNameCheck : {
	    	validator: function(value){
	    		if(prevVal!=''){
	    			if(value != prevVal){
		    			return true;
		    		}else{
		    			return false;
		    		}
	    		}else{
	    			return true;
	    		}
	        },
	        message: '该用户名已被占用！'
	    }
	});
	
	$("#addUserForm").form({
		url :appPath+"/user/addUser",
		onSubmit : function() {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			var curValue = $('#USER_NAME').val();
			$.ajax({
			   type: "POST",
			   async: false,
			   url: appPath+"/user/checkUserName",
			   data:{'name':curValue},
			   timeout:120*1000,
			   dataType:"json",
		       success: function(data){
		    	   if(data){
		    		   if(data["result"]=="exist"){
		            	   prevVal = curValue;
		               }else if(data["result"]=="unexist"){
		            	   prevVal = "";
		               }
		    	   }
			   },
			   error:function(xhr,textStatus,errorThrown){
			   }
			});
			var isValid = $(this).form('validate');
			if (!isValid) {
				parent.$.messager.progress('close');
			}
			return isValid;
		},
		success : function(result) {
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				parent.$.modalDialog.openner.datagrid('reload');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert("新增成功!", "新增用户成功！", "success",2000);
			}else{
				swalAlert("新增失败!", "新增用户失败！", "error",2000);
			}
		}
	});
	
});