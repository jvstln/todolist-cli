import { textFormats, truncate } from "./utils";

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: Date;
}

export class TodoList {
  protected todos: TodoItem[] = [];

  // A helper method to get todo item by id
  getTodo(id: number): TodoItem {
    const selectedTodo = this.todos.find((todo) => todo.id === id);
    if (!selectedTodo) {
      throw new TodoListError("Todo not found");
    }
    return selectedTodo;
  }

  addTodo(task: string, dueDate?: Date): void {
    const todo: TodoItem = {
      id: Math.random(), // Generate a random number as the id
      task,
      completed: false,
      dueDate,
    };
    this.todos.push(todo);
    console.log(`Todo "${truncate(task, 15)}" added`);
  }

  completeTodo(id: number): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      selectedTodo.completed = true;
      console.log("Mark todo as completed");
    }
  }

  removeTodo(id: number): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      this.todos.splice(this.todos.indexOf(selectedTodo), 1);
      console.log("Todo removed");
    }
  }

  listTodos(): TodoItem[] {
    if (this.todos.length === 0) {
      console.log(textFormats.red("No todo items to list. Create one first"));
      return [];
    }

    console.log("- List of todos -");
    this.todos.forEach((todo) => {
      console.log(
        `Task: ${textFormats.bold(todo.task)}, Completed: ${textFormats.bold(
          todo.completed.toString()
        )}, Due Date: ${textFormats.bold(
          todo.dueDate ? todo.dueDate.toDateString() : "NONE"
        )}`
      );
    });
    console.log("------------------");

    return this.todos;
  }

  getTodosByStatus(completed: boolean): TodoItem[] {
    return this.todos.filter((todo) => todo.completed === completed);
  }

  updateTodoTask(id: number, task: string): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      selectedTodo.task = task;
      console.log(`Todo task updated to ${truncate(task, 15)}`);
    }
  }

  // For updating the extended property `dueDate`
  updateTodoDueDate(id: number, dueDate: Date): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      selectedTodo.dueDate = dueDate;
      console.log("Todo dueDate updated to", dueDate.toLocaleString());
    }
  }
}

// This is an extension of Error object that is meant to redirect you to the main menu of the CLI when thrown
// This is for tracking different errors thrown in the CLI
export class TodoListError extends Error {
  type = "todolist";
}

// For examples, use the CLI (app.ts)
