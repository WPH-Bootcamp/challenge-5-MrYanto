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

  addTodo(title, priority) {
    const newTodo = new Todo(Date.now(), title, priority);
    this.todos.push(newTodo);
  }

  deleteTodo(id) {
    this.todos.filter((todo) => todo.id !== id);
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
