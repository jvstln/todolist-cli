# Simple Todolist Application

This is a simple Todolist application built with TypeScript and Inquirer.js. The application features a cli interface for adding, removing, listing, completing and updating todo items.

## Features

- Add items to todolist. Items include `task`, `completed` and `dueDate` properties
- Update `task`, `complete status` and `dueDate` properties of items in todolist
- Remove an item from todolist
- CLI for managing todolist

## Setup

Run the following in your terminal to get started with the application

```bash
git clone https://github.com/jvstln/todolist-cli.git

cd todolist-cli

npm install

npm run start
```

## File Guide

- `todo.ts` - This contains the main TodoList class required by the given task
- `app.ts` - This contains an extended version of the TodoList class that support CLI
- `utils.ts` - This contains reusable helper functions that are needed throughout this task
- `tsconfig.json` and `package.json` - Configuration files required for the app to run without issues
- `js/` - This folder contains javascript version of all transpiled typescript file in this task
