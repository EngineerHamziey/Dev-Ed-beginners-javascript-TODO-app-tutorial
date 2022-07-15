// localStorage.clear();
// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
/*run the getTodos when the content just loaded,
i.e if user reload or user just arrive on the site*/
document.addEventListener("DOMContentLoaded", getTodos());
/*when the button is clicked, we want to 
execute the function called "addTodo"*/
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Functions
function addTodo(event) {
  // to prevent the form from submitting
  event.preventDefault();
  console.log(todoInput.value);
  // Create the todo div
  const todoDiv = document.createElement('div');
  //add a class to it
  todoDiv.classList.add("todo");
  //we create LI
  /*storing the code in a
  variable(i.e it's kinda like a function )*/
  const newTodo = document.createElement("li");
  //giving it what has been typed as the new todo.
  newTodo.innerText = todoInput.value;
  // giving it a class name "todo-item"
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCALSTORAGE
  /*we should add it before changing the
  todoInput value to nothing*/
  saveLocalTodos(todoInput.value);
  // check MARK button 
  const completeButton = document.createElement("button");
  /* we add it as html because we need 
  to add icon to the button*/
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  // check TRASH button 
  const trashButton = document.createElement("button");
  /* we add it as html because we need to
  add icon to the button*/
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  /* the div that contains all the above
  elements has not been appended yet, it's
  kinkda floating around, now let's append it*/
  todoList.appendChild(todoDiv);
  /* to clear the todo input value after
  saving to the list*/
  todoInput.value = "";
}


function deleteCheck(e) {
  // log e.target to see what we are clicking on
  // console.log(e.target);// just for testing
  const item = e.target;
  //for the delete todo
  /* if the first(i.e[0]) class of an
  item is trash-btn, eg 
  <li class="trash-btn blk-btn">...</li>, remember,
  item is whatever we click*/
  if (item.classList[0] == "trash-btn") {
    /* seclecting the parent element
    of what we clicked i.e its whole container
    and deleting it*/
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    /* we should wait for the transition
    to end before removing the element complately*/
    todo.addEventListener(
      "transitionend", function () {
        /* this will wait until transition ends then
         execute the function */
        todo.remove();
      });
  }

  // checkmark
  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement;
    // to add one more class list called completed to it
    todo.classList.toggle("completed");

  }
}

// 
function filterTodo(e) {
  //this grab all the children
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    //i.e execute this function for each of the todos (i.e the list items as defined in todoList.childNodes )
    /*e.target == options(not when the select it self is clicked,) and e.target.value == the value of the option we clicked*/
    switch (e.target.value) {
      //if the clicked option is all
      case "all":
        // since the all is the default we are showing already, we don't need to check anything
        todo.style.display = "flex";
        break;
      //if the clicked option is completed
      case "completed":
        //then we need to select the ones that have the .completed class
        if (todo.classList.contains("completed")) {
          //since this is what we have in our css already, using display block will mess up our style
          todo.style.display = "flex";
        } else {
          //don't display them if they don't have the completed class, i.e filter the completed out
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        //notice the NOT ! this if statement
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}


// save to the local storage
function saveLocalTodos(todo) {
  /*check if we alreay have a todo in our local storage already,
  assuming user have used this web app to save todos already then
  he refreshed the browser or he came back some other days, then we will already have the todos on the localStorage*/
  let todos;// block scope variable "let"
  if (localStorage.getItem("todos") === null) {
    todos = [];// i.e if its empty, then initialize an empty array called todos;
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));/*if it's not empty, parse it into our variable "todos" */
  }
  todos.push(todo);/*then add the new item to the todos array(i.e the new item we are passing in this
     funtion i.e todo in function  saveLocalTodos(todo) which is a new todo item entered by user)*/
  localStorage.setItem("todos", JSON.stringify(todos));//puts back the todo into the local storage as a String
}

function getTodos() {
  let todos;
  //check if we have something with name todos in the local storage
  if (localStorage.getItem("todos") === null) {
    // if we don't, initialize an empty array
    todos = [];
  } else {//else, git those items and save them into the todo variable as array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // then update the webpage using the previously saved values
  todos.forEach(function (todo) {
    // Create the todo div
    const todoDiv = document.createElement('div');
    //add a class to it
    todoDiv.classList.add("todo");
    //we create LI
    const newTodo = document.createElement("li");//storing the code in a variable(i.e it's a function )
    newTodo.innerText = todo;//we need it from the local storage
    newTodo.classList.add("todo-item");// giving it a class name 
    todoDiv.appendChild(newTodo);
    // check MARK button 
    const completeButton = document.createElement("button");
    // we add it as html because we need to add icon to the button
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // check TRASH button 
    const trashButton = document.createElement("button");
    // we add it as html because we need to add icon to the button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // the div that contains all the above elements has not been appended yet, it's kinkda floating around, now let's append it
    todoList.appendChild(todoDiv);
  });
}

//TO DELETE items from the local storage,
function removeLocalTodos(todo) {
  let todos;
  //check if we have something with name todos in the local storage
  if (localStorage.getItem("todos") === null) {
    // if we don't, initialize an empty array
    todos = [];
  } else {//else, git those items and save them into the todo variable as array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;/*...childer[0] means the first childeren,
  i.e the <li>, then's it's innerText is what we saved in the local storage. and we need to delete it*/
  todos.splice(todos.indexOf(todoIndex), 1);// i.e delete 1 element, starting from it itself(this is an array method)
  // then we update the localStorage.
  localStorage.setItem("todos", JSON.stringify(todos));//remember to stringify it 
}