import React, { FC } from 'react';

import { LoginScreenNavigationProps } from '~/../app/(auth)/LoginScreen';

import { LoginDialog } from './LoginDialog';

type Props = {
  navigation: LoginScreenNavigationProps;
};

export const enum LoginState {
  Login,
  Confirm,
}

/** @package */
export const Login: FC<Props> = (props) => {
  return <LoginDialog navigation={props.navigation} />;
};
