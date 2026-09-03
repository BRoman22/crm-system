import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { ENDPOINTS } from '../../constans';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    getTodos: build.query<MetaResponse<Todo, TodoInfo>, TodoInfoFilters>({
      query: (filter = 'all') => ({
        url: ENDPOINTS.TODOS,
        params: { filter },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'Todo' as const, id: 'LIST' },
            ]
          : [{ type: 'Todo' as const, id: 'LIST' }],
    }),
    createTodo: build.mutation<MetaResponse<Todo, TodoInfo>, Pick<Todo, 'title' | 'isDone'>>({
      query: (body) => ({
        url: ENDPOINTS.TODOS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todo' as const, id: 'LIST' }],
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
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Todo' as const, id },
        { type: 'Todo' as const, id: 'LIST' },
      ],
    }),
    deleteTodo: build.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.TODOS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Todo' as const, id },
        { type: 'Todo' as const, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
