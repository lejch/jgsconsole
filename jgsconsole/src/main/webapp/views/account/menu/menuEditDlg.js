$(function() {
	var state = null;
	var parentTitle = null;
	var parentChangeFlag = false;
	
	$("#pid").combotree({
		width:171,
		url:appPath+"/MenuController/getTreelist",
		queryParams:{},
		editable:false,
		idFiled:'MENU_ID',
	 	textFiled:'TITLE',
	 	parentField:'PARENT_ID',
	 	onLoadSuccess :function(node){
			if($('#MENU_ID').val()!=''){
	 			$('#pid').combotree('setValue',parentTitle);
	 		}
	 	},
	 	onSelect:function(node){
	 		if(node){
	 			$("#PARENT_ID").val(node.MENU_ID);
	 			$("#APP_ID").val(node.APP_ID);
	 			parentChangeFlag = true;
	 		}
	 	}
	});
	
	$("#type").combobox({
		width:171,
		panelHeight:'auto',
		data : [{
		    "id":'1',
		    "text":"菜单",
		    "selected":false
		},{
		    "id":'2',
		    "text":"操作",
		    "selected":false
		}],
		editable:false,
		valueField:'id',
	 	textFiled:'text',
	 	onSelect:function(node){
	 		if(node){
	 			$("#OPERTYPE").val(node.id);
	 		}
	 	}
	});
	
	$("#iconCls").combobox({
		editable:false,
		width:171,
		data:$.iconData,
		formatter: function(v){
			return $.formatString('<span style="margin-right:10px;margin-left:5px;'+
					'display:inline-block;vertical-align:middle;'+
					'width:16px;height:16px;background-size:16px;"><i class="{0}" /></span>{1}', v.value, v.text);
		},
		onSelect:function(node){
			if(node){
				$("#ICON_CLS").val(node.value);
			}
	 	}
	});
	
	$("#menuEditForm").form({
		url :appPath+"/MenuController/addOrEditMenu",
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
			if($('#MENU_ID').val()!=''){
				$("#type").combobox('select',node.OPERTYPE);
	 		}
			state = node.STATE;
			parentTitle = node.PARENT_TITLE;
			$('#OriginalParentId').val(node.PARENT_ID);
			$('#iconCls').combobox('select',node.ICON_CLS);
	 	},
		success : function(result) {
			var rls = dealBackJson(result);
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				if(parentChangeFlag){
					parent.$.modalDialog.openner.treegrid('reload')
				}else{
					var jsonData = JSON.parse(rls);
					jsonData.ICON_CLS = jsonData.ICONCLS;
					jsonData.ICONCLS = "icon-blank";
					jsonData.ICONCLS = "icon-blank"
					jsonData.STATE=state;
					parent.$.modalDialog.openner.treegrid('update',{
						id : $('#MENU_ID').val(),
						row : jsonData
					});
				}
				parent.$.modalDialog.handler.dialog('close');
				swalAlert('编辑成功','菜单编辑成功','success',2000);
			}else{
				swalAlert('编辑失败','菜单编辑失败','error',2000);
			}
		}
	});
});