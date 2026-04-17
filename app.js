"use strict";
const userTodoInput = document.querySelector(".todo-input");
const todoFor = document.querySelector(".input-section");
const todoList = document.querySelector(".todo-list");
const spanError = document.querySelector(".error");
const filterBtnAll = document.querySelectorAll(".filter-btn");
const filterContBtn = document.querySelector(".filters");
const activeCount = document.getElementById("activeCount");
const completedCont = document.getElementById("completedCount");
console.log(
  userTodoInput,
  todoFor,
  todoList,
  spanError,
  filterBtnAll,
  filterContBtn,
  activeCount,
  completedCont,
);

function ChangeAttitude(e) {
  e.preventDefault();
  console.log(e);
  const task = userTodoInput.value;
  if (task === "") {
    spanError.textContent = "Error: Task is Empty";
    spanError.classList.add("active");
    return;
    // console.log()
  }
  console.log(task);
  // set create eleent part
  spanError.classList.remove("active");
  const liTodo = document.createElement("li");
  const inputComplete = document.createElement("input");
  const spanTodoText = document.createElement("span");
  const contActionTodo = document.createElement("div");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  //set attribute part
  liTodo.setAttribute("class", "todo-item");
  inputComplete.setAttribute("type", "checkbox");
  inputComplete.setAttribute("class", "todo-checkbox");
  inputComplete.setAttribute("aria-label", "completed toggle");
  spanTodoText.setAttribute("class", "todo-text");
  contActionTodo.setAttribute("class", "todo-actions");
  editBtn.setAttribute("class", "edit-btn");
  delBtn.setAttribute("class", "delete-btn");
  editBtn.setAttribute("title", "Edit");
  delBtn.setAttribute("title", "Delete");

  // the input part

  spanTodoText.textContent = task;
  editBtn.textContent = "✏️";
  delBtn.textContent = "🗑️";

  // to put everything inside the todolist

  liTodo.appendChild(inputComplete);
  liTodo.appendChild(spanTodoText);
  contActionTodo.appendChild(editBtn);
  contActionTodo.appendChild(delBtn);
  liTodo.appendChild(contActionTodo);
  todoList.appendChild(liTodo);

  // to put everything to 0

  userTodoInput.value = "";

  console.log(inputComplete);
  console.log(liTodo);
  console.log(spanTodoText);
  console.log(contActionTodo);
  console.log(editBtn);
  console.log(delBtn);

  // a function for delete

  function handleDelete() {
    todoList.removeChild(liTodo);
  }

  delBtn.addEventListener("click", handleDelete);

  // edit part
  //created a new input fro javascript
  function handleEdit() {
    const editTodoInput = document.createElement("input");
    const saveBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const editTopper = document.createElement("span");
    // gave the eleents an attribruite
    editTodoInput.setAttribute("type", "text");
    editTodoInput.setAttribute("class", "edit-input");
    saveBtn.setAttribute("class", "save-btn");
    cancelBtn.setAttribute("class", "cancel-btn");
    editTopper.setAttribute("class", "edit-topper");

    editTodoInput.value = spanTodoText.textContent;
    saveBtn.textContent = "✔";
    cancelBtn.textContent = "x";

    editTopper.appendChild(editTodoInput);
    editTopper.appendChild(saveBtn);
    editTopper.appendChild(cancelBtn);

    spanTodoText.replaceWith(editTopper);
    editTodoInput.focus();
    editTodoInput.select();
    console.log(editTodoInput, saveBtn);

    function handleCancelEdit() {
      editTopper.replaceWith(spanTodoText);
    }

    function handleSave() {
      const editValue = editTodoInput.value;
      console.log(editValue);
      spanTodoText.textContent = editValue;
      editTopper.replaceWith(spanTodoText);
    }

    cancelBtn.addEventListener("click", handleCancelEdit);

    saveBtn.addEventListener("click", handleSave);
  }
  function handleFinish() {
    liTodo.classList.toggle("completed");
    updateCounts();
  }
  inputComplete.addEventListener("change", handleFinish);
  editBtn.addEventListener("click", handleEdit);
  updateCounts();
}

todoFor.addEventListener("submit", ChangeAttitude);
//closure: a closure is when a function retains information about it parent function even if the function has already returned

//

//for the filters
//filters part
for (let i = 0; i < filterBtnAll.length; i++) {
  const allBtnFilter = filterBtnAll[i];
  //we create  a function to update the syste so it can know which filter button was clicked
  function filterUpdateBtn() {
    //this picked all our  dataset fro our htl
    const typeFilter = allBtnFilter.dataset.filter;
    if (typeFilter === "all") {
      allBtnFilter.classList.add("active");
      filterBtnAll[1].classList.remove("active");
      filterBtnAll[2].classList.remove("active");
    } else if (typeFilter === "active") {
      allBtnFilter.classList.add("active");
      filterBtnAll[0].classList.remove("active");
      filterBtnAll[2].classList.remove("active");
    } else if (typeFilter === "completed") {
      allBtnFilter.classList.add("active");
      filterBtnAll[0].classList.remove("active");
      filterBtnAll[1].classList.remove("active");
    }
    handleFilters(typeFilter);
  }
  allBtnFilter.addEventListener("click", filterUpdateBtn);
}
function handleFilters(typeFilter) {
  console.log({ typeFilter });
  const listAll = document.querySelectorAll(".todo-item");
  console.log(listAll);

  for (let i = 0; i < listAll.length; i++) {
    const todoT = listAll[i];
    const isCompleted = todoT.classList.contains("completed");
    console.log(isCompleted);

    todoT.style.display = "";
    if (typeFilter === "active") {
      if (!isCompleted) {
        todoT.style.display = "";
      } else {
        todoT.style.display = "none";
      }
    }

    if (typeFilter === "completed") {
      if (isCompleted) {
        todoT.style.display = "";
      } else {
        todoT.style.display = "none";
      }
    }
  }
}
function updateCounts() {
  const activeTodo = todoList.querySelectorAll(".todo-item");
  console.log({ activeTodo });
  const todoCoplete = todoList.querySelectorAll(".completed");
  const totalTodos = activeTodo.length;
  const copleteTodos = todoCoplete.length;
  const activeTodos = totalTodos - copleteTodos;
  console.log({ totalTodos, copleteTodos, activeTodos });
  activeCount.textContent = activeTodos;
  completedCont.textContent = copleteTodos;

  /*const completeTodo = todoList.querySelectorAll(".completed");
  const todoTotal = activeTodo.length;
  const completeTodos = completeTodo.length;
  const todoActive = todoTotal - completeTodos;
  console.log({ todoTotal, completeTodos, activeTodo });
  activeCount.textContent = activeTodo;
  completedCont.textContent = completeTodo;*/
}
