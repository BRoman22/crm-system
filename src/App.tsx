import './App.css';
import { Routes, Route } from 'react-router-dom';
import { TodoListPage, NotFoundPage } from './pages';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
