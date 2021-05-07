<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap_fileupload/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap_fileupload/css/fileinput.min.css">
<script type="text/javascript" src="${ctx}/static/bootstrap_fileupload/js/fileinput4down.js"></script>
<style>a{text-decoration:none;}.nav>li>a{padding: 0px 25px 0px 25px;}</style>
<div class="container kv-main" style="width:99%;">
	<form enctype="multipart/form-data">
         <div class="form-group">
             <input id="file" name="file" class="file" type="file" multiple data-preview-file-type="any" data-upload-url="${ctx}/xhf/fileUpload">
         </div>
     </form>
</div>
