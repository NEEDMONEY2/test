(function () {
    var takePicture = document.querySelector("#take-picture"),
      showPicture = document.querySelector("#show-picture"),
      saveButton = document.querySelector("#save-button");
  
    if (takePicture && showPicture && saveButton) {
      // 카메라에서 이미지 캡처 및 미리보기
      takePicture.onchange = function (event) {
        var files = event.target.files,
          file;
        if (files && files.length > 0) {
          file = files[0];
          try {
            var URL = window.URL || window.webkitURL;
            var imgURL = URL.createObjectURL(file);
            showPicture.src = imgURL;
            URL.revokeObjectURL(imgURL);
          } catch (e) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
              showPicture.src = event.target.result;
            };
            fileReader.readAsDataURL(file);
          }
        }
      };
  
      // 이미지 저장 버튼 클릭 시
      saveButton.onclick = function (event) {
        event.preventDefault();
  
        // 캔버스 요소 생성
        var canvas = document.createElement("canvas");
        canvas.width = showPicture.width;
        canvas.height = showPicture.height;
  
        // 캔버스에 이미지 그리기
        var ctx = canvas.getContext("2d");
        ctx.drawImage(showPicture, 0, 0);
  
        // 이미지를 base64 문자열로 변환
        var dataURL = canvas.toDataURL("image/jpeg");
  
        // 이미지 다운로드 링크 생성
        var downloadLink = document.createElement("a");
        downloadLink.download = "image.jpg";
        downloadLink.href = dataURL;
        downloadLink.click();
      };
    }
  })();
