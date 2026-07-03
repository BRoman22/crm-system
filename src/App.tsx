import { Routes, Route, Navigate } from 'react-router-dom';
import {
  TodoListPage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  MainLayout,
  AuthLayout,
} from './pages';
import { ROUTES } from './constans';
import { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage onLogin={handleLogin} />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout isAuth={isAuthenticated} redirectPath={ROUTES.LOGIN} />}>
        <Route path={ROUTES.TODO_LIST} element={<TodoListPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage onLogout={handleLogout} />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.TODO_LIST} replace />} />
    </Routes>
  );
}
