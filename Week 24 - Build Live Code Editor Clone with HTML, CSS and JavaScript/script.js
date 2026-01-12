const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const output = document.getElementById("output");

// Checking if user is typing anything in input field
htmlCode.onkeyup = () => run();
cssCode.onkeyup = () => run();
jsCode.onkeyup = () => run();

function run() {
  // Storing data in Local Storage
  localStorage.setItem("htmlCode", htmlCode.value);
  localStorage.setItem("cssCode", cssCode.value);
  localStorage.setItem("jsCode", jsCode.value);

  // Executing HTML, CSS $ JS code
  output.contentDocument.body.innerHTML =
    `<style>${localStorage.cssCode}</style>` + localStorage.htmlCode;
  output.contentWindow.eval(localStorage.jsCode);
}

// Accessing data stored in Local Storage. To make it more advanced you could check if there is any data stored in Local Storage.
htmlCode.value = localStorage.htmlCode == undefined ? "" : localStorage.htmlCode;
cssCode.value = localStorage.cssCode == undefined ? "" : localStorage.cssCode;
jsCode.value = localStorage.jsCode == undefined ? "" : localStorage.jsCode;
