const o=`import { atom } from "jotai";
import type { ITodo } from "@/types";

const todosAtom = atom<ITodo[]>([] /** initialValue */);

const addTodoAtom = atom(
  null /** initialValue */,
  (get, set, content: string, done: boolean) => {
    const todos = get(todosAtom);
    set(todosAtom, [
      ...todos,
      {
        id: Date.now(),
        content,
        done,
      },
    ]);
  } /** write */,
);

const toggleTodoAtom = atom(
  null /** initialValue */,
  (get, set, id: number) => {
    const todos = get(todosAtom);
    set(
      todosAtom,
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      }),
    );
  } /** write */,
);

const removeTodoAtom = atom(
  null /** initialValue */,
  (get, set, id: number) => {
    const todos = get(todosAtom);
    set(
      todosAtom,
      todos.filter((todo) => todo.id !== id),
    );
  } /** write */,
);

const doneTodosCntAtom = atom(
  (get) => get(todosAtom).filter((todo) => todo.done).length, // read
);

const undoneTodosCntAtom = atom(
  (get) => get(todosAtom).filter((todo) => !todo.done).length, // read
);

export {
  todosAtom,
  addTodoAtom,
  toggleTodoAtom,
  removeTodoAtom,
  doneTodosCntAtom,
  undoneTodosCntAtom,
};
`;export{o as default};
