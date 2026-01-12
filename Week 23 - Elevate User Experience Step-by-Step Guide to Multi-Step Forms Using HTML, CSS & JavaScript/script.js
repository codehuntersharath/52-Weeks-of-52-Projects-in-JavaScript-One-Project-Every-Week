const progressBar = document.querySelectorAll(".progressBar li");
const formSteps = document.querySelectorAll(".form-group");
const nextForm = document.querySelectorAll(".next");
const prevForm = document.querySelectorAll(".prev");
const refresh = document.querySelector(".fa-check-circle-o");
let formStepsNum = 0;

nextForm.forEach((button) => {
  button.addEventListener("click", () => {
    formStepsNum++;
    validateMoveNextForm();
  });
});

prevForm.forEach((button) => {
  button.addEventListener("click", () => {
    formStepsNum--;
    validateMoveNextForm();
  });
});

function validateMoveNextForm() {
  formSteps.forEach((form) => {
    form.classList.contains("form-active") &&
      form.classList.remove("form-active");
  });

  formSteps[formStepsNum].classList.add("form-active");
  updateProgressBar();
}

function updateProgressBar() {
  progressBar.forEach((li, i) => {
    if (i < formStepsNum + 1) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });

  progressBar.forEach((li, i) => {
    if (i < formStepsNum) {
      li.classList.add("next");
    } else {
      li.classList.remove("next");
    }
  });
}

refresh.onclick = () => {
  location.reload();
};
