menuItems = [
  {
    label: "Dashboard",
    icon: "fa-solid fa-layer-group",
    path: "",
  },
  {
    label: "Course",
    icon: "fa-solid fa-store",
    path: "",
    subMenu: [
      {
        label: "Web Dev",
        icon: "fa-solid fa-desktop",
        path: "",
      },
      {
        label: "Windows Dev",
        icon: "fa-brands fa-windows",
        path: "",
      },
      {
        label: "Mobile Dev",
        icon: "fa-solid fa-mobile-screen",
        path: "",
      },
    ],
  },
  {
    label: "Activity",
    icon: "fa-solid fa-stairs",
    path: "",
  },
  {
    label: "Schedule",
    icon: "fa-regular fa-calendar",
    path: "",
  },
  {
    label: "Technology",
    icon: "fa-solid fa-microchip",
    path: "",
    subMenu: [
      {
        label: "Javascript",
        icon: "fa-brands fa-js",
        path: "",
      },
      {
        label: "React",
        icon: "fa-brands fa-react",
        path: "",
      },
      {
        label: "Angular",
        icon: "fa-brands fa-angular",
        path: "",
      },
    ],
  },
  {
    label: "Settings",
    icon: "fa-solid fa-sliders",
    path: "",
  },
];

const body = document.querySelector("body"),
  sideNav = document.querySelector(".sideNav");

function createDynamicSideNav() {
  let ul = document.createElement("ul");
  menuItems.forEach((menus, key) => {
    let li = document.createElement("li");
    li.classList.add("sideBar-item");

    if (key == 0) {
      li.classList.add("active-tab");
    }
    let subUl = document.createElement("ul");
    if (menus.subMenu != undefined) {
      li.innerHTML = `<i class="${menus.icon}"></i><span class="toolTip">${menus.label}</span><i class="fa fa-chevron-right"></i>`;
      li.classList.add("withSub");

      subUl.classList.add("subMenu");
      menus.subMenu.forEach((sub) => {
        let subLi = document.createElement("li");
        subLi.innerHTML = `<i class="${sub.icon}"></i><span>${sub.label}</span>`;
        subUl.appendChild(subLi);
      });
      li.appendChild(subUl);
    } else {
      li.innerHTML = `<i class="${menus.icon}"></i><span class="toolTip">${menus.label}</span>`;
    }

    li.addEventListener("click", function () {
      let IsSubMenu = true;
      let navLis = document.querySelectorAll(".sideNav > ul > li");
      navLis.forEach((li) => {
        li.classList.remove("active-tab");

        if (
          li.children[3] != undefined &&
          li.children[3].className.includes("openSubMenu")
        ) {
          IsSubMenu = false;
          li.children[3].classList.remove("openSubMenu");
        }
      });
      this.classList.add("active-tab");
      if (IsSubMenu) {
        subUl.classList.toggle("openSubMenu");
      }
    });

    ul.appendChild(li);
  });

  let div = document.createElement("div");
  div.classList.add("sideBarTop");
  let h3 = document.createElement("h4");
  let spanIcon = document.createElement("span");
  h3.innerHTML = `Sharathchandar K`;
  spanIcon.innerHTML = `<i class="fa fa-shield-heart fa-lg"></i>`;
  div.appendChild(spanIcon);
  div.appendChild(h3);
  sideNav.appendChild(div);

  let span = document.createElement("span");
  span.classList.add("pop-btn");
  span.addEventListener("click", function () {
    body.classList.toggle("sideBarActive");
  });
  span.innerHTML = `<i class="fa fa-chevron-left"></i>`;
  sideNav.appendChild(span);
  sideNav.appendChild(ul);
}
createDynamicSideNav();
