import { useTheme } from '@react-navigation/native';
import { Heading } from 'native-base';
import React from 'react';

type Props = {
  title: string;
  pl?: string;
};

/** @package */
export const Title = (props: Props): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Heading color={colors.text} fontSize="2xl" pl={props.pl ?? null} pb="4">
      {props.title}
    </Heading>
  );
};
