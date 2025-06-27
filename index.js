let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
var constraints = {
    audio: false,
    video: {
        facingMode: 'user'
    }
}
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '')

function takeshot() {
  
    let div =
        document.getElementById('photoframe'); 
     
  
    html2canvas(div,{ 
        dpi: 144,
        allowTaint: true
      }).then(
        
        function (canvas) {
            
            return Canvas2Image.saveAsPNG(canvas);
        })
   
}
camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia(constraints);
	  video.srcObject = stream;
});
camera_button.click();
click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg', 1.0); 
    //takeshot();
   	// data url of the image
   //	console.log(image_data_url);
});



const items = document.querySelectorAll('img');
const itemCount = items.length;
let count = 0;

function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
  console.log(count);
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
  console.log(count);
}

$(document).ready(function(){
    $('.frame').click(function(){
        var imagePath = $(this).attr('src');
        $('.framebg').css({"background-image": "url(" + imagePath + ")"});   
        $('.card').css({"background-image": "url(" + imagePath + ")"});   
       });
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