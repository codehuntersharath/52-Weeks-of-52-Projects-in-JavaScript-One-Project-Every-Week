const startGame = document.querySelector(".startGame"),
  playground = document.querySelector(".playground"),
  startSquares = document.querySelectorAll(".startGame .square"),
  squares = document.querySelectorAll(".playground .square"),
  startRestartButton = document.getElementById("startRestartButton"),
  results = document.querySelector(".results");

let oText = `<i class="fa-solid fa-o"></i>`;
let xText = `<i class="fa-solid fa-x"></i>`;
let currentPlayer = "X";
let gameActive = true;

startSquares.forEach((square) => {
  square.addEventListener("click", (e) => {
    startSquares.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
    currentPlayer = e.target.getAttribute("data-player");
  });
});

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    if (!gameActive || square.innerHTML !== "") {
      return;
    }

    e.target.style.pointerEvents = "none";
    e.target.innerHTML = currentPlayer === "X" ? xText : oText;

    if (checkWinner()) {
      results.innerText = `Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    } else if (checkDraw()) {
      results.innerText = "Draw!";
      gameActive = false;
      return;
    }

    computerMove();
  });
});

const computerMove = () => {
  let availableMoves = [];
  squares.forEach((square, i) => {
    if (square.innerHTML == "") {
      availableMoves.push(i);
    }
  });

  let randomChoice =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];
  squares[randomChoice].innerHTML = currentPlayer !== "X" ? xText : oText;
  squares[randomChoice].style.pointerEvents = "none";
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (checkWinner()) {
    results.innerText = `Computer ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  } else if (checkDraw()) {
    results.innerText = "Draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer !== "X" ? "X" : "O";
};

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (
      squares[a].innerHTML &&
      squares[a].innerHTML === squares[b].innerHTML &&
      squares[a].innerHTML === squares[c].innerHTML
    ) {
      squares[a].classList.add("winner");
      squares[b].classList.add("winner");
      squares[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return Array.from(squares).every((square) => square.innerHTML !== "");
}

startRestartButton.addEventListener("click", (e) => {
  if (e.target.innerText == "Start Game") {
    startGame.style.display = "none";
    playground.style.display = "grid";
    e.target.innerText = "Reset Game";
  } else {
    startGame.style.display = "flex";
    playground.style.display = "none";
    e.target.innerText = "Start Game";
    clearGameBox();
  }
});

const clearGameBox = () => {
  results.innerText = "";
  currentPlayer = "X";
  gameActive = true;

  startSquares.forEach((el) => {
    el.classList.remove("active");
  });
  startSquares[0].classList.add("active");

  squares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("winner");
    square.style.pointerEvents = "auto";
  });
};
