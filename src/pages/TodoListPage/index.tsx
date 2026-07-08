import { AddTodo, Todolist, TodoStatusFilter } from '../../components';
import type { TodoInfoFilters } from '../../types';
import { useEffect, useState } from 'react';
import { notification, Spin } from 'antd';
import { TODOS_MESSAGES, TODOS_AUTO_REFRESH_INTERVAL } from '../../constans';
import { useGetTodosQuery } from '../../store/api/todos';

export default function TodoListPage() {
  const [filter, setFilter] = useState<TodoInfoFilters>('all');

  const { data: todos, error } = useGetTodosQuery(filter, {
    pollingInterval: TODOS_AUTO_REFRESH_INTERVAL,
  });

  useEffect(() => {
    if (error) {
      notification.error({
        title: TODOS_MESSAGES.TITLE,
        description: TODOS_MESSAGES.GET_TODOS,
      });
    }
  }, [error]);

  return todos ? (
    <>
      <AddTodo />
      <TodoStatusFilter statuses={todos.info} filter={filter} setFilter={setFilter} />
      <Todolist todos={todos.data} />
    </>
  ) : (
    <Spin
      size="large"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
