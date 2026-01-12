const fileInput = document.querySelector("input"),
  img = document.querySelector("img"),
  video = document.querySelector("video"),
  qrCodeView = document.querySelector(".qrCodeView"),
  iconGroup = document.querySelector(".iconGroup"),
  textarea = document.querySelector("textarea"),
  displayMessage = document.querySelector("p"),
  qrTextDetails = document.querySelector(".qrTextDetails"),
  stopScan = document.getElementById("stopScan");

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  fetchQRCodeRequest(file);
});

function fetchQRCodeRequest(file) {
  let formData = new FormData();
  formData.append("file", file);

  displayMessage.innerText = "Scanning QR Code...";

  fetch(`https://api.qrserver.com/v1/read-qr-code/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      let text = result[0].symbol[0].data;

      if (!text) return (displayMessage.innerText = "Couldn't Scan QR Code");

      qrTextDetails.style.display = "block";
      qrCodeView.style.display = "flex";
      iconGroup.style.display = "none";
      img.style.display = "block";

      img.src = URL.createObjectURL(file);
      textarea.innerText = text;
    });
}

function copyQRCodeText() {
  let text = textarea.textContent;
  navigator.clipboard.writeText(text);
}

function closeQRCodeReader() {
  displayMessage.innerText = "Upload QR Code to Scan";
  iconGroup.style.display = "block";
  img.style.display = "none";
  video.style.display = "none";
  qrTextDetails.style.display = "none";
  stopScan.style.display = "none";
  textarea.innerText = "";
  fileInput.value = "";
}

function ScanQRImage() {
  var scanner = new Instascan.Scanner({ video: video, captureImage: true });
  if (scanner) {
    displayMessage.innerText = "Loading Camera. Please wait...";
    Instascan.Camera.getCameras()
      .then((cameras) => {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
          console.log(cameras[0].name);
          video.style.display = "block";
          iconGroup.style.display = "none";
          stopScan.style.display = "inline";
          stopScan.onclick = function () {
            scanner.stop();
            closeQRCodeReader();
          };
        }
      })
      .catch((err) => {
        displayMessage.innerText = "Request Camera Failed! Reset Permission";
        console.log(err);
      });

    scanner.addListener("scan", function (text, image) {
      if (!text) return (displayMessage.innerText = "Couldn't Scan QR Code");

      qrTextDetails.style.display = "block";
      qrCodeView.style.display = "flex";
      video.style.display = "none";
      if (scanner) scanner.stop();
      img.style.display = "block";
      stopScan.style.display = "none";

      img.src = image;
      textarea.innerText = text;
    });
  }
}
