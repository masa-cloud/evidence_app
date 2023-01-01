import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import React, { FC } from 'react';

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
export const MyPage: FC<Props> = (props) => {
  const { colors } = useTheme();

  return (
    <PageContainer>
      <Text fontSize="xl" fontWeight="bold" color={colors.text}>
        MyPage
      </Text>
    </PageContainer>
  );
};
