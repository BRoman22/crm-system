import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaResponse, Todo, TodoInfo } from '../../types';

const initialState: MetaResponse<Todo, TodoInfo> = {
  data: [],
  info: {
    all: 0,
    completed: 0,
    inWork: 0,
  },
  meta: {
    totalAmount: 0,
  },
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<MetaResponse<Todo, TodoInfo>>) {
      state.data = action.payload.data;
      state.info = action.payload.info;
      state.meta = action.payload.meta;
      return state;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice;
