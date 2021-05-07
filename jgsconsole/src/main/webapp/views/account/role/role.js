var $grid = null;
var $ROLE_grid = null;

var height = null;
var currentRoleId = null;
var currentRoleName = null;
var permissionCheckState = null;
var canSave = false;

var typedata=[{"type":"1","typeName":"菜单"},{"type":"2","typeName":"操作"}];

$(document).ready(function(){
	initRolesTree();
	bindEvent();
	
});

function initRolesTree(){
	
    if(typeof(window.innerHeight)!="undefined"){
        height = window.innerHeight-106;
    }
    if(typeof(window.innerHeight)=="undefined"){
        height = document.documentElement.clientHeight-106;
    }
    
    $('.leftRoleDivPanel').css("height",height+72);
    $('.rightRoleDivPanel').css("height",height+72);
    
    
    $ROLE_grid = $("#roleInfoTree").treegrid({
		width : $('#roleInfoContainer').width()-20,
		height : height,
		striped: false,
		scrollbarSize:0,
		url: appPath+"/role/getRoles",
		queryParams:{'TYPE':'ROLE'},
		animate: true,
		collapsible: true,
		fitColumns: true,
		border:false,
		idField: 'ROLE_ID',
		treeField: 'ROLE_NAME',
		parentField:'PARENT_ID',
		onBeforeLoad:function(){
			if($('#roleInfoContainer .mCS-minimal-dark').length>0){$('#roleInfoContainer .datagrid-body:last').mCustomScrollbar("destroy");}
		},
		onLoadSuccess:function(){
			$('#roleInfoContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		columns:[[
		          {field:'ROLE_NAME',title:'角色名称',width:120,halign:'center',formatter:function(value,row,index){
		        	  if(row.ROLE_TYPE!='3'&&row.ROLE_TYPE!='4'){return '<i class="glyphicon glyphicon-user"></i> '+value;}
		        	  else{return value;}
		          }},
		          {field:'ROLE_DESCRIPTION',title:'描述',width:80,halign:'center'},
		          {field:'ROLE_ID',title:'操作',width:50,align:'center',formatter: function(value,row,index){
		        	  var returnval = '';
		        	  if(row.ROLE_TYPE!='3'&&row.ROLE_TYPE!='0'&&row.ROLE_TYPE!='4'){
		        		  returnval+=('<button id="'+value+'_editRole" rid="'+value+'" type="button" onclick="editRoleFunc(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style">'+
			   				'<i class="glyphicon glyphicon-edit" ></i>'+
				   			'</button>');
		        	  }
		        	  if(row.ROLE_TYPE!='3'&&row.ROLE_TYPE!='0'&&row.ROLE_TYPE!='5'){
		        		  returnval+=('<button id="'+value+'_delRole" onclick="delRoleFunc(this)" type="button" rid="'+value+'" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style">'+
			   				'<i class="glyphicon glyphicon-trash" ></i>'+
				   			'</button>');
		        	  }
				   	  return returnval;
		          }}]],
		onClickRow:function(){
			$('#panelTitleRight').html('权限列表');
			if($grid){
			   var roots = $grid.treegrid('getRoots');
			   if(roots){
				   $(roots).each(function(i,node){
    				   $grid.treegrid('remove',node.id);
    			   });
			   }
		   }
		},
		onDblClickRow:function(row){
			if(row.ROLE_TYPE!='3'&&row.ROLE_TYPE!='4'){
				$('#panelTitleRight').html('权限列表（当前配置角色：'+row.ROLE_NAME+'）')
				$('#rolePmsContainer .datagrid-body:last').mCustomScrollbar("destroy");
				rolePermissionInfoUse(row);
			}else{
				swalAlert("操作提示","此为分类节点,不能分配权限！","warning",2000);
			}
		}
	});
    
   $('#rolePermissionTree').treegrid({
		width : $('#rolePmsContainer').width()-20,
		height : height,
		animate: true,
		collapsible: true,
		striped:false,
		fitColumns: true,
		border:false,
		singleSelect:true,
		idField: 'MENU_ID',
		treeField: 'TITLE',
        parentField : 'PARENT_ID',
        onBeforeLoad:function(){
			if($('#rolePmsContainer .mCS-minimal-dark').length>0){$('#rolePmsContainer .datagrid-body:last').mCustomScrollbar("destroy");}
		},
		onLoadSuccess:function(){
			$('#rolePmsContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
      columns:[[
                {field:'ROLE_ID',title:'',formatter:function(value,row,index){return '<input type="checkbox" />';}},
                {field:'TITLE',title:'菜单名称',width:120,halign:'center'},
                {field:'OPERTYPE',title:'操作类型',width:40,align:'center',formatter:function(value){
                	if('1'==value)return "<font color=green>菜单<font>";
                	if('2'==value)return "<font color=red>操作<font>";
                	else return "分类";
                }},
                {field:'DESCRIPTION',title:'描述',width:80,halign:'center'}
			  ]]
	});
}

function rolePermissionInfoUse(row){
	canSave = true;
	currentRoleId = $(row).attr('ROLE_ID');
	currentRoleName = row.ROLE_NAME;
	
	$grid = $('#rolePermissionTree').treegrid({
		width : $('#rolePmsContainer').width()-20,
		height : height,
		scrollbarSize:0,
		url : appPath+"/role/getPermission",
		queryParams : {'ROLE_ID':currentRoleId,'USER_ID':USER_ID},
		animate: true,
		collapsible: true,
		striped:false,
		fitColumns: true,
		border:false,
		singleSelect:true,
		idField: 'MENU_ID',
		treeField: 'TITLE',
        parentField : 'PARENT_ID',
        onBeforeLoad:function(){
			if($('#rolePmsContainer .mCS-minimal-dark').length>0){$('#rolePmsContainer .datagrid-body:last').mCustomScrollbar("destroy");}
		},
		onLoadSuccess:function(){
			$('#rolePmsContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
      columns:[[
                {field:'ROLE_ID',title:'',formatter:function(value,row,index){
                	if(typeof(value)!='undefined'){
                		return '<input type="checkbox" id="'+row.MENU_ID+'_chk" checked=true menuId="'+row.MENU_ID+'" onclick="checkboxOnSelect(this)"/>';
                	}else{
                		return '<input type="checkbox" id="'+row.MENU_ID+'_chk" menuId="'+row.MENU_ID+'" onclick="checkboxOnSelect(this)">';
                	}
                }},
                {field:'TITLE',title:'菜单名称',width:120,halign:'center'},
                {field:'OPERTYPE',title:'操作类型',width:40,align:'center',formatter:function(value){
                	if('1'==value)return "<font color=green>菜单<font>";
                	if('2'==value)return "<font color=red>操作<font>";
                	else return "分类";
			    }},
			    {field:'DESCRIPTION',title:'描述',width:80,halign:'center'}
			  ]],
      toolbar:'#rolePermissionToolbar',
      onClickRow : function(){
    	  if(permissionCheckState){
    		  $($('#rolePermissionTree').treegrid('getSelected')).attr('ROLE_ID',currentRoleId);
    	  }else{
    		  $($('#rolePermissionTree').treegrid('getSelected')).attr('ROLE_ID','');
    	  }
      }
	});
}

function addRoleFunc(){
	var node = $("#roleInfoTree").treegrid('getSelected');
	if(node){
		if(node.ROLE_TYPE=='3'||node.ROLE_TYPE=='4'){
			parent.$.modalDialog({
				title : "新增角色",
				width : 600,
				height : 350,
				href : appPath+"/views/account/role/roleAddEditDlg.jsp",
				onLoad:function(){
					var f = parent.$.modalDialog.handler.find("#addRoleForm");
					f.form("load", {'APP_ID':node.APP_ID,'PARENT_ID':node.ROLE_ID,'PID':node.ROLE_NAME});
				},
				buttons : [{
					id:'savebtncls',
					text : '保存',
					handler : function() {
						parent.$.modalDialog.openner= $ROLE_grid;
						var f = parent.$.modalDialog.handler.find("#addRoleForm");
						f.submit();
					}
				},{
					id:'cancelbtncls',
					text : '取消',
					handler : function() {
						parent.$.modalDialog.handler.dialog('destroy');
						parent.$.modalDialog.handler = undefined;
					}
				}]
			});
		}else{
			swalAlert("操作提示","请在分类菜单下,新增角色！","warning",2000);
		}
	}else{
		swalAlert("操作提示","请选择一行记录","warning",2000);
	}
}

function editRoleFunc(obj){
	event.stopPropagation();
	jspReqControl(function(){
		var rid = $(obj).attr('rid');
		$("#roleInfoTree").treegrid('select',rid);
		var node = $("#roleInfoTree").treegrid("find",rid);
		parent.$.modalDialog({
			title : "编辑角色",
			width : 600,
			height : 350,
			href : appPath+"/views/account/role/roleEditDlg.jsp",
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#editRoleForm");
				var parentNode = $("#roleInfoTree").treegrid('find',node.PARENT_ID);
				node.PARENT_TITLE = parentNode.ROLE_NAME;
				node.OriginalParentId = node.PARENT_ID;
				f.form("load", node);
			},			
			buttons : [ {
				id:'savebtncls',
				text : '编辑',
				handler : function() {
					parent.$.modalDialog.openner= $ROLE_grid;
					var f = parent.$.modalDialog.handler.find("#editRoleForm");
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
function delRoleFunc(obj){
	event.stopPropagation();
	jspReqControl(function(){
		var rid = $(obj).attr('rid');
		$("#roleInfoTree").treegrid('select',rid);
		var node = $("#roleInfoTree").treegrid('find',rid);
		swal({
			title: "您确定要删除吗？", 
			text: "删除后，该项下所有角色也将删除", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要删除",
			confirmButtonColor: "#f86674"
			}, function() {
				$.ajax({
					   type: "POST",
					   async: false,
					   url: appPath+"/role/delRole",
					   data : {"ROLE_ID":node.ROLE_ID,"PARENT_ID":node.PARENT_ID},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   $ROLE_grid.treegrid('remove',node.id);
				    		   canSave = false;
				    		   if($grid){
				    			   var roots = $grid.treegrid('getRoots');
				    			   if(roots){
				    				   $(roots).each(function(i,node){
					    				   $grid.treegrid('remove',node.id);
					    			   });
				    			   }
				    		   }
				    		   var queryTreeNodeData = data;
				    		   if(queryTreeNodeData[0]['result']=='success'){
				    			   swalAlert("角色删除成功!", "已成功删除角色！", "success",2000);
				    		   }
				    	   }else{
				    		   swalAlert("删除失败!", "获取信息异常！请稍后重试", "error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){
						   swalAlert("系统异常", textStatus, "error",2000);
					   }
					});
			});
	});
}
function bindEvent(){
	$('#addRole').bind('click',function(){
		jspReqControl(function(){
			addRoleFunc();
		});
	});
	
	$('#delRole').bind('click',function(){
		var node = $("#roleInfoTree").treegrid('getSelected');
		if(node){
			if(node.ROLE_TYPE!='3'&&node.ROLE_TYPE!='0'&&node.ROLE_TYPE!='5'){
				
			}else{
				swalAlert("删除失败","此为角色树根节点或超级管理员，不允许删除，若要删除，请至子应用管理页面维护！","warning",3000);
			}
		}else{
			swalAlert("操作提示","请选择要删除的项","warning",2000);
		}
	});
	
	$('#savePermission').bind('click',function(){
		if(canSave){
			var rootNodes = $('#rolePermissionTree').treegrid('getRoots');
			var checks = $("input[type=checkbox]:checked");
			var menuIds = "";
			$.each(checks,function(){
				menuIds+= (","+$(this).attr("menuid"));
			});
			menuIds = menuIds.substring(1,menuIds.length);
			
			$.ajax({
			   type: "POST",
			   async: false,//同步发送请求数据
			   url: appPath+"/role/changePermissions",
			   data : {"menuIds":menuIds,"role_id":currentRoleId,"role_name":currentRoleName},
			   timeout:120*1000,
			   dataType:"json",
		       success: function(data){
		    	   if(data){
		    		   var queryTreeNodeData = data;
		    		   if(queryTreeNodeData[0]['result']=='success'){
		    			   swalAlert("操作成功","权限保存成功！请稍后重试","success",2000);
		    		   }
		    	   }else{
		    		   swalAlert("数据库保存失败","权限保存失败！请稍后重试","error",2000);
		    	   }
			   },
			   error:function(xhr,textStatus,errorThrown){
				   swalAlert("系统错误","权限保存失败！请稍后重试","error",2000);
			   }
			});
		}
	});
}

function checkedNodes(nodes){
	var menu_ids = "";
	if(nodes){
		$.each(nodes,function(i,node){
			if(node){
				if(typeof(node.ROLE_ID)!='undefined'){
					if(node.ROLE_ID!=""){
						menu_ids += (","+node.MENU_ID);
					}
				}
			}
			if(node.children){
				menu_ids += checkedNodes(node.children);
			}
		});
	}
	return menu_ids;
}

function cascadeCheck(nodes,permissionCheckState){
	if(nodes){
		$.each(nodes,function(i,node){
			if(node){
				document.getElementById(node.MENU_ID+"_chk").checked=permissionCheckState;
//				if(permissionCheckState){
//					$('#'+node.MENU_ID+"_chk").attr('checked',"checked");
//				}else{
//					$('#'+node.MENU_ID+"_chk").removeAttr('checked');
//				}
			}
			if(node.children){
				cascadeCheck(node.children,permissionCheckState);
			}
		});
	}
}
function cascadeCheckBack(node,permissionCheckState){
	if(node){
		document.getElementById(node.MENU_ID+"_chk").checked=permissionCheckState;
//		if(permissionCheckState){
//			$('#'+node.MENU_ID+"_chk").attr('checked','checked');
//		}else{
//			$('#'+node.MENU_ID+"_chk").removeAttr('checked');
//		}
	}
	var parent = $grid.treegrid('find',node.PARENT_ID);
	if(parent){
		cascadeCheckBack(parent,permissionCheckState);
	}
}
function checkboxOnSelect(obj){
	permissionCheckState = obj.checked;
	var menuId = $(obj).attr('menuId');
	if($grid.treegrid('getChildren',menuId).length!=0){
		if(permissionCheckState){
			cascadeCheck($grid.treegrid('getChildren',menuId),permissionCheckState);
			cascadeCheckBack($grid.treegrid('find',menuId),permissionCheckState);
		}else{
			cascadeCheck($grid.treegrid('getChildren',menuId),permissionCheckState);
		}
	}else{
		if(permissionCheckState){
			cascadeCheckBack($grid.treegrid('find',menuId),permissionCheckState);
		}else{
			var nodes = new Array();
			nodes.push($grid.treegrid('find',menuId));
			cascadeCheck(nodes,permissionCheckState);
		}
	}
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('新增角色', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('编辑角色', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips3(obj){
	event.stopPropagation();
	layer.tips('删除角色', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips4(obj){
	event.stopPropagation();
	layer.tips('保存权限', '#'+$(obj).attr('id'), {tips: 1});
}