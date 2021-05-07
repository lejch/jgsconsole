/**
 * 面板最大化操作类
 * @param panelID 面板JQUERY对象
 * @param property 设置选项
 */
function PanelMax(panelDiv,property){
	this.$div = panelDiv,
	this.$btn = $('.max',this.$div);
	this.$main = $('.widget-content',this.$div);
	this.$height = '205';
	this.container = $('#'+property.container);
	this.bindClick();
	this.onRestore = property.onResotre;
	this.onMax = property.onMax;
	
}

PanelMax.prototype={
		
		//最大化面板
		toMax:function(){
			this.$btn.attr("class","restore");
			/*this.$btn.text('还原');*/
			this.$btn.html('<i class="icon-resize-small"> </i>');
			this.$parentDiv = this.$div.parent();
			var divID = this.$div.attr('id');
			var parID = this.$parentDiv.attr('id');
			this.$divPanelds = $('.widget:not(#'+divID+')',this.$parentDiv);
			this.$dragCon = $('.widget-place:not(#'+parID+')');
			var dragCon = this.$dragCon;
			dragCon.each(function(index){
				var con = $(this);
				con.css({display:'none'});
			});
			var divPanels = this.$divPanelds;
			divPanels.each(function(index){
				var divPanel = $(this);
				divPanel.css({display:'none'});
			});
			var parID = this.$parentDiv.attr('id');
			var parWidth = document.getElementById(parID).style.width;
			this.$xTmpW=parWidth;
			this.$yTmpH=this.$main.css("height");
			this.$div.parent().css({width:this.container.innerWidth()-2+"px"});
			this.$div.css({width:''});
			this.$main.css("height","500px");
			if($.isFunction(this.onMax)){
				this.onMax(divID);
			}
		},
		
		//还原
		toRestore:function(){
			this.$btn.attr("class","max");
			/*this.$btn.text("最大化");*/
			this.$btn.html('<i class="icon-resize-full"> </i>');
			this.$div.parent().css({width:this.$xTmpW});
			this.$div.css({width:''});
			this.$main.css("height",this.$yTmpH);
			this.$xTmpW=null;
			this.$yTmpH=null;
			var dragCon = this.$dragCon;
			dragCon.each(function(index){
				var con = $(this);
				con.show();
			});
			var divPanels = this.$divPanelds;
			divPanels.each(function(index){
				var divPanel = $(this);
				divPanel.show();
			});
			this.$parentDiv = null;
			this.$divPanelds = null;
			this.$dragCon = null;
			if($.isFunction(this.onRestore)){
				this.onRestore(this.$div.attr('id'));
			}
		},
		
		//bindEnvent
		bindClick:function(){
//			this.$btn.bind
			this.$btn.unbind("click");
			this.$btn.bind("click",{inthis:this},function(e){
				if(!e)	e=window.event;
				var a=$(e.target).parent();
				var inthis=e.data.inthis;
				switch(a.attr("class")){
					case "max":
					inthis.toMax();	break;
					case "restore":
					inthis.toRestore();	break;
					default:
					break;
				}
			});
		}
}

jQuery.extend({
	onMaxPanel: function(panelDiv,property) {
		if(typeof(panelDiv)=="string"){
			panelDiv=$('#'+panelDiv);	
			new PanelMax(panelDiv,property);
		}
	}
});
