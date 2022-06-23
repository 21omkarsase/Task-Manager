const taskPen = document.querySelector(".taskPen");
const taskCross = document.querySelector(".taskCross");
const pen = document.querySelector(".pen");
const cross = document.querySelector(".cross");
const addTaskArea = document.querySelector(".addTaskArea");
const allTasksArea = document.querySelector(".allTasksArea");

const form = document.querySelector(".task-form");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const addTaskBtn = document.querySelector(".addTaskBtn");

taskPen.addEventListener("click", (e) => {
  addTaskArea.classList.toggle("formActive");
  taskPen.style.display = "none";
  taskCross.style.display = "block";
  allTasksArea.style.display = "none";
});
taskCross.addEventListener("click", () => {
  addTaskArea.classList.toggle("formActive");
  taskCross.style.display = "none";
  taskPen.style.display = "block";
  allTasksArea.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  taskName.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  addTaskArea.classList.toggle("formActive");
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
console.log(tasks);

Array.from(tasks).forEach((task) => {
  const styles = getComputedStyle(task);
  taskHeight = styles.height;
  console.log(taskHeight);
  if (taskHeight > 200 + "px") {
    console.log(task);
    task.parentElement.parentElement.style.overflowY = "scroll";
  }
});
