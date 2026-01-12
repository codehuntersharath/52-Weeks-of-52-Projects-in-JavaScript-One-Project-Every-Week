const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  sideBarOpen = document.querySelector(".sideBarOpen"),
  sideBarClose = document.querySelector(".sideBarClose"),
  darkLight = document.querySelector(".darkLight");

sideBarOpen.onclick = () => {
  nav.classList.add("active");
};

sideBarClose.onclick = () => {
  nav.classList.remove("active");
};

darkLight.onclick = () => {
  body.classList.toggle("dark");
  darkLight.classList.toggle("active");
};
