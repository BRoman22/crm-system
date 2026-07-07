import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constans';
import {
  TodoListPage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  MainLayout,
  AuthLayout,
} from './pages';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout redirectPath={ROUTES.LOGIN} />}>
        <Route path={ROUTES.TODO_LIST} element={<TodoListPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.TODO_LIST} replace />} />
    </Routes>
  );
}
