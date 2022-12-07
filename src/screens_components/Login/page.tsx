import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';

import { LoginDialog } from './LoginDialog';

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'LoginScreen'
>;

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
