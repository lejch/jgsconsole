$(function() {
	var state = null;
	var parentTitle = null;
	var parentChangeFlag = false;
	
	$("#pid").combotree({
		width:171,
		url:appPath+"/HpwlMenu/getTreelist",
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
	 			$('#TREELEVEL').val(parseInt(node.TREELEVEL)+1);
	 			parentChangeFlag = true;
	 		}
	 	}
	});
	
	$("#menuEditForm").form({
		url :appPath+"/HpwlMenu/addOrEditMenu",
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
			state = node.STATE;
			parentTitle = node.PARENT_TITLE;
			$('#OriginalParentId').val(node.PARENT_ID);
			
			$("#isused").combobox({
				value:node.FLAG,
				width:176,
				panelHeight:'auto',
				data : [{
				    "id":'0',
				    "text":"是",
				    "selected":false
				},{
				    "id":'1',
				    "text":"否",
				    "selected":false
				}],
				editable:false,
				valueField:'id',
			 	textFiled:'text',
			 	onSelect:function(node){
			 		if(node){
			 			$("#FLAG").val(node.id);
			 		}
			 	}
			});
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