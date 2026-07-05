import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../customBaseQuery';
import { ENDPOINTS } from '../../constans';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getTodos: build.query<MetaResponse<Todo, TodoInfo>, TodoInfoFilters>({
      query: (filter = 'all') => ({
        url: ENDPOINTS.TODOS,
        params: { filter },
      }),
    }),
    createTodo: build.mutation<MetaResponse<Todo, TodoInfo>, Pick<Todo, 'title' | 'isDone'>>({
      query: (body) => ({
        url: ENDPOINTS.TODOS,
        method: 'POST',
        body,
      }),
    }),
    updateTodo: build.mutation<
      MetaResponse<Todo, TodoInfo>,
      { id: number; body: Pick<Todo, 'title' | 'isDone'> }
    >({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.TODOS}/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTodo: build.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.TODOS}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
