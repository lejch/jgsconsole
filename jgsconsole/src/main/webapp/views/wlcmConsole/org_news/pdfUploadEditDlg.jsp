<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap_fileupload/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap_fileupload/css/fileinput.min.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/bootstrap_fileupload/css/default.css">
<script type="text/javascript" src="${ctx}/static/bootstrap_fileupload/js/fileinputPdf.js"></script>
<style>a{text-decoration:none;}</style>
<div class="container kv-main" style="width:99%;margin-top:10px;">
	<form enctype="multipart/form-data">
         <div class="form-group">
             <input id="file" name="file" class="file" type="file" multiple data-upload-url="${ctx}/HpwlNews/pdfUpload">
         </div>
     </form>
</div>
