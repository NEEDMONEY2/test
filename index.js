// get elements from DOM
const startButton = document.getElementById('startButton');
const saveButton = document.getElementById('saveButton');
const canvas = document.getElementById('canvas');

// set up camera stream
const constraints = { video: true };
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    startButton.addEventListener('click', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
    });
  })
  .catch((error) => {
    console.error('Error accessing camera:', error);
  });

// save photo to device album
saveButton.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const fileName = 'my-photo.png';
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
});
