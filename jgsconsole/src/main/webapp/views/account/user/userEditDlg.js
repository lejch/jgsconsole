$(function() {
	$("#editUserForm").form({
		url :appPath+"/user/addUser",
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
		onLoadSuccess:function(node){
		},
		success : function(result) {
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				parent.$.modalDialog.openner.datagrid('reload');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert("编辑成功！","编辑用户成功!","success",2000);
			}else{
				swalAlert("编辑失败！","编辑用户失败!","error",2000);
			}
		}
	});
	
});