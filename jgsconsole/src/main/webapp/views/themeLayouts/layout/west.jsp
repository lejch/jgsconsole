<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<style type="text/css">
	#menuAccordion .accordion-header-selected div{color:#fff !important;}
	#menuAccordion .l-btn-plain .l-btn-left{width:198px;}
	#menuAccordion .l-btn-plain:hover {
 		color:#fff;
 		background:#35a9e1;
		  border: none;
		  border-radius: none;
	}
	#menuAccordion .l-btn:hover {
 		background:#35a9e1; 
 		color:#fff; 
	  border: none;
	  filter: none;
	}
	#menuAccordion .accordion-header{
/* 		background:#e0e0e0 !important; */
		background:#31353e !important;
		height:24px !important;
	}
	#menuAccordion .accordion-header div{color:#c3c4cf;}
	#menuAccordion .panel-with-icon{
		padding-left : 0px !important;
	}
	#menuAccordion .panel-title{
	  font-size: 12px;
	  font-weight: bold;
/* 	    color:#777 !important; */
		background:none !important;
		height:24px !important;
		line-height:24px !important;
		position: absolute;
		left: 38px;
	}
	#menuAccordion .l-btn {
	  color:#c3c4cf;
/* 	  height:auto; */
	  height:40px;
	  width:auto;
	  text-decoration: none;
	  display: inline-block;
	  overflow: hidden;
	  margin: 0;
	  padding: 0;
	  cursor: pointer;
	  outline: none;
	  text-align: center;
	  vertical-align: middle;
	}
	#menuAccordion .panel-tool a {
	  display: inline-block;
	  width: 16px;
	  height: 16px;
	  opacity: 0.6;
	  filter: alpha(opacity=60);
	  margin: 0 0 0 2px;
	  vertical-align: top;
	}
	#menuAccordion .panel-icon{
		left:14px !important;
		margin-top:-6px !important;
/* 		color:#93917d; */
		color:#c4c3cf;
	}
	#menuAccordion a.l-btn span span.l-btn-text {
	    display: inline-block;
        text-align: left;
	    vertical-align: baseline;
	    width: 146px;
		margin-left: 45px
	}
	#menuAccordion .l-btn-icon{
		left:20px !important;
		margin-top:-7px !important;
		font-size:12px !important;
	}
	#menuAccordion 	a.l-btn span span.l-btn-icon-left {
	    background-position: left center;
	}
	#menuAccordion .panel-body {
		margin-bottom:-1px !important;
/* 		background-color:#fafafa; */
		background-color:#3c4252;
	}
	#menuAccordion span:focus{
		outline: none;
	}
	#menuAccordion 
	.dialog-button {
	  border-color: #ddd #ddd #ddd #ddd;
	}
	.panel-body {
	  border-color: #ddd;
	}
	#menuAccordion .panel-tool a:hover { 
 	  opacity: 1; 
	  filter: alpha(opacity=100); 
	  background-color: #31353e;
 	  -moz-border-radius: -2px -2px -2px -2px; 
	  -webkit-border-radius: -2px -2px -2px -2px; 
 	  border-radius: -2px -2px -2px -2px; 
	}
	.panel-header{
		background:#4899c9;
	}
	.layout-expand-over{
		background:#ffffff !important;
	}
	.layout-expand-west .panel-title{
		background:#ffffff !important;
	}
	.layout-expand-west .panel-tool a:hover{
		background-color:#ffffff !important;
	}
	.layout-panel-west .panel-tool a{
		display: inline-block;
		width: 16px;
		height: 16px;
		opacity: 0.6;
		filter: alpha(opacity=60);
		margin: 0 0 0 2px;
	}
	.layout-panel-west .panel-title{
		height:30px;
		line-height:30px;
	}
	.layout-expand-west .panel-tool a{
		display: inline-block;
		width: 16px;
		height: 16px;
		opacity: 0.6;
		filter: alpha(opacity=60);
		margin: 0 0 0 2px;
	}
	</style>
	
<div id="menuAccordion" style="background:#e9f0f5;margin-top:-1px;"></div>
