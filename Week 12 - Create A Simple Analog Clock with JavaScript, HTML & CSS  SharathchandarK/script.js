const hrHnd = document.querySelector(".hour-hand"),
  mncHnd = document.querySelector(".minute-hand"),
  secHnd = document.querySelector(".second-hand"),
  date = document.querySelector(".date"),
  day = document.querySelector(".day"),
  session = document.querySelector(".session"),
  numberCycle = document.querySelector(".numberCycle");

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

window.addEventListener("load", () => {
  for (let i = 1; i <= 60; i++) {
    let span = document.createElement("span");
    if (i % 5) {
      span.setAttribute("class", "intervals");
    } else {
      span.innerHTML = i / 5;
    }
    span.style.transform = "rotate(" + 6 * i + "deg)";
    numberCycle.appendChild(span);
  }

  showTime();
});

function showTime() {
  const currentDateTime = new Date();
  currentDateTime.setDate(25);
  let hours = currentDateTime.getHours(); // 0-23
  let minutes = currentDateTime.getMinutes(); //0-59
  let seconds = currentDateTime.getSeconds(); //0-59
  let sessions = hours >= 12 ? "PM" : "AM";
  date.textContent =
    currentDateTime.getDate() +
    "-" +
    (currentDateTime.getMonth() + 1) +
    "-" +
    currentDateTime.getFullYear();
  day.textContent = weekday[currentDateTime.getDay()];
  session.textContent = sessions;

  if (hours == 0) hours = 12;
  if (hours > 12) hours = hours - 12;

  let hDeg = (hours * 30) + (minutes * 0.5),
    mDeg = (minutes * 6) + (seconds * 0.1),
    sDeg = seconds * 6;

  hrHnd.style.transform = "rotate(" + hDeg + "deg)";
  mncHnd.style.transform = "rotate(" + mDeg + "deg)";
  secHnd.style.transform = "rotate(" + sDeg + "deg)";

  setTimeout(showTime, 1000);
}
