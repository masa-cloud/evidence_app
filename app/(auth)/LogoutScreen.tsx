import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { Logout } from '~/screens_components/AuthPages/Logout';

export type LogoutScreenNavigationProps = NativeStackNavigationProp<HomeTabParamList, 'LogoutScreen'>;

type Props = {
  navigation: LogoutScreenNavigationProps;
};

export default function LogoutScreen(props: Props): JSX.Element {
  return <Logout {...props} />;
}
