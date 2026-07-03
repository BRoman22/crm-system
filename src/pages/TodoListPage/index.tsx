import { AddTodo, Todolist, TodoStatusFilter } from '../../components';
import type { TodoInfoFilters } from '../../types';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { TODOS_ERROR_MESSAGES, TODOS_AUTO_REFRESH_INTERVAL } from '../../constans';
import { useGetTodosQuery } from '../../store/api/todos';

export default function TodoListPage() {
  const [filter, setFilter] = useState<TodoInfoFilters>('all');

  const { data, error, refetch } = useGetTodosQuery(filter, {
    pollingInterval: TODOS_AUTO_REFRESH_INTERVAL,
  });

  useEffect(() => {
    if (error) {
      notification.error({
        title: TODOS_ERROR_MESSAGES.TITLE,
        description: TODOS_ERROR_MESSAGES.GET_TODOS,
      });
    }
  }, [error]);

  return data ? (
    <>
      <AddTodo fetchTodos={refetch} />
      <TodoStatusFilter statuses={data.info} filter={filter} setFilter={setFilter} />
      <Todolist todos={data.data} fetchTodos={refetch} />
    </>
  ) : (
    <div>Загрузка...</div>
  );
}
