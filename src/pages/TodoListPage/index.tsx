import { AddTodo, Tasklist, TodoStatusFilter } from '../../components';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../utils';
import { taskApi } from '../../api';
import { useEffect, useState, useCallback } from 'react';

export default function TodoListPage() {
  const [filter, setFilter] = useState<TodoInfoFilters>('all');
  const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>({
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

  const fetchTasks = useCallback(() => {
    taskApi.getTasks(filter).then(setTasks);
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="app">
      <AddTodo fetchTasks={fetchTasks} />
      <TodoStatusFilter statuses={tasks.info} filter={filter} setFilter={setFilter} />
      <Tasklist tasks={tasks.data} fetchTasks={fetchTasks} />
    </main>
  );
}
