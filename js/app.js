"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@inquirer/prompts");
const todo_1 = require("./todo");
const utils_1 = require("./utils");
class TodoListCLI extends todo_1.TodoList {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuAction = yield this.getMenuActions();
                switch (menuAction) {
                    case "add":
                        yield this.addTodo();
                        break;
                    case "list":
                        yield this.listTodosAsync();
                        break;
                    case "complete":
                        yield this.completeTodo();
                        break;
                    case "remove":
                        yield this.removeTodo();
                        break;
                    case "update":
                        yield this.updateTodo();
                        break;
                    default:
                        throw new Error("Exiting...");
                }
                (0, utils_1.separate)();
                (0, utils_1.delay)(2000); // Delay 2sec before the mainmenu for simulation
                this.init(); // After each action, rerun from mainmenu
            }
            catch (error) {
                (0, utils_1.separate)("red");
                console.log(utils_1.textFormats.red(error instanceof Error ? error.message : `${error}`));
                (0, utils_1.separate)("red");
                if (error instanceof todo_1.TodoListError) {
                    this.init();
                }
            }
        });
    }
    getMenuActions() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedAction = yield (0, prompts_1.select)({
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
            (0, utils_1.separate)();
            return selectedAction;
        });
    }
    selectTodo() {
        return __awaiter(this, arguments, void 0, function* (message = "Search/Select a todo") {
            if (this.todos.length === 0) {
                throw new todo_1.TodoListError("No todolist item available. Create one first");
            }
            const source = this.todos.map((todo) => ({
                name: todo.task,
                value: todo,
            }));
            const selectedTodo = yield (0, prompts_1.search)({
                message,
                source: (term) => {
                    if (!term)
                        return source;
                    return source.filter((item) => {
                        var _a;
                        return item.name.toLowerCase().includes(term.toLowerCase()) ||
                            ((_a = item.value.dueDate) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes(term.toLowerCase()));
                    });
                },
            });
            return selectedTodo;
        });
    }
    addTodo() {
        const _super = Object.create(null, {
            addTodo: { get: () => super.addTodo }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield (0, prompts_1.input)({
                message: "Enter todo title/task: ",
                required: true,
            });
            const dueDateString = yield (0, prompts_1.input)({
                message: "Enter due date (eg 2021-01-20): ",
            });
            _super.addTodo.call(this, task, (0, utils_1.getDateObject)(dueDateString));
        });
    }
    updateTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const selectedTodo = yield this.selectTodo("Search/Select todo to update");
            const newTask = yield (0, prompts_1.input)({
                message: "Enter new todo title/task: ",
                default: selectedTodo.task,
            });
            const newDueDateString = yield (0, prompts_1.input)({
                message: "Enter new todo due date: ",
                default: (_a = selectedTodo.dueDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
            });
            const newDueDate = (0, utils_1.getDateObject)(newDueDateString);
            this.updateTodoTask(selectedTodo.id, newTask);
            if (newDueDate)
                this.updateTodoDueDate(selectedTodo.id, newDueDate);
            (0, utils_1.separate)();
        });
    }
    removeTodo() {
        const _super = Object.create(null, {
            removeTodo: { get: () => super.removeTodo }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const selectedTodo = yield this.selectTodo("Search/Select todo to remove");
            const confirmRemove = yield (0, prompts_1.confirm)({
                message: `Are you sure you want to remove todo: ${(0, utils_1.truncate)(selectedTodo.task, 10)}`,
            });
            if (confirmRemove) {
                _super.removeTodo.call(this, selectedTodo.id);
            }
        });
    }
    completeTodo() {
        const _super = Object.create(null, {
            completeTodo: { get: () => super.completeTodo }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const selectedTodo = yield this.selectTodo("Search/Select a todo to complete");
            const confirmComplete = yield (0, prompts_1.confirm)({
                message: `Mark ${(0, utils_1.truncate)(selectedTodo.task, 10)} as completed?`,
            });
            if (confirmComplete) {
                _super.completeTodo.call(this, selectedTodo.id);
            }
        });
    }
    listTodosAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.listTodos();
            yield (0, prompts_1.input)({ message: "Use `Enter` key to return to mainmenu" });
        });
    }
}
const todoListCLI = new TodoListCLI();
// Just for Aesthetics
console.log(`
 ___                                                      
  |  _   _|  _  |  o  _ _|_   |\\/|  _. ._   _.  _   _  ._ 
  | (_) (_| (_) |_ | _>  |_   |  | (_| | | (_| (_| (/_ |  
                                                _|`);
(0, utils_1.separate)();
todoListCLI.init(); // Start the main CLI app
