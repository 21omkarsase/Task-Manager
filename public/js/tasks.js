//loading spinner
const spinner = document.querySelector(".loading-spinner");

//navbar
const navLinks = document.querySelector(".nav-links");
const barIcon = document.querySelector(".barIcon");
const crossBarIcon = document.querySelector(".crossBarIcon");

//header
const header = document.querySelector(".header");
const sortSelect = document.querySelector("#sortSelect");
const viewSelect = document.querySelector("#viewSelect");
const sortTasks = document.querySelector(".sortTasks");
const viewTasks = document.querySelector(".viewTasks");

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

//navbar

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
    link.style.borderBottom = "2px solid white";
    link.style.marginBottom = "5px";
  });
  link.addEventListener("mouseleave", () => {
    link.style.borderBottom = "none";
    link.style.marginBottom = "0px";
  });
});

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
    let html = "";
    if (data.length < 1) {
      header.style.display = "block";
      html = `<h2>No Tasks Found<p style="font-size:16px;">create your first task now</p></h2>`;
      sortTasks.style.display = "none";
      viewTasks.style.display = "none";
    } else {
      header.style.display = "none";
      sortTasks.style.display = "flex";
      viewTasks.style.display = "flex";
      const sortVal = sortSelect.options[sortSelect.selectedIndex].value;
      const viewVal = viewSelect.options[viewSelect.selectedIndex].value;
      if (sortVal === "newestFirst") {
        data.reverse();
      }
      data.forEach((task) => {
        let duepart1 = task.due.split("T")[0];
        let duepart2 = task.due.split("T")[1].split(".")[0];
        let dueDate = `${duepart1} (${duepart2})`;
        if (viewVal === "board") {
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
                    ${dueDate}</label>
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
        } else if (viewVal === "list") {
          html += `<div class="listTask">
            <div class="listTaskInfo">
              <p><span class="listTaskHeading">Title :</span><span class="listtaskdes">  ${task.task}</span></p>
              <p><span class="listTaskHeading">Due : </span><span class="listtaskdes">  ${dueDate}</span></p>
              <p><span class="listTaskHeading">Description :</span><p class="listtaskdes">  ${task.description}</p></p><p class="taskId">${task._id}</p>
            </div>
            <div class="listTaskIcons">
              <span class="edit" onclick="updateTask(this)">
                <i class="fa-solid fa-pen-to-square"></i>
              </span>
              <span class="trash" onclick="deleteTask(this)">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
              </span>
            </div>
          </div>`;
        }
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
  spinner.style.display = "block";
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
    spinner.style.display = "none";
    fetchTasks();
  }
  spinner.style.display = "none";
  if (response.status === 404) {
    alert("Cant't create a task");
  }

  taskName.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
});

const deleteTask = async (el) => {
  const taskId =
    el.parentElement.parentElement.firstElementChild.lastElementChild.innerText;

  spinner.style.display = "block";
  const response = await fetch(`/user/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  spinner.style.display = "none";
  if (response.status === 404) {
    alert("Cant't create a task");
  }
  fetchTasks();
};

let updateTaskId = "";
const currentData = {};
const updateTask = async (el) => {
  if (
    profileStyles.display === "none" &&
    addTaskAreaStyles.display === "none"
  ) {
    updateTaskArea.style.display = "block";
    updateTaskId =
      el.parentElement.parentElement.firstElementChild.lastElementChild
        .innerText;
    spinner.style.display = "block";
    const response = await fetch(`/user/tasks/${updateTaskId}`);
    const data = await response.json();
    spinner.style.display = "none";
    // let duedate = data.due.split("T")[0];
    taskUpdatedName.value = data.task;
    taskUpdatedDescription.value = data.description;
    taskUpdatedDueDate.value = data.due;
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
  spinner.style.display = "block";
  const response = await fetch(`/user/tasks/${updateTaskId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  spinner.style.display = "none";
  taskUpdatedName.value = "";
  taskUpdatedDueDate.value = "";
  taskUpdatedDescription.value = "";
  updateTaskArea.style.display = "none";
  fetchTasks();
  if (response.status === 404) {
    alert("Cant't update a task");
  }
});
const getUser = async () => {
  spinner.style.display = "block";
  const response = await fetch("/users/me");
  const data = await response.json();
  spinner.style.display = "none";
  if (response.ok) {
    username.value = data.name;
    age.value = data.age;
    email.value = data.email;
  } else {
    alert("User information currently unavaliable");
  }
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
  spinner.style.display = "block";
  const response = await fetch("/users/me", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  });
  if (response.ok) {
    const data = await response.json();
    spinner.style.display = "none";
  } else {
    spinner.style.display = "none";
    alert("Cant't update user");
  }
  spinner.style.display = "none";
  newPassword.value = "";
  confirmPassword.value = "";
  profileSection.style.display = "none";
  getUser();
};
saveBtn.addEventListener("click", updateUserInfo);

logout.addEventListener("click", async () => {
  if (confirm("Are you sure want to log out")) {
    spinner.style.display = "block";
    const response = await fetch("/users/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    spinner.style.display = "none";
    if (!response.ok) {
      alert("user logout failed");
      return;
    }
    window.location.href = "/";
  }
});

logoutall.addEventListener("click", async () => {
  if (confirm("You will logout from all active devieces")) {
    spinner.style.display = "block";
    const response = await fetch("/users/logoutAll", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    spinner.style.display = "none";
    if (!response.ok) {
      alert("Logout failed");
      return;
    }
    window.location.href = "/";
  }
});

deleteAccount.addEventListener("click", async () => {
  if (confirm("Your account will be deleted permanently")) {
    spinner.style.display = "block";
    const response = await fetch("/users/me", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    spinner.style.display = "none";
    if (!response.ok) {
      alert("Account delete failed");
      return;
    }
    window.location.href = "/";
  }
});

//header

sortSelect.addEventListener("change", async (e) => {
  const selectVal = e.target.value;

  if (selectVal === "newestFirst") {
    const response = await fetch(`/user/tasks?sortBy=createdAt:desc`);
    const data = await response.json();
  } else if (selectVal === "oldestFirst") {
    const response = await fetch(`/user/tasks?sortBy=createdAt:asc`);
    const data = await response.json();
  }
});

sortSelect.addEventListener("change", () => {
  fetchTasks();
});

viewSelect.addEventListener("change", () => {
  fetchTasks();
});
