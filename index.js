// getUserMedia를 사용하여 카메라에서 스트림을 가져오는 함수
function getCameraStream() {
    // 미디어 장치 사용 권한을 요청하고, 승인되면 스트림을 가져옵니다.
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            // video 태그에 스트림을 연결합니다.
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.error('미디어 장치를 가져오는 중 에러가 발생했습니다: ' + error.message);
        });
}

// 사진 찍기 버튼을 클릭할 때 호출되는 함수
function takePicture() {
    // canvas 객체를 가져옵니다.
    var canvas = document.getElementById('canvas');
    // video 태그에서 이미지를 가져옵니다.
    var video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    // 이미지를 base64 데이터로 변환합니다.
    var imageData = canvas.toDataURL('image/png');
    // 이미지 데이터를 저장합니다.
    saveImage(imageData);
}

// 이미지 데이터를 저장하는 함수
function saveImage(imageData) {
    // 이미지 데이터를 Blob 객체로 변환합니다.
    var blob = dataURItoBlob(imageData);
    // Blob 객체를 URL.createObjectURL() 메서드를 사용하여 URL로 변환합니다.
    var imageUrl = URL.createObjectURL(blob);
    // a 태그를 생성합니다.
    var a = document.createElement('a');
    a.download = 'image.png'; // 이미지 파일의 이름을 설정합니다.
    a.href = imageUrl;
    document.body.appendChild(a); // a 태그를 추가합니다.
    a.click(); // a 태그를 클릭하여 이미지를 다운로드합니다.
}

// base64 데이터를 Blob 객체로 변환하는 함수
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// 페이지 로드가 완료되면 실행됩니다.
window.onload = function() {
    getCameraStream();
}