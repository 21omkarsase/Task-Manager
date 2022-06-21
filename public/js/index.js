const taskPen = document.querySelector(".taskPen");
const taskCross = document.querySelector(".taskCross");
const pen = document.querySelector(".pen");
const cross = document.querySelector(".cross");
const addTaskArea = document.querySelector(".addTaskArea");

const form = document.querySelector(".task-form");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const addTaskBtn = document.querySelector(".addTaskBtn");

taskPen.addEventListener("click", (e) => {
  addTaskArea.classList.toggle("formActive");
  taskPen.style.display = "none";
  taskCross.style.display = "block";
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
  addTaskArea.classList.toggle("active");
  const data = {
    taskName: taskName.value,
    taskDescription: taskDescription.value,
    taskDueDate: new Date(taskDueDate.value).toUTCString(),
    completed: false,
  };
  console.log(data);
});
