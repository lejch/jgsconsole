var MSG_TBS_CONTENT = null;
var b_count_total=0;
function updateMsgTable(){
	var MSG_FOR_WORK=new Array();
	var MSG_OP_PRJS=new Array();
	for(var i=0;i<Menus.length;i++){if(Menus[i]['need_msg']=='0'){MSG_FOR_WORK.push({'title':Menus[i]['title'],'need_msgtable':Menus[i]['need_msgtable'],'app_id':Menus[i]['app_id'],'id':Menus[i]['menuId']});}}
	var msg_work_html="<table style='width:400px;margin-top:15px;margin-bottom:20px;'><tr>";
	$.ajax({
		   type: "POST",async:false,timeout:120*1000,dataType:"json",
		   url: appPath+"/userreg/getMsgForWork",
		   data : {"need_msgtable":encodeURI(JSON.stringify(MSG_FOR_WORK))},
	       success: function(data){
	    	   for(var i=0;i<data.length;i++){
	    		   var curnum = parseInt(data[i]['NUM']);
	    		   b_count_total+=curnum;
	    		   
	    		   MSG_OP_PRJS.push({'id':data[i]['ID']+'_msgop','totalCount':curnum});
	    		   
		    	   msg_work_html+=("<td align='center'><div id='"+data[i]['ID']+"_msgop' msgopid='"+data[i]['ID']+"' msgopappcode='"+data[i]['APP_ID']+"' "+
	"style='margin-bottom:10px;width:140px;border-radius:6px;background-color:#6eaee7;padding:10px;flex-grow:1;justify-content:space-between;cursor:pointer;box-shadow:0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12);'>"+
		    	   		"<p style='margin:0;color:white;'>"+curnum+"条&nbsp;&nbsp;新申请</p>"+
						"<p style='margin:0;color:white;'>"+data[i]['NAME']+"</p>"+			    	   		
		    	   "</div></td>");
		    	   
		    	   if(parseInt(i)%2==1){msg_work_html+=("</tr><tr>");}
	    	   }
	    	   
		   },error:function(xhr,textStatus,errorThrown){}
	});
	
	msg_work_html+=("</tr></table>");
	var titletxt = "无 新待办事项";
	if(b_count_total>0){titletxt = b_count_total+"条 新待办事项";}
	msg_work_html = '<div class="dropdown-menu" aria-labelledby="alertsDropdown">'+
	'<div class="dropdown-header text-center accent-bg">'+
	'<span class="a-dropdown__header-title" style="color:#FFF;text-align:left;cursor:default;">'+titletxt+'</span>'+
	'</div>'+msg_work_html;
	
	MSG_TBS_CONTENT =msg_work_html;
	
	$('#msg_for_work_totle').html(b_count_total);
	
	$('#msgforwork').click(function(){
		   layer.open({title:false,skin:'animated flipInX show',id:'msglisthpxx',move:false,type:1,resize:false,closeBtn:0,area:['400px','auto'],shade:[0.01,'#fff'],
				shadeClose:true,anim:-1,offset:[$('#msgforwork').offset().top+50+'px',($('#msgforwork').offset().left-300)+'px'],
				content:MSG_TBS_CONTENT,
				success:function(layero, index){
					for(var i=0;i<MSG_OP_PRJS.length;i++){
						if(parseInt(MSG_OP_PRJS[i]['totalCount'])>0){
							$('#'+MSG_OP_PRJS[i]['id']).bind('click',function(){
								$('a[appcode="'+$(this).attr('msgopappcode')+'"]').click();
								$('#'+$(this).attr('msgopid')).click();
								layer.close(index);
							});
						}
					}
				}
			});
	});
}
function updateMsgTableForInerPage(){
	var MSG_FOR_WORK=new Array();
	var MSG_OP_PRJS=new Array();
	for(var i=0;i<Menus.length;i++){if(Menus[i]['need_msg']=='0'){MSG_FOR_WORK.push({'title':Menus[i]['title'],'need_msgtable':Menus[i]['need_msgtable'],'app_id':Menus[i]['app_id'],'id':Menus[i]['menuId']});}}
	var msg_work_html="<table style='width:400px;margin-top:15px;margin-bottom:20px;'><tr>";
	for(var j=0;j<MSG_FOR_WORK.length;j++){
		var sendata = new Array();
		$.ajax({
			type: "POST",async:false,timeout:120*1000,dataType:"json",
			url: appPath+"/userreg/getMsgForWork",
			data : {"need_msgtable":sendata.put(MSG_FOR_WORK[j])},
			success: function(data){
				b_count_total+=data.data;
				MSG_OP_PRJS.push({'id':MSG_FOR_WORK[j]['id']+'_msgop','totalCount':data.data});
				msg_work_html+=("<td align='center'><div id='"+MSG_FOR_WORK[j]['id']+"_msgop' msgopid='"+MSG_FOR_WORK[j]['id']+"' msgopappcode='"+MSG_FOR_WORK[j]['app_id']+"' "+
						"style='width:140px;border-radius:6px;background-color:#6eaee7;padding:10px;flex-grow:1;justify-content:space-between;cursor:pointer;box-shadow:0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12);'>"+
						"<p style='margin:0;color:white;'>"+data.data+"条&nbsp;&nbsp;新申请</p>"+
						"<p style='margin:0;color:white;'>"+MSG_FOR_WORK[j]['title']+"</p>"+			    	   		
				"</div></td>");
			},error:function(xhr,textStatus,errorThrown){}
		});
	}
	msg_work_html+=("</tr></table>");
	var titletxt = "无 新待办事项";
	if(b_count_total>0){titletxt = b_count_total+"条 新待办事项";}
	msg_work_html = '<div class="dropdown-menu" aria-labelledby="alertsDropdown">'+
	'<div class="dropdown-header text-center accent-bg">'+
	'<span class="a-dropdown__header-title" style="color:#FFF;text-align:left;cursor:default;">'+titletxt+'</span>'+
	'</div>'+msg_work_html;
	window.parent.MSG_TBS_CONTENT = msg_work_html;
	
	$('#msg_for_work_totle',window.parent.document).html(b_count_total);
}

function initSavePopover(obj,str){
	var svbtn = $('#'+obj);
	$(svbtn).webuiPopover('destroy').webuiPopover({
		placement:'left',
		trigger:'click',
		width:250,
		height:50,
		multi:true,
		closeable:false,
		padding:false,
		content:'<div style="padding-left:20px;line-height:50px;">'+str+'</div>',
		type:'html'});
	$(svbtn).webuiPopover('show');
}
function initExportWithThreeParam(action,param1,param2,param3){
	var form=$("<form>");
	form.attr("style","display:none");
	form.attr("target","");
	form.attr("method","post");
	form.attr("action",action);
	var input1=$("<input>");
	input1.attr('name','data');
	input1.attr("type","hidden");
	input1.attr('value',param1);
	var input2=$("<input>");
	input2.attr('name','starttime');
	input2.attr("type","hidden");
	input2.attr('value',param2);
	var input3=$("<input>");
	input3.attr('name','endtime');
	input3.attr("type","hidden");
	input3.attr('value',param3);
	$(form).append(input1);
	$(form).append(input2);
	$(form).append(input3);
	$('body').append(form);form.submit();$(form).remove();}
function initExportWithNoParam(action){var form=$("<form>");form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",action);$('body').append(form);form.submit();$(form).remove();}
function initDownLoad(action,fileName,fileLocation,fileType){
	var form=$("<form>");
	form.attr("style","display:none");
	form.attr("target","");
	form.attr("method","post");
	form.attr("action",action);
	var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","fileName");input1.attr("value",fileName);
	var input2=$("<input>");input2.attr("type","hidden");input2.attr("name","fileLocation");input2.attr("value",fileLocation);
	var input3=$("<input>");input3.attr("type","hidden");input3.attr("name","fileType");input3.attr("value",fileType);
	$("body").append(form);form.append(input1);form.append(input2);form.append(input3);form.submit();
}
function initWelcomeGoway(nextTitle){
	$('#plTtleshow').empty();
	$('#plTtleshow').append("<li style='cursor:pointer;' onclick='parent.turnAthrPg(\"views/welcome/wlcmPg.jsp\")'>"+
			"<a href='javascript:void(0)'>首页</a>"+
			"<div class='backTriangle'></div>"+
		"</li>"+
		"<li class='activeLL'>"+
			"<div class='frontTriangle'></div>"+
			"<a href='javascript:void(0);'>"+nextTitle+"</a>"+
			"<div class='backTriangle'></div>"+
		"</li>"+
		"<div class='rftpFront' />"+
		"<div class='hi-icon-wrap rtf_div' style='line-height:30px;' onclick='window.history.back(-1);'>&nbsp;&nbsp;&nbsp;&nbsp;返回</div>");
}
function iosStyleSuccessAlert(str,duration){
	iosOverlay({
		text: str,
		duration: duration,
		icon: appPath+"/static/iOS-Overlay/img/check.png"
	});
}
function iosStyleErrorAlert(str,duration){
	iosOverlay({
		text: str,
		duration: duration,
		icon: appPath+"/static/iOS-Overlay/img/cross.png"
	});
}

function swalAlert(title,text,type,timer){
	swal({
		   title:title,
		   text:text,
		   type:type,
		   timer:timer,
		   showConfirmButton:false
	   	});
}

var $ma = null;

function tpclk(obj){
	var parentid = $(obj).attr('appcode');
	$('#topMenuList').empty();
	var div = document.createElement('div');
	
	var initMenus = new Array();
	for(var k=0;k<Menus.length;k++){
		if(Menus[k]['app_id']==parentid&&Menus[k]['opertype']=='1'){
			initMenus.push(Menus[k]);
		}
	}
	var menulist = initMenus;
	for(var i = 0;i<initMenus.length;i++){
		if(initMenus[i]['parentId']==parentid){
			var icon = initMenus[i]['icon'];
			var title = initMenus[i]['title'];
        	var str = title+"||"+icon+"||"+initMenus[i]['location'];
        	
			$(div).append('<a href="javascript:void(0);" id="'+initMenus[i]['menuId']+'" onclick="addTabNew(\''+str+'\',this);" class="aHfbtn">'+
					'<i class="'+icon+'" style="margin-right:2px;" />'+title+"</a>");
			$('#topMenuList').css('left','220px');
		}
	}
	$('#topMenuList').append(div);
	$(div).addClass('animated slideInDown');
	
}

function changePassword() {
	parent.$.modalDialog({
		title : "密码修改",
		width : 350,
		height : 260,
		href : appPath+"/views/account/user/userPasswordEditDlg.jsp",
		buttons : [ {
			id : 'savebtncls',
			text : '保存',
			handler : function() {
				var f = parent.$.modalDialog.handler.find("#changeUserPasswordForm");
				f.submit();
			}
		}, {
			id : 'cancelbtncls',
			text : '取消',
			handler : function() {
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			}
		}
		]
	});
	$('#userCPanel').webuiPopover('hide');
}
