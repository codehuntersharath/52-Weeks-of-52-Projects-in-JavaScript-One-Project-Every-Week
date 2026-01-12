const sideNavigation = document.querySelector(".sideNavigation"),
  sideBarToggle = document.querySelector(".fa-bars"),
  startContentUl = document.querySelector(".startContent ul"),
  inputArea = document.querySelector(".inputArea input"),
  sendRequest = document.querySelector(".fa-paper-plane"),
  chatHistory = document.querySelector(".chatHistory ul"),
  startContent = document.querySelector(".startContent"),
  chatContent = document.querySelector(".chatContent"),
  results = document.querySelector(".results");

promptQuestions = [
  {
    question: "Write a thank you note to my subscribers",
    icon: "fa-solid fa-wand-magic-sparkles",
  },
  {
    question: "Write a Sample Code to learn javascript",
    icon: "fa-solid fa-code",
  },
  {
    question: "How to became a Full Stack Developer?",
    icon: "fa-solid fa-laptop-code",
  },
  {
    question: "How to became a Front-end Developer?",
    icon: "fa-solid fa-database",
  },
];

window.addEventListener("load", () => {
  promptQuestions.forEach((data) => {
    let item = document.createElement("li");
    item.addEventListener("click", () => {
      getGeminiResponse(data.question, true);
    });
    item.innerHTML = `<div class="promptSuggestion"><p>${data.question}</p><div class="icon"><i class="${data.icon}"></i></div></div>`;
    startContentUl.append(item);
  });
});

sideBarToggle.addEventListener("click", (e) => {
  sideNavigation.classList.toggle("expandClose");
});

inputArea.addEventListener("keyup", (e) => {
  if (e.target.value.length > 0) {
    sendRequest.style.display = "inline";
  } else {
    sendRequest.style.display = "none";
  }
});

sendRequest.addEventListener("click", () => {
  getGeminiResponse(inputArea.value, true);
});

function getGeminiResponse(question, appendHistory) {
  if (appendHistory) {
    let historyLi = document.createElement("li");
    historyLi.addEventListener("click", () => {
      getGeminiResponse(question, false);
    });
    historyLi.innerHTML = `<i class="fa-regular fa-message"></i> ${question}</li>`;
    chatHistory.append(historyLi);
  }

  results.innerHTML = "";
  inputArea.value = "";

  startContent.style.display = "none";
  chatContent.style.display = "block";

  let resultTitle = `
  <div class="resultTitle">
    <img src="" /> // You can add an icon URL here
    <p>${question}</p>
  </div>`;

  let resultData = `
  <div class="resultData">
    <img
      src="" // You can add an icon URL here
    />
    <div class="loader">
      <div class="animatedBG"></div>
      <div class="animatedBG"></div>
      <div class="animatedBG"></div>
    </div>
  </div>
  `;
  results.innerHTML += resultTitle;
  results.innerHTML += resultData;

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
    {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      sendRequest.style.display = "none";
      console.log(data.candidates[0].content.parts[0].text);
      let responseData = jsonEscape(data.candidates[0].content.parts[0].text);
      document.querySelector(".results .resultData").remove();

      let responseArray = responseData.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i == 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse +=
            "<strong>" +
            responseArray[i].split(" ").join("&nbsp;") +
            "</strong>";
        }
      }

      let newResponse2 = newResponse.split("*").join(" ");
      let p = document.createElement("textarea");
      p.innerHTML = newResponse2;
      results.innerHTML += `
      <div class="resultResponse">
        <img src="" /> // You can add an icon URL here
        <p id="typeEffect"></p>
      </div>`;

      let newResponseData = newResponse2.split(" ");
      for (let j = 0; j < newResponseData.length; j++) {
        timeOut(j, newResponseData[j] + " ");
      }
    });
}

function jsonEscape(str) {
  return str
    .replace(new RegExp("\r?\n\n", "g"), "<br>")
    .replace(new RegExp("\r?\n", "g"), "<br>");
}

const timeOut = (index, nextWord) => {
  setTimeout(function () {
    document.getElementById("typeEffect").innerHTML += nextWord;
  }, 75 * index);
};

function newChat() {
  startContent.style.display = "block";
  chatContent.style.display = "none";
}
