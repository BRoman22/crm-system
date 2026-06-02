import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { ENDPOINTS } from '../../constans';

const { VITE_API_URL } = import.meta.env;
const url = `${VITE_API_URL}/${ENDPOINTS.todos}`;

const taskApi = {
  getTasks: (filter: TodoInfoFilters = 'all'): Promise<MetaResponse<Todo, TodoInfo>> =>
    fetch(`${url}?filter=${filter}`).then((res) => res.json()),

  createTask: ({
    title,
    isDone,
  }: Pick<Todo, 'title' | 'isDone'>): Promise<MetaResponse<Todo, TodoInfo>> =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone }),
    }).then((res) => res.json()),

  updateTask: ({
    id,
    title,
    isDone,
  }: Pick<Todo, 'id' | 'title' | 'isDone'>): Promise<MetaResponse<Todo, TodoInfo>> =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone }),
    }).then((res) => res.json()),

  deleteTask: (id: number): Promise<boolean> =>
    fetch(`${url}/${id}`, { method: 'DELETE' }).then(() => true),
};

export default taskApi;
