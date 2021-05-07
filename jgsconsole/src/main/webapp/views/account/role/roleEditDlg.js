$(function() {
	var state = null;
	var parentTitle = null;
	var parentChangeFlag = false;
	
	$("#PID").combotree({
		width:171,
		url:appPath+"/role/getRoles",
		queryParams:{'TYPE':'MENU'},
		idFiled:'ROLE_ID',
	 	textFiled:'ROLE_NAME',
	 	parentField:'PARENT_ID',
	 	editable:false,
	 	onLoadSuccess :function(){
	 		$("#PID").combotree('setValue',parentTitle);
	 	},
	 	onSelect:function(node){
	 		if(node){
	 			$("#PARENT_ID").val(node.ROLE_ID);
	 			$("#APP_ID").val(node.APP_ID);
	 			parentChangeFlag = true;
	 		}
	 		
	 	}
	});
		
	$('#rollType').combobox({
		panelHeight:'auto',
		data : [{
			"id":1,
			"text":"管理角色"
		},{
			"id":2,
			"text":"业务角色"
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
		
	$("#editRoleForm").form({
		url :appPath+"/role/addOrEditRole",
		onSubmit : function() {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			var isValid = $(this).form('validate');
			if (!isValid) {
				parent.$.messager.progress('close');
			}
			return isValid;
		},
		onLoadSuccess :function(node){
			parentTitle = node.PARENT_TITLE;
			state = node.STATE;
			if($('#ROLE_ID').val()!=''){
	 			$('#rollType').combobox('select',node.ROLE_TYPE);
	 		}
	 	},
		success : function(result) {
			var rls = dealBackJson(result);
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				if(parentChangeFlag){
					parent.$.modalDialog.openner.treegrid('reload');
				}else{
					var jsonData = JSON.parse(rls);
					jsonData.iconCls = "icon-blank";
					jsonData.STATE=state;
					parent.$.modalDialog.openner.treegrid('update',{
						id : $('#ROLE_ID').val(),
						row : jsonData
					});
				}
				parent.$.modalDialog.handler.dialog('close');
			}else{
				$.messager.alert('提示','操作失败！'); 
			}
			swalAlert("编辑成功！","角色编辑成功","success",2000);
		}
	});
});