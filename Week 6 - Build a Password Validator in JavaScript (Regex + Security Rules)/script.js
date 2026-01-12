const validatorText = document.getElementById("validatorText");
const ShowHide = document.getElementById("ShowHide");
const passwordCheck = document.querySelectorAll(".password-check img");
validatorText.focus();

const combinations = [
  { regex: /.{8}/, key: 0 },
  { regex: /[A-Z]/, key: 1 },
  { regex: /[a-z]/, key: 2 },
  { regex: /[0-9]/, key: 3 },
  { regex: /[^A-Za-z0-9]/, key: 4 },
];

ShowHide.addEventListener("click", function (e) {
  validatorText.type = validatorText.type === "text" ? "password" : "text";
  e.target.setAttribute(
    "src",
    e.target.src.includes("hide.png") ? "images/show.png" : "images/hide.png"
  );
});

validatorText.addEventListener("keyup", function (e) {
  combinations.forEach((item) => {
    const IsValid = item.regex.test(e.target.value);
    const checkItem = passwordCheck[item.key];

    if (IsValid) {
      checkItem.src = "images/checked.png";
      checkItem.parentElement.style.color = "green";
    } else {
      checkItem.src = "images/close.png";
      checkItem.parentElement.style.color = "red";
    }
  });
});
