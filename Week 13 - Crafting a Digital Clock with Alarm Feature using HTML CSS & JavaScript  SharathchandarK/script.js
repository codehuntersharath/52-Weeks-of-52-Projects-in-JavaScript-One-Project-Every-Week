const DigitalClock = document.getElementById("DigitalClock"),
  DigitalDate = document.getElementById("DigitalDate"),
  hours = document.getElementById("hours"),
  minutes = document.getElementById("minutes"),
  session = document.getElementById("session"),
  alarmName = document.getElementById("alarmName"),
  setAlarm = document.getElementById("setAlarm"),
  alarmRow = document.getElementById("alarmRow"),
  setAlarmTime = document.getElementById("setAlarmTime"),
  alarmInterval = document.getElementById("alarmInterval");

let alarmTime = "",
  alarmClearInterval = "",
  alarmTone = new Audio("clock-alarm.mp3"),
  alarmPlayPause = false;

window.addEventListener("load", () => {
  setTime();

  for (let h = 1; h <= 12; h++) {
    var option = document.createElement("option");
    option.text = zeroPad(h);
    option.value = zeroPad(h);
    hours.appendChild(option);
  }

  for (let m = 0; m < 60; m++) {
    var option = document.createElement("option");
    option.text = zeroPad(m);
    option.value = zeroPad(m);
    minutes.appendChild(option);
  }
});

setAlarm.addEventListener("click", () => {
  if (setAlarm.innerText == "Set Alarm") {
    if (alarmName.value !== "") {
      alarmTime = hours.value + ":" + minutes.value + ":00 " + session.value;
      getTimeDifference();
      setAlarm.innerText = "Stop Alarm";
      alarmRow.setAttribute("style", "display:none");
      setAlarm.setAttribute("style", "background: #EF6262");
      const h5 = document.createElement("h5");
      h5.innerText = alarmName.value + " - Alarm";
      const p = document.createElement("p");
      p.innerText = hours.value + ":" + minutes.value + " " + session.value;
      setAlarmTime.append(h5);
      setAlarmTime.append(p);
      alarmPlayPause = false;
    } else {
      alarmName.focus();
      alarmName.setAttribute("style", "border-bottom: 2px solid #EF6262");
    }
  } else {
    setAlarm.innerText = "Set Alarm";
    alarmRow.setAttribute("style", "display:block");
    setAlarm.setAttribute("style", "background: #78c1f3");
    setAlarmTime.innerText = "";
    alarmName.value = "";
    alarmInterval.innerText = "";
    clearTimeout(alarmClearInterval);
    alarmTone.pause();
    alarmPlayPause = true;
  }
});

function getTimeDifference() {
  let today = new Date();
  let date = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  today = month + "/" + date + "/" + year;

  let alarmStart = new Date(today + " " + DigitalClock.innerHTML);
  let alarmEnd = new Date(today + " " + alarmTime);
  let difference = alarmEnd - alarmStart;

  let msec = difference;
  let hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  let mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  let ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  if (hh < 0) {
    hh = 24 + hh;
  }
  alarmInterval.innerText = zeroPad(hh) + ":" + zeroPad(mm) + ":" + zeroPad(ss);
  alarmClearInterval = setTimeout(getTimeDifference, 1000);
}

function setTime() {
  const currentTime = new Date();

  DigitalDate.innerHTML = `${currentTime.toLocaleString("default", {
    weekday: "long",
  })} ${currentTime.toLocaleString("default", {
    month: "long",
  })}, ${currentTime.getDate()} - ${currentTime.getFullYear()}`;

  let Hours = currentTime.getHours(); // 0 - 23
  let Minutes = currentTime.getMinutes(); // 0 - 59
  let Seconds = currentTime.getSeconds(); // 0 - 59
  let session = Hours >= 12 ? "PM" : "AM";

  if (Hours == 0) {
    Hours = 12;
  }
  if (Hours > 12) {
    Hours = Hours - 12;
  }

  let time =
    zeroPad(Hours) +
    ":" +
    zeroPad(Minutes) +
    ":" +
    zeroPad(Seconds) +
    " " +
    session;

  DigitalClock.innerHTML = time;

  if (alarmTime === time) {
    alarmInterval.innerText = "";
    clearTimeout(alarmClearInterval);

    if (!alarmPlayPause) {
      alarmTone.play();
      alarmTone.loop = true;
      alarmName.value = "";
      setAlarmTime.innerText = "";
    }
  }
  setTimeout(setTime, 1000);
}

function zeroPad(numberStr) {
  return String(numberStr).padStart(2, "0");
}
