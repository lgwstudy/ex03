<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../includes/header.jsp" %>
<div class="container-fluid">
<h1 class="h3 mb-2 text-gray-800">Register</h1>
<form action="register" method="post">
	<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" border="1">
		<tr><td>제목</td><td><input class="form-control" type="text" name="title"></td></tr>
		<tr><td>내용</td><td><textarea class="form-control" rows="20" cols="30" name="content"></textarea></td></tr>
		<tr><td>작성자</td><td><input class="form-control" type="text" name="writer"></td></tr>
		<tr><td colspan="2"><button class="btn btn btn-primary" type="submit">글쓰기</button></td></tr>
	</table>
</form>
</body>
</html>