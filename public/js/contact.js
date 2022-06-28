const navLinks = document.querySelector(".nav-links");
const barIcon = document.querySelector(".barIcon");
const crossBarIcon = document.querySelector(".crossBarIcon");

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
Array.from(navLinkDivs).forEach((link) => {
  link.addEventListener("mouseenter", () => {
    console.log("hoved");
    link.style.borderBottom = "2px solid white";
    link.style.marginBottom = "5px";
  });
  link.addEventListener("mouseleave", () => {
    link.style.borderBottom = "none";
    link.style.marginBottom = "0px";
  });
});

const contactForm = document.querySelector(".contactForm");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const contactData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  const response = await fetch("/contact/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    alert("Filed to send message");
  } else {
    alert("Message send successfully!");
  }
  name.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";
});
