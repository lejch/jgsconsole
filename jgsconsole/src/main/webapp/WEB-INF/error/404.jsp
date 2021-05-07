<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ page session="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<script src="${ctx}/static/jquery/jquery.min.js" type="text/javascript"></script>
    <script>
        function url(url){
            if(window.top==window.self){//不存在父页面
                window.location.href = url;
            }else{
                window.top.location.href = url;
            }
        }
        $(function(){
            $('.error').css({'position':'absolute','left':($(window).width()-490)/2});
        	$(window).resize(function(){  
            	$('.error').css({'position':'absolute','left':($(window).width()-490)/2});
            })  
        });
    </script>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/errorPage.css">
</head>

<body style="background:#edf6fa;">
    <div class="error">
    
    <h2>非常遗憾，您访问的页面不存在！</h2>
    <p>看到这个提示，就自认倒霉吧!</p>
    <div class="reindex"><a href="javascript:void(0)" onclick="javascript:url('<c:url value="/"/>');">返回首页</a></div>
    
    </div>
</body>
</html>