import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { SignUpPage } from '~/screens_components/AuthPages/SignUp';

export type SignUpScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'SignUpScreen'
>;

type Props = {
  navigation: SignUpScreenNavigationProps;
};

export default function SignUpScreen(props: Props): JSX.Element {
  return <SignUpPage {...props} />;
}
