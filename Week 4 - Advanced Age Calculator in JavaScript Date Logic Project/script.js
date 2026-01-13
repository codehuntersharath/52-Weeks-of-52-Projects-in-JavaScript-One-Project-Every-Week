const ageValue = document.getElementById("ageValue");
const calculateAge = document.getElementById("calculateAge");

const CurrentAge = document.getElementById("CurrentAge");
const DOB = document.getElementById("DOB");
const InYears = document.getElementById("InYears");
const InMonths = document.getElementById("InMonths");
const InWeeks = document.getElementById("InWeeks");
const InDays = document.getElementById("InDays");
const InHours = document.getElementById("InHours");
const InMinutes = document.getElementById("InMinutes");
const InSeconds = document.getElementById("InSeconds");
const DaysLeft = document.getElementById("DaysLeft");

const today = new Date();
const seconds = 1000;
const minutes = 60;
const hours = 24;
const week = 7;

let maxDate = today.toISOString().substring(0, 10);
ageValue.setAttribute("max", maxDate);

calculateAge.addEventListener("click", function (e) {
  if (ageValue.value === maxDate) {
    alert("Invalid Date of Birth.");
  }

  let oneDay = seconds * minutes * minutes * hours;
  let oneHour = seconds * minutes * minutes;
  let oneMinutes = seconds * minutes;

  let birthday = new Date(ageValue.value);
  if (ageValue.value !== "") {
    let TotalYears =
      today.getFullYear() -
      birthday.getFullYear() -
      (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
          today.getDate() < birthday.getDate()));

    let TotalMonths =
      today.getMonth() -
      birthday.getMonth() +
      (today.getFullYear() - birthday.getFullYear()) * 12;

    let MonthsTotal = Math.abs(birthday.getMonth() - today.getMonth());
    let DaysTotal = Math.abs(today.getDate() - birthday.getDate());

    let TotalDays = Math.round(
      Math.abs(today.getTime() - birthday.getTime()) / oneDay
    );

    let TotalWeeks = Math.round(
      Math.abs(today.getTime() - birthday.getTime()) / (oneDay * week)
    );

    let TotalHours = Math.round(
      Math.abs(today.getTime() - birthday.getTime()) / oneHour
    );

    let TotalMinutes = Math.round(
      Math.abs(today.getTime() - birthday.getTime()) / oneMinutes
    );

    let TotalSeconds = Math.round(
      Math.abs(today.getTime() - birthday.getTime()) / seconds
    );

    CurrentAge.innerText = `${TotalYears} Years ${MonthsTotal} Months ${DaysTotal} Days`;
    DOB.innerText = `${birthday.toLocaleString("default", {
      weekday: "long",
    })} ${birthday.toLocaleString("default", {
      month: "long",
    })}, ${birthday.getDate()}, ${birthday.getFullYear()}`;

    InYears.innerText = TotalYears;
    InMonths.innerText = TotalMonths;
    InWeeks.innerText = TotalWeeks;
    InDays.innerText = TotalDays;
    InHours.innerText = TotalHours;
    InMinutes.innerText = TotalMinutes;
    InSeconds.innerText = TotalSeconds;

    let birthDayThisYear = new Date(
      `${today.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`
    );
    if (today > birthDayThisYear) {
      birthDayThisYear.setFullYear(today.getFullYear() + 1);
    }

    let TotalDaysLeft = Math.round(
      Math.abs(birthDayThisYear.getTime() - today.getTime()) / oneDay
    );

    DaysLeft.innerText = TotalDaysLeft;
  }
});
