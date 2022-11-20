import { RouteProp, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text } from 'native-base';
import React, { FC, useEffect } from 'react';

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
  route: RouteProp<HomeTabParamList, 'TestResultScreen'>;
};

/** @package */
export const TestResult: FC<Props> = (props) => {
  const { colors } = useTheme();

  useEffect(() => {
    console.error(props.route.params.answers);
  }, []);

  const result = {
    title: 'ショートビッグファイブテストの結果',
    detail:
      'あなたの強みを○○大学の研究を元に診断します。分かると、○○なメリットがあります。',
    testCount: '16',
    testTime: '2',
  };
  // 質問１＋６＝外向性
  // 質問２＋７＝協調性
  // 質問３＋８＝誠実性
  // 質問４＋９＝神経症傾向
  // 質問５＋１０＝開放性
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
