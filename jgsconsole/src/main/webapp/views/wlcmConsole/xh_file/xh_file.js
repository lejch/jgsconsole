var $dg;
var $grid;
var flag=true;
var height;
var width;
var allowed2Pdf = "doc,docx,xls,xlsx,bmp,gif,jpg,png";
var prev_click_idx =null;

$(document).ready(function(){
	initHeight();
	initMenuTreeGrid(); 
	bindEvent();
});
function initHeight(){
	if(typeof(window.innerHeight)!="undefined"){height=window.innerHeight;width=window.innerWidth;}
    if(typeof(window.innerHeight)=="undefined"){height=document.documentElement.clientHeight;width=document.documentElement.clientWidth;}
    height = height-75;
}
function initMenuTreeGrid(){
	$dg = $("#orgDownLoad");
	$grid=$dg.datagrid({
		width : $('#orgnewsworkspace').width()-30,
		height : height,
		url: appPath+"/xhf/getXhFile",
		queryParams:{},
		border:false,
		fitColumns:true,
		nowrap: false,
		striped: true,
		singleSelect:true,
		scrollbarSize:0,
		pagination:true,
		onBeforeLoad:function(){
			if($('.mCS-minimal-dark').length>0){
				$('.datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('.datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		onClickRow:function(rowIndex,rowData){
			if(prev_click_idx!=null&&prev_click_idx!=rowIndex){
				$dg.datagrid('unselectRow',prev_click_idx);
				prev_click_idx = rowIndex;
			}else{
				$dg.datagrid('selectRow',rowIndex);
				prev_click_idx = rowIndex;
			}
		},
		columns : [[
		            {field:'TITLE',title:'名称',width:400,formatter:function(value,row,index){
							return '<table><tr><td style="border:none;"><img style="width:60px;display:inline-block;" src="'+appPath+'/static/imagess/office/'+row.FILE_TYPE+'.png" onerror=\'this.src="'+appPath+'/static/imagess/office/hlp.png"\' />'+
							'</td>'+
							'<td style="border:none;margin-left:20px;"><div>'+
							'<font size=4>'+value+'</font><br/>'+
							'<font color=#919191>发布时间：</font><span style="color:#919191;letter-spacing:1px;">'+row.CREATE_TIME+'</span></div></td></tr></table>';
					}},
					{field:'FILE_SIZE',title:'文件大小',width:100,formatter:function(value,row,index){
						return '文件大小：'+value;
					}},
					{field:'CREATOR',title:'创建人',width:60},
					{field:'CAN_DLD',title:'下载权限',width:80,align:'center',formatter:function(value,row,index){
			        	if(value=='0'){
			        		return '<table id="'+row.ID+'_'+index+'" rowIndex="'+index+'" rowid="'+row.ID+'" ckstat="'+row.CAN_DLD+'" onclick="setCanDld(this)" align="center" cellspacing="0" cellpadding="0" style="cursor:pointer;"><tr><td>'+
			        				'<div style="width:28px;height:28px;background:#5cb85c;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
			        					'<i class="glyphicon glyphicon-ok" style="color:#fff;"></i>'+
			        				'</div>'+
			        				'</td><td>'+
			        				'<div style="width:60px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
			        					'<font color=green>可以下载</font>'+
			        				'</div>'+
			        			'</td></tr></table>';
			            }else{
			            	return '<table id="'+row.ID+'_'+index+'" rowIndex="'+index+'" rowid="'+row.ID+'" ckstat="'+row.CAN_DLD+'" onclick="setCanDld(this)" align="center" cellspacing="0" cellpadding="0" style="cursor:pointer;"><tr><td>'+
							'<div style="width:28px;height:28px;background:#d9534f;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
								'<i class="glyphicon glyphicon-remove" style="color:#fff;"></i>'+
							'</div>'+
							'</td><td>'+
							'<div style="width:60px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
								'<font color=red>不可下载</font>'+
							'</div>'+
						'</td></tr></table>';
			        	}
			        }},
					{field:'ID',title:'操作',width:100,align:'center',formatter:function(value,row,index){
						if((allowed2Pdf.indexOf(row.FILE_TYPE)>-1)||row.FILE_TYPE=='pdf'){
							return '<button type="button" style="padding:5px 10px;" onclick="preview(this)" id="pv_'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
			   				'<i class="glyphicon glyphicon-eye-open" style="font-size:14px;" ></i>'+
				   			'</button>'+
				   			'<button type="button" style="padding:5px 10px;margin-left:1px;" onclick="btnDownload(this)" id="tip_'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
			   				'<i class="glyphicon glyphicon-floppy-save" style="font-size:14px;" ></i>'+
			   			'</button>'+
			   			'<button type="button" style="padding:5px 10px;margin-left:1px;" onclick="removeNode(this)" id="del_'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
			   				'<i class="glyphicon glyphicon-trash" style="font-size:14px;" ></i>'+
			   			'</button>';
						}else{
							return '<button type="button" style="padding:5px 10px;margin-left:36px;" onclick="btnDownload(this)" id="tip_'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
			   				'<i class="glyphicon glyphicon-floppy-save" style="font-size:14px;" ></i>'+
			   			'</button>'+
			   			'<button type="button" style="padding:5px 10px;margin-left:1px;" onclick="removeNode(this)" id="del_'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
			   				'<i class="glyphicon glyphicon-trash" style="font-size:14px;" ></i>'+
			   			'</button>';
						}
					}}
		            ]]
	});
}
function btnDownload(obj){
	event.stopPropagation();
	var rowIndex = $(obj).attr('rowIndex');
	var rows = $grid.datagrid('getRows');
	var node = rows[rowIndex];
	initDownLoad(appPath+"/Hpwlm/download",node.TITLE,node.FILE_LOC,node.FILE_TYPE);
}

function bindEvent(){$('#upxh').bind('click',function(){jspReqControl(function(){addRowsOpenDlg();});});}
function initBtnTips(obj){event.stopPropagation();layer.tips('删除上传资料','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips3(obj){event.stopPropagation();layer.tips('预览','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips1(obj){event.stopPropagation();layer.tips('上传资料','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips2(obj){event.stopPropagation();layer.tips('下载', '#'+$(obj).attr('id'), {tips: 1});}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function preview(obj){
	event.stopPropagation();
	jspReqControl(function(){
	   var rowIndex = $(obj).attr('rowIndex');
	   var rows = $grid.datagrid('getRows');
	   var node = rows[rowIndex];
	   if(node['FILE_TYPE']=='pdf'){
		   initPdfReader(WEB_TRANS+'/'+node['FILE_LOC']);
	   }else{
		   var cur_allowed_index = allowed2Pdf.indexOf(node['FILE_TYPE']);
 		   if(cur_allowed_index<18){
 			   initPdfReader(WEB_TRANS+'/'+node['PDF_LOC']);
 		   }
 		   if(cur_allowed_index>17){
 			   initImgPreview(node['FILE_LOC']);
 		   }
	   }
	});
}
function initImgPreview(url){
	var nImg = new Image();
	nImg.onload = function () {
		w = nImg.width;
		h = nImg.height;
		var imgheight = window.innerHeight-50;
		var imgwidth = w*(imgheight/h)
		layer.open({
		  type: 1,title:"文档预览",shadeClose: true,
		  shade: [0.3,'#000'],
		  area: [imgwidth+'px', imgheight+'px'],
		  content: '<div style="background:url(\''+WEB_TRANS+'/'+url+'\');background-size: cover !important;background-repeat: no-repeat !important;background-position: center !important;overflow: hidden;width:'+imgwidth+'px;height:'+(imgheight-43)+'px;transition: 0.5s;border: 0;vertical-align: middle;"></div>'
		});
	}
	nImg.src = WEB_TRANS+'/'+url;
}
function initPdfReader(url){
	layer.open({
		   type: 2,
		   title:"文档预览",
		   content: appPath+'/static/pdfjs/web/viewer.html?file='+url,
		   shadeClose: true,
		   shade: [0.3,'#000'],
		   area: ['90%', '92%'],
		   maxmin: false
		 });
}
function removeNode(obj){
	event.stopPropagation();
	jspReqControl(function(){
		var rowIndex = $(obj).attr('rowIndex');
		var rows = $grid.datagrid('getRows');
		var node = rows[rowIndex];
		swal({
			title: "您确定要删除吗？", 
			text: '是否确定删除该文件?删除后,不可恢复,请谨慎操作', 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要删除",
			confirmButtonColor: "#f86674"
			}, function() {
		    	$.ajax({
				   type: "POST",
				   async: false,
				   url: appPath+"/xhf/delUpFile",
				   data : {"ID":node.ID,"UPURI":node.FILE_LOC},
				   timeout:120*1000,
				   dataType:"json",
			       success: function(data){
			    	   if(data){
			    		   var queryTreeNodeData = data;
			    		   if(queryTreeNodeData[0]['result']=='success'){
			    			   $grid.datagrid('reload');
			    			   swalAlert("删除成功","资料删除成功","success",2000);
			    		   }
			    	   }else{
			    		   swalAlert("操作失败!", "获取信息异常！请稍后重试", "error",2000);
			    	   }
				   },
				   error:function(xhr,textStatus,errorThrown){
					   swalAlert("系统异常", textStatus, "error",2000);
				   }
				});
		});
	});
}
function addRowsOpenDlg() {
	parent.$.modalDialog.openner= $grid;
	parent.$.modalDialog({
		title : "上传资料",
		width : width-187,
		height : 500,
		href : appPath+"/views/wlcmConsole/xh_file/uploadEditDlg.jsp"
	});
}
function setCanDld(obj){
	event.stopPropagation();
	jspReqControl(function(){
		var state = $(obj).attr('ckstat');
		var flag = null;
		var greetingStr = null;
		var next_to_set = null;
		if(state=='0'){
			next_to_set = '<tr><td>'+
			'<div style="width:28px;height:28px;background:#d9534f;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
			'<i class="glyphicon glyphicon-remove" style="color:#fff;"></i>'+
		'</div>'+
		'</td><td>'+
		'<div style="width:60px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
			'<font color=red>不可下载</font>'+
		'</div>'+
	'</td></tr>';
			greetingStr = '取消';
			gbtmstr = '不可下载了';
			flag = '1';
		}else{
			next_to_set = '<tr><td>'+
				'<div style="width:28px;height:28px;background:#5cb85c;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
				'<i class="glyphicon glyphicon-ok" style="color:#fff;"></i>'+
				'</div>'+
				'</td><td>'+
				'<div style="width:60px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
					'<font color=green>可以下载</font>'+
					'</div>'+
					'</td></tr>';
			greetingStr = '设置';
			gbtmstr = '可以正常下载';
			flag = '0';
		}
		swal({
			title: "您确定要 "+greetingStr+"下载权限吗？", 
			text: greetingStr+'下载权限后，首页学会文件中的该文件就'+gbtmstr, 
			type: "warning",
			showCancelButton:true,closeOnConfirm:false,confirmButtonText:"是的,我要"+greetingStr,confirmButtonColor:"#f86674"},
			function(isConfirm){
				if(isConfirm){
					$.ajax({async:false,url:appPath+"/xhf/setXhfileCanDld",dataType:"json",type:"POST",timeout:120*1000,
						    data:{"ID":$(obj).attr('rowid'),"CAN_DLD":flag},
						    error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);},
						    success: function(data){
						    	if(data){
						    		var queryTreeNodeData = data;
						    		if(queryTreeNodeData[0]['result']=='success'){
						    			$(obj).attr('ckstat',flag);
						    			$(obj).empty();
						    			$(obj).html(next_to_set);
						    			var data = $grid.datagrid('getRows');
						    			data[parseInt($(obj).attr('rowIndex'))].CAN_DLD=flag;
						    			swalAlert(greetingStr+"成功",greetingStr+"首页显示成功","success",2000);
						    		}
						    	}else{
						    		swalAlert("操作失败!", "获取信息异常！请稍后重试", "error",2000);
						    	}
						    }
					});
				}
		});
	});
}