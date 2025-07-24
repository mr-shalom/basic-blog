let hamburgerOpen = document.querySelector(".hamburger-open");
let hamburgerClose = document.querySelector(".hamburger-close");
let mobileNav = document.querySelector(".mobile-nav");

function menuOpen() {
  mobileNav.classList.remove("closeMenu");
  console.log(hamburgerOpen);
}

function menuClose() {
  mobileNav.classList.add("closeMenu");
  console.log(hamburgerClose);
}

hamburgerOpen.addEventListener("click", menuOpen);
hamburgerClose.addEventListener("click", menuClose);
