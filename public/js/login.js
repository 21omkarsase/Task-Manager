//data
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginBtn = document.querySelector(".submitBtn");
const form = document.querySelector(".login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = email.value;
  const pass = password.value;
  const userData = {
    email: email,
    password: pass,
  };
  console.log(JSON.stringify(userData));

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 200) {
    console.log(response);
  }
});
