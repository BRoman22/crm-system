import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constans';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import { logout } from './store/slices/user';
import { useRefreshMutation } from './store/api/user';
import { Spin } from 'antd';
import {
  TodoListPage,
  ProfilePage,
  UsersPage,
  LoginPage,
  RegisterPage,
  MainLayout,
  AuthLayout,
} from './pages';

export default function App() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.user.authStatus);
  const refreshToken = useAppSelector((state) => state.user.refreshToken);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (!refreshToken) {
      dispatch(logout());
      return;
    } else {
      refresh({ refreshToken });
    }
  }, []);

  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <Spin
        size="large"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout redirectPath={ROUTES.LOGIN} />}>
        <Route path={ROUTES.TODO_LIST} element={<TodoListPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.USERS} element={<UsersPage redirectPath={ROUTES.TODO_LIST} />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.TODO_LIST} replace />} />
    </Routes>
  );
}
