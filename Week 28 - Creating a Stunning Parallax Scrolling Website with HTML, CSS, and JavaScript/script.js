let hill1 = document.getElementById("hill1");
let hill2 = document.getElementById("hill2");
let hill3 = document.getElementById("hill3");
let title = document.getElementById("title");
let leaf = document.getElementById("leaf");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  title.style.marginTop = value * 1.1 + "px";
  if (value != 0) {
    hill1.style.bottom = -value * 2 + "px";
    hill2.style.left = value * -1.5 + "px";
    hill3.style.left = value * 1.5 + "px";
    leaf.style.top = value * -1.5 + "px";
    leaf.style.left = value * 1.5 + "px";
  } else {
    hill1.style.bottom = "0px";
    hill2.style.left = "unset";
    hill3.style.left = "unset";
    leaf.style.top = "1px";
    leaf.style.left = "1px";
  }
});
