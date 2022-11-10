import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { TestAction } from '~/screens_components/TestAction';

type TestActionScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestActionScreen'
>;

type Props = {
  navigation: TestActionScreenNavigationProps;
};

export const TestActionScreen = (props: Props): JSX.Element => {
  return <TestAction {...props} />;
};
