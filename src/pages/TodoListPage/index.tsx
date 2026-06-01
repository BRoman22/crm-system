import { AddTodo, Tasklist, TodoStatusFilter } from '../../components';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../utils';
import { validateString } from '../../utils';
import { taskApi } from '../../api';
import { useEffect, useState, useTransition, useCallback } from 'react';

export default function TodoListPage() {
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
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<TodoInfoFilters>('all');

  const fetchTasks = useCallback(() => {
    taskApi.getTasks(filter).then(setTasks);
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  function handleCreateTask(data: Pick<Todo, 'title' | 'isDone'>) {
    const validationError = validateString(data.title);

    if (validationError) {
      return alert(validationError);
    }

    startTransition(async () => {
      try {
        await taskApi.createTask(data);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleCheckboxChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    startTransition(async () => {
      try {
        await taskApi.updateTask(data);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleTitleChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    startTransition(async () => {
      try {
        await taskApi.updateTask(data);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleDeleteTask(id: number) {
    startTransition(async () => {
      try {
        await taskApi.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <main className="app">
      <AddTodo name={'title'} createTask={handleCreateTask} />
      {isPending ? (
        <div>Загрузка...</div>
      ) : (
        <>
          <TodoStatusFilter statuses={tasks.info} filter={filter} setFilter={setFilter} />
          <Tasklist
            tasks={tasks}
            handleCheckboxChange={handleCheckboxChange}
            handleDelete={handleDeleteTask}
            handleTitleChange={handleTitleChange}
          />
        </>
      )}
    </main>
  );
}
