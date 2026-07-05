import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../../types';

const initialState: Profile = {
  id: 0,
  username: '',
  email: '',
  date: '',
  isBlocked: false,
  roles: [],
  phoneNumber: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Profile>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.date = action.payload.date;
      state.isBlocked = action.payload.isBlocked;
      state.roles = action.payload.roles;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
