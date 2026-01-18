import type { ITodo } from "@/types";
import { makeAutoObservable } from "mobx";

class TodoStore {
  todos: ITodo[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addTodo(content: string, done: boolean) {
    this.todos.push({
      id: Date.now(),
      content,
      done,
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  get doneTodosCnt() {
    return this.todos.filter((todo) => todo.done).length;
  }

  get undoneTodosCnt() {
    return this.todos.filter((todo) => !todo.done).length;
  }
}

export default new TodoStore();
