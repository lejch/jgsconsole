var $logGrid;
var height;
var width;
var columnWidth;
var initPageSize = 10;
var xprev_click_idx=null;

$(document).ready(function(){
	initHeight();
	initLogGrid();
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
    height=height-76;
    columnWidth = Math.floor((width-170)/5);
    if(window.screen.height>768){
    	initPageSize = 20;
    }
}

function initLogGrid(){
	$logGrid=$("#logDg").datagrid({
		url : appPath+"/LogController/listLog",
		width : width-40,
		height : height,
		pagination:true,
		border:false,
		pageSize:initPageSize,
		singleSelect:true,
		scrollbarSize:0,
		fitColumns:true,
		striped:true,
		onBeforeLoad:function(){
			if($('.mCS-minimal-dark').length>0){
				$('.datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('.datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		rowStyler:function(index,row){
			if(row.LOG_TYPE=='操作日志'){
				return 'background:#2EFE64;';
			}
		},
		onClickRow : function(rowIndex,rowData){
			if(xprev_click_idx!=null&&xprev_click_idx!=rowIndex){
				$logGrid.datagrid('unselectRow',xprev_click_idx);
				xprev_click_idx = rowIndex;
			}else{
				$logGrid.datagrid('selectRow',rowIndex);
				xprev_click_idx = rowIndex;
			}
		},
		columns : [[  {field:'ID',title : '',hidden:true},
		              {field:'OPEATE_DETAIL',title : '',hidden:true},
		              {field:'IP',title : 'IP地址',align:'center',width:50},
		              {field:'OPEARTER',title:'操作用户',align:'center',width:50},
		              {field:'LOG_TYPE',title:'日志类型',align:'center',width:50},
		              {field:'TIME',title:'操作时间',align:'center',width:80},
		              {field:'DESCRIBE',title:'操作描述',halign:'center',width:200,formatter:function(value,row,index){
		            	  if(row.OPEATE_DETAIL!=''){return row.DESCRIBE+' <a href="javascript:void(0)" detail='+JSON.stringify(row.OPEATE_DETAIL)+' onclick="showOpeateDetal(this)">详情</a>'
		            	  }else{return row.DESCRIBE;}
		    			}
		              }
		          ]]
	});
}

function showOpeateDetal(obj){
	parent.$.modalDialog({
		title : "日志详情",
		width : 600,
		height : 400,
		href : appPath+"/views/account/log/showDetailEditDlg.jsp",
		onLoad:function(){
			var f = parent.$.modalDialog.handler.find("#logDetailGrid");
			f.datagrid({
				height : 350,
				url : appPath+"/LogController/listDetailLog",
				queryParams : {detail:$(obj).attr("detail")},
				rownumbers:true,
				border:false,
				singleSelect:true,
				fitColumns:true,
				nowrap:false,
				striped:true,
				columns : [[  {field : 'RESULT',title : '操作类型',width : 50,align:'center',formatter:function(value,row,index){
						      	  if(value=='addResult'){
						      		  return "增加权限";
						    	  }else{
						    		  return "取消授权";
						    	  }
								}
							  },
				              {field : 'TITLE',title : '操作对象',width : 70,align:'center'},
				              {field : 'APP_NAME',title : '所属系统',width : 70,align:'center'}
				          ]]
			});
		}		
	});
}