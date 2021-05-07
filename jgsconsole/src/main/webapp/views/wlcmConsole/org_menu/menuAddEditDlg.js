$(function() {

	$("#isused").combobox({
		width:176,
		panelHeight:'auto',
		data : [{
		    "id":'0',
		    "text":"是",
		    "selected":true
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
	$("#FLAG").val('0');
	
	$("#menuAddForm").form({
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
				if(typeof(node.children)=='undefined'){//未展开
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
				parent.$.modalDialog.handler.dialog('close');
				swalAlert('新增成功','菜单新增成功','success',2000);
			}else{
				swalAlert('新增失败','菜单新增失败','error',2000);
			}
		}
	});
});