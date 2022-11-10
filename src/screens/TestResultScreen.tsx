import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { TestResult } from '~/screens_components/TestResult';

type TestResultScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestResultScreen'
>;

type Props = {
  navigation: TestResultScreenNavigationProps;
};

export const TestResultScreen = (props: Props): JSX.Element => {
  return <TestResult {...props} />;
};
