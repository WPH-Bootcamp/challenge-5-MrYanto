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
}
