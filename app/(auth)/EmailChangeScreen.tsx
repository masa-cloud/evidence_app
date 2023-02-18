import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { EmailChangePage } from '~/screens_components/AuthPages/EmailChange';

type EmailChangeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'EmailChangeScreen'
>;

type Props = {
  navigation: EmailChangeScreenNavigationProps;
};

export default function EmailChangeScreen(props: Props): JSX.Element {
  return <EmailChangePage {...props} />;
}
