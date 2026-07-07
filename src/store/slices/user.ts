import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, Token } from '../../types';

interface AuthState {
  user: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: 0,
    username: '',
    email: '',
    date: '',
    isBlocked: false,
    roles: [],
    phoneNumber: '',
  },
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const loadTokensFromStorage = (): Pick<AuthState, 'accessToken' | 'refreshToken'> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

const saveTokensToStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokensFromStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    ...loadTokensFromStorage(),
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      saveTokensToStorage(action.payload.accessToken, action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearTokensFromStorage();
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice;
