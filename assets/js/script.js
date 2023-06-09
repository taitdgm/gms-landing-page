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
const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {
  const sldierContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }
};

for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}

const certSliders = document.querySelectorAll("[data-certificate-slider]");

const sliderInit = function (currentSlider) {
  const certSliderContainer = currentSlider.querySelector(
    "[data-certificate-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-items")
  );

  const totalSliderItems =
    certSliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const slideNext = function () {
    currentSlidePos++;

    certSliderContainer.style.transform = `translateX(-${certSliderContainer.children[currentSlidePos].offsetLeft}px)`;

    if (currentSlidePos >= totalSliderItems)
      sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.removeAttribute("disabled");
  };

  sliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    currentSlidePos--;

    certSliderContainer.style.transform = `translateX(-${certSliderContainer.children[currentSlidePos].offsetLeft}px)`;

    if (currentSlidePos <= 0) sliderPrevBtn.setAttribute("disabled", "");
    sliderNextBtn.removeAttribute("disabled");
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const noExtraSliderItems = totalSliderItems <= 0;
  if (noExtraSliderItems) sliderNextBtn.setAttribute("disabled", "");

  sliderPrevBtn.setAttribute("disabled", "");
};

for (let i = 0, len = sliders.length; i < len; i++) {
  sliderInit(sliders[i]);
}

/**
 * Scroll to top
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    console.log("test");
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});
