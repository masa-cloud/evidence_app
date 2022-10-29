import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { BottomTabParamList } from '~/navigation/rootStackParamList';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProps;
};

export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1 justify-center')}>
      <Text style={{ color: colors.text }}>Home</Text>
    </View>
  );
};
