import './App.css';
import { Tasklist, Searchbar } from './components';
import { type TodoDTO } from './utils';
import { taskApi } from './api';
import { useEffect, useState, useTransition } from 'react';

function App() {
  const [tasks, setTasks] = useState<TodoDTO | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      taskApi.getTasks().then(setTasks);
    });
  }, []);

  return (
    <main className="app">
      <Searchbar />
      {isPending ? <div>Загрузка...</div> : <Tasklist listData={tasks} />}
    </main>
  );
}

export default App;
