var cur_row_dt = null;
$(function() {
	$("#SETHPLPFORM").form({
		url :appPath+"/HpwlNews/setHpLoop",
		onSubmit : function() {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			var isValid = false;
			if($(SET_HPIC_URI).val()!=null&&$(SET_HPIC_URI).val()!=''){isValid = true;}
			if (!isValid) {
				parent.$.messager.progress('close');
				swalAlert('操作提示','请设置相应封面，并保存！','warning',2000);
			}
			return isValid;
		},
		onLoadSuccess:function(node){
			if(node){
				cur_row_dt = node.row;
				$('#chagCrpcBtn').bind('click',function(){
					$('#upCroppic').show();
					$('#preLoadCroppic').hide();
				});
				
				var div_temp = document.createElement('div');
				$(div_temp).attr('id','temp_get_imgs');
				$('body').append(div_temp);
				$(div_temp).hide();
				$(div_temp).html(node.CONTENT);
				var imgslist = $('#temp_get_imgs img');
				if(imgslist.length>0){
					$('#imgInArticl').empty();
					$(imgslist).each(function(){
						var div = document.createElement('div');
						$(div).attr('imgsrc',$(this).attr('src'));
						$(div).css({'background':'url('+$(this).attr('src')+') center no-repeat',
							'width':'160px','height':'160px','border':'1px solid #ddd',
							'overflow':'hidden','margin-left':'10px','margin-top':'10px',
							'display':'inline-block','cursor':'pointer','background-size':'auto 160px'});
						
						$('#imgInArticl').append(div);
					});
					$('#imgInArticl div').bind('click',function(){
						$('#upCroppic').hide();
						$('#preLoadCroppic').show();
						var cropperOptions = {
							cropUrl:appPath+'/HpwlNews/preimg_crop_to_file', 
							loadPicture:$(this).attr('imgsrc'),
							onBeforeImgCrop:function(){swalAlert('正在截取','正在截取并保存图片,请稍后...','warning',300);},
							onAfterImgCrop:function(data){
								$('#SET_HPIC_URI').val(data.url);
								initSavePopover('newDlsPp','您已裁剪了封面，请记得保存！');
							},
							onAfterRemoveCroppedImg:function(){
								$('#SET_HPIC_URI').val('');
							}
						}
						var cropperHeader = new Croppic('preLoadCroppic', cropperOptions);
					});
				}
				$(div_temp).remove();
				
				var croppicContaineroutputMinimal = {
						uploadUrl:appPath+'/HpwlNews/img_save_to_file',
						cropUrl:appPath+'/HpwlNews/img_crop_to_file', 
						modal:false,
						doubleZoomControls:false,
					    rotateControls: false,
					    onBeforeImgUpload:function(){swalAlert('正在上传','正在上传并生成图片,请稍后...','warning',300);},
					    onBeforeImgCrop:function(){swalAlert('正在截取','正在截取并保存图片,请稍后...','warning',300);},
						onAfterImgCrop:function(data){
							$('#SET_HPIC_URI').val(data.url);
							initSavePopover('newDlsPp','您已裁剪了封面，请记得保存！');
						},
						onAfterRemoveCroppedImg:function(){
							$('#SET_HPIC_URI').val('');
						}
				}
				var cropContaineroutput = new Croppic('upCroppic', croppicContaineroutputMinimal);
			}
			
			$('#newDlsPp').bind('click',function(){
				$(this).webuiPopover('destroy');
			});
		},
		success : function(result) {
			var rls = dealBackJson(result);
			parent.$.messager.progress('close');
			if (result) {
				parent.reload;
				cur_row_dt.IS_SET_HPIC='0'
				cur_row_dt.SET_HPIC_URI=$('#SET_HPIC_URI').val();
				parent.$.modalDialog.openner.datagrid('updateRow',{
					index : $('#rowIndex').val(),
					row : cur_row_dt
				});
				$('#newDlsPp').webuiPopover('destroy');
				parent.$.modalDialog.handler.dialog('close');
				swalAlert('设置成功','设置首页轮播图片成功','success',2000);
			}else{
				swalAlert('设置失败','设置首页轮播图片失败','error',2000);
			}
		}
	});
});
