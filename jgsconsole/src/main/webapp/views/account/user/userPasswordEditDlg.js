$(function() {
	$("#changeUserPasswordForm").form({
		url :appPath+"/user/changePassword",
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
			var data = eval('('+result+')');
			if (data) {
				parent.reload;
				parent.$.modalDialog.handler.dialog('close');
				swalAlert("操作结果",data['result'],"success",2000);
			}else{
				swalAlert("错误！","获取数据异常","error",2000);
			}
		}
	});
	
});