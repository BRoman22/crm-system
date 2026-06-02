import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { ENDPOINTS } from '../../constans';

const { VITE_API_URL } = import.meta.env;
const url = `${VITE_API_URL}/${ENDPOINTS.todos}`;

export function getTodos(filter: TodoInfoFilters = 'all'): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(`${url}?filter=${filter}`).then((res) => res.json());
}

export function createTodo(
  body: Pick<Todo, 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function updateTodo(
  body: Pick<Todo, 'id' | 'title' | 'isDone'>
): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(`${url}/${body.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function deleteTodo(id: number): Promise<boolean> {
  return fetch(`${url}/${id}`, { method: 'DELETE' }).then(() => true);
}
