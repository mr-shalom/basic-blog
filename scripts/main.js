"use strict";

const username = document.querySelector(".username");

let removephoto = document.querySelector(".removePhoto");
let userProfilepix = document.querySelector(".user-profile-picture");
const tabPostBtn = document.querySelectorAll(".post-btn");
const tabPostDetails = document.querySelectorAll(".details-of-post");
let like = document.querySelectorAll(".heart");
let share = document.querySelectorAll(".share");

let openBtn = document.querySelector(".hamburger-open");
let closeBtn = document.querySelector(".hamburger-close");

openBtn.addEventListener("click", () => {
  document.querySelector(".mobile-nav").classList.remove("closeMenu");
});
closeBtn.addEventListener("click", function () {
  document.querySelector(".mobile-nav").classList.add("closeMenu");
});

//USER PROFILE PICTURE UPLOAD...

const uploadProfilepix = function () {
  let newField = document.createElement("input");
  newField.type = "file";
  newField.setAttribute("id", "profilePix");

  let formerField = removephoto;
  removephoto.replaceWith(newField);
  userProfilepix.classList.add("removePhoto");
  newField.addEventListener("change", (e) => {
    e.preventDefault();

    let result = URL.createObjectURL(e.target.files[0]);
    formerField.src = result;
    newField.replaceWith(formerField);
    removephoto.style.display = "block";
  });
};

userProfilepix.addEventListener("click", uploadProfilepix);

//TABBED POSTS
const selectedTab = function () {
  tabPostBtn.forEach((btn) => btn.classList.remove("activeBtn"));
  tabPostDetails.forEach((btn) => btn.classList.remove("post-on-read"));
  this.classList.add("activeBtn");
  document
    .querySelector(`.post--${this.dataset.set}`)
    .classList.add("post-on-read");
};
tabPostBtn.forEach((btn) => btn.addEventListener("click", selectedTab));

//LIKE AND UNLIKE POSTS
const likeAndUnlikePost = function () {
  this.classList.toggle("unlike");
};
like.forEach((like) => like.addEventListener("click", likeAndUnlikePost));

//SHARE POSTS
const shareAndUnsharePost = function () {
  this.classList.toggle("unshare");
};
share.forEach((share) => share.addEventListener("click", shareAndUnsharePost));

// GET AND DISPLAY LOGGED IN USERNAME
// let loggedInUser = JSON.parse(localStorage.getItem("currAccount")) || [];
// username.textContent =
//   loggedInUser.name[0].toUpperCase() + loggedInUser.name.slice(1);
