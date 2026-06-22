import { AddTodo, Todolist, TodoStatusFilter } from '../../components';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { getTodos } from '../../api/endpoints/todos';
import { useEffect, useState, useCallback } from 'react';
import { notification } from 'antd';
import { ERROR_MESSAGES } from '../../constans';

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

  const fetchTodos = useCallback(async () => {
    try {
      getTodos(filter).then(setTodos);
    } catch (error) {
      console.error(error);
      notification.error({
        title: ERROR_MESSAGES.TITLE,
        description: ERROR_MESSAGES.FETCH_TODOS,
      });
    }
  }, [filter]);

  useEffect(() => {
    void fetchTodos();

    const intervalId = setInterval(() => {
      void fetchTodos();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchTodos]);

  return (
    <>
      <AddTodo fetchTodos={fetchTodos} />
      <TodoStatusFilter statuses={todos.info} filter={filter} setFilter={setFilter} />
      <Todolist todos={todos.data} fetchTodos={fetchTodos} />
    </>
  );
}
