import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

import type { RootState } from '../store';

type State = {
  user: userStatus;
};
type userStatus = {
  email: string;
  isLogin: boolean;
  // user: CognitoUser | undefined;
};

const initialState: State = {
  user: { email: '', isLogin: false },
  // user: undefined,
};

const logout = createAsyncThunk<
  Promise<void>,
  undefined,
  {
    rejectValue: string;
    state: { user: State };
  }
>('user/logout', async () => {
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
      state.user = initialState.user;
    });
  },
  initialState,
  reducers: {
    emailChange: (state, action: PayloadAction<Pick<userStatus, 'email'>>) => {
      state.user = { ...state.user, email: action.payload.email };
    },
    login: (state, action: PayloadAction<CognitoUser>) => {
      const user = action.payload;
      const userPayload = user.getSignInUserSession()?.getIdToken().payload;
      if (userPayload !== undefined && userPayload.email === state.user.email) {
        return;
      }
      const typeCheckUserPayload = userPayload as { [key: string]: any };
      const email = typeCheckUserPayload.email as string;
      state.user = { email, isLogin: true };
    },
  },
});
const { emailChange, login } = userSlice.actions;
const selectUser = (state: RootState): State => state.user;

export { emailChange, login, logout, selectUser };
export default userSlice.reducer;
