/**
 * 
 */

$(document).ready(function() {
	
	var bno = $("#bno").val();
	
	$.getJSON("/board/getAttachList", {bno:bno}, function(arr) {
		
		console.log(arr);

		var str = "";
		
		$(arr).each(function(i, attach) {
			if (attach.fileType) {	// 이미지 파일이면
				var fileCallPath =  encodeURIComponent( attach.uploadPath + "/s_" + attach.uuid + "_" + attach.fileName);

				str += "<li data-path='" + attach.uploadPath + "'";
				str +=" data-uuid='" + attach.uuid + "' data-filename='" + attach.fileName + "' data-type='" + attach.fileType + "' ><div>";
				str += "<img src='/display?fileName=" + fileCallPath + "'>";
				str += "</div>";
				str += "</li>";
			} else {	// 이미지 파일이 아니면

				str += "<li data-path='" + attach.uploadPath + "'";
				str += " data-uuid='" + attach.uuid + "' data-filename='" + attach.fileName + "' data-type='" + attach.fileType + "' ><div>";
				str += "<img src='/resources/img/attach.png'></a>";
				str += "</div>";
				str += "</li>";
			}
			
		}); // $(arr).each(function(i, attach) 끝
		
		$(".uploadResult ul").html(str);
	});
});