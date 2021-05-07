var $dg;
var $grid;
var flag=true;
var height;
var width;
var prev_webuipop_tar = null;
var prev_click_idx = null;

$(document).ready(function(){
	initHeight();
	initMenuTreeGrid(); 
	bindEvent();
	initSearchBox();
	
	$('#xmtips').hover(function(){layer.tips('本页面只展示部分数据，信息详情，请双击相应记录查看！', '#xmtips', {tips: 1});
	},function(){
		layer.closeAll('tips');
	});
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
function initSearchBox(){
	$('#searchbox').searchbox({
		width:300,
	    searcher:function(value,name){
		    	jspReqControl(function(){
		    		$('.datagrid-body:last').mCustomScrollbar("destroy");
		    		$grid=$dg.datagrid({
					url: appPath+"/groupmg/getGroupRegBySearch",
					queryParams:{'searchOption':name,'searchVal':value}
		    		});
		    	});
	    },
	    menu:'#mm',
	    prompt:'请输入关键字，按回车搜索'
	});
}
function initMenuTreeGrid(){
	$dg = $("#orgNewsGrid");
	$grid=$dg.datagrid({
		width : $('#orgnewsworkspace').width()-20,
		height : height,
		url: appPath+"/groupmg/getGroupReg",
		queryParams:{},
		border:false,
		fitColumns:true,
		nowrap: false,
		striped: false,
		scrollbarSize:0,
		singleSelect:true,
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
		            {field:'HY_ID',title:'会员号',width:30,align:'left',halign:'center',formatter:function(value,row,index){
		            	if(row.FLAG=='0'){
		            		return '<span class="label label-success" style="background-color:#0099FF !important;margin-right:10px;margin-left:5px;">团体</span>'+value
		            	}else{
		            		return '';
		            	}
		            }},
		            {field:'DWMC',title:'单位名称',width:30,align:'center'},
		            {field:'XXDZ',title:'详细地址',width:30,align:'center'},
		            {field:'FRXM',title:'法人姓名',width:40,align:'center'},
		            {field:'USERALIAS',title:'申请人',width:30,align:'center'},
		            {field:'CREATETIME',title:'申请日期',width:30,align:'center'},
		            {field:'SHUSER',title:'审核人',width:30,align:'center'},
		            {field:'SHTIME',title:'审核日期',width:30,align:'center'},
		            {field:'SQZT',title:'申请状态',width:20,align:'center',formatter:function(value,row,index){
		            	if(row.FLAG=='0'){
		            		return '<span class="label label-success" style="background-color:#0099FF !important;">已通过</span>';
		            	}else if(row.FLAG=='1'){
		            		return '<span class="label label-success">待审核</span>';
		            	}else if(row.FLAG=='2'){
		            		return '<span class="label label-info" style="background-color:#FF9966 !important;">不通过</span>'+
		            		'<i style="margin-left:8px;" id="'+row.ID+'btg" sqname="'+row.USERALIAS+'" firstCrt="'+row.CREATETIME+'" hyerr="'+row.TTSH_ERR_REASON+'" onclick="showHerrasn(this)" class="glyphicon glyphicon-question-sign zytzflag" onmouseleave="delBtnTips()" onmouseenter="initBtnTips5(this)"></i>';
		            	}
		            }},
		            {field:'FLAG',title:'操作',width:20,align:'center',formatter:function(value,row,index){
		            	if(value=='1'){
		            		return '<button type="button" class="btn btn-default btn-xs btn_plugin_style" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_suc" userid="'+row.USERID
		            		+'" onclick="passReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)">'+
				            			'<i class="glyphicon glyphicon-ok" style="color:green;"></i>'+
						   			'</button>'+
						   			'<button type="button" style="margin-left:4px;" class="btn btn-default btn-xs btn_plugin_style" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_rfs" userid="'+row.USERID
				            		+'" onclick="refuseReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips	3(this)">'+
						            			'<i class="glyphicon glyphicon-remove" style="color:red;"></i>'+
								   			'</button>';
				        }else{
				            return '<button type="button" style="padding: 4px 8.5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID
			            		+'_gbr" userid="'+row.USERID+'" irs="'+row.INITREGSUC
			            		+'" onclick="getBkReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
					            			'<i class="glyphicon glyphicon-share-alt" ></i></button>';	
				        }
		            }}
		          ]],
		          rowStyler: function(index,row){
		        	  	if(row.FLAG=='0'){return 'background:#98FB98;';}
		        	  	if(row.FLAG=='2'){return 'background:#FF5151;color:white;';}
		          },
		onDblClickRow:function(rowIndex, rowData){
			jspReqControl(function(){
				parent.$.modalDialog({
					title : "团体申请详情",
					width : '1220',
					height : '560',
					href : appPath+"/views/wlcmConsole/org_group/groupRegStepEditDlg.jsp",
					onLoad:function(){
						var f = parent.$.modalDialog.handler.find("#membRegForm");
						f.form("load", rowData);
					}
				});
			});
		}
	});
}
function bindEvent(){
	$('#exportAllGrouprReg').bind('click',function(){
		jspReqControl(function(){
			jspReqControl(function(){
				layer.open({title:false,move:false,id:'synotications',type:1,resize:false,area:['1030px',(height)+'px'],shade:[0.1,'#fff'],shadeClose:true,closeBtn:0,zIndex:1,
					success:function(layero, index){
						$('#starttime').datebox({required:true,editable:false});
						$('#endtime').datebox({required:true,editable:false});
						
						$('#synoticationsdvt').datagrid({
							width : '1000',height : (height-100)+'px',
							border:false,fitColumns:false,
							nowrap:false,
							scrollbarSize:0,
							striped: true,
							singleSelect:true,
							columns : [[
							            {field:'num',title:'',width:5,align:'center',formatter:function(value,row,index){return ++index;}},
							            {field:'HY_ID',title:'会员号',width:100,align:'center'},
							            {field:'DWMC',title:'单位名称',width:150,align:'center'},
							            {field:'CLRQ',title:'成立日期',width:80,align:'center'},
							            {field:'ZCZB',title:'注册资本',width:60,align:'center'},
							            {field:'ZGRS',title:'职工人数',width:60,align:'center'},
							            {field:'XXDZ',title:'详细地址',width:150,align:'center'},
							            {field:'HYSL',title:'会员数量',width:60,align:'center'},
							            {field:'DWWZ',title:'单位网址',width:150,align:'center'},
							            {field:'CZ',title:'传真',width:80,align:'center'},
							            {field:'FZJGSL',title:'分支机构数量',width:80,align:'center'},
							            {field:'YZBM',title:'邮编',width:50,align:'center'},
							            {field:'FRXM',title:'法人姓名',width:100,align:'center'},
							            {field:'DH',title:'电话',width:80,align:'center'},
							            {field:'SEX',title:'性别',width:50,align:'center'},
							            {field:'PHONE',title:'手机',width:100,align:'center'},
							            {field:'ZWZC',title:'职务/职称',width:150,align:'center'},
							            {field:'EMAIL',title:'E-mail',width:150,align:'center'},
							            {field:'LXR',title:'联系人',width:100,align:'center'},
							            {field:'LXRDH',title:'联系人电话',width:80,align:'center'},
							            {field:'LXRSJ',title:'联系人手机',width:100,align:'center'},
							            {field:'JL',title:'业务范围',width:200,align:'center'}
							            ]]
						});
						
						document.getElementById('grcxhy').onclick=function(){
							if(!$('#starttime').datebox('getValue')){return false;}
							if(!$('#endtime').datebox('getValue')){return false;}
							$('#synoticationsdvt').datagrid({url: appPath+"/groupmg/getGroupHz",
								queryParams:{'starttime':$('#starttime').datebox('getValue'),
									'endtime':$('#endtime').datebox('getValue')}
							});
							LAST_EXP_MBR_STARTTIME = $('#starttime').datebox('getValue');
							LAST_EXP_MBR_ENDTIME = $('#endtime').datebox('getValue');
						}
						
						document.getElementById('dcgrhy').onclick=function(){
							if(($('#synoticationsdvt').datagrid('getData')).rows.length>0){
								initExportWithThreeParam(appPath+"/groupmg/exportAllGroupReg",
										encodeURI(JSON.stringify(($('#synoticationsdvt').datagrid('getData')).rows)),
										LAST_EXP_MBR_STARTTIME,
										LAST_EXP_MBR_ENDTIME);
								swalAlert("正在导出...","正在导出XLSX，请稍等。导出期间，请勿重复点击导出按钮！","success",4000);
							}else{
								layer.msg('请查询需导出的数据！');
							}
						}
					},
					content:'<div class="alert alert-success alert-dismissible fade in" style="height:'+(height-20)+'px;padding-right:15px !important;" role="alert">'+
					'<table align="center"><tr width="550px">'+
					'<td><strong>开始时间：</strong></td>'+
					'<td><input id="starttime" name="starttime" type="text" class="easyui-datebox" required="required"></td>'+
					'<td width="25"></td>'+
					'<td><strong>结束时间：</strong></td>'+
					'<td><input id="endtime" name="endtime" type="text" class="easyui-datebox" required="required"></td>'+
					'<td><div id="grcxhy"><a>查询团体会员</a></div></td>'+
					'<td><div id="dcgrhy"><a>导出团体会员</a></div></td>'+
					'</tr></table>'+
					'<table id="synoticationsdvt"></table>'+
				'</div>'});
			});
		});
	});
}
function showHerrasn(obj){
	event.stopPropagation()
	jspReqControl(function(){
		layer.open({title:false,id:'hndiszh',move:false,type:1,resize:false,closeBtn:0,area:['410px','auto'],shade:[0.01,'#fff'],shadeClose:true,zIndex:10,
			content:'<div style="padding:20px;"><form id="lgxxdiszhform"><div class="signup_form_div">'+
			'<label>申请人：'+$(obj).attr('sqname')+'&nbsp;&nbsp;&nbsp;&nbsp;申请日期：'+$(obj).attr('firstCrt')+'</label><br/>'+
			'<label>审核不通过原因</label>'+
			'<div type="text" id="disReason" class="minimal" name="disReason" style="border-radius:6px;width:360px;height:auto !important;padding:10px;"><pre style="margin:0px;">'+$(obj).attr('hyerr')+'</pre></div>'+
			'</div></form>'+
			'</div>'
		});
	});
}
function getBkReg(obj){
	jspReqControl(function(){
		$.ajax({
			   type: "POST",
			   async: false,
			   url: appPath+"/groupmg/getBkGroupReg",
			   data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),"MSGID":$(obj).attr('irs')},
			   timeout:120*1000,
			   dataType:"json",
		       success: function(data){
		    	   if(data){
		    		   $dg.datagrid('reload');
		    		   swalAlert("撤销成功","该团体会员审核通过状态，已被撤销!","success",2000);
		    	   }else{
		    		   swalAlert("撤销失败","获取信息异常!","error",2000);
		    	   }
			   },
			   error:function(xhr,textStatus,errorThrown){
				   swalAlert("系统异常",textStatus,"error",2000);
			   }
		});
	});
}
var DisZhBtnIsNotClick=true;
function passReg(obj){
	event.stopPropagation()
	jspReqControl(function(){
		layer.open({title:false,id:'hndiszh',move:false,type:1,resize:false,closeBtn:0,area:['400px','130px'],shade:[0.01,'#fff'],shadeClose:true,
			zIndex:10,
			success:function(){
				DisZhBtnIsNotClick = true;
				$('#disReason').validatebox({
					required: true
				});
				$('#lgxxdiszhbtns').bind('click',function(){
					if($('#disReason').validatebox('isValid')){
						if(DisZhBtnIsNotClick){
							DisZhBtnIsNotClick = false;
							$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",
								data:{"hynum":$("#disReason").val(),"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid')},
								url:appPath+"/groupmg/passGroupReg",
								success: function(data){
									if(data){
										layer.closeAll();
										if(data){
								    		   $dg.datagrid('reload');
								    		   swalAlert("审核成功","该团体会员已通过审核!","success",2000);
								    		   if($(obj).attr('hsont')=='1'){
								    			   updateMsgTableForInerPage();
												}
								    	   }else{
								    		   swalAlert("操作失败","获取信息异常!","error",2000);DisZhBtnIsNotClick = true;
								    	   }
									}
								},error:function(xhr,textStatus,errorThrown){closeAllLayer();swalAlert("系统异常","系统异常:"+textStatus,'error',3000);}});
						}
					}else{
						$('#disReason').focus();
					}
				});
			},
			content:'<div style="padding:20px;"><form id="lgxxdiszhform"><div class="signup_form_div">'+
			'<label>会员号</label>'+
			'<i class="glyphicon glyphicon-pencil" style="position:absolute;right:12px;top:25px;"></i>'+
			'<input type="text" id="disReason" class="minimal" name="disReason" placeholder="请输入会员号">'+
			'</div>'+
			'<div class="signup_form_div">'+
			'<button type="button" id="lgxxdiszhbtns" style="float:right;" class="sgupbtn">确认提交</button>'+
			'</div></form>'+
			'</div>'
		});
	});
}
function refuseReg(obj){
	event.stopPropagation()
	jspReqControl(function(){
		layer.open({title:false,id:'hndiszh',move:false,type:1,resize:false,closeBtn:0,area:['400px','200px'],shade:[0.01,'#fff'],shadeClose:true,
			zIndex:10,
			success:function(){
				DisZhBtnIsNotClick = true;
				$('#disReason').textbox({multiline:true,required: true});
				
				$('#lgxxdiszhbtns').bind('click',function(){
					if($('#disReason').textbox('isValid')){
						if(DisZhBtnIsNotClick){
							DisZhBtnIsNotClick = false;
							$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",
								data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),"disreason":$("#disReason").textbox('getText')},
								url:appPath+"/groupmg/refuseGroupReg",
								success: function(data){
									if(data){
										layer.closeAll();
										if(data){
								    		   $dg.datagrid('reload');
								    		   swalAlert("已拒绝申请","该团体会员申请,已被拒绝审核!","success",2000);
								    		   if($(obj).attr('hsont')=='1'){updateMsgTableForInerPage();}
								    	   }else{
								    		   swalAlert("操作失败","获取信息异常!","error",2000);DisZhBtnIsNotClick = true;
								    	   }
									}
								},error:function(xhr,textStatus,errorThrown){layer.closeAll();swalAlert("系统异常","系统异常:"+textStatus,'error',3000);}});
						}
					}else{
						$('#disReason').focus();
					}
				});
			},
			content:'<div style="padding:20px;"><form id="lgxxdiszhform"><div class="signup_form_div">'+
			'<label>审核不通过原因</label>'+
			'<input type="text" id="disReason" class="minimal" name="disReason" placeholder="请输入审核不通过的原因" style="width:360px;height:100px">'+
			'</div>'+
			'<div class="signup_form_div">'+
			'<button type="button" id="lgxxdiszhbtns" style="float:right;" class="sgupbtn">确认提交</button>'+
			'</div></form>'+
			'</div>'
		});
	});
}
function initBtnTips(obj){event.stopPropagation();layer.tips('审核通过','#'+$(obj).attr('id'),{tips:[1,'#63d640']});}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){event.stopPropagation();layer.tips('撤销审核','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips2(obj){event.stopPropagation();layer.tips('导出团队申请','#'+$(obj).attr('id'),{tips:1});}
function initBtnTips3(obj){event.stopPropagation();layer.tips('审核不通过','#'+$(obj).attr('id'),{tips:[1,'#FF5151']});}