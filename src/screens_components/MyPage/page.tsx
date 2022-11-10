import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { PageContainer } from '~/components/PageContainer';
import { BottomTabParamList } from '~/navigation/rootStackParamList';

type MyPageScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'MyPageScreen'
>;

type Props = {
  navigation: MyPageScreenNavigationProps;
};

/** @package */
export const MyPage = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();

  return (
    <PageContainer>
      <Text style={[tw()('text-xl font-bold'), { color: colors.text }]}>
        MyPage
      </Text>
    </PageContainer>
  );
};
