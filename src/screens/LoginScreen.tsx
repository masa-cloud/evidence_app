import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { Login } from '~/screens_components/Login';

type LoginScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'LoginScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProps;
};

export const LoginScreen = (props: Props): JSX.Element => {
  return <Login {...props} />;
};
