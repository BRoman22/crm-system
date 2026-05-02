import './App.scss';
import { Tasklist, Searchbar } from './components';
import { type Listitem } from './types';

const mockData: Listitem[] = [
  { id: 1, title: 'Task 1', status: 'active' },
  { id: 2, title: 'Task 2', status: 'done' },
  { id: 3, title: 'Task 3', status: 'active' },
  { id: 4, title: 'Task 4', status: 'done' },
  { id: 5, title: 'Task 5', status: 'active' },
];

function App() {
  return (
    <main className="app">
      <Searchbar />
      <Tasklist listData={mockData} />
    </main>
  );
}

export default App;
