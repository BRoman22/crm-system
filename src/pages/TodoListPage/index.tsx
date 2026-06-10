import { AddTodo, Todolist, TodoStatusFilter } from '../../components';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { getTodos } from '../../api/endpoints/todos';
import { useEffect, useState, useCallback } from 'react';

export default function TodoListPage() {
  const [filter, setFilter] = useState<TodoInfoFilters>('all');
  const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: {
      totalAmount: 0,
    },
  });

  const fetchTodos = useCallback(() => {
    getTodos(filter).then(setTodos);
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className="app">
      <AddTodo fetchTodos={fetchTodos} />
      <TodoStatusFilter statuses={todos.info} filter={filter} setFilter={setFilter} />
      <Todolist todos={todos.data} fetchTodos={fetchTodos} />
    </main>
  );
}
