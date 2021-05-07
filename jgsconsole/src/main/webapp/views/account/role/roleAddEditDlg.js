$(function() {
	
	$("#ROLE_TYPE").val('1');
	
	var prevVal = "";
	$.extend($.fn.validatebox.defaults.rules, {
	    roleNameCheck : {
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
	        message: '该角色名已被使用！'
	    }
	});
	$('#rollType').combobox({
		panelHeight:'auto',
		data : [{
			"id":1,
			"text":"管理角色",
			selected:true
		},{
			"id":2,
			"text":"业务角色"
		},{
			"id":4,
			"text":"分类"
		}],
		valueField:'id',
		textField:'text',
		editable:false,
		onSelect:function(node){
			if(node){
				$("#ROLE_TYPE").val(node.id);
			}
		}
	});
	
	$("#addRoleForm").form({
		url :appPath+"/role/addOrEditRole",
		onSubmit : function() {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			var curValue = $('#ROLE_NAME').val();
			$.ajax({
			   type: "POST",
			   async: false,//同步发送请求数据
			   url: appPath+"/role/checkRoleName",
			   data:{'name':curValue,'app_id':$('#APP_ID').val()},
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
			var rls = dealBackJson(result);
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				var jsonData = JSON.parse(rls);
				jsonData.iconCls = "icon-blank";
				jsonData.ICONCLS = "icon-blank";
				var node = parent.$.modalDialog.openner.treegrid('find',$('#PARENT_ID').val());
				if(typeof(node.children)=='undefined'){
					if(node.STATE=='open'){
						parent.$.modalDialog.openner.treegrid('append',{
							parent : $('#PARENT_ID').val(),
							data : [jsonData]
						});
					}else{
						parent.$.modalDialog.openner.treegrid('expand',$('#PARENT_ID').val());
					}
				}else{
					parent.$.modalDialog.openner.treegrid('append',{
						parent : $('#PARENT_ID').val(),
						data : [jsonData]
					});
				}
				swalAlert("新增成功！","角色新增成功","success",2000);
				parent.$.modalDialog.handler.dialog('close');
			}else{
				swalAlert("操作提示","操作失败！请稍后重试","error",2000);
			}
		}
	});
});