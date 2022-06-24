// add task area imports

const taskPen = document.querySelector(".taskPen");
const taskCross = document.querySelector(".taskCross");
const addTaskArea = document.querySelector(".addTaskArea");
const allTasksArea = document.querySelector(".allTasksArea");

const form = document.querySelector(".task-form");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const addTaskBtn = document.querySelector(".addTaskBtn");
const addTaskAreaStyles = getComputedStyle(addTaskArea);

//profile area imports

const profile = document.querySelector(".accountNav");
const profileSection = document.querySelector(".profileSection");
const cancelBtn = document.querySelector(".cancelBtn");
const security = document.querySelector(".security");
const personalInfo = document.querySelector(".profile-content-area");

const personalInfoBtn = document.querySelector(".personalInfoBtn");
const securityBtn = document.querySelector(".securityBtn");
const profileStyles = getComputedStyle(profileSection);

//add task area

taskPen.addEventListener("click", (e) => {
  if (profileStyles.display === "none") {
    addTaskArea.classList.toggle("formActive");
    taskPen.style.display = "none";
    taskCross.style.display = "block";
  }
});
taskCross.addEventListener("click", () => {
  addTaskArea.classList.toggle("formActive");
  taskCross.style.display = "none";
  taskPen.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  taskName.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  addTaskArea.classList.toggle("formActive");
  taskCross.style.display = "none";
  taskPen.style.display = "block";
  const data = {
    taskName: taskName.value,
    taskDescription: taskDescription.value,
    taskDueDate: new Date(taskDueDate.value).toUTCString(),
    completed: false,
  };
  console.log(data);
});

//scrollbar

const tasks = document.getElementsByClassName("content");
Array.from(tasks).forEach((task) => {
  const styles = getComputedStyle(task);
  taskHeight = styles.height;
  if (taskHeight > 200 + "px") {
    task.parentElement.parentElement.style.overflowY = "scroll";
  }
});

//profile area

profile.addEventListener("click", () => {
  if (
    profileStyles.display === "none" &&
    addTaskAreaStyles.display === "none"
  ) {
    profileSection.style.display = "block";
  }
});

cancelBtn.addEventListener("click", () => {
  profileSection.style.display = "none";
});

securityBtn.addEventListener("click", () => {
  if (profileStyles.display !== "none") {
    personalInfo.style.display = "none";
    security.style.display = "block";
    securityBtn.style.borderBottom = "3px solid red";
    personalInfoBtn.style.border = "1px solid black";
  }
});
personalInfoBtn.addEventListener("click", () => {
  if (profileStyles.display !== "none") {
    security.style.display = "none";
    personalInfo.style.display = "block";
    personalInfoBtn.style.borderBottom = "3px solid red";
    securityBtn.style.border = "1px solid black";
  }
});
