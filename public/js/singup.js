//data
const username = document.querySelector(".username");
const age = document.querySelector(".age");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const signupBtn = document.querySelector(".submitBtn");
const form = document.querySelector(".signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = {
    name: username.value,
    email: email.value,
    age: age.value,
    email: email.value,
    password: password.value,
  };
  console.log(JSON.stringify(userData));

  const response = await fetch("/users/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);
});

// xyz123@gmail.com
// omkarsase123
