"use strict";

/**
 * Page navigation
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (const link of navigationLinks) {
  link.addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      console.log(this.innerHTML.toLowerCase());
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        console.log(i);
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

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

  let lastActiveDot = document.querySelector(".hero .slider-dots li.active");

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

const handleResize = () => {
  reloadSlider();
};

/**
 * Responsive
 */
window.addEventListener("resize", handleResize);

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

/**
 * Certificate slider
 */

const carousels = document.querySelectorAll("[data-carousel]");

const sliderInit = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-carousel-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const sliderDots = currentSlider.querySelectorAll("[data-slider-dot]");

  const lastActiveDots = document.querySelectorAll(["data-slider-dot"]);

  const totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-item")
  );

  const totalSliderHiddenItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  if (!lastActiveDots.length) {
    sliderDots.forEach((item, index) => {
      if (index < totalSliderVisibleItems) {
        item.classList.add("active");
      }
    });
  }

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * Next slide
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSliderHiddenItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };
  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * Previous slide
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSliderHiddenItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  /**
   * Auto slide
   */
  let autoSlideInterval;

  const startAutoSlide = () =>
    (autoSlideInterval = setInterval(slideNext, 5000));
  startAutoSlide();
  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  currentSlider.addEventListener("mouseover", stopAutoSlide);

  currentSlider.addEventListener("mouseout", startAutoSlide);

  const handleResize = () => {
    moveSliderItem();
  };

  /**
   * Responsive
   */
  window.addEventListener("resize", handleResize);
};

carousels.forEach((carousel) => {
  sliderInit(carousel);
});
