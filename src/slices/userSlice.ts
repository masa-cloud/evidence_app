import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUser } from 'amazon-cognito-identity-js';

import type { RootState } from '../store';

type userStatus = {
  email: string;
  isLogin: boolean;
  user: CognitoUser | undefined;
};

const initialState: userStatus = Object.freeze({
  email: '',
  isLogin: false,
  user: undefined,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<CognitoUser>) => {
      const user = action.payload;
      const userPayload = user.getSignInUserSession()?.getIdToken().payload;
      if (userPayload !== undefined && userPayload.email === state.email) {
        // state = initialState
        return;
      }
      const typeCheckUserPayload = userPayload as { [key: string]: any };
      const email = typeCheckUserPayload.email as string;
      state = { email, isLogin: true, user };
      console.log('login', { state });
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});
export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState): userStatus => state.user;
export default userSlice.reducer;
