import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabParamList } from '~/navigation/rootStackParamList';
import { MyPage } from '~/screens_components/MyPage';

type MyPageScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'MyPageScreen'
>;

type Props = {
  navigation: MyPageScreenNavigationProps;
};

export const MyPageScreen = (props: Props): JSX.Element => {
  return <MyPage {...props} />;
};
