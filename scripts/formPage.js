let navTab = document.querySelector(".nav-tab");
let navTabBtns = document.querySelectorAll(".nav-tab button");
let forms = document.querySelectorAll(".form");
let newUsername = document.querySelector(".newusername");
let newEmail = document.querySelector(".newemail");
let newPassword = document.querySelector(".newpassword");
let oldEmail = document.querySelector(".oldemail");
let oldPassword = document.querySelector(".oldpassword");
let loader = document.querySelector(".loader-container");

let currUser;

window.addEventListener("DOMContentLoaded", () => newUsername.focus());

//LOADER
const addLoader = function () {
  loader.classList.remove("hideLoader");
};

const removeLoader = function () {
  loader.classList.add("hideLoader");
};

//RETRIEVE DATA FROM LOCALSTORAGE
const usersDatabank = JSON.parse(localStorage.getItem("userDatabank")) || [];

//SAVE DATA IN LOCALSTORAGE
function dataToLocalStorage() {
  return localStorage.setItem("userDatabank", JSON.stringify(usersDatabank));
}

//SAVE CURRENT USER DATA TO LOCALSTORAGE
function currAccount() {
  return localStorage.setItem("currAccount", JSON.stringify(currUser));
}

//SWITCH TABS
const tabbedLogger = function (e) {
  let targetBtn = e.target;
  navTabBtns.forEach((btn) => btn.classList.remove("active-btn"));
  forms.forEach((form) => form.classList.remove("active"));

  document
    .querySelector(`.form--${targetBtn.dataset.set}`)
    .classList.add("active");
  targetBtn.classList.add("active-btn");
};
navTab.addEventListener("click", tabbedLogger);

//GENERATE UNIQUEIDs
const randomIdGenerator = function () {
  let chars = `{z_x!c=v1b+n@mq,2<w.#>e/3?r[$t;]}4|y:%'"u5i^o6p&a7s*d8f(g9h)j0k-l`;
  let id = "";
  const idLength = 8;
  const arrOfCryptoValues = new Uint32Array(idLength);
  crypto.getRandomValues(arrOfCryptoValues);

  for (let i = 0; i < idLength; i++)
    id += chars[arrOfCryptoValues[i] % chars.length];

  return id;
};

//VALIDATE NEW USER SIGNUP DATA
let validateNewUser = function () {
  addLoader();
  let username = newUsername.value.trim();
  let userEmail = newEmail.value.trim();
  let userpassword = newPassword.value.trim();
  // prettier-ignore
  let checkIfAccountExists = usersDatabank.find((user) => user.email === userEmail);

  if (!checkIfAccountExists) {
    if (username.length > 1 && userpassword.length > 8) {
      usersDatabank.push({
        id: randomIdGenerator(),
        name: username,
        email: userEmail,
        password: userpassword,
      });

      currUser = {
        id: randomIdGenerator(),
        name: username,
        email: userEmail,
        password: userpassword,
      };

      dataToLocalStorage();
      currAccount();

      window.location.href = "/pages/home.html";
      setTimeout(removeLoader, 2000);
    }
  } else {
    alert("user email already exists in the database...");
    removeLoader();
  }
  forms[0].reset();
};

//VALIDATE LOGIN OF EXISITING ACCOUNT
let validateLogin = function () {
  addLoader();
  let oldUserEmail = oldEmail.value.trim();
  let oldUserPassword = oldPassword.value.trim();

  let account = usersDatabank.find((user) => {
    return user.email === oldUserEmail && user.password === oldUserPassword;
  });

  if (account) {
    currAccount = account;
    window.location.href = "/pages/home.html";
    setTimeout(removeLoader, 2000);
  } else {
    setTimeout(() => {
      alert("wrong email and password");
      window.location.href = "/index.html";
    }, 1000);
  }
  forms[1].reset();
};

//SUBMIT FORM HANDLER FUNCTION
const submitHandler = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("form--1")) validateNewUser();
  if (e.target.classList.contains("form--2")) validateLogin();
};

forms.forEach((form) => form.addEventListener("submit", submitHandler));
