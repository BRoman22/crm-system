import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { ENDPOINTS } from '../../constans';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;
const todosUrl = `${VITE_API_URL}/${ENDPOINTS.todos}`;

export async function getTodos(
  filter: TodoInfoFilters = 'all'
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.get<MetaResponse<Todo, TodoInfo>>(todosUrl, {
    params: { filter },
  });
  return response.data;
}

export async function createTodo(
  data: Pick<Todo, 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.post<MetaResponse<Todo, TodoInfo>>(todosUrl, data);
  return response.data;
}

export async function updateTodo(
  id: number,
  data: Pick<Todo, 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.put<MetaResponse<Todo, TodoInfo>>(`${todosUrl}/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: number): Promise<boolean> {
  await axios.delete(`${todosUrl}/${id}`);
  return true;
}
