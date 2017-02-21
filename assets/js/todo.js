function add() {
    let task = document.getElementById('task').value;

    if (task !== null) {
        let todos = getTodos();
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));
        document.getElementById('task').value = '';
        show();
    }

    return false;
}

function getTodos() {
    let todos = new Array;
    let todoStr = localStorage.getItem('todo');

    if (todoStr !== null) {
        todos = JSON.parse(todoStr);
    }
    return todos;
}

function remove() {
    let id = this.getAttribute('id');
    console.log(id);
    let todos = getTodos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function show() {
    let todos = getTodos();

    if (todos !== null) {
        let html = '<ul>';
        for (let i = 0; i < todos.length; i++) {
            html += '<li>' + todos[i] + '<button type="button" class="btn btn-danger remove" id="' + i + '">x</button></li>';
        }
        html += '</ul>';

        document.getElementById('todos').innerHTML = html;
    }

    let buttons = document.getElementsByClassName('btn btn-danger remove');

    if (buttons !== null) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        }
    }
}

document.getElementById('add').addEventListener('click', add);
show();