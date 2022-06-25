// add task area imports

const taskList = document.querySelector(".tasks");
const taskPen = document.querySelector(".taskPen");
const taskCross = document.querySelector(".taskCross");
const addTaskArea = document.querySelector(".addTaskArea");
const updateTaskArea = document.querySelector(".updateTaskArea");
const allTasksArea = document.querySelector(".allTasksArea");

const form = document.querySelector(".task-form");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const addTaskBtn = document.querySelector(".addTaskBtn");
const addTaskAreaStyles = getComputedStyle(addTaskArea);

const updateForm = document.querySelector(".updateTask-form");
const taskUpdatedName = document.querySelector("#taskUpdatedName");
const taskUpdatedDescription = document.querySelector(
  "#taskUpdatedDescription"
);
const taskUpdatedDueDate = document.querySelector("#taskUpdatedDueDate");
const updateTaskBtn = document.querySelector(".updateTaskBtn");
const cancelTaskBtn = document.querySelector(".cancelTaskBtn");
const updateTaskAreaStyles = getComputedStyle(updateTaskArea);

//profile area imports

const profile = document.querySelector(".accountNav");
const profileSection = document.querySelector(".profileSection");
const cancelBtn = document.querySelector(".cancelBtn");
const security = document.querySelector(".security");
const personalInfo = document.querySelector(".profile-content-area");

const personalInfoBtn = document.querySelector(".personalInfoBtn");
const securityBtn = document.querySelector(".securityBtn");

const username = document.getElementById("username");
const email = document.getElementById("email");
const age = document.getElementById("age");
const profileStyles = getComputedStyle(profileSection);
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const saveBtn = document.querySelector(".saveBtn");

const logout = document.querySelector(".logout");
const logoutall = document.querySelector(".logoutall");
const deleteAccount = document.querySelector(".deleteAccount");

//add task area

taskPen.addEventListener("click", (e) => {
  if (
    profileStyles.display === "none" &&
    updateTaskAreaStyles.display === "none"
  ) {
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
    addTaskAreaStyles.display === "none" &&
    updateTaskAreaStyles.display === "none"
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
    data.reverse();
    let html = "";
    if (data.length < 1) {
      html = "<h2>No Tasks Found</h2>";
    } else {
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
                    <p class="taskId">${task._id}</p>
                  </div>
                  <div class="sidebar">
                    <span class="edit" onclick="updateTask(this)">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                    <span class="trash" onclick="deleteTask(this)"><i
                        class="fa-solid fa-trash-can-arrow-up"
                      ></i></span>
                  </div>
                </div>
              </div>
          `;
      });
    }
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
    fetchTasks();
  }

  taskName.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
});

const deleteTask = async (el) => {
  const taskId =
    el.parentElement.parentElement.firstElementChild.lastElementChild.innerText;
  const response = await fetch(`/user/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  fetchTasks();
};

let updateTaskId = "";

const updateTask = (el) => {
  if (
    profileStyles.display === "none" &&
    addTaskAreaStyles.display === "none"
  ) {
    updateTaskArea.style.display = "block";
    updateTaskId =
      el.parentElement.parentElement.firstElementChild.lastElementChild
        .innerText;
  }
};

const closeUpdateTaskModal = () => {
  updateTaskArea.style.display = "none";
};

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updatedData = {
    task: taskUpdatedName.value,
    due: taskUpdatedDueDate.value,
    description: taskUpdatedDescription.value,
  };
  const response = await fetch(`/user/tasks/${updateTaskId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();
  taskUpdatedName.value = "";
  taskUpdatedDueDate.value = "";
  taskUpdatedDescription.value = "";
  updateTaskArea.style.display = "none";
  fetchTasks();
});
const getUser = async () => {
  const response = await fetch("/users/me");
  const data = await response.json();
  username.value = data.name;
  age.value = data.age;
  email.value = data.email;
};

getUser();
let isMatch = false;
const updateUserInfo = async () => {
  if (newPassword.value && confirmPassword.value) {
    if (newPassword.value === confirmPassword.value) {
      isMatch = true;
    }
  }
  let updatedUserData = {};
  if (isMatch) {
    updatedUserData = {
      name: username.value,
      age: age.value,
      email: email.value,
      password: confirmPassword.value,
    };
  } else {
    updatedUserData = {
      name: username.value,
      age: age.value,
      email: email.value,
    };
  }
  const response = await fetch("/users/me", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  });
  const data = await response.json();
  console.log(data);
  newPassword.value = "";
  confirmPassword.value = "";
  profileSection.style.display = "none";
  getUser();
};
saveBtn.addEventListener("click", updateUserInfo);

logout.addEventListener("click", async () => {
  confirm("Are you sure want to log out");
  const response = await fetch("/users/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // const data = await response.json();
  window.location.href = "/";
});

logoutall.addEventListener("click", async () => {
  confirm("You will logout from all active devieces");
  const response = await fetch("/users/logoutAll", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // const data = await response.json();
  window.location.href = "/";
});

deleteAccount.addEventListener("click", async () => {
  confirm("Your account will be deleted permanently");
  const response = await fetch("/users/me", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // const data = await response.json();
  window.location.href = "/";
});
