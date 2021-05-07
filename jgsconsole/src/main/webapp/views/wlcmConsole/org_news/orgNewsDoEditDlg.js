var fileinputUploadResultList = new Array();
$(function() {
	var um = null;
	
	$("#orgNewsEditForm").form({
		url :appPath+"/HpwlNews/addOrEditOrgNews",
		onSubmit : function() {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$('#CREATE_TIME').val($('#fbsj').datetimebox('getText'));
			$('#UMHTML').val(um.getContent());
			var isValid = $(this).form('validate');
			if (!isValid) {
				parent.$.messager.progress('close');
			}
			return isValid;
		},
		onLoadSuccess:function(node){
			if(node){
				var ht = null;
				var wth = null;
				if(typeof(window.innerHeight)!="undefined"){ht = window.innerHeight;wth = window.innerWidth;}
				if(typeof(window.innerHeight)=="undefined"){ht = document.documentElement.clientHeight;wth = document.documentElement.clientWidth;}
				$('#upFj_files').width($('#widthOptions').width()-150);
			    $('#anoumeditor').width($('#widthOptions').width());
			    $('#anoumeditor').height(ht-300);
			    UM.delEditor("anoumeditor");
			    um = UM.getEditor('anoumeditor');
			    um.ready(function() {
			    	if(node.CONTENT){
			    		$('#UMHTML').val(node.CONTENT);
			    		um.setContent("", true);
			    		um.setContent(node.CONTENT, true);
			    	}else{
			    		$('#UMHTML').val("");
			    		um.setContent("", true);
			    	}
			        
			    });
			    
			    $('#CREATOR').val(USER_ALIAS);
			    
			    $('#isShown').combobox({
					editable:false,
					required:true,
					width:50,
					panelHeight:'auto',
					data:[{
					    "id":'0',
					    "text":"是"
					},{
					    "id":'1',
					    "text":"否"
					}],
					valueField: 'id',
					textField: 'text',
					onSelect : function(){
						$('#IS_SHOWN').val($('#isShown').combobox('getValue'));
					}
				});
			    $('#isShown').combobox('select',node.IS_SHOWN);
			    
			    $('#fbrq').datebox({
			    	width:110,
					editable:false,
					required:true,
					value:node.DATETIME,
					onSelect : function(){
						$('#DATETIME').val($('#fbrq').datebox('getText'));
					}
				});
				
				$('#fbsj').datetimebox({
					width:170,
					editable:false,
					required:true,
					value:node.CREATE_TIME
				});
				
				$('#upfjbtn').bind('click',function(){
					$('#UP_BTN_HAS_CLICKED').val('0');
					var target = $(this);
			    	if(parent.prev_webuipop_tar){
			    		$(parent.prev_webuipop_tar).webuiPopover('destroy');
			    		parent.prev_webuipop_tar = target;
			    	}else{
			    		parent.prev_webuipop_tar = target;
			    	}
			    	
			    	$(target).webuiPopover({
			    		placement:'top-left',
			    		trigger:'click',
			    		title:'附件上传',
			    		width:860,
			    		height:430,
			    		multi:true,
			    		closeable:true,
			    		padding:false,
			    		type:'iframe',
			    		url:appPath+'/views/wlcmConsole/org_news/uploadEditDlg.jsp',
			    		onHiden:function(){
			    			$('#UP_BTN_HAS_CLICKED').val('1');
			    			$('.webui-popover').remove();
			    			initSavePopover('newDlsPp','您已进行了附件操作，请记得保存！');
			    		}
			    	});
			    	$(target).webuiPopover('show');
				});
				
				var fujian = node['ATTACHMENT'];
				if(fujian!=null&&fujian!=''){
					$('#ATTACHMENT').val(node['ATTACHMENT']+',')
					var lihtml = "";
					fileinputUploadResultList = fujian.split(',');
					for(var i=0;i<fileinputUploadResultList.length;i++){
					    var strl = fileinputUploadResultList[i];
					    var finstr = strl.substring(strl.lastIndexOf('/')+1,strl.length);
					    lihtml += ("<li style='position:relative;margin-left:10px;display:inline-block;'><a href='javascript:void(0)' onclick='delUploads(this)' deluri='"+strl+"' class='gznrtbdel' /><a href='javascript:void(0)' class='gznrtbdelTitle'>"+finstr+"</a></li>");
				    }
					$('#upFj_files').append(lihtml);
					fileinputUploadResultList = null;
					fileinputUploadResultList = new Array();
				}
				
			}
		},
		success : function(result) {
			var rls = dealBackJson(result);
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				var jsonData = JSON.parse(rls);
				parent.$.modalDialog.openner.datagrid('updateRow',{
					index : $('#rowIndex').val(),
					row : jsonData
				});
				$('#newDlsPp').webuiPopover('destroy');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert('编辑成功','编辑成功','success',2000);
			}else{
				swalAlert('编辑失败','编辑失败','error',2000);
			}
		}
	});
});
function delUploads(obj){
	var deluri = $(obj).attr('deluri')+',';
	var fjval = $('#ATTACHMENT').val();
	$('#ATTACHMENT').val(fjval.replace(deluri,''));
	$(obj).parent().remove();
	initSavePopover('newDlsPp','您已进行了附件操作，请记得保存！');
}
function addUploadLi(){
	var len = fileinputUploadResultList.length;
	if(len>0){
		var finalUploads = "";
		var lihtml = "";
	    for(var i=0;i<len;i++){
		    var strl = fileinputUploadResultList[i];
		    var finstr = strl.substring(strl.lastIndexOf('/')+1,strl.length);
		    lihtml += ("<li style='position:relative;margin-left:10px;display:inline-block;'><a href='javascript:void(0)' onclick='delUploads(this)' deluri='"+strl+"' class='gznrtbdel' /><a href='javascript:void(0)' class='gznrtbdelTitle'>"+finstr+"</a></li>");
		    finalUploads += (strl+",");
	    }
	    $('#ATTACHMENT').val($('#ATTACHMENT').val()+finalUploads);
		$('#upFj_files').append(lihtml);
	}
	fileinputUploadResultList = null;
	fileinputUploadResultList = new Array();
}