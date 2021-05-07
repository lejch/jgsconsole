var fileinputUploadResultList = new Array();
$(function() {
	var ht = null;
	var wth = null;
	if(typeof(window.innerHeight)!="undefined"){ht = window.innerHeight;wth = window.innerWidth;}
	if(typeof(window.innerHeight)=="undefined"){ht = document.documentElement.clientHeight;wth = document.documentElement.clientWidth;}
    $('#upFj_files').width($('#widthOptions').width()-150);
    $('#myEditor').width($('#widthOptions').width());
    $('#myEditor').height(ht-300);
    UM.delEditor("myEditor");
    var um = UM.getEditor('myEditor');
    um.ready(function() {
    	$('#UMHTML').val("");
    	um.setContent("", true);
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
		    "text":"否",
		    selected:true
		}],
		valueField: 'id',
		textField: 'text',
		onSelect : function(){
			$('#IS_SHOWN').val($('#isShown').combobox('getValue'));
		}
	});
    $('#IS_SHOWN').val("1");
    $('#fbrq').datebox({
    	width:110,
		editable:false,
		required:true,
		onSelect : function(){
			$('#DATETIME').val($('#fbrq').datebox('getText'));
		}
	});
	
	$('#fbsj').datetimebox({
		width:170,
		editable:false,
		required:true
	});
	
	var date = new Date();
	var day = date.getDate()>9?date.getDate():"0"+date.getDate();
	var month = (date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1);
	var hour = date.getHours()>9?date.getHours():"0"+date.getHours();
	var min = date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes();
	var sec = date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds();
	var now = date.getFullYear()+'-'+month+'-'+day;
	var nowtime = now+" "+hour+":"+min+":"+sec;
	$('#fbrq').datebox('setValue',now);
	$('#DATETIME').val(now);
	$('#fbsj').datetimebox('setValue',nowtime);
	$('#CREATE_TIME').val(nowtime);
    
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
    		}
    	});
    	$(target).webuiPopover('show');
	});
    
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
		success : function(result) {
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				parent.$.modalDialog.openner.datagrid('reload');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert('保存成功','保存成功','success',2000);
			}else{
				swalAlert('保存失败','保存失败','error',2000);
			}
		}
	});
});
function delUploads(obj){
	var deluri = $(obj).attr('deluri')+',';
	var fjval = $('#ATTACHMENT').val();
	$('#ATTACHMENT').val(fjval.replace(deluri,''));
	$(obj).parent().remove();
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