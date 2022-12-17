const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    saveLocalTodo(todoInput.value);

    newTodo.innerHTML = todoInput.value;
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    

}

function saveLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCompleteTodo(event){
    const item = event.target;
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.remove();

    }else if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo(event){
    const todo = todoList.childNodes;
    todo.forEach(function(todo) {
        switch(event.target.value){
            case "all" :
                todo.style.display = "flex";
                break;

                case "completed":
                    if (todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else { 
                        
                        todo.style.display = "none";
                    }
                break;

                case "uncompleted" : 
                if (todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
    
        newTodo.innerHTML = todo;
        todoDiv.appendChild(newTodo);
    
        
    
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-btn");
        completeButton.innerHTML = "<i class='fas fa-check'></i>";
        todoDiv.appendChild(completeButton);
    
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    })
}