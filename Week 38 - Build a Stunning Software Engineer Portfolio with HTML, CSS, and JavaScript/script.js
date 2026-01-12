let menus = ["Home", "About", "Works", "Service", "Contact", "Blog"];
let socialLinks = [
  {
    link: "#",
    icon: "fa-brands fa-facebook-f",
    bg: "#1877f2",
  },
  {
    link: "#",
    icon: "fa-brands fa-x-twitter",
    bg: "#1da1f2",
  },
  {
    link: "#",
    icon: "fa-brands fa-linkedin-in",
    bg: "#0077b5",
  },
  {
    link: "#",
    icon: "fa-brands fa-instagram",
    bg: "#405de6",
  },
];

const desktopMenu = document.querySelector(".desktopMenu ul"),
  mobileMenu = document.querySelector(".mobileMenu ul"),
  openMenu = document.querySelector(".fa-bars"),
  sideMobileMenu = document.querySelector(".sideMobileMenu"),
  bodyOverlay = document.querySelector(".bodyOverlay"),
  closeMenu = document.querySelector(".fa-circle-xmark"),
  social = document.querySelector(".social"),
  socialHome = document.querySelector(".socialHome ul"),
  headerSticky = document.getElementById("headerSticky"),
  socialFooter = document.querySelector(".socialFooter"),
  scrollTop = document.querySelector(".scrollTop i");

const sections = document.querySelectorAll("section[id]");
window.addEventListener("load", (e) => {
  menus.forEach((menu, i) => {
    let item1 = document.createElement("li");
    let item2 = document.createElement("li");
    if (i == 0) {
      item1.classList.add("active");
    }
    item1.innerHTML = `<a href="#${menu.toLocaleLowerCase()}">${menu}</a>`;
    item2.innerHTML = `<a href="#${menu.toLocaleLowerCase()}">${menu}</a>`;

    item1.addEventListener("click", (e) => {
      desktopMenu.childNodes.forEach((li) => {
        li.classList.remove("active");
      });
      e.target.parentElement.classList.add("active");
    });

    desktopMenu.append(item1);
    mobileMenu.append(item2);

    document.getElementById(menu.toLocaleLowerCase()).style.display = "block";
  });

  socialLinks.forEach((arr) => {
    let item = document.createElement("li");
    item.style.background = arr.bg;
    item.innerHTML = `<a href="${arr.link}"><i class="${arr.icon}"></i></a>`;
    social.append(item);

    let itemHome = document.createElement("li");
    itemHome.innerHTML = `<a href="${arr.link}"><i class="${arr.icon}"></i></a>`;
    socialHome.append(itemHome);

    let itemFooter = document.createElement("li");
    itemFooter.style.background = arr.bg;
    itemFooter.innerHTML = `<a href="${arr.link}"><i class="${arr.icon}"></i></a>`;
    socialFooter.append(itemFooter);
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    headerSticky.classList.add("stickyMenu");
  } else {
    headerSticky.classList.remove("stickyMenu");
  }

  if (window.scrollY > 400) {
    scrollTop.style.visibility = "visible";
    scrollTop.style.opacity = "1";
  } else {
    scrollTop.style.visibility = "hidden";
    scrollTop.style.opacity = "0";
  }

  onePageNavigation();
});

function onePageNavigation() {
  let scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop =
      current.getBoundingClientRect().top + window.pageYOffset - 50,
      sectionId = current.getAttribute("id");

    if (
      document.querySelector(".desktopMenu a[href*=" + sectionId + "]") !=
      undefined
    ) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".desktopMenu a[href*=" + sectionId + "]")
          .parentElement.classList.add("active");
      } else {
        document
          .querySelector(".desktopMenu a[href*=" + sectionId + "]")
          .parentElement.classList.remove("active");
      }
    }
  });
}

openMenu.addEventListener("click", () => {
  sideMobileMenu.classList.add("openMenuBar");
  bodyOverlay.classList.add("opened");
});

function closeMenuBar() {
  sideMobileMenu.classList.remove("openMenuBar");
  bodyOverlay.classList.remove("opened");
}

closeMenu.addEventListener("click", () => {
  closeMenuBar();
});

bodyOverlay.addEventListener("click", () => {
  closeMenuBar();
});
