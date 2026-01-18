import type { ITodo } from "@/types";
import { action, computed, makeObservable, observable } from "mobx";

class TodoStore {
  @observable todos: ITodo[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound // 绑定 this
  addTodo(content: string, done: boolean) {
    this.todos.push({
      id: Date.now(),
      content,
      done,
    });
  }

  @action.bound
  toggleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  @action.bound
  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  @computed
  get doneTodosCnt() {
    return this.todos.filter((todo) => todo.done).length;
  }

  @computed
  get undoneTodosCnt() {
    return this.todos.filter((todo) => !todo.done).length;
  }
}

const todoStore = new TodoStore();
export default todoStore;
