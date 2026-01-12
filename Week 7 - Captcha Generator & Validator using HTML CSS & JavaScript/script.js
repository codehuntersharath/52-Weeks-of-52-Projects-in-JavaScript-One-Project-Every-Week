const autoCaptcha = document.getElementById("AutoGenerateValue");
const userCaptcha = document.getElementById("UserCaptchaValue");
const MessageText = document.getElementById("message");
let CAPTCHAText = "";

generateAutoCaptcha();
function generateAutoCaptcha() {
    let Length = 6;
    let Captcha = [];
    const randomChar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < Length; i++) {
        let index = Math.floor(Math.random() * randomChar.length);
        if (Captcha.indexOf(randomChar[index])) Captcha.push(randomChar[index]);
        else i--;
    }
    autoCaptcha.innerHTML = Captcha.join(" ");
    CAPTCHAText = Captcha.join("");
    UserCaptchaValue.value = "";
    MessageText.innerText = "";
}

function DoValidateCaptcha() {
    if (userCaptcha.value === CAPTCHAText) {
        MessageText.innerText = "Valid Captcha";
        MessageText.setAttribute("class", "green");
    } else {
        MessageText.innerText = "Invalid Captcha. Try Again!";
        MessageText.setAttribute("class", "red");
    }
}
