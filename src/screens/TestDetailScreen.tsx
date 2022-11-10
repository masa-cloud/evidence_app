import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { TestDetail } from '~/screens_components/TestDetail';

type TestDetailScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestDetailScreen'
>;

type Props = {
  navigation: TestDetailScreenNavigationProps;
};

export const TestDetailScreen = (props: Props): JSX.Element => {
  return <TestDetail {...props} />;
};
