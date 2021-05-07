$(function() {
	$("#resetPwdForm").form({
		url :appPath+"/user/resetPassword",
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
		success : function(result) {
			parent.$.messager.progress('close');
			
			if (result) {
				parent.reload;
				parent.$.modalDialog.openner.datagrid('reload');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert("操作成功","重置用户密码成功！","success",2000);
			}else{
				swalAlert("操作失败","重置用户密码失败！","error",2000);
			}
		}
	});
	
});