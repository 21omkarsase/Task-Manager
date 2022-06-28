//navbar
const navLinks = document.querySelector(".nav-links");
const barIcon = document.querySelector(".barIcon");
const crossBarIcon = document.querySelector(".crossBarIcon");

//login

const loginSection = document.querySelector(".login-section");
const signupSection = document.querySelector(".signup-section");

const loginbarlink = document.querySelector(".loginbarlink");
const signupbarlink = document.querySelector(".signupbarlink");
const loginBtn = document.querySelector(".loginBtn");
const signupBtn = document.querySelector(".signupbtn");
const joinBtn = document.querySelector(".joinBtn");

const crossLoginHeader = document.querySelector(".crossLoginHeader");
const crossSignupHeader = document.querySelector(".crossSignupHeader");

loginbarlink.addEventListener("click", () => {
  console.log("logclik");
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});

signupbarlink.addEventListener("click", () => {
  console.log("signclik");
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});

loginBtn.addEventListener("click", () => {
  console.log("login");
  loginSection.style.display = "block";
});

const signupFunction = () => {
  console.log("login");
  signupSection.style.display = "block";
};

signupBtn.addEventListener("click", signupFunction);
joinBtn.addEventListener("click", signupFunction);

crossSignupHeader.addEventListener("click", () => {
  signupSection.style.display = "none";
});
crossLoginHeader.addEventListener("click", () => {
  loginSection.style.display = "none";
});

const spinner = document.querySelector(".loading-spinner");

const loginEmail = document.querySelector(".loginEmail");
const loginPassword = document.querySelector(".loginPassword");
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailVal = loginEmail.value;
  const passVal = loginPassword.value;
  const userData = {
    email: emailVal,
    password: passVal,
  };
  console.log(JSON.stringify(userData));

  try {
    spinner.style.display = "block";
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    spinner.style.display = "none";
  } catch (e) {
    console.log("error occured" + e);
  }

  window.location.href = "/user/mytasks";
});

const username = document.querySelector(".username");
const age = document.querySelector(".age");
const signupEmail = document.querySelector(".signupEmail");
const signupPassword = document.querySelector(".signupPassword");
const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = {
    name: username.value,
    email: signupEmail.value,
    age: age.value,
    password: signupPassword.value,
  };
  console.log(JSON.stringify(userData));
  spinner.style.display = "block";
  const response = await fetch("/users/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  spinner.style.display = "none";
  window.location.href = "/user/mytasks";
});

barIcon.addEventListener("click", () => {
  navLinks.style.display = "block";
  barIcon.style.display = "none";
  crossBarIcon.style.display = "block";
});

crossBarIcon.addEventListener("click", () => {
  navLinks.style.display = "none";
  crossBarIcon.style.display = "none";
  barIcon.style.display = "block";
});

const navLinkDivs = document.getElementsByClassName("nav-link-div");
console.log(navLinkDivs);
Array.from(navLinkDivs).forEach((link) => {
  console.log(link);
  link.addEventListener("mouseenter", () => {
    console.log("hoved");
    link.style.borderBottom = "2px solid white";
    link.style.marginBottom = "5px";
  });
  link.addEventListener("mouseleave", () => {
    console.log("hoved");
    link.style.borderBottom = "none";
    link.style.marginBottom = "0px";
  });
});
