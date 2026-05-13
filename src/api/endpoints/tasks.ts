import { type TodoDTO, type TodoData, type TodoFilters, BASE_URL, ENDPOINTS } from '../../utils';
import { fetchApi } from '../index';

const url = `${BASE_URL}/${ENDPOINTS.todos}`;

interface TaskApi {
  getTasks: (filter: TodoFilters) => Promise<TodoDTO>;
  createTask: (data: Pick<TodoData, 'title' | 'isDone'>) => Promise<TodoData>;
  getTask: (id: number) => Promise<TodoData>;
  updateTask: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => Promise<TodoData>;
  deleteTask: (id: number) => Promise<boolean>;
}

const taskApi: TaskApi = {
  getTasks: (filter = 'all') => fetchApi.get(`${url}?filter=${filter}`),
  createTask: ({ title, isDone }) => fetchApi.post(url, { title, isDone }),
  getTask: (id) => fetchApi.get(`${url}/${id}`),
  updateTask: ({ id, title, isDone }) => fetchApi.put(`${url}/${id}`, { title, isDone }),
  deleteTask: (id) => fetchApi.delete(`${url}/${id}`),
};

export default taskApi;
