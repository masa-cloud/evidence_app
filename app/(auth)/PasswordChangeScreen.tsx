import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { PasswordChangePage } from '~/screens_components/AuthPages/PasswordChange';

export type PasswordChangeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'PasswordChangeScreen'
>;

type Props = {
  navigation: PasswordChangeScreenNavigationProps;
};

export default function PasswordChangeScreen(props: Props): JSX.Element {
  return <PasswordChangePage {...props} />;
}
