const o=`import { create } from "zustand";
import type { ITodo } from "@/types";

interface ITodoStore {
  todos: ITodo[];
  addTodo: (content: string, done: boolean) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  getTodos: () => ITodo[];
}

const useTodoStore = create<ITodoStore>((set, get) => {
  return {
    todos: [],
    addTodo: (content: string, done: boolean) => {
      return set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            content,
            done,
          },
        ],
      }));
    },
    toggleTodo: (id: number) => {
      return set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              done: !todo.done,
            };
          }
          return todo;
        }),
      }));
    },
    removeTodo: (id: number) => {
      return set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    getTodos: () => {
      return get().todos;
    },
  };
});

export default useTodoStore;
`;export{o as default};
