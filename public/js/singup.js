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
    email: email.value,
    age: age.value,
    email: email.value,
    password: password.value,
  };
  console.log(JSON.stringify(userData));

  const response = await fetch("/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    alert("User created successfully");
    console.log(response.body);
  }
});

// harshAlashi@123.com
// alashiHarsh123
