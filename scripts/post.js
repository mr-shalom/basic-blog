"use strict";

const backBtn = document.getElementById("back-btn");
const displayPost = document.querySelector(".newspaper-and-text");

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

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

window.addEventListener("DOMContentLoaded", () => {
  let { postId, newsPaper } = JSON.parse(sessionStorage.getItem("postObj"));
  fetchPost(postId, newsPaper);
});

async function fetchPost(id, newsPaper) {
  try {
    let req = await fetch(`${POST_URL}/${+id}`);
    if (!req.ok) throw new Error("Error fetching post, please try again");
    let resData = await req.json();
    generateHTML(resData, newsPaper);
  } catch (error) {
    console.error(error.message);
  }
}

function generateHTML(resData, newsPaper) {
  let html = `
    <aside class="post-photograph-detail">
      <figure class="post-photo-container">
        <img
          src="${newsPaperImg[newsPaper]}"
          alt="thesun_newspaper"
          class="post-full-photo"
        />
      </figure>
    </aside>
    <aside class="post-text-detail">
      <h1 class="post-full-title">${resData.title}</h1>
      <p class="full-post-details">
       ${resData.body}
      </p>
    </aside>
  `;
  displayPost.insertAdjacentHTML("afterbegin", html);
}

backBtn.addEventListener("click", () => history.go(-1));
