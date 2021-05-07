var $dg;var $grid;var flag=true;var height;var width;var prev_webuipop_tar = null;var prev_click_idx = null;

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
$dg = $("#orgNewsGrid");
$grid=$dg.datagrid({
	width : $('#orgnewsworkspace').width()-20, height : height,
	url : appPath+"/HpwlNews/getAllTypeNews",
	queryParams : {'type':NEWS_TYPE},
	border : false, fitColumns : true, nowrap : false, striped : false, scrollbarSize : 0, singleSelect : true, pageSize : 10, pagination : true,
	onLoadSuccess : function(){
		$('.datagrid-body:last').mCustomScrollbar({theme:'minimal-dark',scrollInertia:100});
	},
	onBeforeLoad:function(){
		if($('.mCS-minimal-dark').length>0){
			$('.datagrid-body:last').mCustomScrollbar("destroy");
		}
	},
	columns : [[
	    {field:'ID',hidden:true},
        {field:'TITLE',title:'标题',width:100,halign:'center',formatter:function(value,row,index){
        	if(row.IS_PUBLISH=='0'){
        		return '<span class="label label-success">已发布</span>&nbsp;&nbsp;'+value;
        	}else{
        		return '<span class="label label-danger">草稿</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+value;
        	}
        }},
        {field:'DATETIME',title:'发布日期',width:20,align:'center'},
        {field:'CREATOR',title:'发布人',width:20,align:'center'},
        {field:'IS_SHOWN',title:'重要通知<i id="imptNotication" onclick="notificationsets(this)" class="glyphicon glyphicon-comment zytzflag" onmouseleave="delBtnTips()" onmouseenter="initBtnTips5(this)"></i>',width:20,align:'center',formatter:function(value,row,index){
        	if(value=='0'){
        		return '<table id="'+row.ID+'_'+index+'" rowIndex="'+index+'" rowid="'+row.ID+'" ckstat="'+row.IS_SHOWN+'" onclick="setShowInHomepage(this)" align="center" cellspacing="0" cellpadding="0" style="cursor:pointer;"><tr><td>'+
        				'<div style="width:28px;height:28px;background:#5cb85c;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
        					'<i class="glyphicon glyphicon-ok" style="color:#fff;"></i>'+
        				'</div>'+
        				'</td><td>'+
        				'<div style="width:50px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
        					'<font color=green>已设置</font>'+
        				'</div>'+
        			'</td></tr></table>';
            }else{
            	return '<table id="'+row.ID+'_'+index+'" rowIndex="'+index+'" rowid="'+row.ID+'" ckstat="'+row.IS_SHOWN+'" onclick="setShowInHomepage(this)" align="center" cellspacing="0" cellpadding="0" style="cursor:pointer;"><tr><td>'+
				'<div style="width:28px;height:28px;background:#d9534f;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
					'<i class="glyphicon glyphicon-remove" style="color:#fff;"></i>'+
				'</div>'+
				'</td><td>'+
				'<div style="width:50px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
					'<font color=red>未设置</font>'+
				'</div>'+
			'</td></tr></table>';
        	}
        }},
        {field:'IS_SET_HPIC',title:'首页轮播',width:20,align:'center',formatter:function(value,row,index){
        	if(value=='0'){
        		return '<div onclick="delSetHppic(this)" node="'+row.ID+'" imgsrc="'+row.SET_HPIC_URI+'" rowIndex="'+index+'" style="position:relative;"><img onmouseover="showSetedHpImg(this)" style="margin-right:2px;margin-left:-30px;cursor:pointer;" imgsrc="'+row.SET_HPIC_URI+'" src="'+appPath+'/static/imagess/photographs.png"></img><i class="glyphicon glyphicon-ok gonpic" style="color:green;"></i><div class="hasSetHpLoop">已设置</div></div>';
        	}else{
        		return '<div onclick="setHomepagePic(this)" node="'+row.ID+'" rowIndex="'+index+'" style="position:relative;"><img style="margin-right:2px;margin-left:-30px;cursor:pointer;" src="'+appPath+'/static/imagess/photographs.png"></img><i class="glyphicon glyphicon-remove gonpic" style="color:red;"></i><div style="display:inline-block;position:absolute;top:8px;cursor:pointer;color:red;">未设置</div></div>';
        	}
        }},
        {field:'operation',title:'操作',width:20,align:'center',formatter:function(value,row,index){
        	var publishBtn = '';
        	if(row.IS_PUBLISH=='0'){
        		publishBtn = '<button type="button" onclick="back_publishedNews(this)" id="bkpubsh_'+row.ID+'" node="'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
   								  '<i class="glyphicon glyphicon-import" style="font-weight:500;" ></i>'+
   							 '</button>';
        	}else{
        		publishBtn = '<button type="button" onclick="publish_newses(this)" id="gopubsh_'+row.ID+'" node="'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
   								 '<i class="glyphicon glyphicon-saved" style="font-weight:500;" ></i>'+
   							 '</button>';
        	}
        	return publishBtn+
        			'<button type="button" onclick="delOrgNews(this)" id="tip_'+row.ID+'" node="'+row.ID+'" rowIndex="'+index+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" style="margin-left:5px;" class="btn btn-default btn-xs btn_plugin_style delBtnOpt">'+
		   				'<i class="glyphicon glyphicon-trash" style="font-weight:500;" ></i>'+
		   			'</button>';
        }}
     ]],
     rowStyler: function(index,row){
 	    if(row.IS_PUBLISH=='0'){return 'background:#98FB98;';}
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
	 onDblClickRow:function(rowIndex,rowData){
		 jspReqControl(function(){
			 parent.$.modalDialog({
				title : "编辑"+NEWS_TITLE,width:650,height : height+160,href : appPath+"/views/wlcmConsole/org_news/orgNewsDoEditDlg.jsp",
				onLoad:function(){
					var f = parent.$.modalDialog.handler.find("#orgNewsEditForm");
					rowData.rowIndex = rowIndex;
					f.form("load", rowData);
				},		
				onClose:function(){
					var f = parent.$.modalDialog.handler.find("#newDlsPp");
					f.click();
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				},
				onBeforeClose:function(){
					if(parent.$.modalDialog.handler.find('#UP_BTN_HAS_CLICKED').val()=='0'){return false;}
				},
				buttons:[
				    {id:'savebtncls',text:'保存',handler:function(){parent.$.modalDialog.openner=$grid;var f=parent.$.modalDialog.handler.find("#orgNewsEditForm");f.submit();}},
					{id:'cancelbtncls',text:'取消',handler:function(){var f=parent.$.modalDialog.handler.find("#newDlsPp");f.click();parent.$.modalDialog.handler.dialog('destroy');parent.$.modalDialog.handler=undefined;}}
				]
			});
			$grid.datagrid('selectRow',rowIndex);
		});
	 }
});
}

function bindEvent(){
	$(NEWS_ADD_BTN).bind('click',function(){
		jspReqControl(function(){
			addRowsOpenDlg();
		});
	});
	
	$('#addNewsByWord').bind('click',function(){
		jspReqControl(function(){
			parent.$.modalDialog({
				title:"上传word导入新闻",width:620,height:470,href:appPath+"/views/wlcmConsole/"+NEWS_FOLDER+"/docxUploadEditDlg.jsp",
				onClose:function(){
					$grid.datagrid('reload');
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler=undefined;
				}
			});
		});
	});
	
	$('#addNewsByPdf').bind('click',function(){
		jspReqControl(function(){
			parent.$.modalDialog({
				title:"上传Pdf导入新闻",width:620,height:470,href:appPath+"/views/wlcmConsole/"+NEWS_FOLDER+"/pdfUploadEditDlg.jsp",
				onClose:function(){
					$grid.datagrid('reload');
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler=undefined;
				}
			});
		});
	});
}

function initBtnTips(obj){event.stopPropagation();layer.tips('删除'+NEWS_TITLE,'#'+$(obj).attr('id'),{tips:1});}
function initBtnTips2(obj){event.stopPropagation();layer.tips('新增'+NEWS_TITLE,'#'+$(obj).attr('id'),{tips:1});}
function initBtnTips3(obj){event.stopPropagation();layer.tips('发布'+NEWS_TITLE,'#'+$(obj).attr('id'),{tips:1});}
function initBtnTips4(obj){event.stopPropagation();layer.tips('撤销'+NEWS_TITLE,'#'+$(obj).attr('id'),{tips:1});}
function initBtnTips5(obj){event.stopPropagation();layer.tips('目前首页正在显示通知的重要','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips6(obj){event.stopPropagation();layer.tips('docx导入新闻','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips7(obj){event.stopPropagation();layer.tips('pdf导入新闻','#'+$(obj).attr('id'),{tips:1});}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}

function notificationsets(obj){
	event.stopPropagation();
	jspReqControl(function(){
		layer.open({title:false,move:false,id:'synotications',type:1,resize:false,area:['950px','130px'],shade:[0.1,'#fff'],shadeClose:true,closeBtn:0,offset:['80px',$(obj).offset.left],
			success:function(layero, index){
				$.ajax({async:false,url:appPath+"/HpwlNews/getInfoList",dataType:"json",timeout:120*1000,type:"POST",
			    	   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);},
					   data:{},
				       success: function(data){
				    	   try{
					    	   for(var i=0;i<data.length;i++){
					    		   $('#synoticationsdvt').append($('<tr height="30"><td><span style="color:#888;font-size:10px;">NO.'+(parseInt(i)+1)+'</span></td><td>'+data[i]['TITLE']+'<span style="color:#888;margin-left:10px;font-size:10px;">['+data[i]['DATETIME']+']</span></td></tr>'));
					    	   }
				    	   }catch(e){}
					  },
				});
			},
			content:'<div class="alert alert-success alert-dismissible fade in" style="height:200px;padding-right:15px !important;" role="alert">'+
						'<table id="synoticationsdvt"></table>'+
					'</div>'});
	});
}

function back_publishedNews(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({title:"您确定要撤回发布的"+NEWS_TITLE+"吗？",text:'撤回发布的'+NEWS_TITLE+'后，网站首页就不显示该条'+NEWS_TITLE+'了！',
		  type:"warning",showCancelButton:true,closeOnConfirm:false,confirmButtonText:"是的，我要撤回",confirmButtonColor:"#f86674"},
		  function(){
		    $.ajax({async:false,url:appPath+"/HpwlNews/back_publishedNews",dataType:"json",timeout:120*1000,type:"POST",
		    	   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);},
				   data:{"ID":$(obj).attr('node')},
			       success: function(data){
			    	   if(data){
			    		   var queryTreeNodeData = data;
			    		   if(queryTreeNodeData[0]['result']=='success'){
			    			   $grid.datagrid('reload');
			    			   swalAlert("撤回成功","您可继续编辑该"+NEWS_TITLE,"success",2000);
			    		   }
			    	   }else{
			    		   swalAlert("操作失败!", "获取信息异常！请稍后重试", "error",2000);
			    	   }
				  },
			});
		});
	});
}

function publish_newses(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({title:"您确定要发布"+NEWS_TITLE+"吗？",text:'发布后，网站首页就可以显示该条'+NEWS_TITLE+'！',
		  type:"warning",showCancelButton:true,closeOnConfirm:false,confirmButtonText:"是的，我要发布",confirmButtonColor:"#f86674"},
		  function(){
		    $.ajax({async:false,url:appPath+"/HpwlNews/publish_newses",dataType:"json",timeout:120*1000,type:"POST",
		    	   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);},
				   data:{"ID":$(obj).attr('node')},
			       success: function(data){
			    	   if(data){
			    		   var queryTreeNodeData = data;
			    		   if(queryTreeNodeData[0]['result']=='success'){
			    			   $grid.datagrid('reload');
			    			   swalAlert("发布成功！","网站首页已可正常显示！","success",2000);
			    		   }
			    	   }else{
			    		   swalAlert("操作失败!", "获取信息异常！请稍后重试", "error",2000);
			    	   }
				   },
			});
		});
	});
}

function delSetHppic(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({title:"您确定要删除吗？",text:'是否确定删除首页轮播?删除后,不可恢复,请谨慎操作',type:"warning",showCancelButton:true,closeOnConfirm:false,
			  confirmButtonText:"是的，我要删除",confirmButtonColor:"#f86674"},
		  function(){
		    $.ajax({async:false,url:appPath+"/HpwlNews/delHploop",dataType:"json",timeout:120*1000,type:"POST",
		    	   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);},
				   data:{"ID":$(obj).attr('node'),'imgsrc':$(obj).attr('imgsrc')},
			       success: function(data){
			    	   if(data){
			    		   var queryTreeNodeData = data;
			    		   if(queryTreeNodeData[0]['result']=='success'){
			    			   $grid.datagrid('reload');
			    			   swalAlert("删除成功","首页轮播图片删除成功","success",2000);
			    		   }
			    	   }else{
			    		   swalAlert("操作失败!", "获取信息异常！请稍后重试", "error",2000);
			    	   }
				   },
			});
		});
	});
}
var pre_show_hppop = null;
function showSetedHpImg(obj){
	if(pre_show_hppop!=null){
		$(pre_show_hppop).webuiPopover('destroy');
		pre_show_hppop = obj;
	}else{
		pre_show_hppop = obj;
	}
	$(obj).webuiPopover({
		placement:'left',
		trigger:'hover',
		title:'首页轮播图片预览',
		content:'<img src="'+$(obj).attr('imgsrc')+'" style="padding:5px;" width="527" height="400"></img>',
		width:537,
		height:395,
		multi:true,
		padding:false,
		type:'html'
	});
	$(obj).webuiPopover('show');
}
function setHomepagePic(obj){
	event.stopPropagation();
	jspReqControl(function(){
		var rows = $grid.datagrid('getRows');
		var row = rows[$(obj).attr('rowIndex')];
		var rowIndex = $(obj).attr('rowIndex');
		parent.$.modalDialog({
			title : "设置首页轮播图片",
			width : 950,
			height : 550,
			href : appPath+"/views/wlcmConsole/org_news/setHpLoopEditDlg.jsp",
			onLoad : function(){
				var f = parent.$.modalDialog.handler.find("#SETHPLPFORM");
				f.form("load", {'CONTENT':row.CONTENT,'row':row,'rowIndex':rowIndex,'ID':row.ID});
			},
			onClose:function(){
				var f = parent.$.modalDialog.handler.find("#newDlsPp");
				f.click();
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			},
			buttons : [ {
				id:'savebtncls',
				text : '保存',
				handler : function() {
					parent.$.modalDialog.openner= $grid;
					var f = parent.$.modalDialog.handler.find("#SETHPLPFORM");
					f.submit();
				}
			}, {
				id:'cancelbtncls',
				text : '取消',
				handler : function() {
					var f = parent.$.modalDialog.handler.find("#newDlsPp");
					f.click();
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}]
		});
	});
}
function delOrgNews(obj){
	event.stopPropagation();
	jspReqControl(function(){
		removeNode($(obj).attr('node'),$(obj).attr('rowIndex'));
	});
}
function removeNode(node,rowIndex){
	swal({
		title: "您确定要删除该"+NEWS_TITLE+"吗？", 
		text: '删除后,不可恢复,请谨慎操作', 
		type: "warning",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonText: "是的，我要删除",
		confirmButtonColor: "#f86674"
		}, function() {
	    	$.ajax({
			   type: "POST",
			   async: false,
			   url: appPath+"/HpwlNews/delOrgNews",
			   data : {"ID":node},
			   timeout:120*1000,
			   dataType:"json",
		       success: function(data){
		    	   if(data){
		    		   var queryTreeNodeData = data;
		    		   if(queryTreeNodeData[0]['result']=='success'){
		    			   $grid.datagrid('deleteRow',rowIndex);
		    			   swalAlert("删除成功","删除成功","success",2000);
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
}
function setShowInHomepage(obj){
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
		'<div style="width:50px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
			'<font color=red>未设置</font>'+
		'</div>'+
	'</td></tr>';
			greetingStr = '取消设置';
			flag = '1';
		}else{
			next_to_set = '<tr><td>'+
				'<div style="width:28px;height:28px;background:#5cb85c;border-top:1px solid #ccc;border-left:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;">'+
				'<i class="glyphicon glyphicon-ok" style="color:#fff;"></i>'+
				'</div>'+
				'</td><td>'+
				'<div style="width:50px;height:28px;border:1px solid #ccc;line-height:28px;background:#fff;">'+
					'<font color=green>已设置</font>'+
					'</div>'+
					'</td></tr>';
			greetingStr = '设置';
			flag = '0';
		}
		swal({
			title: "您确定要 "+greetingStr+" 重要通知吗？", 
			text: '目前默认在首页滚动3条重要通知，取所有设置了重要通知的记录的时间最近的3条显示', 
			type: "warning",
			showCancelButton:true,closeOnConfirm:false,confirmButtonText:"是的,我要"+greetingStr,confirmButtonColor:"#f86674"},
			function(isConfirm){
				if(isConfirm){
					$.ajax({async:false,url:appPath+"/HpwlNews/setShowInHomepage",dataType:"json",type:"POST",timeout:120*1000,
						    data:{"ID":$(obj).attr('rowid'),"IS_SHOWN":flag},
						    error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);},
						    success: function(data){
						    	if(data){
						    		var queryTreeNodeData = data;
						    		if(queryTreeNodeData[0]['result']=='success'){
						    			$(obj).attr('ckstat',flag);
						    			$(obj).empty();
						    			$(obj).html(next_to_set);
						    			var data = $grid.datagrid('getRows');
						    			data[parseInt($(obj).attr('rowIndex'))].IS_SHOWN=flag;
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
function addRowsOpenDlg() {
	parent.$.modalDialog({
		title:"新增"+NEWS_TITLE,width:650,height:height+160,href:appPath+"/views/wlcmConsole/"+NEWS_FOLDER+"/org_newsEditDlg.jsp",
		onBeforeClose:function(){if(parent.$.modalDialog.handler.find('#UP_BTN_HAS_CLICKED').val()=='0'){return false;}},
		buttons:[
		  {id:'savebtncls',text:'保存',handler:function(){
				parent.$.modalDialog.openner= $grid;
				var f = parent.$.modalDialog.handler.find("#orgNewsEditForm");
				f.submit();
		  }},
		  {id:'cancelbtncls',text:'取消',handler:function(){parent.$.modalDialog.handler.dialog('destroy');parent.$.modalDialog.handler=undefined;}}
		]
	});
}