const monthPicker = document.getElementById("month-picker"),
  selectedYear = document.getElementById("selectedYear"),
  monthList = document.querySelector(".month-list"),
  yearPicker = document.querySelectorAll(".year-picker span");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let todaysDate = new Date();
let selectedCurrentMonth = todaysDate.getMonth();
let selectedCurrentYear = todaysDate.getFullYear();

window.addEventListener("load", () => {
  months.forEach((month, i) => {
    let div = document.createElement("div");
    div.innerHTML = month;
    monthList.append(div);

    div.onclick = () => {
      monthList.classList.remove("show");
      selectedCurrentMonth = i;
      generateCalendar(i, selectedCurrentYear);
    };
  });

  generateCalendar(selectedCurrentMonth, selectedCurrentYear);
});

generateCalendar = (month, year) => {
  let calendarDay = document.querySelector(".calendar-day");
  calendarDay.innerHTML = "";

  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month + 1, 0);
  let currentDate = new Date();
  currentDate.setDate(30);

  monthPicker.innerHTML = months[month];
  selectedYear.innerHTML = year;

  let totalDays = lastDay.getDate() + firstDay.getDay();
  for (let i = 0; i < totalDays; i++) {
    let div = document.createElement("div");
    if (i >= firstDay.getDay()) {
      div.innerHTML = i - firstDay.getDay() + 1;

      if (
        i - firstDay.getDay() + 1 == currentDate.getDate() &&
        year == currentDate.getFullYear() &&
        month == currentDate.getMonth()
      ) {
        div.classList.add("currentDate");
      }
    }

    calendarDay.appendChild(div);
  }
};

monthPicker.onclick = () => {
  monthList.classList.add("show");
};

yearPicker.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList.value == "prev-year") {
      selectedCurrentYear--;
      generateCalendar(selectedCurrentMonth, selectedCurrentYear);
    } else {
      selectedCurrentYear++;
      generateCalendar(selectedCurrentMonth, selectedCurrentYear);
    }
  });
});
