"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListError = exports.TodoList = void 0;
const utils_1 = require("./utils");
class TodoList {
    constructor() {
        this.todos = [];
    }
    // A helper method to get todo item by id
    getTodo(id) {
        const selectedTodo = this.todos.find((todo) => todo.id === id);
        if (!selectedTodo) {
            throw new TodoListError("Todo not found");
        }
        return selectedTodo;
    }
    addTodo(task, dueDate) {
        const todo = {
            id: Math.random(), // Generate a random number as the id
            task,
            completed: false,
            dueDate,
        };
        this.todos.push(todo);
        console.log(`Todo "${(0, utils_1.truncate)(task, 15)}" added`);
    }
    completeTodo(id) {
        const selectedTodo = this.getTodo(id);
        if (selectedTodo) {
            selectedTodo.completed = true;
            console.log("Mark todo as completed");
        }
    }
    removeTodo(id) {
        const selectedTodo = this.getTodo(id);
        if (selectedTodo) {
            this.todos.splice(this.todos.indexOf(selectedTodo), 1);
            console.log("Todo removed");
        }
    }
    listTodos() {
        if (this.todos.length === 0) {
            console.log(utils_1.textFormats.red("No todo items to list. Create one first"));
            return [];
        }
        console.log("- List of todos -");
        this.todos.forEach((todo) => {
            console.log(`Task: ${utils_1.textFormats.bold(todo.task)}, Completed: ${utils_1.textFormats.bold(todo.completed.toString())}, Due Date: ${utils_1.textFormats.bold(todo.dueDate ? todo.dueDate.toDateString() : "NONE")}`);
        });
        console.log("------------------");
        return this.todos;
    }
    getTodosByStatus(completed) {
        return this.todos.filter((todo) => todo.completed === completed);
    }
    updateTodoTask(id, task) {
        const selectedTodo = this.getTodo(id);
        if (selectedTodo) {
            selectedTodo.task = task;
            console.log(`Todo task updated to ${(0, utils_1.truncate)(task, 15)}`);
        }
    }
    // For updating the extended property `dueDate`
    updateTodoDueDate(id, dueDate) {
        const selectedTodo = this.getTodo(id);
        if (selectedTodo) {
            selectedTodo.dueDate = dueDate;
            console.log("Todo dueDate updated to", dueDate.toLocaleString());
        }
    }
}
exports.TodoList = TodoList;
// This is an extension of Error object that is meant to redirect you to the main menu of the CLI when thrown
// This is for tracking different errors thrown in the CLI
class TodoListError extends Error {
    constructor() {
        super(...arguments);
        this.type = "todolist";
    }
}
exports.TodoListError = TodoListError;
// For examples, use the CLI (app.ts)
