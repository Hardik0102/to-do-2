
// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a valid task.");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.className = "task";
  taskItem.innerHTML = `
    <input type="checkbox">
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = "";
  updateLocalStorage();
}

// Function to delete a task
function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  updateLocalStorage();
}

// Function to delete all selected tasks
function deleteSelected() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByClassName("task");
  for (let i = tasks.length - 1; i >= 0; i--) {
    const checkbox = tasks[i].getElementsByTagName("input")[0];
    if (checkbox.checked) {
      tasks[i].remove();
    }
  }
  updateLocalStorage();
}

// Function to delete all tasks
function deleteAll() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  updateLocalStorage();
}

// Function to update local storage with the current tasks
function updateLocalStorage() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByClassName("task");
  const taskData = [];

  for (let i = 0; i < tasks.length; i++) {
    const taskText = tasks[i].getElementsByTagName("span")[0].innerText;
    const isChecked = tasks[i].getElementsByTagName("input")[0].checked;
    taskData.push({ text: taskText, checked: isChecked });
  }

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

// Function to load tasks from local storage on page load
function loadTasks() {
  const taskList = document.getElementById("taskList");
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      const taskItem = document.createElement("li");
      taskItem.className = "task";
      taskItem.innerHTML = `
        <input type="checkbox" ${task.checked ? "checked" : ""}>
        <span>${task.text}</span>
        <button onclick="deleteTask(this)">Delete</button>
      `;
      taskList.appendChild(taskItem);
    });
  }
}

// Load tasks from local storage on page load
loadTasks();
//192.168.1.36:5500
