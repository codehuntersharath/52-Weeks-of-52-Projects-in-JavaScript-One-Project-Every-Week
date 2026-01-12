const header = document.querySelector("header"),
  cardList = document.getElementById("cardList"),
  cartView = document.querySelector(".fa-basket-shopping"),
  searchProduct = document.querySelector(".fa-magnifying-glass"),
  searchInput = document.querySelector(".searchInput"),
  closeSearchInput = document.querySelector(".fa-xmark"),
  category = document.getElementById("category"),
  limit = document.getElementById("limit"),
  cartListView = document.querySelector(".cartListView"),
  cartTableData = document.querySelector(".cartTableData>tbody"),
  cartQtyCount = document.getElementById("cartQtyCount"),
  totalQuantity = document.getElementById("totalQuantity"),
  totalNetPrice = document.getElementById("totalNetPrice");

let cartData = [];

searchProduct.addEventListener("click", () => {
  searchInput.classList.toggle("active");
});

closeSearchInput.addEventListener("click", () => {
  searchInput.classList.remove("active");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("stickyMenu");
  } else {
    header.classList.remove("stickyMenu");
  }
});

const APIUrl = `https://fakestoreapi.com/products`;
window.addEventListener("load", () => {
  fetch(APIUrl + "/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let categories = document.createElement("option");
        categories.value = item;
        categories.text = item;
        category.append(categories);
      });
    });

  loadProducts("");
});

function filterSearch() {
  cardList.innerHTML = "";
  let queryString = "";
  if (category.value != "") {
    queryString += "/category/" + category.value;
  }
  if (limit.value != "") {
    queryString += "?limit=" + limit.value;
  }

  loadProducts(queryString);
}

let currentPage = 1;
let perPage = 5;

function loadProducts(byCategory) {
  fetch(APIUrl + byCategory)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      limit.innerHTML = "";
      console.log(data.length);
      for (var l = 0; l < Math.ceil(data.length / 5) + 1; l++) {
        let limitPage = document.createElement("option");
        if (l == 0) {
        } else {
          limitPage.value = l * 5;
          limitPage.text = l * 5;
        }
        limit.append(limitPage);
      }

      data.forEach((product) => {
        let cartItem = `
        <div class="singleProduct">
          <div class="imageGroup"><img src="${product.image}" /></div>
          <div class="productDetails">
            <h5>${product.title}</h5>
            <div class="productPrice">
              <span class="price">$${product.price}</span>
              <div>
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-plus" 
                onclick='addToCart(${product.id},1)'>
                </i>
              </div>
            </div>
          </div>
        </div>
        `;
        cardList.innerHTML += cartItem;
      });
    });
}

function addToCart(Id, quantity) {
  let productArr = { Id: Id, quantity: quantity };
  let IsProductExists = true;

  cartData.forEach((arr) => {
    console.log(arr);
    if (arr.Id == Id) {
      arr.quantity++;
      IsProductExists = false;
    }
  });

  if (IsProductExists) {
    cartData.push(productArr);
  }

  let total = 0;
  cartData.forEach(function (element) {
    total += element.quantity;
  });
  cartQtyCount.innerText = total;
}

function viewCartDetails() {
  if (cartData.length > 0) {
    cartTableData.innerHTML = "";
    cartListView.classList.add("active");

    let totalCartPrice = 0,
      totalCartQuantity = 0;
    cartData.forEach((arr) => {
      console.log(arr.Id, arr.quantity);
      fetch(APIUrl + "/" + arr.Id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          totalCartPrice += data.price * arr.quantity;
          totalCartQuantity += arr.quantity;
          let tableList = `
          <td>
            <div class="productName">
              <img src="${data.image}" /> 
              <h5>${data.title}</h5>
            </div>
          </td>
          <td>${data.price}</td>
          <td>${arr.quantity}</td>
          <td>${data.price * arr.quantity}</td>`;

          var tr = document.createElement("tr");
          tr.innerHTML = tableList;
          cartTableData.appendChild(tr);

          totalQuantity.innerText = totalCartQuantity;
          totalNetPrice.innerText = parseFloat(totalCartPrice).toFixed(2);
        });
    });
  } else {
  }
}

function closeCartDetails() {
  cartListView.classList.remove("active");
}

