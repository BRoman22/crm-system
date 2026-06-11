import { Routes, Route } from 'react-router-dom';
import { TodoListPage, NotFoundPage, ProfilePage } from './pages';
import { ROUTES } from './constans';
import { MainLayout } from './pages/MainLayout';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.TODO_LIST} element={<TodoListPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
