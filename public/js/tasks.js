// add task area imports

const taskList = document.querySelector(".tasks");
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

const fetchTasks = async () => {
  const response = await fetch("/user/tasks");

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    let html = "";
    data.forEach((task) => {
      html += `
            <div class="task1 task">
            <div class="content-area">
              <label align="justify" for="taskTitle"><span class="heading">Ttile
                  :
                </span>
               ${task.task} </label>
              <label align="justify" for="taskDue"><span class="heading">
                  Due :
                </span>
               ${task.due}</label>
              <label for="Des"><span class="heading"> Description : </span>
              </label>
              <p align="justify" class="content">
               ${task.description}
              </p>
            </div>
            <div class="sidebar">
              <span class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </span>
              <span class="trash"><i
                  class="fa-solid fa-trash-can-arrow-up"
                ></i></span>
            </div>
          </div>
        </div>
    `;
    });
    taskList.innerHTML = html;
  }
};
fetchTasks();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  taskCross.style.display = "none";
  taskPen.style.display = "block";
  addTaskArea.classList.toggle("formActive");
  const userData = {
    task: taskName.value,
    description: taskDescription.value,
    due: new Date(taskDueDate.value).toUTCString(),
    completed: false,
  };
  console.log(userData);

  const response = await fetch("/user/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.innerHTML = `
            <div class="content-area">
            <label align="justify" for="taskTitle"><span class="heading">Ttile
                :
              </span>
            ${taskName.value} </label>
            <label align="justify" for="taskDue"><span class="heading">
                Due :
              </span>
              ${taskDescription.value}</label>
              <label for="Des"><span class="heading"> Description : </span>
            </label>
            <p align="justify" class="content">
            ${new Date(taskDueDate.value).toUTCString()}
            </p>
          </div>
          <div class="sidebar">
            <span class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
              </span>
              <span class="trash"><i
              class="fa-solid fa-trash-can-arrow-up"
              ></i></span>
              </div>
              </div>
        `;
    taskList.insertBefore(newTask, taskList.children[0]);
  }

  taskName.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
});
