import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Center, Progress, ScrollView, Spacer } from 'native-base';
import React, { FC, useCallback, useMemo, useState } from 'react';

import { LeftIconButton } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { RadioGroup } from '~/screens_components/TestAction/RadioGroup';

type TestActionScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestActionScreen'
>;

type Props = {
  navigation: TestActionScreenNavigationProps;
};

const initialAnswers = (questions: string[]): undefined[] => {
  const initialAnswers: undefined[] = [];
  questions.forEach(function () {
    initialAnswers.push(undefined);
  });
  return initialAnswers;
};

/** @package */
export const TestAction: FC<Props> = (props) => {
  const { colors } = useTheme();
  const questions: string[] = useMemo(
    () => [
      '私は、初めての人に会うのが好きで、会話をするのが好きで、人と会うのを楽しめる人間だ。',
      // '私は、人に対して思いやりがあり、その思いやりを行動に移し、他人を差別しない人間だ。',
      // '私は、きっちりと物事をこなし、手際よく行動し、適切に物事を行おうとする人間だ。',
      // '私は、いつも心配事が多く、不安になりやすく、気分の浮き沈みが多い人間だ。',
      // '私は、知的な活動が得意で、創造性が高くて好奇心があり、新たなことを探求する人間だ。',
      // '私は、恥ずかしがり屋で、物静かで、人が多いパーティなどは苦手な人間だ。',
      // '私は、すぐ思ったことを口にし、冷淡な面があり、他人に同情を感じることはめったにない人間だ。',
      // '私は、あまり考えずに行動し、さほどきっちりは行動せず、ギリギリまで物事に手を付けない人間だ。',
      // '私は、たいていリラックスしており、落ち着きがあり、めったに問題について悩まない人間だ。',
      // '私は、物事を現実的に考え、伝統的な考え方を好み、めったに空想などで時間を浪費しない人間だ。',
    ],
    [],
  );
  const [answers, setAnswers] = useState<Array<string | undefined>>(
    initialAnswers(questions),
  );
  const definedAnswers = useMemo(
    () =>
      answers.filter(function (answer) {
        return answer !== undefined;
      }),
    [answers],
  );

  const RadioGroups = useCallback((): JSX.Element => {
    return (
      <>
        {questions.map((questionText, index) => {
          return (
            <RadioGroup
              answers={answers}
              index={index}
              questionText={questionText}
              setAnswers={setAnswers}
              key={questionText}
            />
          );
        })}
      </>
    );
  }, [answers, questions]);

  // 全16問 (平均解答時間 2分)
  return (
    <PageContainer>
      <Center w="100%" backgroundColor={colors.background} py={4}>
        <Box w="100%">
          <Progress
            bg={colors.text}
            _filledTrack={{
              bg: colors.primary,
            }}
            value={(definedAnswers.length / questions.length) * 100}
          />
        </Box>
      </Center>
      <ScrollView>
        <RadioGroups />
        <Spacer size={8} />
        <LeftIconButton
          text="結果を見る"
          onPress={() => {
            if (answers.every((answer) => typeof answer === 'string')) {
              const typePassAnswers = answers as string[];
              props.navigation.navigate(RouteName.TestResultScreen, {
                answers: typePassAnswers,
              });
            }
          }}
          iconName="cloud-upload"
          mb="12"
        />
      </ScrollView>
    </PageContainer>
  );
};
