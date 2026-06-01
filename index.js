class Todo {
  constructor(id, title, priority, completed = false) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.completed = completed;
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(title, priority, id = Date.now(), completed = false) {
    const newTodo = new Todo(id, title, priority, completed);
    this.todos.push(newTodo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  completeTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
  }

  editTodo(id, newTitle) {
    const todo = this.todos.find((todo) => todo.id === id);
    todo.title = newTitle;
  }
}

const inputTodo = document.getElementById('inputTodo');
const inputPriority = document.getElementById('inputPriority');
const btnAdd = document.getElementById('btnAdd');
const todoList = document.getElementById('todoList');

const myList = new TodoList();

function renderTodo() {
  todoList.innerHTML = myList.todos
    .map((todo) => {
      return `
      <li class="${todo.priority} ${todo.completed ? 'completed' : ''}">
        <span>${todo.title} | Progress: ${todo.completed ? 'Completed' : 'WIP'}</span>
        <div>
          <button onclick="handleComplete(${todo.id})">${todo.completed ? '✅' : '☑️'}</button>
          <button onclick="handleEdit(${todo.id})">Edit</button>
          <button onclick="handleDelete(${todo.id})">Delete</button>
        </div>
      </li>
    `;
    })
    .join();
}

async function fetchTodos() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    const data = await response.json();
    data.forEach((todo) => {
      myList.addTodo(todo.title, 'low', todo.id, todo.completed);
    });
    renderTodo();
  } catch (error) {
    todoList.innerHTML = `<p> Uh oh! Something went wrong. Error: ${error} </p>`;
  }
}

btnAdd.addEventListener('click', () => {
  const title = inputTodo.value;
  const priority = inputPriority.value;

  if (!title.trim()) {
    alert("Todo can't be left empty");
    return;
  }

  myList.addTodo(title, priority);
  renderTodo();
  inputTodo.value = '';
});

function handleDelete(id) {
  myList.deleteTodo(id);
  renderTodo();
}

function handleComplete(id) {
  myList.completeTodo(id);
  renderTodo();
}

function handleEdit(id) {
  const newTitle = prompt('Edit todo:');
  if (!newTitle.trim()) return;
  myList.editTodo(id, newTitle);
  renderTodo();
}

fetchTodos();
