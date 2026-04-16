"use strict";
const userTodoInput = document.querySelector(".todo-input");
const todoFor = document.querySelector(".input-section");
const todoList = document.querySelector(".todo-list");
const spanError = document.querySelector(".error");
console.log(userTodoInput, todoFor, todoList,  spanError);

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
  editBtn.addEventListener("click", handleEdit);
}

todoFor.addEventListener("submit", ChangeAttitude);
