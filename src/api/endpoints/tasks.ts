import { type TodoDTO, type TodoData, type TodoFilters, ENDPOINTS } from '../../utils';
// import { fetchApi } from '../index';

const { VITE_API_URL } = import.meta.env;
const url = `${VITE_API_URL}/${ENDPOINTS.todos}`;

// const taskApi: TaskApi = {
//   getTasks: (filter = 'all') => fetchApi.get(`${url}?filter=${filter}`),
//   createTask: ({ title, isDone }) => fetchApi.post(url, { title, isDone }),
//   updateTask: ({ id, title, isDone }) => fetchApi.put(`${url}/${id}`, { title, isDone }),
//   deleteTask: (id) => fetchApi.delete(`${url}/${id}`),
// };

interface TaskApi {
  getTasks: (filter: TodoFilters) => Promise<TodoDTO>;
  createTask: (data: Pick<TodoData, 'title' | 'isDone'>) => Promise<TodoData>;
  updateTask: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => Promise<TodoData>;
  deleteTask: (id: number) => Promise<boolean>;
}

const taskApi: TaskApi = {
  getTasks: (filter = 'all') => fetch(`${url}?filter=${filter}`).then((res) => res.json()),

  createTask: ({ title, isDone }) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone }),
    }).then((res) => res.json()),

  updateTask: ({ id, title, isDone }) =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isDone }),
    }).then((res) => res.json()),

  deleteTask: (id) => fetch(`${url}/${id}`, { method: 'DELETE' }).then(() => true),
};

export default taskApi;
