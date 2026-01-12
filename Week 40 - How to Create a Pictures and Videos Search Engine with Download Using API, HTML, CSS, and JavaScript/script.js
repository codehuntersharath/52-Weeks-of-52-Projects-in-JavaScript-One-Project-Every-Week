const dropdownContent = document.querySelector(".dropdown-content");
const dropdownSelectedValue = document.getElementById("dropdownSelectedValue");
const dropdown = document.getElementById("dropdown"),
  searchText = document.getElementById("searchText"),
  searchClick = document.querySelector(".fa-magnifying-glass"),
  items = document.querySelector(".items"),
  loadMore = document.querySelector(".loadMore");

let page = 1,
  perPage = 15,
  searchItem = "Picture";

dropdownContent.addEventListener("click", (e) => {
  dropdownSelectedValue.innerHTML = e.target.innerHTML;
  dropdown.checked = false;
  searchItem = e.target.textContent.trim();
  items.innerHTML = "";
  loadMore.style.display = "none";
  document.getElementById("totalResults").innerText = 0;
});

searchClick.addEventListener("click", () => {
  generateImages(searchItem, true);
});

window.addEventListener("load", () => {
  loadMore.style.display = "none";
  searchText.value = "developer";
  generateImages(searchItem, true);
});

function generateImages(param, IsLoadMore) {
  if (IsLoadMore) {
    page = 1;
    items.innerHTML = "";
  } else {
    page++;
  }
  loadMore.style.display = "block";
  loadMore.innerText = "Loading...";
  const APIKey = "";
  let APIUrl = `https://api.pexels.com/v1/search?query=${searchText.value}&page=${page}&per_page=${perPage}`;
  if (param == "Videos") {
    APIUrl = `https://api.pexels.com/videos/search?query=${searchText.value}&page=${page}&per_page=${perPage}`;
  }

  fetch(APIUrl, {
    headers: { Authorization: APIKey },
  })
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      document.getElementById("totalResults").innerText = results.status == 400 ? results.code : results.total_results;

      if (results.total_results == 0 || results.status == 400) {
        items.innerHTML = `
        <div class="notFound">
          <i class="fa-regular fa-face-frown fa-2xl"></i>
          <h1>${searchText.value}</h1>
          <p>Sorry, we couldn't find any matches</p>
          <br />
          <h2>Try another search term</h2>
        </div>`;
        items.style.columns = "auto";
        loadMore.style.display = "none";
        loadMore.innerText = "Load More";
        return;
      }

      items.style.columns = "5 340px";
      if (document.querySelector(".notFound")) {
        document.querySelector(".notFound").remove();
      }

      if (results.photos != undefined) {
        results.photos.forEach((photo) => {
          generateImageItems(photo);
        });
        loadMore.innerText = "Load More";
      }

      if (results.videos != undefined) {
        results.videos.forEach((video) => {
          generateVideoItems(video);
        });
        loadMore.innerText = "Load More";
      }

      if (results.next_page == undefined) {
        loadMore.style.display = "none";
      }
    });
}

const generateImageItems = (photo) => {
  let div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML += `<img src="${photo.src.original}" alt="${photo.alt}"
    onclick="showPopupView('image', '${photo.src.original}', '${photo.photographer}')" />`;

  div.innerHTML += `
  <div class="details">
    <div class="photographer">
      <i class="fa-solid fa-camera-retro"></i>
      <span>${photo.photographer}</span>
    </div>
    <button onclick="downloadFile('image','${photo.src.original}')"><i class="fa-solid fa-download"></i></button>
  </div>`;

  items.append(div);
};

const generateVideoItems = (video) => {
  let div = document.createElement("div");
  div.classList.add("card");

  let videoEl = document.createElement("video");
  videoEl.src = video.video_files[1].link;
  videoEl.autoplay = false;
  videoEl.controls = false;
  videoEl.loop = true;

  videoEl.addEventListener("mouseenter", () => {
    videoEl.play();
  });

  videoEl.addEventListener("mouseleave", () => {
    videoEl.pause();
  });

  div.addEventListener("click", () => {
    showPopupView("video", video.video_files[1].link, video.user.name);
  });

  div.appendChild(videoEl);
  items.append(div);
};

const downloadFile = (type, FileUrl) => {
  if (type == "image") {
    fetch(FileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(() => console.log("Failed to download image!"));
  } else {
    const a = document.createElement("a");
    a.href = FileUrl;
    a.download = "download.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

const popupView = document.querySelector(".popupView");
const showPopupView = (type, element, name) => {
  let image = `<img src="${element}" />`;
  let video = `<video src='${element}' autoplay loop></video>`;

  popupView.querySelector(
    ".previewItem"
  ).innerHTML = `<div class='elementItem'>${type == "image" ? image : video
  }</div>`;

  document.getElementById("setDownloadAttr").setAttribute("data-type", type);
  document.getElementById("setDownloadAttr").setAttribute("data-file", element);

  popupView.querySelector("span").innerText = name;

  popupView.classList.add("show");
  document.body.style.overflow = "hidden";
};

const hidePopupView = () => {
  popupView.classList.remove("show");
  document.body.style.overflow = "auto";
};

document.getElementById("downloadClick").addEventListener("click", (e) => {
  downloadFile(
    e.target.getAttribute("data-type"),
    e.target.getAttribute("data-file")
  );
});

loadMore.addEventListener("click", () => {
  generateImages(searchItem, false);
});
