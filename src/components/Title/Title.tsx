import { useTheme } from '@react-navigation/native';
import { Heading } from 'native-base';
import React, { FC } from 'react';

type Props = {
  title: string;
  pl?: string;
};

/** @package */
export const Title: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Heading color={colors.text} fontSize="2xl" pl={props.pl ?? null} pb="4">
      {props.title}
    </Heading>
  );
};
