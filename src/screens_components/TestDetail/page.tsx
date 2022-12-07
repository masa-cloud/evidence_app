import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ScrollView, Text } from 'native-base';
import React, { FC } from 'react';

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
export const TestDetail: FC<Props> = (props) => {
  const { colors } = useTheme();
  const explain = {
    title: 'ショートBIG5テスト',
    detail: `ビッグファイブとは、心理学的にも信憑性が高いとされている性格分析理論です。
ビッグファイブは人間の性格を5つの分野に分けた理論のことで、
具体的には、

①開放性 = 知的好奇心
②誠実性 = まじめさ
③外向性 = 社交的
④調和性 = やさしさ
⑤神経症傾向 = 不安や緊張しがち

で構成されています。

正式なビッグファイブは長くて手間がかかるため、近年ではショートバージョンが開発され、それがショートBIG5という今回のテストです。
ロンドン大学のチャモロ・プレムージク博士が考案したバージョンで、全10問のビッグファイブを計測していく内容になっています。
      `,
    testCount: '16',
    testTime: '2',
  };
  // 全16問 (平均解答時間 2分)
  return (
    <PageContainer>
      <ScrollView>
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
          onPress={() => props.navigation.navigate(RouteName.TestActionScreen)}
          iconName="cloud-upload"
        />
      </ScrollView>
    </PageContainer>
  );
};
