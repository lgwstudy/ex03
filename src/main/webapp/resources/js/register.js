/**
 * 
 */
$(document).ready(function(e){
    // form태그의 role속성의 값이 form인것을 선택하여 formObj변수에 저장
	var formObj=$("form[role='form']");
	// submit버튼을 클릭하면
	$("button[type='submit']").on("click",function(e){
		// 현재 submit에 적용되어 있는 클릭이벤트를 취소.
		e.preventDefault();
		
		var str = "";
		
		$(".uploadResult ul li").each(function(i, obj) {
			var jobj = $(obj);
			console.log(jobj);
			
			str += "<input type='text' name='attachList[" + i + "].fileName' value='" + jobj.data("filename") + "'>";
			str += "<input type='text' name='attachList[" + i + "].uuid' value='" + jobj.data("uuid") + "'>";
			str += "<input type='text' name='attachList[" + i + "].uploadPath' value='" + jobj.data("path") + "'>";
			str += "<input type='text' name='attachList[" + i + "].fileType' value='" + jobj.data("type") + "'>";
		})
		formObj.append(str).submit();
//		formObj.append(str);
	})	// $("button[type='submit']") 끝
   
                     // 정규식
	var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
	var maxSize = 5242880; //5MB
	// checkExtension함수 선언(4. 첨부파일 공격에 대비하기 위한 업로드 파일의 확장자 제한 또는 파일 크게 제한)
	function checkExtension(fileName, fileSize) {

		if (fileSize >= maxSize) {
			alert("파일 사이즈 초과");
			return false;
		}
		//              mainlogo_new.png
		if (regex.test(fileName)) {
			alert("해당 종류의 파일은 업로드할 수 없습니다.");
			return false;
		}
		return true;
	} // checkExtension함수 끝
	
	$("input[type='file']").change(function(e) {
		// jsp에 <form>태그를 대체
		var formData = new FormData();
		//                  선택자 [속성선택자]
		var inputFile = $("input[name='uploadFile']");

		var files = inputFile[0].files;

		console.log(files);

		for (var i = 0; i < files.length; i++) {
			// checkExtension함수 호출
			if (!checkExtension(files[i].name, files[i].size)) {
				return false;
			}
			// 폼태그(formData)와 파일정보(files[i])와 uploadFile변수
			// 이용하여 폼태그와 파일정보를 연결
			formData.append("uploadFile", files[i]);
		}

		$.ajax({
			url : '/uploadAjaxAction',
			processData : false,
			contentType : false,
			data : formData,
			type : 'POST',
			dataType : 'json',
			success : function(result) {

				console.log(result);

				showUploadResult(result);// 업로드 결과 처리 함수
	      
				// $(".uploadDiv").html(cloneObj.html());
			}
		}); // $.ajax
	      
	}); //$("input[type='file']").change(function(e) { 이벤트 끝
	
	function showUploadResult(uploadResultArr){

		if(!uploadResultArr || uploadResultArr.length==0){
			return;
		}
		var uploadResult = $(".uploadResult ul");
		var str = "";

		$(uploadResultArr).each(function(i, obj){
			console.log(obj);
			
			if(obj.image){
				var fileCallPath = encodeURIComponent( obj.uploadPath + "/s_" + obj.uuid + "_" + obj.fileName);
				str += "<li data-path='" + obj.uploadPath + "'";
				str +=" data-uuid='" + obj.uuid + "' data-filename='" + obj.fileName + "' data-type='" + obj.image + "' ><div>";
				str += "<span> " + obj.fileName+"</span>";
				str += "<button type='button' data-file=\'" + fileCallPath + "\' ";
				str += "data-type='image' class='btn btn-warning btn-circle'><i class='fa fa-times'></i></button><br>";
				str += "<img src='/display?fileName=" + fileCallPath + "'>";
				str += "</div>";
				str += "</li>";
			} else {
				var fileCallPath = encodeURIComponent( obj.uploadPath+"/"+ obj.uuid +"_"+obj.fileName);               
				var fileLink = fileCallPath.replace(new RegExp(/\\/g),"/");

				str += "<li data-path='" + obj.uploadPath + "'";
				str += " data-uuid='" + obj.uuid + "' data-filename='" + obj.fileName + "' data-type='" + obj.image + "' ><div>";
				str += "<span> " + obj.fileName + "</span>";
				str += "<button type='button' data-file=\'" + fileCallPath + "\' "; 
				str += "data-type='file' class='btn btn-warning btn-circle'><i class='fa fa-times'></i></button><br>";
				str += "<img src='/resources/img/attach.png'></a>";
				str += "</div>";
				str += "</li>";
			}
		});

		uploadResult.append(str);
	}	// showUploadResult 함수 끝

	$(".uploadResult").on("click", function(e){
		var targetFile = $(this).data("file");
		var type = $(this).data("type");

		var targetLi = $(this).closet("li");
		console.log(targetFile);

		$.ajax({
			url: '/deleteFile',
			data: {fileName: targetFile, type:type},
			dataType:'text',
			type: 'POST',
			success: function(result){
				alert(result);
				targetLi.remove();
			}
		}); //$.ajax

	});

})