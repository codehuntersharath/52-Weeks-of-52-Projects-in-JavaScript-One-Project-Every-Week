const createAccountForm = document.getElementById("createAccountForm"),
  conformation = document.getElementById("conformation"),
  FullName = document.getElementById("FullName"),
  Email = document.getElementById("Email"),
  Password1 = document.getElementById("Password1"),
  Password2 = document.getElementById("Password2");

createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  ValidateForm();
});

function CheckFullName() {
  const FullNameValue = FullName.value.trim();
  if (FullNameValue === "") {
    setSuccessErrorMessage(FullName, "Please enter your name.");
    return false;
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(FullNameValue) === false) {
      setSuccessErrorMessage(FullName, "Please enter a valid name");
      return false;
    } else {
      setSuccessErrorMessage(FullName, "");
      return true;
    }
  }
}

function CheckEmail() {
  const EmailValue = Email.value.trim();
  if (EmailValue === "") {
    setSuccessErrorMessage(Email, "Please enter your email address.");
    return false;
  } else {
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(EmailValue) === false) {
      setSuccessErrorMessage(Email, "Please enter a valid email address");
      return false;
    } else {
      setSuccessErrorMessage(Email, "");
      return true;
    }
  }
}

function CheckPassword1() {
  const Password1Value = Password1.value.trim();
  if (Password1Value === "") {
    setSuccessErrorMessage(Password1, "Please enter your password.");
    return false;
  } else {
    setSuccessErrorMessage(Password1, "");
    return true;
  }
}

function CheckPassword2() {
  const Password2Value = Password2.value.trim();
  if (Password2Value === "") {
    setSuccessErrorMessage(Password2, "Please enter your confirm password.");
    return false;
  } else {
    if (Password1.value !== Password2Value) {
      setSuccessErrorMessage(Password2, "Password and Confirm not match");
      return false;
    } else {
      setSuccessErrorMessage(Password2, "");
      return true;
    }
  }
}

function ValidateForm() {
  if (CheckFullName() && CheckEmail() && CheckPassword1() && CheckPassword2()) {
    var dataPreview =
      "You've entered the following details: \n" +
      "Full Name: " +
      FullName.value +
      "\n" +
      "Email Address: " +
      Email.value;

    alert(dataPreview);

    createAccountForm.setAttribute("style", "display:none");
    conformation.setAttribute("style", "display:block");
  }
}

const setSuccessErrorMessage = (input, message) => {
  const formControl = input.parentElement;
  if (message === "") {
    formControl.querySelector("img").setAttribute("src", "images/mark.png");
    formControl.querySelector("small").innerText = "";
  } else {
    formControl.querySelector("img").setAttribute("src", "images/cross.png");
    formControl.querySelector("small").innerText = message;
    input.setAttribute("class", "error");
  }
  setTimeout(function () {
    input.setAttribute("class", "");
  }, 1000);
};
