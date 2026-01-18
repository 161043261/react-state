import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "@/types";

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      prepare: (content: string, done: boolean) => ({
        payload: {
          id: Date.now(),
          content,
          done,
        },
      }),
      reducer: (state, action: PayloadAction<ITodo>) => {
        action.payload.id = state.length;
        state.push(action.payload);
      },
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
