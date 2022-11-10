import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text } from 'native-base';
import React from 'react';

import { Images } from '~/assets/images';
import { LeftIconButton } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';

type TestDetailScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestDetailScreen'
>;

type Props = {
  navigation: TestDetailScreenNavigationProps;
};

/** @package */
export const TestDetail = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  const explain = {
    title: 'VIA強みテスト',
    detail:
      'あなたの強みを○○大学の研究を元に診断します。○○が分かると、○○なメリットがあります。',
    testCount: '16',
    testTime: '2',
  };
  // 全16問 (平均解答時間 2分)
  return (
    <PageContainer>
      <Title title={explain.title} pl="2" />
      <Text color={colors.text} fontSize="lg" mb="4">
        {`全${explain.testCount}問(平均解答時間${explain.testTime}分)`}
      </Text>
      <Image
        borderRadius={10}
        size="72px"
        source={Images.doctors}
        resizeMode="cover"
        mb="4"
      />
      <Text color={colors.text} fontSize="lg" mb="8">
        {explain.detail}
      </Text>
      <LeftIconButton
        text="診断を始める"
        onPress={() => navigation.navigate(RouteName.TestActionScreen)}
        iconName="cloud-upload"
      />
    </PageContainer>
  );
};
