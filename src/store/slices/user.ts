import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, Token } from '../../types';

interface AuthState {
  user: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
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
  authStatus: 'idle',
};

const loadTokenFromStorage = (): Pick<AuthState, 'refreshToken'> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    return {
      refreshToken: refreshToken || null,
    };
  } catch {
    return { refreshToken: null };
  }
};

const saveTokenToStorage = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokenFromStorage = () => {
  localStorage.removeItem('refreshToken');
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    ...loadTokenFromStorage(),
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.authStatus = 'succeeded';
      saveTokenToStorage(action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.authStatus = 'failed';
      clearTokenFromStorage();
    },
    setAuthChecking: (state) => {
      state.authStatus = 'loading';
    },
    setUser: (state, action: PayloadAction<Profile>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, logout, setAuthChecking, setUser } = userSlice.actions;
export default userSlice;
