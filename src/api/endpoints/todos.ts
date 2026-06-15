import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { ENDPOINTS } from '../../constans';
import axios, { type AxiosInstance } from 'axios';

const { VITE_API_URL } = import.meta.env;
const todosUrl = `${VITE_API_URL}/${ENDPOINTS.todos}`;

const apiClient: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTodos(
  filter: TodoInfoFilters = 'all'
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await apiClient.get<MetaResponse<Todo, TodoInfo>>(todosUrl, {
    params: { filter },
  });
  return response.data;
}

export async function createTodo(
  data: Pick<Todo, 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await apiClient.post<MetaResponse<Todo, TodoInfo>>(todosUrl, data);
  return response.data;
}

export async function updateTodo(
  id: number,
  data: Pick<Todo, 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await apiClient.put<MetaResponse<Todo, TodoInfo>>(`${todosUrl}/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: number): Promise<boolean> {
  await apiClient.delete(`${todosUrl}/${id}`);
  return true;
}
