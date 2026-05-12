import { Searchbar, Tasklist, TodoStatusFilter } from '../../components';
import type { TodoDTO, TodoData, TodoKeys } from '../../utils';
import { validateTitle } from '../../utils';
import { taskApi } from '../../api';
import { useEffect, useState, useTransition } from 'react';

export default function TodoListPage() {
  const [tasks, setTasks] = useState<TodoDTO>({
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
  const [filter, setFilter] = useState<TodoKeys>('all');

  function fetchTasks() {
    taskApi.getTasks().then(setTasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleCreateTask(data: Pick<TodoData, 'title' | 'isDone'>) {
    if (validateTitle(data.title)) return;

    startTransition(async () => {
      try {
        await taskApi.createTask(data);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleCheckboxChange(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    startTransition(async () => {
      try {
        await taskApi.updateTask(data);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleTitleChange(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
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
      <Searchbar name={'title'} createTask={handleCreateTask} />
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
            filter={filter}
          />
        </>
      )}
    </main>
  );
}
