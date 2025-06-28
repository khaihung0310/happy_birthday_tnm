let canvasSeg = document.getElementById("segmentation-canvas");
let canvasCtx = canvasSeg && canvasSeg.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  const camera_button = document.querySelector("#start-camera");
  const video = document.querySelector("#video");
  const click_button = document.querySelector("#click-photo");
  const canvas = document.querySelector("#canvas");

  if (!camera_button || !video || !click_button || !canvas) {
    console.warn("Thiếu phần tử DOM cần thiết.");
    return;
  }

  const constraints = {
    audio: false,
    video: {
      facingMode: 'user',
      width: { exact: 320 },
      height: { exact: 400 }
    }
  };

  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  camera_button.addEventListener('click', async function () {
    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;

      const updateCanvasSize = () => {
        if (canvasSeg && video) {
          canvasSeg.width = video.videoWidth;
          canvasSeg.height = video.videoHeight;
        }
      };
      video.addEventListener('loadedmetadata', updateCanvasSize);
    } catch (error) {
      console.error("Lỗi khi truy cập camera:", error);
    }
  });

  click_button.addEventListener('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg', 1.0);
  });

  document.querySelectorAll('.frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const imagePath = frame.getAttribute('src');
      document.querySelectorAll('.framebg, .card').forEach(el => {
        el.style.backgroundImage = `url(${imagePath})`;
      });
    });
  });

  camera_button.click();
});

// Hàm chuyển đổi giữa hai khung hình
let currentFrameIndex = 0;
const frameSources = ["images/1.png", "images/2.png"];

function toggleFrame() {
  // Cập nhật chỉ số khung
  currentFrameIndex = (currentFrameIndex + 1) % frameSources.length;

  // Cập nhật hình ảnh hiển thị
  const selectedImg = document.getElementById("selected-frame");
  if (selectedImg) {
    selectedImg.src = frameSources[currentFrameIndex];
  }

  // Cập nhật khung nền cho card hiển thị camera
  const card = document.getElementById("card1");
  if (card) {
    card.style.backgroundImage = `url(${frameSources[currentFrameIndex]})`;
    card.style.backgroundSize = "cover";
  }

  const photoFrame = document.getElementById("photoframe");
  if (photoFrame) {
    photoFrame.style.backgroundImage = `url(${frameSources[currentFrameIndex]})`;
    photoFrame.style.backgroundSize = "cover";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const frameUrl = frameSources[currentFrameIndex];
  const card = document.getElementById("card1");
  const photoFrame = document.getElementById("photoframe");
  const selectedImg = document.getElementById("selected-frame");

  if (card) {
    card.style.backgroundImage = `url(${frameUrl})`;
    card.style.backgroundSize = "cover";
  }

  if (photoFrame) {
    photoFrame.style.backgroundImage = `url(${frameUrl})`;
    photoFrame.style.backgroundSize = "cover";
  }

  if (selectedImg) selectedImg.src = frameUrl;
});