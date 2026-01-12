const startGameContainer = document.querySelector(".startGame"),
  startGameCards = document.querySelectorAll(".startGame .card"),
  startGame = document.querySelector(".startGame button"),
  playground = document.querySelector(".playground"),
  faRepeat = document.querySelector(".fa-repeat");

let levels = 2,
  column = 2,
  row = 2,
  matched = 0,
  cardOne,
  cardTwo,
  IsPreventClick = true;

startGameCards.forEach((element) => {
  element.addEventListener("click", (e) => {
    startGameCards.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
    levels = e.target.parentElement.getAttribute("level");
    column = e.target.parentElement.getAttribute("column");
    row = e.target.parentElement.getAttribute("row");
  });
});

startGame.addEventListener("click", () => {
  startGameContainer.style.display = "none";
  playground.style.display = "grid";
  playground.style.gridTemplateColumns = `repeat(${column}, 100px)`;
  playground.style.gridTemplateRows = `repeat(${row}, 100px)`;

  createCards(levels);
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function createCards(levels) {
  const cardArr = [
    "house",
    "bomb",
    "poo",
    "gift",
    "egg",
    "dragon",
    "person-biking",
    "jet-fighter-up",
  ];

  shuffleArray(cardArr);
  shuffleCards([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);
}

function shuffleCards(data) {
  playground.innerHTML = "";
  shuffleArray(data);

  for (let i = 0; i < data.length; i++) {
    playground.innerHTML += `
    <div class="card" onclick='flipCard(this)'>
      <div class="front"><i class="fa-solid fa-question"></i></div>
      <div class="back"><i class="fa fa-${data[i]}"></i></div>
    </div>
    `;
  }
  faRepeat.style.display = "block";
}

function flipCard(card) {
  if (cardOne !== card && IsPreventClick) {
    card.classList.add("flip");
    if (!cardOne) {
      cardOne = card;
      return;
    }
    cardTwo = card;
    IsPreventClick = false;

    let cardOneValue = cardOne.querySelector(".back").innerHTML,
      cardTwoValue = cardTwo.querySelector(".back").innerHTML;
    matchCards(cardOneValue, cardTwoValue);
  }
}

function matchCards(cardOneValue, cardTwoValue) {
  if (cardOneValue == cardTwoValue) {
    matched++;
    if (matched == levels) {
      setTimeout(() => {
        alert("Congratulations! You Won...");
      }, 800);
    }

    cardOne.classList.add("match");
    cardTwo.classList.add("match");
    cardOne.removeAttribute("onclick");
    cardTwo.removeAttribute("onclick");
    cardOne = cardTwo = "";
    IsPreventClick = true;
    return;
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 500);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    IsPreventClick = true;
  }, 1200);
}

faRepeat.addEventListener("click", () => {
  startGameContainer.style.display = "grid";
  playground.style.display = "none";
  faRepeat.style.display = "none";

  matched = 0,
    cardOne = "",
    cardTwo = "",
    IsPreventClick = true;
});
