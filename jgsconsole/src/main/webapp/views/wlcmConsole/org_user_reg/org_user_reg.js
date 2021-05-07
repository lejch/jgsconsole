var $dg;
var $grid;
var flag=true;
var height;
var width;
var prev_webuipop_tar = null;
var prev_click_idx =null;

$(document).ready(function(){
	initHeight();
	initMenuTreeGrid();
	initSearchBox();
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
		url: appPath+"/userreg/getUserReg",
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
		columns : [[
		            {field:'USER_NAME',title:'注册账号（用户名）',width:30,align:'center'},
		            {field:'USER_ALIAS',title:'昵称',width:30,align:'center'},
		            {field:'PHONE',title:'绑定手机号',width:30,align:'center'},
		            {field:'CREATE_DATE',title:'注册时间',width:30,align:'center'},
		            {field:'FLAG',title:'账号状态',width:30,align:'center',formatter:function(value,row,index){
		            	if(value=='0'){return '<font color=green>启用</font>'}
		            	else if(value=='1'){return '停用';
		            	}else{return '';}
		            }},
		            {field:'USER_ID',title:'操作',width:20,align:'center',formatter:function(value,row,index){
    		 var btnss = '<button type="button" class="btn btn-default btn-xs btn_plugin_style" id="'+value
    		+'_rspwd" user_id="'+value+'" user_name="'+row.USER_NAME+'" onclick="restPwd(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)">'+
    			'<i class="glyphicon glyphicon-lock" ></i>'+
   			'</button>'+
   			'<button type="button" style="margin-left:2px;" class="btn btn-default btn-xs btn_plugin_style" id="'+value
    		+'_bkphone" user_id="'+value+'" user_name="'+row.USER_NAME+'" onclick="getBkPhone(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)">'+
    			'<i class="glyphicon glyphicon-phone" ></i>'+
   			'</button>';
    		 if(row.FLAG=='0'){
    			 btnss += ('<button type="button" style="margin-left:2px;" class="btn btn-default btn-xs btn_plugin_style" id="'+value
    			   			+'_disabzh" user_id="'+value+'" user_name="'+row.USER_NAME+'" onclick="disableZh(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips3(this)">'+
    			   			'<i class="glyphicon glyphicon-remove" ></i>'+
    			   			'</button>');
    		 }
    		 if(row.FLAG=='1'){
    			 btnss += ('<button type="button" style="margin-left:2px;" class="btn btn-default btn-xs btn_plugin_style" id="'+value
 			   			+'_disabzh" user_id="'+value+'" user_name="'+row.USER_NAME+'" onclick="enableZh(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips4(this)">'+
 			   			'<i class="glyphicon glyphicon-ok" ></i>'+
 			   			'</button>');
    		 }
    		 btnss+='<button type="button" style="margin-left:2px;" class="btn btn-default btn-xs btn_plugin_style" id="'+value
    		+'_rzjl" user_id="'+value+'" user_name="'+row.USER_NAME+'" onclick="getSyslog(this)" onmouseleave="delBtnTips()" onmouseenter="initBtnTips2(this)">'+
    			'<i class="glyphicon glyphicon-list-alt" ></i>'+
   			'</button>';
    		 return btnss;
		            }}
		          ]],
		          rowStyler: function(index,row){
		        	  	if(row.FLAG=='1'){return 'background:#FF5151;color:white;';}
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
				$.ajax({
					   type: "POST",
					   async: false,
					   url: appPath+"/userreg/getUserOperationed",
					   data : {"id":rowData['USER_ID']},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   var content ='<div class="dropdown-menu" aria-labelledby="alertsDropdown">'+
				   		'<div class="dropdown-header text-center accent-bg">'+
				   		'<span class="a-dropdown__header-title" style="color:#FFF;text-align:left;cursor:default;">操作日志</span>'+
				   		'</div><ul class="msglistul">';
				    	   for(var i=0;i<data.length;i++){
				    		   content+=('<li><i class="glyphicon glyphicon-exclamation-sign"></i><a href="javascript:void(0)">'+data[i]['LOG_TYPE']+
				    				   '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=#777>'
				    				   +data[i]['DESCRIBE']+'</font></a><span>'+data[i]['TIME']+'</span></li>');
				    	   }
				    	   content+='</ul></div>';
				    	   
				    	   layer.open({title:false,anim: -1,skin:'animated flipInX show',id:'msglisthp',move:false,type:1,resize:false,closeBtn:0,area:['500px','400px'],shade:[0.01,'#fff'],
				   			shadeClose:true,
				   			success:function(layero, index){
				   				$('.msglistul').mCustomScrollbar({theme:"minimal-dark"});
				   			},
				   			content:content
				   		});
					   },
					   error:function(xhr,textStatus,errorThrown){}
				});
			});
		}
	});
}
function getSyslog(obj){
	jspReqControl(function(){
		$.ajax({
			   type: "POST",
			   async: false,
			   url: appPath+"/userreg/getUserOperationed",
			   data : {"id":$(obj).attr('user_id')},
			   timeout:120*1000,
			   dataType:"json",
		       success: function(data){
		    	   var content ='<div class="dropdown-menu" aria-labelledby="alertsDropdown">'+
		   		'<div class="dropdown-header text-center accent-bg">'+
		   		'<span class="a-dropdown__header-title" style="color:#FFF;text-align:left;cursor:default;">操作日志</span>'+
		   		'</div><ul class="msglistul">';
		    	   for(var i=0;i<data.length;i++){
		    		   content+=('<li><i class="glyphicon glyphicon-exclamation-sign"></i><a href="javascript:void(0)">'+data[i]['LOG_TYPE']+
		    				   '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=#777>'
		    				   +data[i]['DESCRIBE']+'</font></a><span>'+data[i]['TIME']+'</span></li>');
		    	   }
		    	   content+='</ul></div>';
		    	   
		    	   layer.open({title:false,anim: -1,skin:'animated flipInX show',id:'msglisthp',move:false,type:1,resize:false,closeBtn:0,area:['500px','400px'],shade:[0.01,'#fff'],
		   			shadeClose:true,
		   			success:function(layero, index){
		   				$('.msglistul').mCustomScrollbar({theme:"minimal-dark"});
		   			},
		   			content:content
		   		});
			   },
			   error:function(xhr,textStatus,errorThrown){}
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
					url: appPath+"/userreg/getUserRegBySearch",
					queryParams:{'searchOption':name,'searchVal':value}
		    		});
		    	});
	    },
	    menu:'#mm',
	    prompt:'请输入关键字，按回车搜索'
	});
}
function getBkPhone(obj){
	jspReqControl(function(){
		swal({
			title: "您确定要撤销吗？", 
			text: '是否确定撤销绑定的手机号？重置后不可恢复,请谨慎操作', 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要撤销",
			confirmButtonColor: "#f86674"
			}, function() {
				$.ajax({
					   type: "POST",
					   async: false,
					   url: appPath+"/userreg/getBkPhone",
					   data : {"id":$(obj).attr('user_id'),'unm':$(obj).attr('user_name')},
					   timeout:120*1000,
					   dataType:"json",
				       success: function(data){
				    	   if(data){
				    		   $dg.datagrid('reload');
				    		   swalAlert("撤销成功","手机号已被置空，请在首页登录后，重新绑定手机号","success",2000);
				    	   }else{
				    		   swalAlert("撤销失败","获取信息异常!","error",2000);
				    	   }
					   },
					   error:function(xhr,textStatus,errorThrown){
						   swalAlert("系统异常",textStatus,"error",2000);
					   }
				});
		});
	});
}

function enableZh(obj){
	jspReqControl(function(){
		swal({
			title: "您确定要启用该账号吗？", 
			text: '是否确定启用该账号？启用后，该账号可在网站正常登陆，并使用相应的功能', 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要启用",
			confirmButtonColor: "#f86674"
		}, function() {
			$.ajax({
				type: "POST",
				async: false,
				url: appPath+"/userreg/enableZh",
				data : {"id":$(obj).attr('user_id'),'unm':$(obj).attr('user_name')},
				timeout:120*1000,
				dataType:"json",
				success: function(data){
					if(data){
						$dg.datagrid('reload');
						swalAlert("启用成功","账号已被启用，您可在网站继续使用该账号登陆！","success",2000);
					}else{
						swalAlert("启用失败","获取信息异常!","error",2000);
					}
				},
				error:function(xhr,textStatus,errorThrown){
					swalAlert("系统异常",textStatus,"error",2000);
				}
			});
		});
	});
}
var MmBtnIsNotClick = true;
function restPwd(obj){
	jspReqControl(function(){
		var cur_user_name = $(obj).attr('user_name');
		var cur_user_id = $(obj).attr('user_id');
		layer.open({title:false,id:'hnphone',move:false,type:1,resize:false,closeBtn:0,area:['400px','130px'],shade:[0.01,'#fff'],shadeClose:true,
			zIndex:10,
			success:function(){
				MmBtnIsNotClick = true;
				$('#resetPwdInput').validatebox({
				    required: true
				});
				$('#lgxxsgupbtns').bind('click',function(){
					if($('#resetPwdInput').validatebox('isValid')){
						if(MmBtnIsNotClick){
							MmBtnIsNotClick = false;
							$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",
								data:{'resetPwdInput':$("#lgxxform").serialize(),'user_id':cur_user_id,'user_name':cur_user_name},
								url:appPath+"/userreg/resetPassword",
	    						success: function(data){
	    							if(data){
	    								closeAllLayer();
	    								if(data['result']=='success'){
	    									swalAlert('重置成功！','您的密码已重置成新的密码','success',3000);
	    								}else{
	    									swalAlert('重置失败！','重置失败，请稍后再试，或联系管理员','error',3000);MmBtnIsNotClick = true;
	    								}
	    							}
	    						},error:function(xhr,textStatus,errorThrown){closeAllLayer();swalAlert("系统异常","系统异常:"+textStatus,'error',3000);}});
						}
					}else{
						$('#resetPwdInput').focus();
					}
				});
			},
			content:'<div style="padding:20px;"><form id="lgxxform"><div class="signup_form_div">'+
	              '<label>重置密码</label>'+
	              '<i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>'+
	              '<input type="password" id="resetPwdInput" class="minimal" name="resetPwdInput" placeholder="请输入新的密码">'+
	           '</div>'+
	              '<div class="signup_form_div">'+
	              '<button type="button" id="lgxxsgupbtns" class="sgupbtn">确认修改</button>'+
	              '</div></form>'+
	           '</div>'
		});
	});
}
var DisZhBtnIsNotClick=true;
function disableZh(obj){
	jspReqControl(function(){
		var cur_user_id = $(obj).attr('user_id');
		var cur_user_name = $(obj).attr('user_name');
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
								data:{'disReason':$("#disReason").val(),'user_id':cur_user_id,'user_name':cur_user_name},
								url:appPath+"/userreg/disZh",
								success: function(data){
									if(data){
										closeAllLayer();
										if(data['result']=='success'){
											$grid.datagrid('reload');
											swalAlert('停用成功！','该账号已被停用，将无法登陆网站','success',3000);
										}else{
											swalAlert('停用失败！','停用失败，请稍后再试，或联系管理员','error',3000);DisZhBtnIsNotClick = true;
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
			'<label>停用原因</label>'+
			'<i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>'+
			'<input type="text" id="disReason" class="minimal" name="disReason" placeholder="请输入停用原因">'+
			'</div>'+
			'<div class="signup_form_div">'+
			'<button type="button" id="lgxxdiszhbtns" class="sgupbtn">确认停用</button>'+
			'</div></form>'+
			'</div>'
		});
	});
}
function closeAllLayer(){layer.closeAll();}
function initBtnTips(obj){
	event.stopPropagation();
	layer.tips('重置密码', '#'+$(obj).attr('id'), {tips: 1});
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('撤销绑定的手机号', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips2(obj){
	event.stopPropagation();
	layer.tips('操作日志记录', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips3(obj){
	event.stopPropagation();
	layer.tips('停用账号', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips4(obj){
	event.stopPropagation();
	layer.tips('启用账号', '#'+$(obj).attr('id'), {tips: 1});
}