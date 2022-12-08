import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

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

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await Auth.signOut();
  } catch (error: any) {
    console.log({ error });
  }
});

export const userSlice = createSlice({
  name: 'user',
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      console.warn('ログアウト成功');
      state = initialState;
    });
  },
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
      console.warn('ログイン成功');
    },
  },
});
export const { login } = userSlice.actions;

export const selectUser = (state: RootState): userStatus => state.user;
export default userSlice.reducer;
