const body = document.querySelector("body"),
  sideBar = document.querySelector(".sideBar"),
  withSub = document.querySelectorAll(".withSub .nav-link"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  logo = document.querySelector(".logo"),
  darkLight = document.querySelector(".darkLight"),
  notification = document.querySelector(".notification"),
  notifications = document.querySelector(".notifications");

sidebarOpen.onclick = () => {
  sideBar.classList.toggle("close");
  withSub.forEach((menus, i) => {
    menus.classList.remove("openSubMenu");
    notifications.classList.remove("open");
  });
};

logo.onclick = () => {
  sideBar.classList.toggle("close");
  withSub.forEach((menus, i) => {
    menus.classList.remove("openSubMenu");
    notifications.classList.remove("open");
  });
};

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (darkLight.classList.contains("fa-moon-o")) {
    darkLight.classList.replace("fa-moon-o", "fa-sun-o");
  } else {
    darkLight.classList.replace("fa-sun-o", "fa-moon-o");
  }
});

withSub.forEach((menus, i) => {
  menus.addEventListener("click", () => {
    menus.classList.toggle("openSubMenu");
    sideBar.classList.remove("close");
    notifications.classList.remove("open");
  });
});

notification.onclick = () => {
  notifications.classList.toggle("open");
};
