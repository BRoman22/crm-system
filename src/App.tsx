import { Routes, Route } from 'react-router-dom';
import { TodoListPage, NotFoundPage, ProfilePage } from './pages';
import { ROUTES } from './constans';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.TODO_LIST} element={<TodoListPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
