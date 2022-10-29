import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '~/types/types';

import type { RootState } from '../store';

type State = {
  user: User;
};

const initialState: State = {
  user: { email: '', uid: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
export const selectUser = (state: RootState): User => state.user.user;
