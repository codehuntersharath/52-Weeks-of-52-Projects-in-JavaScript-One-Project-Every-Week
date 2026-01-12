const qrText = document.getElementById("qrText"),
  qrSizes = document.getElementById("qrSizes"),
  colorLight = document.getElementById("colorLight"),
  colorDark = document.getElementById("colorDark"),
  qrCodeView = document.querySelector(".qrCodeView"),
  downloadQR = document.getElementById("downloadQR"),
  downloadBtn = document.getElementById("downloadBtn");

window.addEventListener("load", () => {
  for (let i = 1; i <= 10; i++) {
    let option = document.createElement("option");
    let hw = i * 100;
    option.text = hw + " x " + hw;
    option.value = hw;
    qrSizes.append(option);
  }
});

function generateQRCode() {
  qrCodeView.innerHTML = "";
  qrCodeView.style.display = "none";
  downloadBtn.style.display = "none";

  if (qrText.value != "") {
    new QRCode(qrCodeView, {
      text: qrText.value,
      height: qrSizes.value,
      width: qrSizes.value,
      colorLight: colorLight.value,
      colorDark: colorDark.value,
    });
    qrCodeView.style.display = "flex";
    downloadBtn.style.display = "block";
  }
}

function downloadQRCode() {
  let ImgSrc = document.querySelector(".qrCodeView img");
  var a = document.createElement("a");
  a.href = ImgSrc.getAttribute("src");
  a.download = "QROutput.png";
  a.click();
}
