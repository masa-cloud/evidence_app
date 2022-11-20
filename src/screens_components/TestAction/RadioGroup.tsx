import { useTheme } from '@react-navigation/native';
import { Box, Radio, Text } from 'native-base';
import React, { FC } from 'react';

import { RadioGroupChildren } from './RadioGroupChildren';

type Props = {
  answers: Array<string | undefined>;
  index: number;
  questionText: string;
  setAnswers: React.Dispatch<React.SetStateAction<Array<string | undefined>>>;
};

export const RadioGroup: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Box mb={6}>
      <Text color={colors.text} ml={3} mb="1" fontSize="xl" bold>
        {`【Q${props.index + 1}】${props.questionText}`}
      </Text>
      {props.answers[props.index] !== undefined ? (
        <Radio.Group
          w="100%"
          size="lg"
          name="exampleGroup"
          accessibilityLabel="pick a choice"
          value={props.answers[props.index] as string}
          onChange={(nextAnswers) => {
            const newAnswers = props.answers.map((answer, i) =>
              i === props.index ? nextAnswers : answer,
            );
            props.setAnswers(newAnswers);
          }}
        >
          <RadioGroupChildren />
        </Radio.Group>
      ) : (
        <Radio.Group
          w="100%"
          size="lg"
          name="exampleGroup"
          accessibilityLabel="pick a choice"
          onChange={(nextAnswers) => {
            const newAnswers = props.answers.map((answer, i) =>
              i === props.index ? nextAnswers : answer,
            );
            props.setAnswers(newAnswers);
          }}
        >
          <RadioGroupChildren />
        </Radio.Group>
      )}
    </Box>
  );
};
