import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, Token } from '../../types';
import { getRefreshToken, setRefreshToken, clearRefreshToken } from '../../services/tokenManager';

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
  refreshToken: getRefreshToken(),
  isAuthenticated: false,
  authStatus: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.authStatus = 'succeeded';
      setRefreshToken(action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.authStatus = 'failed';
      clearRefreshToken();
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
