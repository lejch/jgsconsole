$(function(){
	Array.prototype.remove=function(dx)
		{
		　if(isNaN(dx)||dx>this.length){return false;}
		　for(var i=0,n=0;i<this.length;i++)
		　{
		　　　if(this[i]!=this[dx])
		　　　{
		　　　　　this[n++]=this[i]
		　　　}
		　}
		　this.length-=1
		}
});
function logout(b) {
	/*$.post('systemAction!logout.action', function() {
		if (b) {
			if (jqueryUtil.isLessThanIe8()) {
				loginAndRegDialog.dialog('open');
			} else {
					location.replace('login.jsp');
			}
		} else {
			loginAndRegDialog.dialog('open');
		}
	});*/
	$.messager.confirm("提示", "确认退出吗?",function(r){
		if(r){
            window.location.href=appPath+'/logout';
		}
	});
}

function changePassword() {
	parent.$.modalDialog({
		title : "添加用户",
		width : 350,
		height : 300,
		href : appPath+"/views/account/user/userPasswordEditDlg.jsp",
		buttons : [ {
			text : '保存',
			iconCls : 'icon-ok',
			handler : function() {
				var f = parent.$.modalDialog.handler.find("#changeUserPasswordForm");
				f.submit();
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			}
		}
		]
	});
}

function changeLayout(layout){
	$.ajax({
	   type: "POST",
	   async: false,//同步发送请求数据
	   url: appPath+"/user/changeLayout",
	   data : {"layout":layout},
	   timeout:120*1000,
	   dataType:"json",
       success: function(data){
	   },
	   error:function(xhr,textStatus,errorThrown){
	       $.messager.alert('错误',textStatus);
	   }
	});
	
	var time = new Date();
	window.location.href = appPath+"?time="+time;
}

var userInfoWindow;
function showUserInfo() {
	userInfoWindow = $('<div/>').window({
		modal : true,
		title : '当前用户信息',
		width : 350,
		height : 300,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		onClose : function() {
			$(this).window('destroy');
		}
	});
}

function setAllPrpos(obj,needToAddObj){  
    // 用来保存所有的属性名称和值  
    // 开始遍历  
    for (var p in obj) {  
        // 方法  
        if (typeof (obj[p]) == "function") {  
            obj[p]();  
        } else {  
            // p 为属性名称，obj[p]为对应属性的值  
        	needToAddObj.setAttribute(p,obj[p]);
        }  
    }  
}