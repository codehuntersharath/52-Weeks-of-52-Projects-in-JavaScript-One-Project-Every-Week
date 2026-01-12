const userName = document.getElementById("userName"),
  startScreen = document.querySelector(".startScreen"),
  playground = document.querySelector(".playground"),
  endScreen = document.querySelector(".endScreen"),
  questionCount = document.getElementById("questionCount"),
  questionTimer = document.getElementById("questionTimer"),
  question = document.getElementById("question"),
  quizOptions = document.getElementById("quizOptions"),
  quizBody = document.querySelector(".quizBody"),
  loader = document.querySelector(".loader"),
  finialScore = document.querySelector(".finialScore"),
  resultUserName = document.getElementById("resultUserName");

let arrayQuestions = [],
  questionIndex = 0,
  score = 0,
  count = 10,
  countdown;

function startQuiz() {
  if (userName.value != "") {
    questionIndex = score = 0;
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    playground.style.display = "block";
    nextButton.innerHTML = "Next";
    quizBody.style.display = "none";
    loader.style.display = "block";

    loadQuestions();
  } else {
    userName.style.border = "2px solid red";
  }
}

let QuizURL = "https://opentdb.com/api.php?amount=5&category=18";
function loadQuestions() {
  fetch(QuizURL)
    .then((response) => response.json())
    .then((data) => {
      arrayQuestions = data.results;
      displayQuestion(arrayQuestions[questionIndex]);
    });
}

function displayQuestion(questionData) {
  count = 10;
  clearInterval(countdown);

  question.innerHTML = questionData.question;
  questionCount.innerHTML = questionIndex + 1;
  loadAnswers(questionData);
}

function loadAnswers(question) {
  quizOptions.innerHTML = "";
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    let answerOption = document.createElement("li");
    answerOption.innerHTML = answer;
    answerOption.addEventListener("click", () => {
      checkAnswer(answerOption, answers, question.correct_answer);
    });
    quizOptions.append(answerOption);
  });

  quizBody.style.display = "block";
  loader.style.display = "none";
  displayTimer();
}

function checkAnswer(answerOption, answers, correctAnswer) {
  let correctElement;
  answers.forEach((answer) => {
    if (htmlDecode(answer) === htmlDecode(correctAnswer)) {
      correctElement = [...quizOptions.childNodes].find(
        (li) => li.innerText === htmlDecode(correctAnswer)
      );
    }
  });

  quizOptions.childNodes.forEach((li) => {
    li.classList.add("disable");
  });

  if (htmlDecode(correctAnswer) === answerOption.innerText) {
    answerOption.classList.add("correct");
    score++;
  } else {
    answerOption.classList.add("Incorrect");
    correctElement.classList.add("correct");
  }

  clearInterval(countdown);
}

nextButton.addEventListener("click", () => {
  questionTimer.innerHTML = "10";
  if (nextButton.innerText == "Next") {
    questionIndex = questionIndex + 1;
    displayQuestion(arrayQuestions[questionIndex]);
  } else {
    showAnswer();
  }

  if (questionIndex == 4) {
    nextButton.innerHTML = "Submit";
  }
});

function showAnswer() {
  playground.style.display = "none";
  endScreen.style.display = "block";
  finialScore.innerHTML = score;
  resultUserName.innerHTML = userName.value;
  questionCount.innerHTML = 1;
  clearInterval(countdown);
  count = 10;
}

function htmlDecode(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const displayTimer = () => {
  countdown = setInterval(() => {
    count--;
    questionTimer.innerHTML = count;
    if (count == 0) {
      clearInterval(countdown);
      //nextButton.click();

      quizOptions.childNodes.forEach((li) => {
        li.classList.add("disable");
      });
    }
  }, 1000);
};
