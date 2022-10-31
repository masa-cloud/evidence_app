import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar } from 'native-base';
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
      <Avatar
        bg="indigo.500"
        source={{
          uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      >
        JB
      </Avatar>
    </View>
  );
};
