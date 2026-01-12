const wrapper = document.querySelector(".wrapper"),
  sideBarToggle = document.querySelector(".fa-bars"),
  sideBarNav = document.querySelectorAll(".sideBarNav .navItem i");

sideBarToggle.addEventListener("click", () => {
  wrapper.classList.toggle("toggled");
});

sideBarNav.forEach((element) => {
  element.parentElement.addEventListener("click", (e) => {
    sideBarNav.forEach((el) => {
      el.parentElement.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});
