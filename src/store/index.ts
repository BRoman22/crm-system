import { configureStore, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import userSlice from './slices/user';
import { todosApi } from './api/todos';
import { userApi } from './api/user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([todosApi.middleware, userApi.middleware]),
});

const actions = {
  ...userSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useActions = () => bindActionCreators(actions, useAppDispatch());
export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
