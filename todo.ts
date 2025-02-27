interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: Date;
}

class TodoList {
  private todos: TodoItem[] = [];

  // A helper method to get the todo item by id
  getTodo(id: number): TodoItem | false {
    const selectedTodo = this.todos.find((todo) => todo.id === id);
    if (!selectedTodo) {
      console.log("Todo not found");
      return false;
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
    console.log("Todo added");
  }

  completeTodo(id: number): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      selectedTodo.completed = true;
      console.log("Todo completed");
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
    console.log("- List of todos -");
    this.todos.forEach((todo) => {
      console.log(
        `Task: ${todo.task}, Completed: ${todo.completed}, Due Date: ${
          todo.dueDate ? todo.dueDate.toDateString() : "NONE"
        }`
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
      console.log("Todo task updated");
    }
  }

  // For updating the extended property `dueDate`
  updateTodoDueDate(id: number, dueDate: Date): void {
    const selectedTodo = this.getTodo(id);
    if (selectedTodo) {
      selectedTodo.dueDate = dueDate;
      console.log("Todo dueDate updated");
    }
  }
}

const todo = new TodoList();
todo.addTodo("Bag a sac");
todo.addTodo("OGC", new Date());
todo.listTodos();
