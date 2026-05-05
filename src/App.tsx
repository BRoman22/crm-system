import './App.css';
import { Tasklist, Searchbar } from './components';
import type { TodoDTO, TodoData, TodoInfo } from './utils';
import { taskApi } from './api';
import { useEffect, useState, useTransition } from 'react';

type TodoKeys = keyof TodoInfo;

function App() {
  const [tasks, setTasks] = useState<TodoDTO | null>(null);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<TodoKeys>('all');

  useEffect(() => {
    startTransition(() => {
      taskApi.getTasks().then(setTasks);
    });
  }, []);

  function handleCreateTask(data: Pick<TodoData, 'title' | 'isDone'>) {
    startTransition(() => {
      taskApi.createTask(data).then((res) => {
        setTasks((prev) => {
          if (!prev) return null;

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
          if (!prev) return null;

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
          if (!prev) return null;

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
          if (!prev) return null;

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
        <Tasklist
          tasks={tasks}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDeleteTask}
          handleTitleChange={handleTitleChange}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </main>
  );
}

export default App;
