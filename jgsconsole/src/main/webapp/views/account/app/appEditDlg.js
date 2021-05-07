$(function() {
	var addOrEditFlag="新增";
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
	
	$("#ICONCLS").combobox({
		editable:false,
		width:176,
		data:$.iconData,
		formatter: function(v){
			return $.formatString('<span style="margin-right:10px;'+
											   'margin-left:5px;'+
											   'display:inline-block;'+
											   'vertical-align:middle;'+
											   'width:16px;'+
											   'height:16px;'+
			'background-size:16px;"><i class="{0}" /></span>{1}', v.value, v.text);
		},
		onSelect:function(node){
			if(node){
				$("#ICONCLS").val(node.value);
			}
	 	}
	});
	
	$("#editAPPForm").form({
		url :appPath+"/AppController/addOrEditApp",
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
			if($('#ID').val()!=''){
				addOrEditFlag = "编辑";
				$("#isused").combobox('select',node.FLAG);
	 		}
	 	},
		success : function(result) {
			parent.$.messager.progress('close');
			
			if (result) {
				parent.reload;
				parent.$.modalDialog.openner.datagrid('reload');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert(addOrEditFlag+'成功','子应用'+addOrEditFlag+'成功','success',2000);
			}else{
				swalAlert(addOrEditFlag+'失败','子应用'+addOrEditFlag+'失败','error',2000);
			}
		}
	});
	
});