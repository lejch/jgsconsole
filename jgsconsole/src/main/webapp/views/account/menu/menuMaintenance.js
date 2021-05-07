var $dg;
var $grid;
var flag=true;
var height;
var width;
var typedata=[{"type":"1","typeName":"菜单"},{"type":"2","typeName":"操作"}];

$(document).ready(function(){
	initHeight();
	initMenuTreeGrid(); 
	bindEvent();
});
function initHeight(){
	if(typeof(window.innerHeight)!="undefined"){
        height = window.innerHeight;
        width = window.innerWidth;
    }
    if(typeof(window.innerHeight)=="undefined"){
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
    }
    height = height-106;
}
function initMenuTreeGrid(){
	$dg = $("#menuGrid");
	 $grid=$dg.treegrid({
		width : $('#treeworkspace').width()-10,
		height : height,
        queryParams:{},
		url : appPath+"/MenuController/getTreeDatalist",
		animate: true,
		fitColumns: true,
		striped:false,
		border:false,
		singleSelect:true,
		idField: 'MENU_ID',
		treeField: 'TITLE',
        parentField : 'PARENT_ID',
        onBeforeLoad:function(){if($('.mCS-minimal-dark').length>0){$('.datagrid-body:last').mCustomScrollbar("destroy");}},
		onLoadSuccess:function(){$('.datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});},
		columns:[[
		          {field:'TITLE',title:'菜单名称',width:100,halign:'center',
		        	  formatter:function(value){return '<span style="color:black">'+value+'</span>';}
		          },
		          {field:'ORDER_SORT',title:'排序编码',width:30,align:'center'},
		          {field:'ICON_CLS',title:'菜单图标',align:'center',width:30,
		        	  formatter:function(value,row){
		        		  return "<span class='"+row.ICON_CLS+"' style='display:inline-block;vertical-align:middle;width:16px;height:16px;background-size:16px;'></span>";
		        	  }
		          },
		          {field:'LOCATION',title:'路径/编码',width:100,halign:'center'},
		          {field:'OPERTYPE',title:'操作类型',width:30,align:'center',
		        	  formatter:function(value){
		        		  if('1'==value)return "<font color=green>菜单<font>";
		        		  if('2'==value)return "<font color=red>操作<font>";
		        		  else return "分类";
		        	  }
		          },
		          {field:'FLAG',title:'是否启用',width:30,align:'center',
		        	  formatter:function(value){
		        		  if(value&&'0'==value)return "<font color=green>是<font>";
		        		  else return "<font color=red>否<font>";  
		        	  }
		          },
		          {field:'DESCRIPTION',title:'描述',width:50,halign:'center'}
                ]]
	});
}


function bindEvent(){
	$('#addMenu').bind('click',function(){
		jspReqControl(function(){
			addRowsOpenDlg();
		});
	});
	
	$('#editMenu').bind('click',function(){
		jspReqControl(function(){
			updRowsOpenDlg();
		});
	});
	
	$('#delMenu').bind('click',function(){
		jspReqControl(function(){
			removeNode();
		});
	});
	
	$('#expandMenu').bind('click',function(){
		expandAll();
	});
	
	$('#collapseMenu').bind('click',function(){
		collapseAll();
	});
	
	$('#inUseMenu').bind('click',function(){
		jspReqControl(function(){
			enableMenu();
		});
	});
}

function enableMenu(){
	var node = $grid.treegrid('getSelected');
	if(node){
		var confirmTitle = null;
		var enableFlag = null;
		if(node.FLAG=='1'){
			confirmTitle = '启用';
			enableFlag = '0';
		}else{
			confirmTitle = '停用';
			enableFlag = '1';
		}
		if(node.OPERTYPE!='0'){
	    	swal({
				title: "您确定要"+confirmTitle+"吗？", 
				text: '是否'+confirmTitle+'该菜单？若包含子菜单，该菜单下所有子菜单也将'+confirmTitle, 
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: "是的，我要"+confirmTitle,
				confirmButtonColor: "#f86674"
				}, function() {
			    	$.ajax({
					   type: "POST",
					   async: false,
					   url: appPath+"/MenuController/enableMenu",
					   data : {"MENU_ID":node.MENU_ID,"enableFlag":enableFlag},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   var queryTreeNodeData = data;
				    		   if(queryTreeNodeData[0]['result']=='success'){
				    			   $grid.treegrid('reload');
				    			   swalAlert(confirmTitle+'成功', '菜单'+confirmTitle+'成功!', "success",2000);
				    		   }
				    	   }else{
				    		   swalAlert(confirmTitle+"失败!", "获取信息异常！请稍后重试", "error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){
						   swalAlert("系统异常", textStatus, "error",2000);
					   }
					});
			});
		}else{
			swalAlert("操作提示","菜单根节点不允许"+confirmTitle+"，请至子应用管理界面维护!","warning",2000);
		}
	}else{
		swalAlert("操作提示","请选择要启用/停用的菜单","warning",2000);
	}
}

function collapseAll(){
    var node = $grid.treegrid('getSelected');
    if (node) {
        $grid.treegrid('collapseAll', node.id);
    } else {
        $grid.treegrid('collapseAll');
    }
}
function expandAll(){
    var node = $grid.treegrid('getSelected');
    if (node) {
        $grid.treegrid('expandAll', node.id);
    } else {
        $grid.treegrid('expandAll');
    }
}

function removeNode(){
	var node = $grid.treegrid('getSelected');
	if(node){
		if(node.OPERTYPE!='0'){
	    	swal({
				title: "您确定要删除吗？", 
				text: '是否删除该菜单?若包含子菜单,该菜单下所有子菜单也将删除', 
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: "是的，我要删除",
				confirmButtonColor: "#f86674"
				}, function() {
			    	$.ajax({
					   type: "POST",
					   async: false,
					   url: appPath+"/MenuController/delMenu",
					   data : {"MENU_ID":node.MENU_ID,"PARENT_ID":node.PARENT_ID},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   $grid.treegrid('remove',node.id);
				    		   var queryTreeNodeData = data;
				    		   if(queryTreeNodeData[0]['result']=='success'){
				    			   swalAlert("删除成功","菜单删除成功","success",2000);
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
		}else{
			swalAlert("操作提示", "菜单根节点不允许删除，请至子应用管理界面维护!", "warning",2000);
		}
	}else{
		swalAlert("操作提示", "请选择要删除的项", "warning",2000);
	}
}

//弹窗修改
function updRowsOpenDlg() {
	var row = $dg.treegrid('getSelected');
	if (row) {
		if(row.OPERTYPE!='0'){
			parent.$.modalDialog({
				title : "编辑菜单",
				width : 580,
				height : 350,
				href : appPath+"/views/account/menu/menuEditDlg.jsp",
				onLoad:function(){
					var f = parent.$.modalDialog.handler.find("#menuEditForm");
					var parentNode = $dg.treegrid('find',row.PARENT_ID);
					row.PARENT_TITLE = parentNode.TITLE;
					f.form("load", row);
				},			
				buttons : [ {
					id:'savebtncls',
					text : '编辑',
					handler : function() {
						parent.$.modalDialog.openner= $grid;
						var f = parent.$.modalDialog.handler.find("#menuEditForm");
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
		}else{
			swalAlert("操作提示","菜单根节点不允许修改，请至子应用管理界面维护!","warning",2000);
		}
	}else{
		swalAlert('操作提示','请选择一行记录!','warning',2000); 
	}
}
function addRowsOpenDlg() {
	var row = $dg.treegrid('getSelected');
	if (row && row.OPERTYPE!='2') {
		parent.$.modalDialog({
			title : "新增菜单",
			width : 580,
			height : 400,
			href : appPath+"/views/account/menu/menuAddEditDlg.jsp",
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#menuAddForm");
				f.form("load", {'pid':row.TITLE,'APP_ID':row.APP_ID,'PARENT_ID':row.MENU_ID});
			},	
			buttons : [ {
				id:'savebtncls',
				text : '保存',
				handler : function() {
					parent.$.modalDialog.openner= $grid;
					var f = parent.$.modalDialog.handler.find("#menuAddForm");
					f.submit();
				}
			}, {
				id:'cancelbtncls',
				text : '取消',
				handler : function() {
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}]
		});
	}else{
		swalAlert('操作提示','请选择一个非操作类型菜单!','warning',2000);
	}
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('新增菜单', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('编辑菜单', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips3(obj){
	event.stopPropagation();
	layer.tips('删除菜单', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips4(obj){
	event.stopPropagation();
	layer.tips('启用或停用菜单', '#'+$(obj).attr('id'), {tips: 1});
}