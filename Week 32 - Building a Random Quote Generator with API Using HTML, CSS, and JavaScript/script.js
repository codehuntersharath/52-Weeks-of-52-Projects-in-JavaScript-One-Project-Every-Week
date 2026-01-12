const quote = document.querySelector(".quote"),
  generate = document.getElementById("generate"),
  category = document.getElementById("category"),
  likeList = document.getElementById("likeList"),
  likeQuote = document.getElementById("likeQuote"),
  quoteArea = document.querySelector(".quoteArea"),
  favoriteList = document.querySelector(".favoriteList"),
  favoriteData = document.getElementById("favoriteData");

let likedListArr = localStorage.getItem("ListLiked")
  ? JSON.parse(localStorage.getItem("ListLiked"))
  : [];

window.addEventListener("load", () => {
  generateNinjaQuotes();

  if (likedListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
  favoriteList.style.display = "none";
});

function generateNinjaQuotes() {
  likeQuote.removeAttribute("class");
  likeQuote.setAttribute("class", "fa-regular fa-heart");
  likeQuote.style.color = "black";

  let div = document.createElement("div");
  quote.innerHTML = `Loading New Quotes... <i class="fa-solid fa-sync fa-spin"></i>`;
  generate.innerHTML = "Generating...";
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "YOUR_API_KEY_HERE" },
  })
    .then((response) => response.json())
    .then((data) => {
      generate.innerHTML = "New Quote";
      quote.innerHTML = "";
      div.innerHTML += '<i class="fa-solid fa-quote-left"></i> &nbsp;';
      div.innerHTML += data[0].quote;
      div.innerHTML += '&nbsp; <i class="fa-solid fa-quote-right"></i>';

      div.innerHTML += `<div class="author"><span>__</span>${data[0].author}</div>`;
      category.innerHTML = data[0].category;
      console.log(data);
      quote.append(div);
    });
}

function LikeQuote() {
  if (likeQuote.style.color == "red") {
    likeQuote.removeAttribute("class");
    likeQuote.setAttribute("class", "fa-regular fa-heart");
    likeQuote.style.color = "black";

    likedListArr = likedListArr.filter(function (e) {
      return e !== quote.innerHTML;
    });
    localStorage.setItem("ListLiked", JSON.stringify(likedListArr));
  } else {
    likeQuote.removeAttribute("class");
    likeQuote.setAttribute("class", "fa-solid fa-heart");
    likeQuote.style.color = "red";

    likedListArr.push(quote.innerHTML);
    localStorage.setItem("ListLiked", JSON.stringify(likedListArr));
  }

  if (likedListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}

function CopyQuote() {
  navigator.clipboard.writeText(quote.innerText);
}

function TwitterQuote() {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
  window.open(twitterUrl, "_blank");
}

likeList.addEventListener("click", () => {
  favoriteData.innerHTML = "";

  likedListArr.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = item;
    console.log(item);
    favoriteData.append(li);
  });

  favoriteList.style.display = "block";
  quoteArea.style.display = "none";
});

function switchQuote() {
  favoriteList.style.display = "none";
  quoteArea.style.display = "block";

  if (likedListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}

function clearFavoriteList() {
  favoriteData.innerHTML = "";
  likedListArr = [];
  localStorage.setItem("ListLiked", JSON.stringify(likedListArr));

  likeQuote.removeAttribute("class");
  likeQuote.setAttribute("class", "fa-regular fa-heart");
  likeQuote.style.color = "black";
}
