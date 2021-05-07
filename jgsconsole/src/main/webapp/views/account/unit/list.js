var opernode = null;
var treeObj = null;

var unitCurTitle = null;//当前菜单显示标题
var unitCurDescription = null;//当前菜单显示描述

//菜单目录树形结构配置
var treeSetting = {
		view: {
			selectedMulti: false,
			dblClickExpand: false
		},
		check: {
			enable: false
		},
		edit: {
			enable: false,
			showRemoveBtn: false,
			showRenameBtn: false
		},
		data: {
			keep: {
				parent:false,
				leaf:false
			},
			 key:  {
		           name: "UNIT_NAME",
			       title: "UNIT_NAME"
			},
		     simpleData: {
				  enable: true,
				  idKey: "UNIT_CODE",
				  pIdKey: "PARENT_CODE",
				  rootPId: "0"
		    }
		},
		callback: {		
			onClick: TreeOnClick,
			onRightClick: OnRightClick
		}
	};

$(document).ready(function(){
    //initSize();
	initUnit();
	initUnitInfoTree();
	bindEvent();
});
function initSize(){
    var height = null;
    if(typeof(window.innerHeight)!="undefined"){
        height = window.innerHeight;

    }
    if(typeof(window.innerHeight)=="undefined"){
        height = document.documentElement.clientHeight;
    }
    $('#unitDiv').css("height",height);
}

function initUnit(){
	//初始化页面左侧树右键菜单
	using('menu', function(){
		$('#rMenu').menu({
			onClick:function(item){
				switch (item.id) {
					case "addUnit":
						preAddUnit(item);
						break;
					case "deleteUnit":
						deleteUnit();
						break;				
					default:
						break;
				}
		 	}
		});
	});
}

/**
 * 初始化左侧树控件
 */
function initUnitInfoTree(){
	$.ajax({
	   type: "POST",
	   async: false,//同步发送请求数据
	   url: appPath+"/UnitController/getUnitData",
//	   beforeSend : function(){
//		   $.showProgress();
//	   },
//	   complete : function(){
//		   $.hideProgress();
//	   },
	   timeout:120*1000,
	   dataType:"json",
       success: function(data){
    	   if(data){
    		   var queryTreeNodeData = data;
	   		   if(queryTreeNodeData.length==0){
	   			   $.messageBox.alert({title : '错误',content : '查不到数据!'});
	   		   }
	   		   if(queryTreeNodeData.length>0){//初始化左边树控件
	   		       $.fn.zTree.init($("#menuTree"), treeSetting,queryTreeNodeData); 
	   		       treeObj = $.fn.zTree.getZTreeObj("menuTree");	//参数为树id		       
	   		   }   
    	   }else{
    		   $.messageBox.alert({title : '异常',content : '获取组织机构信息异常!'}); 
    	   }
	   },
	   error:function(xhr,textStatus,errorThrown){
		   //$.hideProgress();
	       $.messageBox.alert({title : '错误',content : '获取组织机构信息异常!'});
	   }
	});
}

/**
 * 事件绑定
 */
function bindEvent(){
    $("#save").bind("click",addOrEditUnit);
    $("#refresh").bind("click",refresh); 
    $("#reset").bind("click",resetForm);
} 

function preAddUnit(menuItem){
	hideAllForm();	 
	$("#MenuInfoForm").show();
	//清空表单
	$(':input')   
	 .not(':button, :submit, :reset')   
	 .val('')   
	 .removeAttr('checked')   
	 .removeAttr('selected');  
	var data = opernode;
    $('#PARENT_CODE').val(data.UNIT_CODE);      
    
    unitCurTitle = "";
    unitCurDescription = "";
 }

/**
 * 删除节点
 * @returns {Boolean}
 */
function deleteUnit(){
	var curNode = opernode;
    var selectedNode = treeObj.getSelectedNodes()[0];
	if(selectedNode.children!=null && selectedNode.children.length>0){
		$.messageBox.alert({title : '错误信息',content : '存在子节点，不能删除！',afterClose : function(){
			treeObj.expandNode(selectedNode,true,false,true);
		}});
		return false;
	}
	$.messageBox.confirm({title : '确认信息',content : '删除后将不能恢复，是否删除？',afterYes : function(){
		  $.ajax({
			   type: "POST",
			   async: false,//同步发送请求数据
			   url : appPath+'/UnitController/deleteUnit',
			   data : {
				   'data' : $.toJSONString(selectedNode)
			   },
			   error : function(xhr,status,errorThrown){
				   $.messageBox.alert({title : '异常',content : '操作出现异常'});
				   initUnitInfoTree();
			   },
//			   beforeSend : function(){
//				   $.showProgress();
//			   },
//			   complete : function(){
//				   $.hideProgress();
//			   },
			   timeout:120*1000,
			   dataType:"json",
			   success: function(res){
				   if(res){
					   var status = res.status;
					   var detail = res.detail;
					   if(status=='-1'){
						   $.messageBox.alert({title : '异常',content : detail});
					   }else{
						   $.messageBox.alert({title : '提示信息',content : detail});
						   var parentNode = selectedNode.getParentNode();
	    					//删除被选中的节点
	    					treeObj.removeNode(selectedNode);
	    					treeObj.selectNode(parentNode,false);
	    					TreeOnClick(null, null, parentNode);
					   }	 
				   }else{
					   $.messageBox.alert({title : '异常',content : '操作出现异常'});
				   }
			  }
			});
	}});
}	

function addOrEditUnit(){
	//表单校验
	$("#MenuInfoForm").validate({
		rules:{
			UNIT_NAME:{
				required:true
			}
		}
	});
	if($("#MenuInfoForm").valid() == false){
		return;
	}
	var UNIT_NAME = $('#UNIT_NAME').val();
	var UNIT_CODE = $('#UNIT_CODE').val();
	var menuData = getFormData('MenuInfoForm');
	var isEdit = false;
	if($.isEmpty(UNIT_CODE)){//新增节点
		//判断同一目录下有没有相同相同名称节点
		var childnodes = opernode.children;
		var childnodesLen = null;
	    if (childnodes != null){
	    	childnodesLen = childnodes.length;
		    for(var i=0;i<childnodesLen;i++){
		    	if(childnodes[i].UNIT_NAME == UNIT_NAME){
		    		$.messageBox.alert({title : '错误',content : '同一目录下，该组织机构名已经存在'});
		    		return;
		    	}
		    }
	    }else{
	    	childnodesLen = 0;
	    }
	    isEdit = false;
	}else{//编辑节点
		//判断同一目录下有没有相同相同名称节点
		var nodeName = opernode.UNIT_NAME;//节点名称
		if(nodeName != UNIT_NAME){
			var nodes = treeObj.getNodesByParam("UNIT_NAME",UNIT_NAME);
			if(nodes.length>0){
				$.messageBox.alert({title : '错误',content : '同一目录下，该组织机构名已经存在'});
	    		return;
			}
		}
		isEdit = true;
	}	
	$.ajax({
		   type: "POST",
		   async: false,//同步发送请求数据
		   url : appPath+'/UnitController/addOrEditUnit',		 
		   data : {
			   'data' : $.toJSONString(menuData)
		   },
		   beforeSend : function(){
			   $('#save').button('loading');
		   },
		   complete : function(){
			   $('#save').button('reset');
		   },
		   timeout:120*1000,
		   dataType:"json",
		   success: function(res){
			   if(res){
				    var status = res.status;
		    		var detail = res.detail;
		    		if(status=='-1'){//异常
		    			$.messageBox.alert({title : '异常',content : detail});
//						 initUnitInfoTree();
		    		}else{//正常
			    		 $.messageBox.alert({title : '成功',content : detail});
		    			 if(isEdit){
		    				 opernode.UNIT_NAME = res.UNIT_NAME;
		    				 opernode.DESCRIPTION = res.DESCRIPTION;
		    				 treeObj.updateNode(opernode);
		    				 treeObj.selectNode(opernode);
		    			 }else{
		    				 try{
		    		 			 var nodes = treeObj.addNodes(opernode, res);//在父节点下面加入新建节点到尾部
		    	             	 if(nodes && nodes.length>0){
		    		             	var node = nodes[0]; //选中唯一一个匹配的节点
		    		             	treeObj.selectNode(node);
		    		             	opernode = node;
		    		                TreeOnClick(null, null, node);
		    	             	  }
		    	 			 }catch(e){
		    	 				 initUnitInfoTree();
		    	 			 } 
		    			}
				   }
			   }else{
				   $.messageBox.alert({title : '异常',content : '操作出现异常'});
			   }
		   },
		   error:function(xhr,textStatus,errorThrown){
			   $('#save').button('reset');
			   $.messageBox.alert({title : '异常',content : '操作出现异常'});
		   }
		});
}

/**
 * 重置
 */
function resetForm(){
	$('#UNIT_NAME').val(unitCurTitle);
	$('#DESCRIPTION').val(unitCurDescription);
}

/**
 * 刷新
 */
function refresh(){
	hideAllForm();
	initUnitInfoTree();
}

/*
 * 处理左键单击节点事件
 */
function TreeOnClick(event, treeId, treeNode) {
	opernode = treeNode;
    var nodeData = treeNode;//单击的节点
	var form = null; 
    if(nodeData.UNIT_CODE != '0'){//处理中间节点和叶子节点  
	    $('#MenuInfoForm').show();
	    //清空表单
	    $(':input')   
		 .not(':button, :submit, :reset')   
		 .val('')   
		 .removeAttr('checked')   
		 .removeAttr('selected');
		$('#UNIT_CODE').val(nodeData.UNIT_CODE);	
		$('#PARENT_CODE').val(nodeData.PARENT_CODE);
		$('#UNIT_NAME').val(nodeData.UNIT_NAME);			
	    $('#DESCRIPTION').val(nodeData.DESCRIPTION);
	    unitCurTitle = nodeData.UNIT_NAME;
	    unitCurDescription = nodeData.DESCRIPTION;
  	}
}

function hideAllForm(){
//	$("#menuInfo").hide();
	$("#MenuInfoForm").hide();
}

function OnRightClick(event, treeId, treeNode) {
	opernode = treeNode;
	treeObj.selectNode(treeNode);
	hideAllForm();
	//设置树的节点的level大于等1时不能新建子菜单
	if (opernode.level >= 3 && opernode.level != 0){
  		$("#rMenu").menu("disableItem",$("#addUnit"));
  	}else{
		$("#rMenu").menu("enableItem",$("#addUnit"));
  	}

  	//end modified
	if (opernode.level <= 0 ){
  		$("#rMenu").menu("disableItem",$("#deleteUnit"));
  	}
	else
	{
		$("#rMenu").menu("enableItem",$("#deleteUnit"));
	}
	$('#rMenu').menu('show', {
		left: event.clientX,
		top: event.clientY
	});
}
