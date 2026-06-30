import { configureStore, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import todosSlice from './slices/todos';
import { todosApi } from './api/todos';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([todosApi.middleware]),
});

const actions = {
  ...todosSlice.actions,
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
