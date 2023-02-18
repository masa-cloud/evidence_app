import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';
import { Home } from '~/screens_components/Home';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProps;
};

export default function HomeScreen(props: Props): JSX.Element {
  return <Home {...props} />;
}
