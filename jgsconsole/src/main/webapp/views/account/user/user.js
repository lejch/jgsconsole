var $userGrid = null;
var $roleToUser = null;
var height = null;
var width = null;
var initPageSize = 10;
var prev_click_idx=null;
var xprev_click_idx=null;

$(document).ready(function(){
	initHeight();
	initUserGrid();
	$roleToUser = $('#roleUserHasList').treegrid({
		width : (width*0.347),
		height : height,
		animate: true,
		collapsible: true,
		striped:true,
		fitColumns: true,
		border:false,
		singleSelect:true,
		idField: 'ROLE_ID',
		treeField: 'ROLE_NAME',
        parentField : 'PARENT_ID',
        onBeforeLoad:function(){
			if($('#userRoleContainer .mCS-minimal-dark').length>0){
				$('#userRoleContainer .datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('#userRoleContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		columns:[[
		          {field:'USER_ID',title:'',width:25,formatter:function(value,row,index){return '<input type="checkbox" />';}},
		          {field:'ROLE_ID',hidden:true},
		          {field:'PARENT_ID',hidden:true},
		          {field:'ROLE_NAME',title:'角色名称',width:120,halign:'center'},
		          {field:'ROLE_TYPE',title:'角色类型',width:60,align:'center',formatter:function(value,row,index){
		        	  if(value==1){return "<font color=red>管理角色</font>";}
		        	  else if(value==2){return "<font color=yellow>业务角色</font>";}
		        	  else{return "<font color=green>分类菜单</font>";}
		          }}
		        ]]
	});
	
	bindEvent();
	initSearchBox();
});

function initSearchBox(){
	$('#searchbox').searchbox({
		width:200,
	    searcher:function(value,name){
		    	jspReqControl(function(){
		    		$('#userInfoContainer .datagrid-body:last').mCustomScrollbar("destroy");
		    		
		    		$("#userSharedList").datagrid({
					url: appPath+"/user/searchUser",
					queryParams:{'value':value}
		    		});
		    	});
	    },
	    prompt:'请输入账号或姓名'
	});
}

function initHeight(){
	if(typeof(window.innerHeight)!="undefined"){
        height = window.innerHeight-106;
    }
    if(typeof(window.innerHeight)=="undefined"){
        height = document.documentElement.clientHeight-106;
    }
    
    $('.leftUserDivPanel').css("height",height+72);
    $('.rightUserDivPanel').css("height",height+72);
    
    if(window.screen.height>768){
    	initPageSize = 20;
    }
}
function initUserGrid(){
    $userGrid = $("#userSharedList").datagrid({
		width : $('#userInfoContainer').width()-20,
		height : height+15,
		scrollbarSize:0,
		url: appPath+"/user/getUsers",
		queryParams:{},
		border:false,
		fitColumns:true,
		nowrap: false,
		striped: true,
		singleSelect:true,
		pageSize:initPageSize,
		pagination:true,
		pageNumber : 1,
		onBeforeLoad:function(){
			if($('#userInfoContainer .mCS-minimal-dark').length>0){
				$('#userInfoContainer .datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('#userInfoContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		columns : [[
		            {field:'CREATOR',hidden:true},
		            {field:'USER_NAME',title:'账号',width:150,align:'center'},
		            {field:'USER_ALIAS',title:'姓名',width:150,align:'center'},
		            {field:'EMAIL',title:'邮箱',width:150,align:'center'},
		            {field:'USER_ID',title:'操作',width:150,align:'center',formatter:function(value,row,index){
		            	return '<button id="'+value+'_editUser" onclick="editUserFunc(this)" idx="'+index+'" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style">'+
		   				'<i class="glyphicon glyphicon-edit" ></i>'+
		   			'</button>'+
					'<button id="'+value+'_delUser" onclick="delUserFunc(this)" idx="'+index+'" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)" class="btn btn-default btn-xs btn_plugin_style">'+
		   				'<i class="glyphicon glyphicon-trash" ></i>'+
		   			'</button>'+
					'<button id="'+value+'_passwordReset" onclick="chgPwdFunc(this)" idx="'+index+'" type="button" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)" class="btn btn-default btn-xs btn_plugin_style">'+
		   				'<i class="glyphicon glyphicon-retweet" ></i>'+
		   			'</button>';
					}},
		            ]],
		onClickRow : function(rowIndex,rowData){
			if(xprev_click_idx!=null&&xprev_click_idx!=rowIndex){
				$("#userSharedList").datagrid('unselectRow',xprev_click_idx);
				xprev_click_idx = rowIndex;
			}else{
				$("#userSharedList").datagrid('selectRow',rowIndex);
				xprev_click_idx = rowIndex;
			}
			$('#panelTitleRight').html('角色列表');
			if($roleToUser){
  			  var roots = $roleToUser.treegrid('getRoots');
  			  if(roots){
  				  $(roots).each(function(i,node){
	    		   $roleToUser.treegrid('remove',node.id);
	    		  });
  			  }
  		   }
		},
		onDblClickRow : function(rowIndex, rowData){
			if(rowData){
				$('#panelTitleRight').html('角色列表（当前配置用户：'+rowData.USER_ALIAS+'）');
				$('#userRoleContainer .datagrid-body:last').mCustomScrollbar("destroy");
				initRoleGrid(rowData);
			}
	    }
	});
}

function initRoleGrid(rowData){
	$roleToUser = $('#roleUserHasList').treegrid({
		width : (width*0.347),
		height : height,
		url : appPath+"/role/getRolesForUser",
		queryParams : {'EDIT_USER_ID':rowData.USER_ID},
		animate: true,
		collapsible: true,
		striped:false,
		fitColumns: true,
		border:false,
		singleSelect:true,
		idField: 'ROLE_ID',
		treeField: 'ROLE_NAME',
        parentField : 'PARENT_ID',
        onBeforeLoad:function(){
			if($('#userRoleContainer .mCS-minimal-dark').length>0){
				$('#userRoleContainer .datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('#userRoleContainer .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		columns:[[
		          {field:'USER_ID',title:'',width:25,formatter:function(value,row,index){
		        	  if(row.ROLE_TYPE=='1' || row.ROLE_TYPE=='2'||row.ROLE_TYPE=='5'){
		        		  if(typeof(value)!='undefined'){return '<input type="checkbox" id="'+row.ROLE_ID+'_chk" ROLE_NAME="'+row.ROLE_NAME+'" USER_NAME="'+rowData.USER_ALIAS+'" ROLE_ID="'+row.ROLE_ID+'" USER_ID="'+rowData.USER_ID+'" checked="checked" onclick="checkRoleToUser(this)"/>';}
		        		  else{return '<input type="checkbox" id="'+row.ROLE_ID+'_chk" ROLE_NAME="'+row.ROLE_NAME+'" USER_NAME="'+rowData.USER_ALIAS+'" ROLE_ID="'+row.ROLE_ID+'" USER_ID="'+rowData.USER_ID+'" onclick="checkRoleToUser(this)">';}
		        	  }else{return '<input type="checkbox" style="cursor:not-allowed;" disabled=true>';}
		          }},
		          {field:'ROLE_ID',hidden:true},
		          {field:'PARENT_ID',hidden:true},
		          {field:'ROLE_NAME',title:'角色名称',width:120,halign:'center'},
		          {field:'ROLE_TYPE',title:'角色类型',width:60,align:'center',formatter:function(value,row,index){
		        	  if(value==1){return "<font color=red>管理角色</font>";}
		        	  else if(value==2){return "<font color=yellow>业务角色</font>";}
		        	  else{return "<font color=green>分类菜单</font>";}
		          }}
		        ]],
        onBeforeCollapse:function(row){return false;}
	});
}

function checkRoleToUser(obj){
	if(obj.checked){
		//未选中
    	swal({
			title: "角色绑定操作确认", 
			text: "是否将该角色,绑定到该用户?", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要绑定",
			confirmButtonColor: "#f86674",
			cancelButtonText:"取消"
			}, function(isConfirm) {
				if(isConfirm){
					$.ajax({
					   type: "POST",
					   url: appPath+"/user/setRoleToUser",
					   data : {"USER_ID":$(obj).attr('USER_ID'),
						   	   "ROLE_ID":$(obj).attr('ROLE_ID'),
						   	   "ROLE_NAME":$(obj).attr('ROLE_NAME'),
						   	   "USER_NAME":$(obj).attr('USER_NAME')},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   if(data['result']==1){
				    			   swalAlert("绑定成功!", "角色绑定成功！", "success",2000);
				    		   }else{
				    			   obj.checked=false;
				    			   swalAlert("绑定失败!", "角色绑定失败！", "error",2000);
				    		   }
				    	   }else{
				    		   swalAlert("操作异常", "获取信息异常！", "error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){
						   $(obj).removeAttr('checked');
						   swalAlert("错误", textStatus, "error",2000);
					   }
					});
				}else{
					obj.checked=false;
				}
			});
	}else{
		//已选中
    	swal({
			title: "角色绑定操作确认", 
			text: "是否解除用户绑定的此角色?", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，解除绑定",
			confirmButtonColor: "#f86674",
			cancelButtonText:"取消"
			}, function(isConfirm) {
				if(isConfirm){
					$.ajax({
					   type: "POST",
					   url: appPath+"/user/delRoleToUser",
					   data : {"USER_ID":$(obj).attr('USER_ID'),
						   	   "ROLE_ID":$(obj).attr('ROLE_ID'),
						   	   "ROLE_NAME":$(obj).attr('ROLE_NAME'),
						   	   "USER_NAME":$(obj).attr('USER_NAME')},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   if(data['result']==1){
				    			   swalAlert("解绑成功!", "角色解绑成功！", "success",2000);
				    		   }else{
				    			   obj.checked=true;
				    			   swalAlert("解绑失败!", "角色解绑失败！", "error",2000);
				    		   }
				    	   }else{
				    		   swalAlert("操作异常", "获取信息异常!", "error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){
						   $(obj).attr('checked','checked');
						   swalAlert("错误", textStatus, "error",2000);
					   }
					});
		    }else{
		    	obj.checked=true;
		    }
		});
	}
}
function addUserFunc(){
	parent.$.modalDialog({
		title : "新增用户",
		width : 550,
		height : 330,
		href : appPath+"/views/account/user/userAddEditDlg.jsp",
		buttons : [ {
			id:'savebtncls',
			text : '保存',
			handler : function() {
				parent.$.modalDialog.openner= $userGrid;
				var f = parent.$.modalDialog.handler.find("#addUserForm");
				f.submit();
				if($roleToUser){
    			  var roots = $roleToUser.treegrid('getRoots');
    			  if(roots){
    				  $(roots).each(function(i,node){
	    				  $roleToUser.treegrid('remove',node.id);
	    			   });
    			  }
    		   }
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
function editUserFunc(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $("#userSharedList").datagrid('getRows');
		var node = rows[idx];
		parent.$.modalDialog({
			title : "编辑用户",
			width : 550,
			height : 290,
			href : appPath+"/views/account/user/userEditDlg.jsp",
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#editUserForm");
				f.form("load", node);
				if($roleToUser){
    			  var roots = $roleToUser.treegrid('getRoots');
    			  if(roots){
    				  $(roots).each(function(i,node){
	    				  $roleToUser.treegrid('remove',node.id);
	    			   });
    			  }
    		   }
			},			
			buttons : [ {
				id:'savebtncls',
				text : '编辑',
				handler : function() {
					parent.$.modalDialog.openner= $userGrid;
					var f = parent.$.modalDialog.handler.find("#editUserForm");
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
function delUserFunc(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $("#userSharedList").datagrid('getRows');
		var node = rows[idx];
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
					   url: appPath+"/user/delUser",
					   data : {"USER_ID":node.USER_ID,"USER_ALIAS":node.USER_ALIAS},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   $userGrid.datagrid('reload');
				    		   if($roleToUser){
				    			  var roots = $roleToUser.treegrid('getRoots');
				    			  if(roots){
				    				  $(roots).each(function(i,node){
					    				  $roleToUser.treegrid('remove',node.id);
					    			   });
				    			  }
				    		   }
				    		   swalAlert("删除成功!", "用户删除成功！", "success",2000);
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
function chgPwdFunc(obj){
	jspReqControl(function(){
		var idx = $(obj).attr('idx');
		var rows = $("#userSharedList").datagrid('getRows');
		var node = rows[idx];
		parent.$.modalDialog({
			title : "重置密码",
			width : 350,
			height : 150,
			href : appPath+"/views/account/user/resetPwdEditDlg.jsp",
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#resetPwdForm");
				f.form("load", node);
			},			
			buttons : [ {
				id:'savebtncls',
				text : '确定',
				handler : function() {
					parent.$.modalDialog.openner= $userGrid;
					var f = parent.$.modalDialog.handler.find("#resetPwdForm");
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
function bindEvent(){
	$('#addUser').bind('click',function(){
		jspReqControl(function(){
			addUserFunc();
		});
	});
}
function initBtnTips(obj){
	event.stopPropagation();
	layer.tips('新增用户', '#'+$(obj).attr('id'), {tips: 1});
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('编辑用户', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('删除用户', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips3(obj){
	event.stopPropagation();
	layer.tips('重置密码', '#'+$(obj).attr('id'), {tips: 1});
}