import { useTheme } from '@react-navigation/native';
import React, { FC, ReactNode } from 'react';
import { Text } from 'tamagui';

type Props = {
  children: ReactNode;
};

/** @package */
export const ErrorText: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Text mt={8} color={colors.error}>
      {props.children}
    </Text>
  );
};
