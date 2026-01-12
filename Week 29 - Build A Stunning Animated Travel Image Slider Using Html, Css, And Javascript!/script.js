const travelSlider = document.querySelector(".travel-slider-planet"),
  swiperWrapper = document.querySelector(".swiper-wrapper"),
  swipeLeft = document.getElementById("swipe-left"),
  swipeRight = document.getElementById("swipe-right");

let calculateRotate = 0,
  clicks = 0,
  placement = 444,
  sizeDefine = 670;

window.addEventListener("load", function () {
  if (this.innerWidth == 768) {
    placement = 70;
    sizeDefine = 645;
  } else if (this.innerWidth == 426) {
    placement = 45;
    sizeDefine = 372;
  }
  swiperWrapper.style.transform = `translate3d(${placement}px, 0px, 0px)`;
});

swipeLeft.onclick = () => {
  if (clicks != 0) {
    clicks--;
    placement += sizeDefine;
    calculateRotate -= 45;
    swiperWrapper.style.transform = `translate3d(${placement}px, 0px, 0px)`;
    travelSlider.style.transform = `translate(-50%, -50%) rotate(-${calculateRotate}deg)`;
  }
};

swipeRight.onclick = () => {
  if (clicks < 7) {
    clicks++;
    placement -= sizeDefine;
    calculateRotate += 45;
    swiperWrapper.style.transform = `translate3d(${placement}px, 0px, 0px)`;
    travelSlider.style.transform = `translate(-50%, -50%) rotate(-${calculateRotate}deg)`;
  }
};
