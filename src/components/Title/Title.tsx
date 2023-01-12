import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { H1 } from 'tamagui';

type Props = {
  title: string;
  pl?: string;
};

/** @package */
export const Title: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <H1 color={colors.text} fontSize="2xl" pl={props.pl ?? null} pb={16}>
      {props.title}
    </H1>
  );
};
