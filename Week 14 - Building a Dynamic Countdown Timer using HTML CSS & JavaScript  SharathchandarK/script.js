const countValue = document.querySelectorAll(".countValue span"),
  days = document.querySelector(".days"),
  hoursIndex1 = document.querySelector(".hours .index1"),
  hoursIndex2 = document.querySelector(".hours .index2"),
  minutesIndex1 = document.querySelector(".minutes .index1"),
  minutesIndex2 = document.querySelector(".minutes .index2"),
  secondsIndex1 = document.querySelector(".seconds .index1"),
  secondsIndex2 = document.querySelector(".seconds .index2");

// in Milliseconds
const seconds = 1000;
const minutes = 60;
const hours = 24;
const oneMinutes = seconds * minutes;
const oneHour = seconds * minutes * minutes;
const oneDay = hours * oneHour;
let startTimer,
  countDownDate = "";

function countDown() {
  let currentDate = new Date();
  let deadLineDate = new Date(countDownDate);
  let currentTime = currentDate.getTime();
  let deadLineTime = deadLineDate.getTime();

  if (deadLineTime < currentTime) {
    clearInterval(startTimer);
    alert("Countdown expires!");
  } else {
    document.querySelector(".days").innerHTML = "";
    let daysLeft = deadLineTime - currentTime;
    let totalDaysLeft = Math.floor(daysLeft / oneDay);
    let totalHoursLeft = Math.floor((daysLeft % oneDay) / oneHour);
    let totalMinutesLeft = Math.floor((daysLeft % oneHour) / oneMinutes);
    let totalSecondsLeft = Math.floor((daysLeft % oneMinutes) / seconds);

    let span = document.createElement("span");
    span.className = "title";
    span.innerText = "Days";
    days.appendChild(span);

    String(totalDaysLeft)
      .split("")
      .forEach((i) => {
        let div = document.createElement("div");
        div.className = "countValue";
        div.innerHTML = "<span>" + i + "</span>";
        days.appendChild(div);
      });

    hoursIndex1.innerHTML = zeroPad(totalHoursLeft).split("")[0];
    hoursIndex2.innerHTML = zeroPad(totalHoursLeft).split("")[1];

    minutesIndex1.innerHTML = zeroPad(totalMinutesLeft).split("")[0];
    minutesIndex2.innerHTML = zeroPad(totalMinutesLeft).split("")[1];

    secondsIndex1.innerHTML = zeroPad(totalSecondsLeft).split("")[0];
    secondsIndex2.innerHTML = zeroPad(totalSecondsLeft).split("")[1];
  }
}

function zeroPad(numberStr) {
  return String(numberStr).padStart(2, "0");
}

window.addEventListener("load", () => {
  let x = prompt("Please Provide your count down date!", "2027-01-01");
  if (x) {
    countValue.forEach((span) => {
      numberTransition(span, 10, 0, 1000);
    });
    countDownDate = x;
    startTimer = setInterval(countDown, 1000);
  }
});

function numberTransition(element, start, end, duration) {
  if (start == end) return;
  let range = end - start;
  let current = start;

  let increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));

  var timer = setInterval(function () {
    current += increment;
    element.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
