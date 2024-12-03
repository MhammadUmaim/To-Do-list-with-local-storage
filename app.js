var boxElm = document.getElementsByClassName('box')[0];

function ListData(itemValue) {
    this.listText = itemValue;
    this.id = Math.floor((Math.random() * 1000 + Number((new Date().getTime().toString()).slice(-4))));
    this.done = false; // Added 'done' key
}

function saveData(data) {
    localStorage.setItem('todo_items', JSON.stringify(data));
    renderData(); // Re-render data after any update
}

function readData() {
    return JSON.parse(localStorage.getItem('todo_items'));
}

var todoData = (readData()) ? [...readData()] : []; // Load existing data or initialize an empty array

function submitInput(e) {
    e.preventDefault();
    var inpValue = document.getElementById('input-text').value;

    if (inpValue === "") {
      alert("The input feild can't be empty");
    }

    if (inpValue !== "") {
        var obj = new ListData(inpValue);
        todoData = [...todoData, obj];
        saveData(todoData); // Save to local storage
        document.getElementById('input-text').value = ""; // Clear input field
    }

}



function renderData() {
    boxElm.innerHTML = ""; // Clear UI
    for (var i = 0; i < todoData.length; i++) {
        var item = todoData[i];
        boxElm.innerHTML += "<div class='prnt-div' style='display:flex; margin-bottom: 8px;'>" +
            "<input type='text' value='" + item.listText + "' class='hide' />" +
            "<p style='" + (item.done ? "text-decoration: line-through;" : "") + "'>" + item.listText + "</p>" +
            "<button " + (item.done ? "disabled" : "") + " onClick='editItem(event, " + item.id + ")'>edit</button>" +
            "<button " + (item.done ? "disabled" : "") + " onClick='doneItem(" + item.id + ")'>done</button>" +
            "<button onClick='deleteItem(" + item.id + ")'>delete</button>" +
            "</div>";
    }
}

function editItem(e, id) {
    var parent = e.target.parentElement;
    var inputField = parent.children[0];
    var textField = parent.children[1];
    var editButton = e.target;

    inputField.style.display = "block";
    textField.style.display = "none";
    editButton.innerText = "save";

    editButton.setAttribute("onClick", "updateItem(" + id + ", event)");
}

function updateItem(id, e) {
    var inputField = e.target.parentElement.children[0];
    var updatedValue = inputField.value;

    if (updatedValue !== "") {
        for (var i = 0; i < todoData.length; i++) {
            if (todoData[i].id === id) {
                todoData[i].listText = updatedValue;
                break;
            }
        }
        saveData(todoData); // Save updated data and re-render
    }
}

function deleteItem(id) {
    var newData = [];
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id !== id) {
            newData.push(todoData[i]);
        }
    }
    todoData = newData;
    saveData(todoData); // Save updated data and re-render
}



function doneItem(id) {
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) {
            todoData[i].done = true;
            break;
        }
    }
    saveData(todoData); // Save updated data and re-render
}

renderData();
