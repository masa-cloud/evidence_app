import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { PasswordResetPage } from '~/screens_components/AuthPages/PasswordReset';

export type PasswordResetScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'PasswordResetScreen'
>;

type Props = {
  navigation: PasswordResetScreenNavigationProps;
};

export const PasswordResetScreen = (props: Props): JSX.Element => {
  return <PasswordResetPage {...props} />;
};
