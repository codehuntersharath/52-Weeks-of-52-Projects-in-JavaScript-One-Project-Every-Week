const email = document.getElementById("email"),
  password = document.getElementById("password"),
  emailErr = document.getElementById("emailErr"),
  passErr = document.getElementById("passErr"),
  LoginArea = document.getElementById("LoginArea"),
  logIn = document.getElementById("logIn");

function checkFieldEmpty(e) {
  if (e.value != "") {
    e.classList.add("valid");
  } else {
    e.classList.remove("valid");
  }
}

function checkEmail() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.match(pattern)) {
    emailErr.setAttribute("class", "fa fa-circle-check");
    emailErr.setAttribute("style", "color:#00FFFF");
    emailErr.removeAttribute("aria-label");
    email.setAttribute("style", "border-bottom: 2px solid #03e9f4;");
    return true;
  } else {
    emailErr.setAttribute("class", "fa fa-circle-exclamation");
    emailErr.setAttribute("style", "color:#FF4433");
    emailErr.setAttribute("aria-label", "Please Enter Valid Email Address");
    email.setAttribute("style", "border-bottom: 2px solid #FF4433;");
    return false;
  }
}

function checkPassword() {
  if (password.value == "") {
    passErr.setAttribute("class", "fa fa-circle-exclamation");
    passErr.setAttribute("style", "color:#FF4433");
    passErr.setAttribute("aria-label", "Please Enter Password");
    password.setAttribute("style", "border-bottom: 2px solid #FF4433;");
    return false;
  } else {
    passErr.setAttribute("class", "fa fa-circle-check");
    passErr.setAttribute("style", "color:#00FFFF");
    passErr.removeAttribute("aria-label");
    password.setAttribute("style", "border-bottom: 2px solid #03e9f4;");
    return true;
  }
}

function DoValidate() {
  let IsEmailSuccess = checkEmail();
  let IsPasswordSuccess = checkPassword();
  if (IsEmailSuccess && IsPasswordSuccess) {
    logIn.innerHTML = `Authenticating &nbsp; <span class="fa fa-spinner fa-spin fa-xl"></span>`;
    setTimeout(function () {
      logIn.setAttribute("style", "background:#8bc34a");
      logIn.innerHTML = `Login Successful! &nbsp; <span class="fa fa-check fa-xl"></span>`;
      setTimeout(function () {
        email.value = "";
        password.value = "";
        logIn.removeAttribute("style");
        logIn.innerHTML = `Welcome back! &nbsp; <span class="fa fa-heart fa-xl"></span>`;
        setTimeout(function () {
          logIn.innerText = "Log In";
        }, 1000);
      }, 1000);
    }, 2000);
  }
}
