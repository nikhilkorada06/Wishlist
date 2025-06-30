
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");

let todo;

let localData =JSON.parse (localStorage.getItem("todo"));

let todoList = localData || [];


/**Creating function for unique ID */

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
        let number = Math.random() * 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}




addTodoButton.addEventListener("click", (event) => {

    /**if we are not using this event argument then our page will be reloaded 
      every time as we are using form tag as it has an action of submission.*/

    event.preventDefault();      //to solve this capture the event use this function.
    console.log("clicked");    

    todo = todoInput.value;

    if(todo.length > 0)
    {
        todoList.push({id: uuid(), todo: todo, isCompleted: false });
    }
    renderTodoList(todoList);

    localStorage.setItem("todo",JSON.stringify(todoList));
    todoInput.value = "";
})


showTodos.addEventListener("click",(e) => {

    let key = e.target.dataset.key;
   let delTodoKey = e.target.dataset.todokey;   
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo );
    todoList = todoList.filter(todo => todo.id !== delTodoKey);
    localStorage.setItem("todo",JSON.stringify(todoList));
    renderTodoList(todoList);
    console.log(todoList);

} )



function renderTodoList(todoList){
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class="todo relative"> 
                                                  <input id="item-${id}" type="checkbox" class="t-checkbox" data-key=${id} ${isCompleted ? "checked" : ""} >
                                                  <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todo}</label> 
                                                  <button class="absolute right-0 button cursor del-btn"><svg data-todokey=${id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>  
                                                  </div> `)
}

renderTodoList(todoList);