var $dg;
var $grid;
var flag=true;
var height;
var width;
var prev_webuipop_tar = null;
var cur_row_data = null;
var prev_click_idx = null;

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
    height = height-75;
}
function initMenuTreeGrid(){
	$dg = $("#orgNewsGrid");
	$grid=$dg.datagrid({
		width : $('#orgnewsworkspace').width()-20,
		height : height,
		url: appPath+"/HpwlAdv/getOrgAdvice",
		queryParams:{},
		border:false,
		fitColumns:true,
		nowrap: false,
		striped: true,
		singleSelect:true,
		scrollbarSize:0,
		pageSize:10,
		pagination:true,
		onBeforeLoad:function(){
			if($('.mCS-minimal-dark').length>0){
				$('.datagrid-body:last').mCustomScrollbar("destroy");
			}
		},
		onLoadSuccess:function(){
			$('.datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		},
		columns : [[
		            {field:'TITLE',title:'主题',width:100,halign:'center'},
		            {field:'ID',hidden:true},
		            {field:'CONTENT',title:'正文',width:100,halign:'center'},
		            {field:'CREATETIME',title:'反馈时间',width:50,align:'center'},
		            {field:'NAME',title:'反馈人',width:50,align:'center'},
		            {field:'EMAIL',title:'电子邮件',width:50,align:'center'},
		            {field:'LINKWAY',title:'联系方式',width:50,align:'center'}
		            ]],
		onClickRow:function(rowIndex,rowData){
			if(prev_click_idx!=null&&prev_click_idx!=rowIndex){
				$dg.datagrid('unselectRow',prev_click_idx);
				prev_click_idx = rowIndex;
			}else{
				$dg.datagrid('selectRow',rowIndex);
				prev_click_idx = rowIndex;
			}
    		jspReqControl(function(){
    			parent.$.modalDialog({
					title : "反馈意见详情",
					width : '600',
					height : '450',
					href : appPath+"/views/wlcmConsole/org_advice/yjfkEditDlg.jsp",
					onLoad:function(){
						var f = parent.$.modalDialog.handler.find("#yjfkxform");
						f.form("load", rowData);
					}
				});
			});
		}
	});
}
function bindEvent(){
	$('#exportAllAdvice').bind('click',function(){
		jspReqControl(function(){
				initExportWithNoParam(appPath+"/HpwlAdv/exportAllOrgAdvice");
				swalAlert("正在导出...","正在导出XLSX，请稍等。导出期间，请勿重复点击导出按钮！","success",4000);
		});
	});
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('导出所有反馈意见', '#'+$(obj).attr('id'), {tips: 1});
}