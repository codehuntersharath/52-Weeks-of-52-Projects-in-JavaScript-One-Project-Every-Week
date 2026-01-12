const selectOptions = document.querySelectorAll(
  ".playground .playOption .fa-solid"
),
  playground = document.querySelector(".playground"),
  results = document.getElementById("results"),
  userSelect = document.querySelector(".userSelect i"),
  botSelect = document.querySelector(".botSelect i"),
  userScore = document.getElementById("userScore"),
  cpuScore = document.getElementById("cpuScore");

let [userScoreData, cpuScoreData] = [0, 0];

selectOptions.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    userSelect.removeAttribute("class");
    userSelect.removeAttribute("style");
    botSelect.removeAttribute("class");
    botSelect.removeAttribute("style");

    userSelect.classList.add("fa-solid", "fa-hand-back-fist");
    botSelect.classList.add("fa-solid", "fa-hand-back-fist");

    selectOptions.forEach((el) => {
      el.parentElement.classList.remove("active");
    });

    playground.classList.add("start");
    e.target.parentElement.classList.add("active");
    results.innerText = "Please Wait...";

    checkResult(index);
  });
});

const checkResult = (index) => {
  let randomNumber = Math.floor(Math.random() * 3);

  setTimeout(() => {
    playground.classList.remove("start");
    userSelect.classList.remove("fa-hand-back-fist");
    botSelect.classList.remove("fa-hand-back-fist");

    userSelect.classList.add(
      selectOptions[index].getAttribute("class").split(" ")[1]
    );
    botSelect.classList.add(
      selectOptions[randomNumber].getAttribute("class").split(" ")[1]
    );

    determineWinner(index, randomNumber);
  }, 2500);
};

function determineWinner(userChoice, computerChoice) {
  let gameResults = {
    RR: "Draw",
    PP: "Draw",
    SS: "Draw",
    RS: "User",
    PR: "User",
    SP: "User",
    RP: "Cpu",
    PS: "Cpu",
    SR: "Cpu",
  };
  let userValue = ["R", "P", "S"][userChoice];
  let cpuValue = ["R", "P", "S"][computerChoice];
  let outComeValue = gameResults[userValue + cpuValue];

  if (outComeValue == "User") {
    userScoreData++;
    userScore.innerText = userScoreData;
    userSelect.style.color = "green";
    botSelect.style.opacity = "0.6";
  }

  if (outComeValue == "Cpu") {
    cpuScoreData++;
    cpuScore.innerText = cpuScoreData;
    botSelect.style.color = "green";
    userSelect.style.opacity = "0.6";
  }

  results.textContent =
    userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

  selectOptions.forEach((el) => {
    el.parentElement.classList.remove("active");
  });
}
