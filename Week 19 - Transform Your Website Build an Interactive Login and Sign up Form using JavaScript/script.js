const logInhere = document.getElementById("logInhere"),
  create = document.getElementById("create"),
  logIn = document.querySelector(".logIn"),
  signUp = document.querySelector(".signUp");

create.onclick = () => {
  logIn.setAttribute("style", "transform: translateY(-450px); margin:0;");
  signUp.setAttribute("style", "transform: translateY(-450px);");
};

logInhere.onclick = () => {
  logIn.removeAttribute("style");
  signUp.removeAttribute("style");
};

logIn.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login Successfully!");
});

signUp.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("User Created Successfully!");
});

function changePasswordHideVisible(Id, e) {
  e.classList.toggle("fa-eye-slash");
  let password = document.getElementById(Id);
  password.setAttribute("type", password.getAttribute("type") === "password" ? "text" : "password");
};
