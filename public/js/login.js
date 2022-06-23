//data
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginBtn = document.querySelector(".submitBtn");
const form = document.querySelector(".login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailVal = email.value;
  const passVal = password.value;
  const userData = {
    email: emailVal,
    password: passVal,
  };
  console.log(JSON.stringify(userData));
  const response = await fetch("/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);
  window.location.href = "/";
});
