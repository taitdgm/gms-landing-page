"use strict";

/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * Preloader
 */
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("remove");
  }, 1500);
});

/**
 * Header
 */

const header = document.querySelector("[data-header]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", headerActive);

/**
 * Navbar toggler for mobile devices
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * SLIDER
 */
const sliderContainer = document.querySelector("[data-hero-slider-container]");
const sliderItems = document.querySelectorAll("[data-hero-slider-item]");
const sliderDots = document.querySelectorAll("[data-hero-slider-dot]");
const sliderPrevBtn = document.querySelector("[data-hero-slider-prev]");
const sliderNextBtn = document.querySelector("[data-hero-slider-next]");

let currentSlidePosition = 0;
let sliderItemsLength = sliderItems.length - 1;

sliderNextBtn.onclick = function () {
  if (currentSlidePosition + 1 > sliderItemsLength) {
    currentSlidePosition = 0;
  } else {
    currentSlidePosition++;
  }
  reloadSlider();
};

sliderPrevBtn.onclick = function () {
  if (currentSlidePosition - 1 < 0) {
    currentSlidePosition = sliderItemsLength;
  } else {
    currentSlidePosition--;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  sliderNextBtn.click();
}, 5000);

function reloadSlider() {
  let checkLeft = sliderItems[currentSlidePosition].offsetLeft;
  sliderContainer.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider-dots li.active");

  lastActiveDot.classList.remove("active");
  sliderDots[currentSlidePosition].classList.add("active");

  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    sliderNextBtn.click();
  }, 5000);
}

sliderDots.forEach((item, key) => {
  item.addEventListener("click", () => {
    currentSlidePosition = key;
    reloadSlider();
  });
});

/**
 * Scroll to top
 */
const backTopBtn = document.querySelector("[data-back-top-btn]");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});
