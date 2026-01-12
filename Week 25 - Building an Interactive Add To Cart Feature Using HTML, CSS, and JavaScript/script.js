let ArrProducts = [
  {
    id: 1,
    name: "HTML",
    image: "Img1.png",
    price: "1000",
    rating: 5,
  },
  {
    id: 2,
    name: "CSS",
    image: "Img2.png",
    price: "1000",
    rating: 3,
  },
  {
    id: 3,
    name: "JavaScript",
    image: "Img3.png",
    price: "5000",
    rating: 5,
  },
  {
    id: 4,
    name: "jQuery",
    image: "Img4.png",
    price: "2500",
    rating: 3,
  },
  {
    id: 5,
    name: "React",
    image: "Img5.png",
    price: "5000",
    rating: 4,
  },
  {
    id: 6,
    name: "Angular",
    image: "Img6.png",
    price: "5000",
    rating: 4,
  },
];

const body = document.querySelector("body"),
  openBasket = document.querySelector(".shoppingBasket"),
  closeBasket = document.querySelector(".close"),
  products = document.querySelector(".products"),
  productList = document.querySelector(".productList"),
  quantity = document.querySelector(".quantity"),
  total = document.querySelector(".total");

let checkoutList = [];

openBasket.onclick = () => {
  body.classList.add("active");
};
closeBasket.onclick = () => {
  body.classList.remove("active");
};

function onInIt() {
  ArrProducts.forEach((item, key) => {
    let div = document.createElement("div");
    div.classList.add("item");
    let star = "";
    for (i = 1; i <= item.rating; i++) {
      star += `<i class="fa fa-star"></i>`;
    }
    div.innerHTML = `
        <img src="images/${item.image}"/>
        <div class="name">${item.name}</div>
        <div>${star}</div>
        <div class="price"><small>₹</small> ${item.price}</div>
        <button onclick="addToCart(${key})"><i class="fa fa-cart-plus"></i> Add To Cart</button>
        `;
    products.appendChild(div);
  });
}
onInIt();

function addToCart(item) {
  if (checkoutList[item] == null) {
    checkoutList[item] = ArrProducts[item];
    checkoutList[item].quantity = 1;
  } else {
    checkoutList[item].quantity += 1;
  }
  reloadCart();
}

function reloadCart() {
  productList.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  checkoutList.forEach((item, key) => {
    totalPrice += parseInt(item.price * item.quantity);
    count += item.quantity;

    if (item != null) {
      let li = document.createElement("li");
      li.innerHTML = `
    <img src="images/${item.image}">
    <div>${item.name}</div>
    <div>${item.price}</div>
    <div>
    <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
    <div class="count"> ${item.quantity} </div>
    <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
    </div>
    `;
      productList.appendChild(li);
    }
  });

  total.innerHTML = `<small>Subtotal (${count} items): ₹ </small>` + totalPrice;
  quantity.innerHTML = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete checkoutList[key];
  } else {
    checkoutList[key].quantity = quantity;
  }
  reloadCart();
}
