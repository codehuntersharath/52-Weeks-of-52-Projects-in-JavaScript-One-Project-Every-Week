const selectInputLang = document.getElementById("selectInputLang"),
  selectOutputLang = document.getElementById("selectOutputLang"),
  inputText = document.getElementById("inputText"),
  outputText = document.getElementById("outputText"),
  inputChar = document.getElementById("inputChar");

const APIUrl = "https://translate-plus.p.rapidapi.com/",
  APIKey = "API_KEY_HERE",
  APIHost = "translate-plus.p.rapidapi.com",
  headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": APIKey,
    "X-RapidAPI-Host": APIHost,
  };

window.addEventListener("load", () => {
  getAllLanguageList();
});

function getAllLanguageList() {
  const url = APIUrl;
  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        Object.entries(data.supported_languages).forEach(([key, value]) => {
          let option1 = document.createElement("option");
          option1.value = value;
          option1.text = key;
          selectInputLang.append(option1);

          if (value != "auto") {
            let option2 = document.createElement("option");
            option2.value = value;
            option2.text = key;
            selectOutputLang.append(option2);
          }
        });
      });
  } catch (error) {
    console.error(error);
  }
}

inputText.addEventListener("keyup", (e) => {
  if (e.target.value.length > 5000) {
    inputText.value = inputText.value.slice(0, 5000);
  }
  inputChar.innerText = e.target.value.length;
});

inputText.addEventListener("blur", (e) => {
  if (e.target.value.length > 0 && e.target.value != "") {
    const url = APIUrl + "language_detect";
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        text: e.target.value,
      }),
    };
    try {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.language_detection.language);
          selectInputLang.value = data.language_detection.language;
        });
    } catch (error) {
      console.error(error);
    }
  } else {
    selectInputLang.value = "auto";
  }
});

function translateText() {
  const url = APIUrl + "translate";
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      text: inputText.value,
      source: selectInputLang.value,
      target: selectOutputLang.value,
    }),
  };
  try {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        outputText.value = data.translations.translation;
      });
  } catch (error) {
    console.error(error);
  }
}

function swapLanguage(element) {
  let currentText = inputText.value;
  let swapText = outputText.value;

  let currentLang = selectInputLang.value;
  let swapLang = selectOutputLang.value;

  inputText.value = swapText;
  outputText.value = currentText;
  selectInputLang.value = swapLang;
  selectOutputLang.value = currentLang;

  element.classList.toggle("rotateIcon");
}

function copyLanguage(Id) {
  let copyText = Id.value;
  console.log(copyText);
  navigator.clipboard.writeText(copyText);
}
