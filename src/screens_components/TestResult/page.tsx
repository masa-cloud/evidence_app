import { RouteProp, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, ScrollView, Text } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryPolarAxis,
} from 'victory-native';

import { LeftIconBadge } from '~/components/Badge';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { width } from '~/lib/constants';
import { HomeTabParamList } from '~/navigation/rootStackParamList';

type TestResultScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestResultScreen'
>;

type Props = {
  navigation: TestResultScreenNavigationProps;
  route: RouteProp<HomeTabParamList, 'TestResultScreen'>;
};

const characterData = [
  { 協調性: 10, 外向性: 10, 神経症傾向: 10, 誠実性: 10, 開放性: 10 },
  { 協調性: 5, 外向性: 5, 神経症傾向: 5, 誠実性: 5, 開放性: 5 },
];

const getMaxima = (data: typeof characterData) => {
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
};

const processData = (
  data: typeof characterData,
): Array<
  Array<{
    x: string;
    y: number;
  }>
> => {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (
    d: typeof characterData,
  ): Array<{
    x: string;
    y: number;
  }> => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
};

/** @package */
export const TestResult: FC<Props> = (props) => {
  const { colors } = useTheme();
  const [data, setDate] = useState(processData(characterData));
  const [maxima, setMaxima] = useState(getMaxima(characterData));

  useEffect(() => {
    console.error(props.route.params.answers);
  }, []);

  const result = {
    title: '『ショートBIG5』テストの結果',
    detail:
      'あなたの強みを○○大学の研究を元に診断します。分かると、○○なメリットがあります。',
  };
  // 質問１＋６＝外向性
  // 質問２＋７＝協調性
  // 質問３＋８＝誠実性
  // 質問４＋９＝神経症傾向
  // 質問５＋１０＝開放性
  // 全16問 (平均解答時間 2分)

  const chartTheme = {
    axis: {
      style: {},
    },
  };

  return (
    <PageContainer>
      <ScrollView>
        <Box backgroundColor={colors.card}>
          <Title title={result.title} pl="2" />
          <VictoryChart
            polar
            height={width * 0.9}
            width={width * 0.9}
            theme={chartTheme}
            domain={{ y: [0, 1] }}
            startAngle={90}
            endAngle={450}
          >
            <VictoryGroup
              colorScale={[colors.text, colors.primary]}
              style={{ data: { stroke: colors.primary, strokeWidth: 5 } }}
            >
              {data.map((data, i) => {
                return (
                  <VictoryArea
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    key={i}
                    data={data}
                  />
                );
              })}
            </VictoryGroup>
            {Object.keys(maxima).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  style={{
                    axis: { stroke: 'none' },
                    grid: { stroke: colors.border, strokeWidth: 2 },
                    tickLabels: {
                      fill: 'white',
                      fontSize: 20,
                      padding: 15,
                    },
                  }}
                  x={10}
                  labelPlacement="perpendicular"
                  // tickLabelComponent={
                  //   <LeftIconBadge index={0}/>
                  // }
                  animate={{
                    duration: 2000,
                    easing: 'bounce',
                  }}
                />
              );
            })}
          </VictoryChart>
        </Box>

        <LeftIconBadge index={1}>success</LeftIconBadge>
        <LeftIconBadge index={2}>ERROR</LeftIconBadge>
        <LeftIconBadge index={3}>INFO</LeftIconBadge>
        <LeftIconBadge index={4}>WARNING</LeftIconBadge>
        <Text color={colors.text} fontSize="lg" mb="4">
          {`${result.detail}`}
        </Text>
      </ScrollView>
    </PageContainer>
  );
};
