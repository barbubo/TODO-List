const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.submitButton');
const todoList = document.querySelector('.todoList');
const completedButton = document.querySelector('.completedBtn');
const uncompletedButton = document.querySelector('.uncompletedBtn');
const allButton = document.querySelector('.allBtn');
const removeCompletedButton = document.querySelector('.removeCompletedBtn');
const completeAllButton = document.querySelector('.completeAll');
removeCompletedButton.style.display = 'none';

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
completedButton.addEventListener('click', filterCompleted);
uncompletedButton.addEventListener('click', filterUncompleted);
allButton.addEventListener('click', filterAll);
removeCompletedButton.addEventListener('click', removeCompleted);
completeAllButton.addEventListener('click', completeAll);
function addTodo(event){
    if(todoInput.value === "") {
        event.preventDefault();
        alert("You can't add a blank Todo");
    }
    else {
        event.preventDefault();
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);
        saveLocalTodos(todoInput.value);
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add("completeBtn");
        todoDiv.appendChild(completeButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trashBtn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
        todoInput.value = '';
        spawnFilterButtons();
    }
}
function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trashBtn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
            spawnFilterButtons();
            spawnButton();
        })
    }
    if(item.classList[0] === 'completeBtn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        spawnButton();
    }
}

function spawnButton(){
    const todos = todoList.childNodes;
    let i = 0;
    todos.forEach(function(todo){
        if(todo.classList.contains('completed')){
            i = i + 1;
        }
    });
    if (i === 0)removeCompletedButton.style.display = 'none';
    else removeCompletedButton.style.display = 'flex';
}

function filterCompleted(){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.classList.contains('completed')) {
            todo.style.display = 'flex';
        }
        else {
            todo.style.display = 'none';
        }
    });
}

function filterUncompleted(){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.classList.contains('completed')) {
            todo.style.display = 'none';
        }
        else {
            todo.style.display = 'flex';
        }
    });
}

function filterAll(){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        todo.style.display = 'flex';
    });
}

function removeCompleted(){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.classList.contains('completed')){
            todo.classList.add("fall");
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function(){
                todo.remove();
                spawnFilterButtons();
            })
        }
    })
    removeCompletedButton.style.display = 'none';
}
function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add("completeBtn");
        todoDiv.appendChild(completeButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trashBtn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    })
    spawnFilterButtons();
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function completeAll(event){
    event.preventDefault();
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        todo.classList.toggle('completed');
        spawnButton();
    });
}
function spawnFilterButtons(){
    const todos = todoList.childNodes;
    console.log(todos);
    let i = 0;
    todos.forEach(function(){
        i = i + 1;
    });
    if (i === 0){
        completedButton.style.display = "none";
        uncompletedButton.style.display = "none";
        allButton.style.display = "none";
    }
    else {
        completedButton.style.display = "flex";
        uncompletedButton.style.display = "flex";
        allButton.style.display = "flex";
    }
}