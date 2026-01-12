const modalLogin = document.getElementById("modalLogin"),
  modalContainer = document.querySelector(".modal-container"),
  create = document.getElementById("create"),
  logInhere = document.getElementById("logInhere"),
  logIn = document.querySelector(".login"),
  registration = document.querySelector(".registration");

modalLogin.onclick = () => {
  modalContainer.classList.add("open");
};

function closeModalContent() {
  modalContainer.classList.remove("open");
}

create.onclick = () => {
  logIn.setAttribute("style", "transform: translate(-500px);");
  registration.setAttribute("style", "transform: translate(0);");
};

logInhere.onclick = () => {
  logIn.removeAttribute("style");
  registration.removeAttribute("style");
};
