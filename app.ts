import { confirm, input, search, select } from "@inquirer/prompts";
import { TodoList, TodoListError } from "./todo";
import { delay, getDateObject, separate, textFormats, truncate } from "./utils";

class TodoListCLI extends TodoList {
  async init() {
    try {
      const menuAction = await this.getMenuActions();

      switch (menuAction) {
        case "add":
          await this.addTodo();
          break;
        case "list":
          await this.listTodosAsync();
          break;
        case "complete":
          await this.completeTodo();
          break;
        case "remove":
          await this.removeTodo();
          break;
        case "update":
          await this.updateTodo();
          break;
        default:
          throw new Error("Exiting...");
      }

      separate();
      delay(2000); // Delay 2sec before the mainmenu for simulation
      this.init(); // After each action, rerun from mainmenu
    } catch (error) {
      separate("red");
      console.log(
        textFormats.red(error instanceof Error ? error.message : `${error}`)
      );
      separate("red");

      if (error instanceof TodoListError) {
        this.init();
      }
    }
  }

  async getMenuActions() {
    const selectedAction = await select({
      message: "What do you want to do?",
      choices: [
        { name: "Create a new todo", value: "add" },
        { name: "List all todos", value: "list" },
        { name: "Complete a todo", value: "complete" },
        { name: "Remove a todo", value: "remove" },
        { name: "Update a todo", value: "update" },
        { name: "Exit", value: "exit" },
      ],
    });

    separate();
    return selectedAction;
  }

  async selectTodo(message = "Search/Select a todo") {
    if (this.todos.length === 0) {
      throw new TodoListError("No todolist item available. Create one first");
    }

    const source = this.todos.map((todo) => ({
      name: todo.task,
      value: todo,
    }));

    const selectedTodo = await search({
      message,
      source: (term) => {
        if (!term) return source;

        return source.filter(
          (item) =>
            item.name.toLowerCase().includes(term.toLowerCase()) ||
            item.value.dueDate
              ?.toString()
              .toLowerCase()
              .includes(term.toLowerCase())
        );
      },
    });

    return selectedTodo;
  }

  async addTodo() {
    const task = await input({
      message: "Enter todo title/task: ",
      required: true,
    });

    const dueDateString = await input({
      message: "Enter due date (eg 2021-01-20): ",
    });

    super.addTodo(task, getDateObject(dueDateString));
  }

  async updateTodo() {
    const selectedTodo = await this.selectTodo("Search/Select todo to update");

    const newTask = await input({
      message: "Enter new todo title/task: ",
      default: selectedTodo.task,
    });

    const newDueDateString = await input({
      message: "Enter new todo due date: ",
      default: selectedTodo.dueDate?.toISOString(),
    });
    const newDueDate = getDateObject(newDueDateString);

    this.updateTodoTask(selectedTodo.id, newTask);
    if (newDueDate) this.updateTodoDueDate(selectedTodo.id, newDueDate);
    separate();
  }

  async removeTodo() {
    const selectedTodo = await this.selectTodo("Search/Select todo to remove");

    const confirmRemove = await confirm({
      message: `Are you sure you want to remove todo: ${truncate(
        selectedTodo.task,
        10
      )}`,
    });

    if (confirmRemove) {
      super.removeTodo(selectedTodo.id);
    }
  }

  async completeTodo() {
    const selectedTodo = await this.selectTodo(
      "Search/Select a todo to complete"
    );

    const confirmComplete = await confirm({
      message: `Mark ${truncate(selectedTodo.task, 10)} as completed?`,
    });

    if (confirmComplete) {
      super.completeTodo(selectedTodo.id);
    }
  }

  async listTodosAsync() {
    this.listTodos();
    await input({ message: "Use `Enter` key to return to mainmenu" });
  }
}

const todoListCLI = new TodoListCLI();
// Just for Aesthetics
console.log(`
 ___                                                      
  |  _   _|  _  |  o  _ _|_   |\\/|  _. ._   _.  _   _  ._ 
  | (_) (_| (_) |_ | _>  |_   |  | (_| | | (_| (_| (/_ |  
                                                _|`);
separate();
todoListCLI.init(); // Start the main CLI app
