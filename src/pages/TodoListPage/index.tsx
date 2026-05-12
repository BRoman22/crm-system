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

  useEffect(() => {
    startTransition(() => {
      taskApi.getTasks().then(setTasks);
    });
  }, []);

  function handleCreateTask(data: Pick<TodoData, 'title' | 'isDone'>) {
    if (validateTitle(data.title)) return;

    startTransition(() => {
      taskApi.createTask(data).then((res) => {
        setTasks((prev) => {
          const updatedData = [...prev.data, res];
          return {
            ...prev,
            data: updatedData,
            info: {
              all: updatedData.length,
              completed: updatedData.filter((task) => task.isDone).length,
              inWork: updatedData.filter((task) => !task.isDone).length,
            },
          };
        });
      });
    });
  }

  function handleCheckboxChange(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    startTransition(() => {
      taskApi.updateTask(data).then(() =>
        setTasks((prev) => {
          const updatedData = prev.data.map((task) =>
            task.id === data.id ? { ...task, title: data.title, isDone: data.isDone } : task
          );

          return {
            ...prev,
            data: updatedData,
            info: {
              all: prev.info.all,
              completed: updatedData.filter((task) => task.isDone).length,
              inWork: updatedData.filter((task) => !task.isDone).length,
            },
          };
        })
      );
    });
  }

  function handleTitleChange(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    startTransition(() => {
      taskApi.updateTask(data).then(() =>
        setTasks((prev) => {
          const updatedData = prev.data.map((task) =>
            task.id === data.id ? { ...task, title: data.title, isDone: data.isDone } : task
          );

          return {
            ...prev,
            data: updatedData,
          };
        })
      );
    });
  }

  function handleDeleteTask(id: number) {
    startTransition(() => {
      taskApi.deleteTask(id).then(() =>
        setTasks((prev) => {
          const updatedData = prev.data.filter((task) => task.id !== id);

          return {
            ...prev,
            data: prev.data.filter((task) => task.id !== id),
            info: {
              all: updatedData.length,
              completed: updatedData.filter((task) => task.isDone).length,
              inWork: updatedData.filter((task) => !task.isDone).length,
            },
          };
        })
      );
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
