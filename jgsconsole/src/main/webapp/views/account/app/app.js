var $appDg;
var $appGrid;
var height;
var width;
var columnWidth;
var initPageSize = 10;
var xprev_click_idx=null;

$(document).ready(function(){
	initHeight();
	initAppGrid();
	bindEvent();
	initSearchBox();
});
function initSearchBox(){
	$('#searchbox').searchbox({
		width:200,
	    searcher:function(value,name){
		    	jspReqControl(function(){
		    		$('.datagrid-body:last').mCustomScrollbar("destroy");
		    		
		    		$("#appDg").datagrid({
		    			url: appPath+"/AppController/searchApp",
		    			queryParams:{'value':value}
		    		});
		    	});
	    },
	    prompt:'请输入应用名称或发布名'
	});
}
function initHeight(){
	if(typeof(window.innerHeight)!="undefined"){
        height = window.innerHeight;
        width = window.innerWidth;
    }
    if(typeof(window.innerHeight)=="undefined"){
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
    }
    height = height-76;
    if(window.screen.height>768){
    	initPageSize = 20;
    }
}
var count=1;
function initAppGrid(){
	$appDg = $("#appDg");
	$appGrid=$appDg.datagrid({
		url : appPath+"/AppController/listApp",
		width : $('#appworkspace').width()-20,
		height : height,
		scrollbarSize:0,
		fitColumns:true,
		pagination:true,
		border:false,
		singleSelect:true,
		pageSize:initPageSize,
		striped:true,
		onBeforeLoad:function(){
			if($('.mCS-minimal-dark').length>0){
				$('.datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onClickRow:function(rowIndex,rowData){
			if(xprev_click_idx!=null&&xprev_click_idx!=rowIndex){
				$appDg.datagrid('unselectRow',xprev_click_idx);
				xprev_click_idx = rowIndex;
			}else{
				$appDg.datagrid('selectRow',rowIndex);
				xprev_click_idx = rowIndex;
			}
		},
		onLoadSuccess:function(){
			$('.datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		rowStyler: function(index,row){
    	  	if(row.FLAG=='1'){return 'background:#FF5151;color:white;';}
        },
		columns : [ [ {field : 'APP_CODE',title : '发布名称',width : 80,align : 'left'},
		              {field : 'IP',title : 'IP地址',width : 80},
		              {field : 'PORT',title : '端口号',width : 70},
		              {field : 'APP_NAME',title : '应用名称',width : 80},
		              {field : 'APP_KEY',title : '通信密钥',width : 80},
		              {field : 'DESCRIPTION',title : '备注描述',width : 120,align : 'left'},
                      {field:'FLAG',title:'启用状态',width : 60,align:'center'
                          ,formatter:function(value){
                            if(value&&value=='0'){
                                return "<font color=green>启用</font>";
                            }
                            return "<font color=white>停用</font>";
                          }
                      },
                      {field:'ID',title:'操作',align:'left',halign:'center',formatter:function(value,row,index){
                    	  var returnVal = '<button id="'+value+'_editApp" idx="'+index+'" onclick="editAppFunc(this)" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style">'+
	   				'<i class="glyphicon glyphicon-edit" ></i>'+
	   			'</button>';
                    	  if(row.ID!='console'){
                    		  if(row.FLAG=='0'){
	                    		  returnVal+=('<button id="'+value+'_enableApp" idx="'+index+'" onclick="edablApp(this)" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)" class="btn btn-default btn-xs btn_plugin_style">'+
	                  	   				'<i class="glyphicon glyphicon-remove" ></i>'+
	                  		   			'</button>');
                    		  }else{
                    			  returnVal+=('<button id="'+value+'_enableApp" idx="'+index+'" onclick="edablApp(this)" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style">'+
  	                  	   				'<i class="glyphicon glyphicon-ok" ></i>'+
  	                  		   			'</button>');
                    		  }
                    	  }
                    	  if(row.FLAG!='0'){
                    		  returnVal+=('<button id="'+value+'_delApp" idx="'+index+'" onclick="delApp(this)" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style">'+
                  	   				'<i class="glyphicon glyphicon-trash" ></i>'+
                  		   			'</button>');
                    	  }
                          return returnVal;
                        }}
		              ] ]
	});
}
function addAppFunc(){
	parent.$.modalDialog({
		title : "新增子应用",
		width : 600,
		height : 400,
		href : appPath+"/views/account/app/appEditDlg.jsp",
		buttons : [ {
			id:'savebtncls',
			text : '保存',
			handler : function() {
				parent.$.modalDialog.openner= $appGrid;
				var f = parent.$.modalDialog.handler.find("#editAPPForm");
				f.submit();
			}
		}, {
			id:'cancelbtncls',
			text : '取消',
			handler : function() {
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			}
		}
		]
	});
}
function editAppFunc(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $appDg.datagrid('getRows');
		var node = rows[idx];
		parent.$.modalDialog({
			title : "编辑子应用",
			width : 600,
			height : 400,
			href : appPath+"/views/account/app/appEditDlg.jsp",
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#editAPPForm");
				f.form("load", node);
			},			
			buttons : [ {
				id:'savebtncls',
				text : '编辑',
				handler : function() {
					parent.$.modalDialog.openner= $appGrid;
					var f = parent.$.modalDialog.handler.find("#editAPPForm");
					f.submit();
				}
			}, {
				id:'cancelbtncls',
				text : '取消',
				handler : function() {
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}
			]
		});
	});
}
function edablApp(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $appDg.datagrid('getRows');
		var node = rows[idx];
		
		var flag = node.FLAG;
		var changeFlag = null;
		var enableString = null;
		if(flag==0){
			enableString = "停用";
			changeFlag = '1';
		}else{
			enableString = "启用";
			changeFlag = '0';
		}
			swal({
				title: '是否'+enableString, 
				text: '是否'+enableString+'子应用', 
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: "是的，我要"+enableString,
				confirmButtonColor: "#f86674"
				}, function() {
					$.ajax({
						type: "POST",
						async: false,
						url: appPath+"/AppController/enableApp",
						data : {"ID":node.ID,"FLAG":changeFlag,"TITLE":node.APP_NAME},
						timeout:120*1000,
						dataType:"json",
						success: function(data){
							if(data){
								$appDg.datagrid('reload');
								swalAlert(enableString+'成功','应用'+enableString+'成功!','success',2000);
							}else{
								swalAlert(enableString+'失败','获取信息异常!','error',2000);
							}
						},
						error:function(xhr,textStatus,errorThrown){
							swalAlert('系统异常',textStatus,'error',2000);
						}
					});
			});
	});
}
function delApp(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $appDg.datagrid('getRows');
		var node = rows[idx];
	    	swal({
				title: "您确定要删除吗？", 
				text: "是否删除该子应用？", 
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: "是的，我要删除",
				confirmButtonColor: "#f86674"
				}, function() {
			    	$.ajax({
						   type: "POST",
						   async: false,
						   url: appPath+"/AppController/delApp",
						   data : {"ID":node.ID,"TITLE":node.APP_NAME},
						   timeout:120*1000,
						   dataType:"json",
					       success: function(data){
					    	   if(data){
					    		   $appDg.datagrid('reload');
					    		   swalAlert("删除成功","应用删除成功!","success",2000);
					    	   }else{
					    		   swalAlert("删除失败","获取信息异常!","error",2000);
					    	   }
						   },
						   error:function(xhr,textStatus,errorThrown){
							   swalAlert("系统异常",textStatus,"error",2000);
						   }
						});
			});
	});
}
function bindEvent(){
	$('#addApp').bind('click',function(){
		jspReqControl(function(){
			addAppFunc();
		});
	});
}
function initBtnTips(obj){
	event.stopPropagation();
	layer.tips('新增应用', '#'+$(obj).attr('id'), {tips: 1});
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('编辑应用', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('删除应用', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips3(obj){
	event.stopPropagation();
	layer.tips('启用应用', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips4(obj){
	event.stopPropagation();
	layer.tips('停用应用', '#'+$(obj).attr('id'), {tips: 1});
}