<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<table border="1">
	<tr><td>번호</td><td>${read.bno}</td></tr>
	<tr><td>제목</td><td>${read.title}</td></tr>
	<tr><td>내용</td><td>${read.content}</td></tr>
	<tr><td>작성자</td><td>${read.writer}</td></tr>
	<tr><td>작성일자</td><td>${read.regdate}</td></tr>
	<tr>
		<td colspan="2">
			<button><a href="/board/modify?bno=${read.bno}">글수정</a></button>
			<button><a href="/board/remove?bno=${read.bno}">글삭제</a></button>
		</td>
	</tr>
	
</table>
</body>
</html>


