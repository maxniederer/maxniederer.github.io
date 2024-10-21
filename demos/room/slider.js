const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

let sliderText = document.querySelector(".slider-text-holder").children;
let sliderImg = document.querySelector(".slider-img-holder").children;

let curr = 0;
let prev = 2;
let maxStates = 3;

leftButton.addEventListener("click", updateSlider);
rightButton.addEventListener("click", updateSlider);

function updateSlider() {
  prev = curr;
  curr = strictMod(curr + 1, maxStates);

  sliderText[prev].classList.add("hidden");
  sliderImg[prev].classList.add("hidden");
  sliderText[curr].classList.remove("hidden");
  sliderImg[curr].classList.remove("hidden");
}

// forces positive mod value
function strictMod(i, max) {
  return ((i % max) + max) % max;
}

function showMobileImages(x) {
  if (x.matches) {
    sliderImg[0].src = "images/mobile-image-hero-1.jpg";
    sliderImg[1].src = "images/mobile-image-hero-2.jpg";
    sliderImg[2].src = "images/mobile-image-hero-3.jpg";
  } else {
    sliderImg[0].src = "images/desktop-image-hero-1.jpg";
    sliderImg[1].src = "images/desktop-image-hero-2.jpg";
    sliderImg[2].src = "images/desktop-image-hero-3.jpg";
  }
}

var mobileMediaQuery = window.matchMedia("(max-width: 37.5em)");

mobileMediaQuery.addEventListener("change", () => {
  showMobileImages(mobileMediaQuery);
});
showMobileImages(mobileMediaQuery); // execute on load as well
