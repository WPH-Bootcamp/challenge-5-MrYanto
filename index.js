class Todo {
    constructor(id, title, priority, completed = false) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.completed = completed;
    }
}