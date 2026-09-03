import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../../types';

interface AdminState {
  data: Profile[];
  meta: {
    sortBy: string;
    sortOrder: string;
    totalAmount: number;
  };
}

const initialState: AdminState = {
  data: [],
  meta: {
    sortBy: '',
    sortOrder: '',
    totalAmount: 0,
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<Profile[]>) => {
      state.data = action.payload;
    },
    setMeta: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: string; totalAmount: number }>
    ) => {
      state.meta = action.payload;
    },
    setState: (state, action: PayloadAction<AdminState>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const { setState } = adminSlice.actions;
export default adminSlice;
