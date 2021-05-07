var $dg;
var $grid;
var flag=true;
var height;
var width;
var prev_webuipop_tar = null;
var prev_click_idx=null;

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
function initMenuTreeGrid(){
	$dg = $("#orgNewsGrid");
	$grid=$dg.datagrid({
		width : $('#orgnewsworkspace').width()-20,
		height : height,
		url: appPath+"/membermg/getMemberReg",
		queryParams:{},
		border:false,
		fitColumns:true,
		nowrap: false,
		scrollbarSize:0,
		striped: false,
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
		columns : [[
		            {field:'HY_ID',title:'会员号',width:30,align:'left',halign:'center',formatter:function(value,row,index){
		            	if(row.FLAG=='0'){
		            		if(row.COUNCIL_FLAG=='0'){
		            			return '<span class="label label-success" style="background-color:#0099FF !important;margin-right:10px;margin-left:5px;">理事</span>'+value
		            		}else{
		            			return '<span class="label label-success" style="background-color:#0099FF !important;margin-right:10px;margin-left:5px;">会员</span>'+value
		            		}
		            	}else{
		            		return '';
		            	}
		            }},
		            {field:'NAME',title:'姓名',width:20,align:'center'},
		            {field:'USERALIAS',title:'申请账号名',width:20,align:'center'},
		            {field:'FIRST_CREATETIME',title:'申请日期',width:25,align:'center'},
		            {field:'SHUSER',title:'会员审核人',width:20,align:'center'},
		            {field:'SHTIME',title:'会员审核时间',width:25,align:'center'},
		            {field:'HYZT',title:'会员申请状态',width:20,align:'center',formatter:function(value,row,index){
		            	if(row.FLAG=='0'){
		            		return '<span class="label label-success" style="background-color:#0099FF !important;">已通过</span>';
		            	}else if(row.FLAG=='1'){
		            		return '<span class="label label-success">待审核</span>';
		            	}else if(row.FLAG=='2'){
		            		return '<span class="label label-info" style="background-color:#FF9966 !important;">不通过</span>'+
		            		'<i style="margin-left:8px;" id="'+row.ID+'btg" sqname="'+row.NAME+'" firstCrt="'+row.FIRST_CREATETIME+'" hyerr="'+row.HYSH_ERR_REASON+'" onclick="showHerrasn(this)" class="glyphicon glyphicon-question-sign zytzflag" onmouseleave="delBtnTips()" onmouseenter="initBtnTips5(this)"></i>';
		            	}
		            }},
		            {field:'LSZT',title:'理事申请状态',width:30,align:'center',formatter:function(value,row,index){
		            	var returnStr = '<div style="height:18px;position:relative;">';
		            	if(row.FLAG=='0'&&row.COUNCIL_FLAG=='0'){
		            		returnStr+='<span class="label label-success" style="background-color:#0099FF !important;">已通过</span>';
		            	}else if(row.FLAG=='0'&&row.COUNCIL_FLAG=='1'){
		            		returnStr+='<span class="label label-success" style="background-color:#CCCC00 !important;">审核中</span>';
		            	}else if(row.FLAG=='0'&&row.COUNCIL_FLAG=='2'){
		            		returnStr+='<span class="label label-danger">不允许申请</span>';
		            	}else if(row.FLAG=='0'&&row.COUNCIL_FLAG=='3'){
		            		returnStr+='<span class="label label-info" style="background-color:#FF9966 !important;">不通过</span><i style="margin-left:8px;" id="'+row.ID+'btgls" sqname="'+row.NAME+'" firstCrt="'+row.CREATETIME+'" hyerr="'+row.LSSH_ERR_REASON+'" onclick="showHerrasn(this)" class="glyphicon glyphicon-question-sign zytzflag" onmouseleave="delBtnTips()" onmouseenter="initBtnTips5(this)"></i>';
		            	}else if(row.FLAG=='0'&&row.COUNCIL_FLAG=='4'){
		            		returnStr+='<span class="label label-info" style="background-color:#00CCFF !important;">允许申请</span>';
		            	}else{
		            		returnStr+='<span class="label label-info" style="background:none !important;width:36px !important;"></span>';
		            	}
		            	if(row.HAS_CLI_RECORD=='0'){
		            		returnStr+='<i style="margin-left:32px;" id="'+row.ID+'iptn" userid="'+row.USERID+'" onclick="notificationsets(this)" class="glyphicon glyphicon-comment zytzflag" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)"></i>';
		            	}
		            	returnStr+='</div>'
		            	return returnStr;
		            }},
		            {field:'FLAG',title:'会员申请操作',width:20,align:'center',formatter:function(value,row,index){
		            	if(value=='1'){
		            		return '<button type="button" class="btn btn-default btn-xs btn_plugin_style" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_suc" userid="'+row.USERID+'" onclick="passReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)">'+
				            			'<i class="glyphicon glyphicon-ok" style="color:green;"></i><a class="btn_A_text"></a>'+
						   			'</button>'+
						   			'<button type="button" style="margin-left:5px;" class="btn btn-default btn-xs btn_plugin_style" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_rfs" userid="'+row.USERID+'" onclick="refuseReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)">'+
						            	'<i class="glyphicon glyphicon-remove" style="color:red;"></i><a class="btn_A_text"></a>'+
								   	'</button>';
				        }else{
				        	if(row.COUNCIL_FLAG=='0'||row.COUNCIL_FLAG=='1'){
				        		return '<span class="label label-success" style="background-color:#0099FF !important;">已申请理事</span>';
				        	}else if(row.COUNCIL_FLAG=='2'){
				        		if(value=='0'){
				        			return '<button type="button" style="padding:5px 8.5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID+'_gbr1" userid="'+row.USERID+'" irs="'+row.INITREGSUC+'" onclick="getBkReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
						            			'<i class="glyphicon glyphicon-share-alt" ></i>'+
						            	   '</button>'+
						            	   '<button type="button" style="padding:0px 9px;margin-left:5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" userid="'+row.USERID+'" id="'+row.ID+'_yxls" onclick="allowApplyLs(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips7(this)">'+
								            	'<i class="LigatureSymbols LigatureSymbolsLsh" style="font-size:20px;"></i>'+
								           '</button>';
				        		}else if(value=='2'){
				        			return '<button type="button" style="padding:5px 8.5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID+'_gbr2" userid="'+row.USERID+'" irs="'+row.INITREGSUC+'" onclick="getBkReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
						            			'<i class="glyphicon glyphicon-share-alt" ></i>'+
						            	   '</button>';
				        		}
				        	}else if(row.COUNCIL_FLAG=='4'){
				        		return '<button type="button" style="padding:5px 8.5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID+'_gbr3" userid="'+row.USERID+'" irs="'+row.ALLOW_MSGID+'" onclick="getBkAllowCil(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips8(this)">'+
					            			'<i class="glyphicon glyphicon-floppy-remove" ></i>'+
					            		'</button>';
				        	}else{
				        		return '<button type="button" style="padding:5px 8.5px;" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID+'_gbr4" userid="'+row.USERID+'" irs="'+row.INITREGSUC+'" onclick="getBkReg(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
					            			'<i class="glyphicon glyphicon-share-alt" ></i>'+
					            		'</button>';
				        	}
				        }
		            }},
		            {field:'COUNCIL_FLAG',title:'理事申请操作',width:20,align:'center',formatter:function(value,row,index){
		            	if(row.FLAG=='0'){
		            		if(value=='4'){
			            		return '<span class="label label-info" style="background-color:#0099FF !important;">未申请理事</span>';
					        }else if(value=='2'){
			            		return '<span class="label label-danger">不允许申请</span>';
					        }else if(value=='1'){
					        	return '<button type="button" class="btn btn-default btn-xs btn_plugin_style" clid="'+row.CUR_LISHI_ID+'" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_sucx" userid="'+row.USERID+'" onclick="passCouncil(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)">'+
		            						'<i class="glyphicon glyphicon-ok" style="color:green;"></i><a class="btn_A_text"></a>'+
		            				   '</button>'+
							   		   '<button type="button" style="margin-left:5px;" class="btn btn-default btn-xs btn_plugin_style" clid="'+row.CUR_LISHI_ID+'" hsont="'+row.HAS_OPERATE+'" rwd="'+row.ID+'" id="'+row.ID+'_rfsx" userid="'+row.USERID+'" onclick="refuseCouncil(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)">'+
							            	'<i class="glyphicon glyphicon-remove" style="color:red;"></i><a class="btn_A_text"></a>'+
									   '</button>';
					        }else{
					        	return '<button type="button" style="padding:5px 8.5px;" clid="'+row.CUR_LISHI_ID+'" class="btn btn-default btn-xs btn_plugin_style" rwd="'+row.ID+'" id="'+row.ID+'_gbr" userid="'+row.USERID+'" irs="'+row.INITCILSUC+'" onclick="getBkCouncil(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
					            			'<i class="glyphicon glyphicon-share-alt" ></i>'+
					            	   '</button>';
					        }
		            	}else if(row.FLAG=='1'){
		            		return '<span class="label label-success">会员申请审核中</span>';
		            	}else{
		            		return '<span class="label label-info" style="background-color:#FF9966 !important;">会员申请已驳回</span>';
		            	}
		            }}
		          ]],
       rowStyler: function(index,row){
    	    if(row.FLAG=='0'){return 'background:#98FB98;';}
    	    if(row.FLAG=='2'){return 'background:#FF5151;color:white;';}
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
		onDblClickRow:function(rowIndex, rowData){
			jspReqControl(function(){
				parent.$.modalDialog({
					title : "个人申请详情",
					width : '1220',
					height : '560',
					href : appPath+"/views/wlcmConsole/org_member/memberRegStepEditDlg.jsp",
					onLoad:function(){
						var f = parent.$.modalDialog.handler.find("#membRegForm");
						f.form("load", rowData);
					}
				});
			});
		}
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
function initSearchBox(){
	$('#searchbox').searchbox({
		width:300,
	    searcher:function(value,name){
		    	jspReqControl(function(){
		    		$('.datagrid-body:last').mCustomScrollbar("destroy");
		    		
		    		$grid=$dg.datagrid({
					url: appPath+"/membermg/getMemberRegBySearch",
					queryParams:{'searchOption':name,'searchVal':value}
		    		});
		    	});
	    },
	    menu:'#mm',
	    prompt:'请输入关键字，按回车搜索'
	});
}
function notificationsets(obj){
	event.stopPropagation();
	jspReqControl(function(){
		layer.open({title:false,move:false,id:'synotications',type:1,resize:false,area:['930px','400px'],shade:[0.1,'#fff'],shadeClose:true,closeBtn:0,
			success:function(layero, index){
				    	   $('#synoticationsdvt').datagrid({
				    			width : '900',height : '370',
				    			url: appPath+"/membermg/getLiShiList",
				    			queryParams:{'userid':$(obj).attr('userid')},
				    			border:false,fitColumns:true,
				    			nowrap:false,
				    			scrollbarSize:0,
				    			striped: true,
				    			singleSelect:true,
				    			onLoadSuccess:function(){
				    				$('#synotications .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
				    			},
				    			columns : [[
				    			            {field:'num',title:'',width:5,align:'center',formatter:function(value,row,index){return ++index;}},
				    			            {field:'USERALIAS',title:'申请人',width:30,align:'center'},
				    			            {field:'CREATETIME',title:'申请日期',width:30,align:'center'},
				    			            {field:'CIL_SH_USER',title:'理事审核人',width:20,align:'center'},
				    			            {field:'CIL_SH_TIME',title:'理事审核时间',width:30,align:'center'},
				    			            {field:'HYZT',title:'理事申请状态',width:30,align:'center',formatter:function(value,row,index){
				    			            	if(row.FLAG=='0'){
				    			            		return '<span class="label label-success" style="background-color:#0099FF !important;">已通过</span>';
				    			            	}else if(row.FLAG=='1'){
				    			            		return '<span class="label label-success">审核中</span>';
				    			            	}else if(row.FLAG=='3'){
				    			            		return '<span class="label label-info" style="background-color:#FF9966 !important;">不通过</span>';
				    			            	}
				    			            }},
				    			            {field:'LSSH_ERR_REASON',title:'审核不通过原因',width:70,align:'center',formatter:function(value,row,index){
				    			            	if(value){return '<pre style="text-align:left;">'+value+'</pre>'}
				    			            }}
				    			          ]]
				    	   });
			},
			content:'<div class="alert alert-success alert-dismissible fade in" style="height:400px;padding-right:15px !important;" role="alert">'+
						'<table id="synoticationsdvt"></table>'+
					'</div>'});
	});
}
var LAST_EXP_MBR_STARTTIME=null;
var LAST_EXP_MBR_ENDTIME=null;
function bindEvent(){
	$('#exportAllMemberReg').bind('click',function(){
		jspReqControl(function(){
			layer.open({title:false,move:false,id:'synotications',type:1,resize:false,area:['1030px',(height)+'px'],shade:[0.1,'#fff'],shadeClose:true,closeBtn:0,zIndex:1,
				success:function(layero, index){
								$('#starttime').datebox({required:true,editable:false});
								$('#endtime').datebox({required:true,editable:false});
					
					    	   $('#synoticationsdvt').datagrid({
					    			width : '1000',height : (height-100)+'px',
					    			border:false,fitColumns:true,
					    			nowrap:false,
					    			scrollbarSize:0,
					    			striped: true,
					    			singleSelect:true,
					    			onBeforeLoad:function(){
					    				if($('#synotications .mCS-minimal-dark').length>0){
					    					$('#synotications .datagrid-body:last').mCustomScrollbar("destroy");
					    				}
					    			},
					    			onLoadSuccess:function(){
					    				$('#synotications .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
					    			},
					    			columns : [[
					    			            {field:'num',title:'',width:5,align:'center',formatter:function(value,row,index){return ++index;}},
					    			            {field:'HY_ID',title:'会员号',width:50,align:'center'},
					    			            {field:'NAME',title:'姓名',width:30,align:'center'},
					    			            {field:'BIRTH',title:'出生年月',width:50,align:'center'},
					    			            {field:'SEX',title:'性别',width:20,align:'center'},
					    			            {field:'SXZY',title:'专业',width:40,align:'center'},
					    			            {field:'GZDW',title:'工作单位',width:40,align:'center'},
					    			            {field:'DWZWZC',title:'单位职务、职称',width:50,align:'center'},
					    			            {field:'LXDZ',title:'地址',width:50,align:'center'},
					    			            {field:'YZBM',title:'邮政编码',width:30,align:'center'},
					    			            {field:'GZDH',title:'联系电话',width:40,align:'center'},
					    			            {field:'PHONE',title:'手机',width:40,align:'center'},
					    			            {field:'EMAIL',title:'电子邮件',width:60,align:'center'}
					    			          ]]
					    	   });
					    	   
					    	   document.getElementById('grcxhy').onclick=function(){
					    		   if(!$('#starttime').datebox('getValue')){return false;}
					    		   if(!$('#endtime').datebox('getValue')){return false;}
					    		   $('#synoticationsdvt').datagrid({url: appPath+"/membermg/getMbrHz",
						    										queryParams:{'starttime':$('#starttime').datebox('getValue'),
						    													 'endtime':$('#endtime').datebox('getValue')}
					    		   								  });
					    		   LAST_EXP_MBR_STARTTIME = $('#starttime').datebox('getValue');
					    		   LAST_EXP_MBR_ENDTIME = $('#endtime').datebox('getValue');
					    	   }
					    	   
					    	   document.getElementById('dcgrhy').onclick=function(){
					    		   if(($('#synoticationsdvt').datagrid('getData')).rows.length>0){
					    			   initExportWithThreeParam(appPath+"/membermg/exportAllMemberReg",
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
								'<td><div id="grcxhy"><a>查询个人会员</a></div></td>'+
								'<td><div id="dcgrhy"><a>导出个人会员</a></div></td>'+
							'</tr></table>'+
							'<table id="synoticationsdvt"></table>'+
						'</div>'});
		});
	});
	
	$('#exportAllGroupReg').bind('click',function(){
		jspReqControl(function(){
			layer.open({title:false,move:false,id:'synotications',type:1,resize:false,area:['1030px',(height)+'px'],shade:[0.1,'#fff'],shadeClose:true,closeBtn:0,zIndex:1,
				success:function(layero, index){
					$('#starttime').datebox({required:true,editable:false});
					$('#endtime').datebox({required:true,editable:false});
					
					$('#synoticationsdvt').datagrid({
						width : '1000',height : (height-100)+'px',
						border:false,fitColumns:true,
						nowrap:false,
						scrollbarSize:0,
						striped: true,
						singleSelect:true,
						onBeforeLoad:function(){
							if($('#synotications .mCS-minimal-dark').length>0){
								$('#synotications .datagrid-body:last').mCustomScrollbar("destroy");
							}
						},
						onLoadSuccess:function(){
							$('#synotications .datagrid-body:last').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
						},
						columns : [[
						            {field:'num',title:'',width:5,align:'center',formatter:function(value,row,index){return ++index;}},
						            {field:'HY_ID',title:'会员号',width:50,align:'center'},
						            {field:'NAME',title:'姓名',width:30,align:'center'},
						            {field:'BIRTH',title:'出生年月',width:50,align:'center'},
						            {field:'SEX',title:'性别',width:20,align:'center'},
						            {field:'SXZY',title:'专业',width:40,align:'center'},
						            {field:'GZDW',title:'工作单位',width:40,align:'center'},
						            {field:'DWZWZC',title:'单位职务、职称',width:50,align:'center'},
						            {field:'LXDZ',title:'地址',width:50,align:'center'},
						            {field:'YZBM',title:'邮政编码',width:30,align:'center'},
						            {field:'GZDH',title:'联系电话',width:40,align:'center'},
						            {field:'PHONE',title:'手机',width:40,align:'center'},
						            {field:'EMAIL',title:'电子邮件',width:60,align:'center'}
						            ]]
					});
					
					document.getElementById('grcxhy').onclick=function(){
						if(!$('#starttime').datebox('getValue')){return false;}
						if(!$('#endtime').datebox('getValue')){return false;}
						$('#synoticationsdvt').datagrid({url: appPath+"/membermg/getCilHz",
							queryParams:{'starttime':$('#starttime').datebox('getValue'),
								'endtime':$('#endtime').datebox('getValue')}
						});
						LAST_EXP_MBR_STARTTIME = $('#starttime').datebox('getValue');
						LAST_EXP_MBR_ENDTIME = $('#endtime').datebox('getValue');
					}
					
					document.getElementById('dcgrhy').onclick=function(){
						if(($('#synoticationsdvt').datagrid('getData')).rows.length>0){
							initExportWithThreeParam(appPath+"/membermg/exportAllCilReg",
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
				'<td><div id="grcxhy"><a>查询理事会员</a></div></td>'+
				'<td><div id="dcgrhy"><a>导出理事会员</a></div></td>'+
				'</tr></table>'+
				'<table id="synoticationsdvt"></table>'+
			'</div>'});
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
								url:appPath+"/membermg/passMebReg",
								success: function(data){
									if(data){
										layer.closeAll();
										if(data){
								    		   $dg.datagrid('reload');
								    		   swalAlert("审核成功","该个人会员已通过审核!","success",2000);
								    		   if($(obj).attr('hsont')=='1'){
								    			   updateMsgTableForInerPage();
												}
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
								url:appPath+"/membermg/refuseMebReg",
								success: function(data){
									if(data){
										layer.closeAll();
										if(data){
								    		   $dg.datagrid('reload');
								    		   swalAlert("已拒绝申请","该个人会员申请,已被拒绝审核!","success",2000);
								    		   if($(obj).attr('hsont')=='1'){
								    			   updateMsgTableForInerPage();
												}
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
function getBkAllowCil(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({
			title: "您确定要撤销理事申请允许标记吗？", 
			text: '请确认后操作！', 
			type: "warning",showCancelButton: true,closeOnConfirm: false,
			confirmButtonText: "是的，我要撤销理事申请允许标记",confirmButtonColor: "#f86674"
			}, function() {
				$.ajax({
					   type: "POST",async: false,timeout:120*1000,dataType:"json",
					   url: appPath+"/membermg/getBkAllowCil",
					   data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),"MSGID":$(obj).attr('irs')},
				       success: function(data){
				    	   if(data){
				    		   $dg.datagrid('reload');
				    		   swalAlert("撤销成功","允许理事申请标记，已被撤销!","success",2000);
				    	   }else{
				    		   swalAlert("审核失败","获取信息异常!","error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);}
				});
		});
	});
}
function getBkReg(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({
			title: "您确定要撤销该会员申请吗？", 
			text: '如该会员同时有审核不通过的理事申请，撤销后将会结束其本次理事申请状态！(既不可撤销或更改，已作出的理事审核)', 
			type: "warning",showCancelButton: true,closeOnConfirm: false,
			confirmButtonText: "是的，我要撤销会员审核状态",confirmButtonColor: "#f86674"
		}, function() {
			$.ajax({
				type: "POST",async: false,timeout:120*1000,dataType:"json",
				url: appPath+"/membermg/getBkMebReg",
				data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),"MSGID":$(obj).attr('irs')},
				success: function(data){
					if(data){
						$dg.datagrid('reload');
						swalAlert("撤销成功","该个人会员审核状态，已被撤销!","success",2000);
					}else{
						swalAlert("审核失败","获取信息异常!","error",2000);
					}
				},
				error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);}
			});
		});
	});
}
function allowApplyLs(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({
			title: "您确定要允许该会员申请理事吗？", 
			text: '请确认后操作！', 
			type: "warning",showCancelButton: true,closeOnConfirm: false,
			confirmButtonText: "是的，我要允许申请理事",confirmButtonColor: "#5cb85c"
		}, function() {
			$.ajax({
				type: "POST",async: false,timeout:120*1000,dataType:"json",
				url: appPath+"/membermg/allowApplyLs",
				data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid')},
				success: function(data){
					if(data){
						$dg.datagrid('reload');
						swalAlert("操作成功","该会员已可申请理事!","success",2000);
					}else{
						swalAlert("审核失败","获取信息异常!","error",2000);
					}
				},
				error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);}
			});
		});
	});
}
function getBkCouncil(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({
			title: "您确定要撤销该理事申请吗？", 
			text: '请确认该撤销操作', 
			type: "warning",showCancelButton: true,closeOnConfirm: false,
			confirmButtonText: "是的，我要撤销理事审核状态",confirmButtonColor: "#f86674"
			}, function() {
				$.ajax({
					type: "POST",async: false,timeout:120*1000,dataType:"json",
					url: appPath+"/membermg/getBkCouncil",
					data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),"MSGID":$(obj).attr('irs'),'clid':$(obj).attr('clid')},
					success: function(data){
						if(data){
							$dg.datagrid('reload');
							swalAlert("撤销成功","该理事审核状态，已被撤销!","success",2000);
						}else{
							swalAlert("审核失败","获取信息异常!","error",2000);
						}
					},
					error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);}
				});
		});
	});
}
function passCouncil(obj){
	event.stopPropagation();
	jspReqControl(function(){
		swal({
			title: "您确定要审核通过该理事申请吗？", 
			text: '请确认该审核通过操作', 
			type: "warning",showCancelButton: true,closeOnConfirm: false,
			confirmButtonText: "是的，理事申请审核通过",confirmButtonColor: "#5cb85c"
			}, function() {
				$.ajax({
					   type: "POST",async: false,timeout:120*1000,dataType:"json",
					   url: appPath+"/membermg/passCouncil",
					   data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),'clid':$(obj).attr('clid')},
				       success: function(data){
				    	   if(data){
				    		   $dg.datagrid('reload');
				    		   swalAlert("已通过申请","该理事申请,已审核通过!","success",2000);
				    		   if($(obj).attr('hsont')=='1'){
				    			   updateMsgTableForInerPage();
								}
				    	   }else{
				    		   swalAlert("操作失败","获取信息异常!","error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常",textStatus,"error",2000);}
				});
			});
	});
}
function refuseCouncil(obj){
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
								data : {"ID":$(obj).attr('rwd'),"USERID":$(obj).attr('userid'),'clid':$(obj).attr('clid'),"disreason":$("#disReason").textbox('getText')},
								url:appPath+"/membermg/refuseCouncil",
								success: function(data){
									if(data){
										layer.closeAll();
										if(data){
								    		   $dg.datagrid('reload');
								    		   swalAlert("已拒绝申请","该理事申请,已被拒绝审核!","success",2000);
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
function initBtnTips(obj){event.stopPropagation();layer.tips('审核通过', '#'+$(obj).attr('id'), {tips:[1,'#5cb85c']});}
function initBtnTips1(obj){event.stopPropagation();layer.tips('撤销审核', '#'+$(obj).attr('id'), {tips: 1});}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips2(obj){event.stopPropagation();layer.tips('导出个人申请', '#'+$(obj).attr('id'), {tips:1});}
function initBtnTips3(obj){event.stopPropagation();layer.tips('审核不通过', '#'+$(obj).attr('id'), {tips:[1,'#FF5151']});}
function initBtnTips4(obj){event.stopPropagation();layer.tips('历次理事申请记录', '#'+$(obj).attr('id'), {tips:[1,'#0099FF']});}
function initBtnTips5(obj){event.stopPropagation();layer.tips('审核不通过的原因', '#'+$(obj).attr('id'), {tips:[1,'#0099FF']});}
function initBtnTips6(obj){event.stopPropagation();layer.tips('导出理事申请', '#'+$(obj).attr('id'), {tips:1});}
function initBtnTips7(obj){event.stopPropagation();layer.tips('允许申请理事', '#'+$(obj).attr('id'), {tips:1});}
function initBtnTips8(obj){event.stopPropagation();layer.tips('撤销理事申请允许标记', '#'+$(obj).attr('id'), {tips:1});}