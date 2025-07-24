"use strict";
let savedPostsList = document.querySelector(".saved-posts-list");
let savedPostSection = document.querySelector(".left-section");
let hideSavedPostsBtn = document.querySelector(".expand-saved-post");
let filterField = document.querySelector(".filter-field");
let posts = document.querySelector(".post-fetched-container");
const articleContainer = document.querySelector(".content-container");
const article = document.querySelector(".post-article");
const prevBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");
const firstPage = document.querySelector(".first-page");
const lastPage = document.querySelector(".last-page");

// POSTS APIs
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

window.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  displayPage(1);
});

const newsPaperImg = [
  "/assets/businessday_newspaper.jpeg",
  "/assets/dailyindependence_newspaper.jpeg",
  "/assets/dailytrust_newspaper.jpeg",
  "/assets/guardian_newspaper.jpeg",
  "/assets/leadership_newspaper.jpeg",
  "/assets/premiumtimes_newspaper.jpeg",
  "/assets/punch_newspaper2.jpeg",
  "/assets/thenation_newspaper.jpeg",
  "/assets/thesun_newspaper.jpeg",
  "/assets/thisday_newspaper.jpeg",
  "/assets/vanguard_newpaper.jpeg",
];

let postsArr = JSON.parse(localStorage.getItem("posts")) || [];
let postObj = { postId: "", newsPaper: "" };

function generateCryptoRandomNumber(max) {
  const byteArray = new Uint32Array(1);
  crypto.getRandomValues(byteArray);
  // Get the single random byte.
  const randomByte = byteArray[0];
  // The modulo operator (%) ensures the number falls within the range [0, max-1].
  return randomByte % max;
}
// Generate a random number between 0 and 11 (inclusive)
const randomNumber = generateCryptoRandomNumber(11);

function saveToLocalStorage() {
  return localStorage.setItem("posts", JSON.stringify(postsArr));
}

function saveToSessionStorage() {
  return sessionStorage.setItem("postObj", JSON.stringify(postObj));
}

const fetchPosts = async function () {
  try {
    let req = await fetch(POST_URL);
    if (!req.ok) throw new Error("Error fetching Data");
    let resData = await req.json();
    postsArr = resData;
    saveToLocalStorage();
  } catch (error) {
    // articleContainer.classList.add("errorFetchingData");
    // articleContainer.innerHTML = error.message;
    console.error(error.message);
  }
  return null;
};

//PAGINATION

const data = [...postsArr];
const itemsPerPage = 10;
let currentPage = 1;

function displayPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  // call generateHTML function to update data in UI
  generateHTML(pageData);
  firstPage.textContent = currentPage;
  lastPage.textContent = data.length / itemsPerPage;
  return pageData;
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
}

function goToNextPage() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
}

prevBtn.addEventListener("click", goToPreviousPage);
nextBtn.addEventListener("click", goToNextPage);

//FILTER POSTS
function filterPost() {
  const searchQuery = this.value.trim().toLowerCase();
  let postToRender = searchQuery
    ? displayPage(1).filter((post) => {
        return (
          post.title.toLowerCase().includes(searchQuery) ||
          post.body.toLowerCase().includes(searchQuery)
        );
      })
    : displayPage(1);
  generateHTML(postToRender);
}

filterField.addEventListener("keyup", filterPost);

//SHORTEN TITLE AND POST BODY
function shortenPost(sentence, maxLength) {
  return sentence.split(" ").length > maxLength
    ? sentence.split(" ").slice(0, maxLength).join(" ") + "..."
    : sentence;
}

//GENERATE HTML MARKUP
function generateHTML(resData) {
  posts.innerHTML = "";
  let html = resData
    .map((post) => {
      let title = shortenPost(post.title, 4);
      let body = shortenPost(post.body, 9);
      let imgSrc = generateCryptoRandomNumber(11);
      return `
          <article class="article article--1" data-id="${post.id}">
              <figure class="article-img-container">
                  <img
                  src="${newsPaperImg[imgSrc]}"
                  alt="thisday_newspaper.jpeg"
                  class="article-thumbnail"
                  data-id="${imgSrc}"
                  />
              </figure>
              <div class="article-text-heighlights">
                  <h1 class="article-text-title">${title}</h1>
                  <p class="article-text-description">
                 ${body}
                 </p>
                 <a href="#${post.id}" class="read-more" data-id="${post.id}">Read more</a>
              </div>
          </article>`;
    })
    .join("");

  posts.insertAdjacentHTML("afterbegin", html);
}

//HIDE AND UNHIDE SAVED POSTS
function togglePostsView() {
  savedPostsList.classList.toggle("hide-saved-posts-list");
  document.querySelector(".left-section").classList.toggle("minimize");
}

function deletePost() {
  console.log("post deleted ...");
}

function togglePostItemView(id) {
  document.querySelectorAll(".bottom-saved-post").forEach((post) => {
    let buttonId = post.dataset.id;
    if (+buttonId !== +id) return;
    post.classList.toggle("closePane");
  });
}

savedPostSection.addEventListener("click", (e) => {
  let targetIcon = e.target;
  if (targetIcon.closest(".expand-saved-post")) togglePostsView();

  if (targetIcon.classList.contains("open-post"))
    togglePostItemView(targetIcon.dataset.id);

  if (targetIcon.classList.contains("delete-saved-post")) deletePost();
});

function generatePostId(e) {
  let isAnchorTag = e.target;

  if (!isAnchorTag.classList.contains("read-more")) return;

  postObj.postId = isAnchorTag.dataset.id;
  postObj.newsPaper = generateCryptoRandomNumber(11);

  console.log(postObj.newsPaper);
  saveToSessionStorage();
  setTimeout(() => {
    // window.location.href = "/pages/post.html";
  }, 500);
}

posts.addEventListener("click", generatePostId);
