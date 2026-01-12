let AnimalsArr = [

  {
    question: "it has long nose called a trunk",
    word: "elephant",
  },
  {
    question: "a mammal with a very long neck, long legs",
    word: "giraffe",
  },
];

let FoodsArr = [
  {
    question: "a food made by baking a dough of flour or meal",
    word: "bread",
  },
  {
    question: "the first meal of the day",
    word: "breakfast",
  },
  {
    question: "a long orange root vegetable",
    word: "carrot",
  },
  {
    question: "the liquid from fruits is used for drinking.",
    word: "juice",
  },
  {
    question: "a candy or syrup made of ground cacao with added sugar.",
    word: "chocolate",
  },
];

let SportsArr = [
  {
    question:
      "a sport where two people hit each other and try to win the fight",
    word: "boxing",
  },
  {
    question:
      "a game in which a club is used to hit a small ball into a hole in the ground",
    word: "golf",
  },
  {
    question: "a sport played on ice, with two teams of six skating players",
    word: "hockey",
  },
  {
    question: "a game played on a court by two teams of five players each.",
    word: "basketball",
  },
  {
    question: "an activity where you catch fish",
    word: "fishing",
  },
];

let selectedOption = "Animals",
  questionCount = 0,
  ideaCount = true;

const gameCards = document.querySelector(".gameCards"),
  allCards = document.querySelectorAll(".gameCards .cards"),
  playground = document.querySelector(".playground"),
  startGame = document.querySelector(".startGame"),
  questionHint = document.querySelector(".questionHint"),
  resetSelection = document.querySelector(".resetSelection"),
  selectedWords = document.querySelector(".selectedWords"),
  shuffleWords = document.querySelector(".shuffleWords");

allCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    allCards.forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");
    selectedOption = e.target.getAttribute("data-option");
  });
});

startGame.addEventListener("click", () => {
  if (startGame.innerText == "Start Game") {
    gameCards.style.display = "none";
    playground.style.display = "block";
    startGame.innerText = "Back to Home";
    resetSelection.style.display = "inline";
    resetSelection.setAttribute("disabled", true);
    startToGuessTheWord();
  } else {
    gameCards.style.display = "flex";
    playground.style.display = "none";
    startGame.innerText = "Start Game";
    resetSelection.style.display = "none";
    questionCount = 0;
    ideaCount = true;
  }
});

let selectedArr = [],
  randomWords = [];
function startToGuessTheWord() {
  selectedWords.innerHTML = "";
  shuffleWords.innerHTML = "";
  ideaCount = true;

  if (selectedOption == "Animals") {
    selectedArr = AnimalsArr;
  } else if (selectedOption == "Foods") {
    selectedArr = FoodsArr;
  } else {
    selectedArr = SportsArr;
  }

  questionHint.innerHTML =
    selectedArr[questionCount].question +
    " " +
    `<i class="fa-solid fa-lightbulb" onclick="checkFirstWordIdea(this)"></i>`;
  randomWords = selectedArr[questionCount].word.split("");
  let checkRandom = randomWords;
  shuffle(randomWords);

  if (checkRandom == randomWords) {
    shuffle(randomWords);
  }

  if (randomWords != null) {
    randomWords.forEach((word) => {
      let div1 = document.createElement("div");
      div1.classList.add("box");
      selectedWords.append(div1);

      let div2 = document.createElement("div");
      div2.classList.add("box");
      div2.innerHTML = word;
      div2.addEventListener("click", (e) => {
        if (e.target.innerText != "") {
          chooseWordToGuess(e.target.innerText);
          e.target.innerText = "";
          e.target.style.background = "lightgray";
        }
      });
      shuffleWords.append(div2);
    });
  }
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function chooseWordToGuess(word) {
  const boxes = document.querySelectorAll(".selectedWords .box");
  let IsWordPlaced = true,
    totalWords = 0,
    correctWords = "";

  boxes.forEach((box) => {
    if (IsWordPlaced && box.innerText == "") {
      box.innerText = word;
      IsWordPlaced = false;
    }
    if (box.innerText != "") {
      correctWords += box.innerText.toLowerCase();
      totalWords++;
    }
  });

  if (totalWords == randomWords.length) {
    checkSelectedWord(correctWords);
  }
}

function checkSelectedWord(correctWords) {
  const boxes = document.querySelectorAll(".selectedWords .box");
  if (selectedArr[questionCount].word == correctWords) {
    boxes.forEach((box) => {
      box.classList.add("match");
    });

    setTimeout(function () {
      questionCount++;
      if (questionCount < 5) {
        startToGuessTheWord();
      } else {
        alert("Word Game Completed! Back to Home");
      }
    }, 2000);
  } else {
    boxes.forEach((box) => {
      box.classList.add("shake");
    });

    resetSelection.removeAttribute("disabled");
  }
}

resetSelection.addEventListener("click", (e) => {
  startToGuessTheWord();
  resetSelection.setAttribute("disabled", true);
});

function checkFirstWordIdea(bulb) {
  if (ideaCount) {
    const boxes1 = document.querySelectorAll(".selectedWords .box"),
      boxes2 = document.querySelectorAll(".shuffleWords .box");

    let nextWord = 0;
    boxes1.forEach((box) => {
      if (box.innerText != "") {
        nextWord++;
      }
    });

    let findIdea = selectedArr[questionCount].word.split("")[nextWord];
    for (let box of boxes2) {
      if (box.innerText.toLowerCase() == findIdea) {
        box.click();
        bulb.style.color = "#78c1f3";
        break;
      } else {
        bulb.style.color = "red";
      }
    }
    ideaCount = false;
  }
}
