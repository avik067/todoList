let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

//////////////////////////////////////////////////////////////////////////////////////////////////////
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage(); // temporary save >> this is an object now as we already pased the string from the local storage
let todosCount = todoList.length;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
saveTodoButton.onclick = function() {
    // parmanent save >> we dont change the local storage directly we send the current todoList in string to replace the previous from storage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

;
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;

            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }

    );

    todoList.splice(deleteElementIndex, 1);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked-class");

    let todoObjectIndex = todoList.findIndex(
        function(eachitem) {
            let eachitemId = "todo" + eachitem.uniqueNo
            if (eachitemId === todoId) {
                return true
            } else {
                return false
            }
        }
    )
    let todoObject = todoList[todoObjectIndex]

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false
    } else {
        todoObject.isChecked = true
    }
}

///////////////////////////////////////////////////////////////////////////////////////
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked // .checked checks the status , we are giving the value from todoList 

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
        //console.log(checkboxId,labelId)
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked-class")
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}
//////////////////////////////////////////////////////////
for (let todo of todoList) {
    createAndAppendTodo(todo);
}

//////////////////////////////////////////////////////////////
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    }

    ;
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}

;