import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text } from 'native-base';
import React from 'react';

import { Images } from '~/assets/images';
import { LeftIconButton } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { HomeTabParamList } from '~/navigation/rootStackParamList';

type TestResultScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestResultScreen'
>;

type Props = {
  navigation: TestResultScreenNavigationProps;
};

/** @package */
export const TestResult = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  const result = {
    title: 'VIA強みテストの結果',
    detail:
      'あなたの強みを○○大学の研究を元に診断します。分かると、○○なメリットがあります。',
    testCount: '16',
    testTime: '2',
  };
  // 全16問 (平均解答時間 2分)
  return (
    <PageContainer>
      <Title title={result.title} pl="2" />
      <Image
        borderRadius={10}
        size="72px"
        source={Images.doctors}
        resizeMode="cover"
        mb="4"
      />
      <Text color={colors.text} fontSize="lg" mb="8">
        {result.detail}
      </Text>
      <LeftIconButton
        text="Twitterにシェア"
        onPress={null}
        iconName="cloud-upload"
      />
    </PageContainer>
  );
};
