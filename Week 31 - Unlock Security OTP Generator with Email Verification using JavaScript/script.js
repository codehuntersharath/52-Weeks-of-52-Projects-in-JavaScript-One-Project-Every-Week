let OTP = "";
const otpForm = document.querySelector(".otp-form"),
  email = document.getElementById("email"),
  verifyEmail = document.getElementById("verifyEmail"),
  inputs = document.querySelectorAll(".otp-form input"),
  step1 = document.querySelector(".step1"),
  step2 = document.querySelector(".step2"),
  step3 = document.querySelector(".step3"),
  nextButton = document.querySelector(".nextButton"),
  verifyButton = document.querySelector(".verifyButton");

window.addEventListener("load", () => {
  emailjs.init("YOUR_USER_ID_HERE"); // Replace with your EmailJS user ID
  step2.style.display = "none";
  step3.style.display = "none";
  nextButton.classList.add("disable");
  verifyButton.classList.add("disable");
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    nextButton.classList.remove("disable");
  } else {
    nextButton.classList.add("disable");
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", function (e) {
    if (this.value.length >= 1) {
      e.target.value = e.target.value.substr(0, 1);
    }

    if (
      inputs[0].value != "" &&
      inputs[1].value != "" &&
      inputs[2].value != "" &&
      inputs[3].value != ""
    ) {
      verifyButton.classList.remove("disable");
    } else {
      verifyButton.classList.add("disable");
    }
  });
});

nextButton.addEventListener("click", () => {
  nextButton.innerHTML = "&#9889; Sending...";
  OTP = generateOTP();
  verifyEmail.innerHTML = email.value;

  var templateParams = {
    from_name: "SharathchandarK's Dev Community",
    OTP: OTP,
    message: "Please Find out the attached file",
    reply_to: email.value,
  };

  const serviceID = "default_service";
  const templateID = "template_m6toh7b";

  emailjs.send(serviceID, templateID, templateParams).then(
    () => {
      nextButton.innerHTML = "Next &rarr;";
      step1.style.display = "none";
      step2.style.display = "block";
      step3.style.display = "none";
    },
    (err) => {
      nextButton.innerHTML = "Next &rarr;";
      console.log(JSON.stringify(err));
    }
  );
});

verifyButton.addEventListener("click", () => {
  let verify = "";
  inputs.forEach((input) => {
    verify += input.value;
  });

  if (OTP == verify) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
  } else {
    verifyButton.classList.add("error-shake");
    setTimeout(() => {
      verifyButton.classList.remove("error-shake");
    }, 1000);
  }
});

function changeMyEmail() {
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
}
