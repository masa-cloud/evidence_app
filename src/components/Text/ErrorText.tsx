import { useTheme } from '@react-navigation/native';
import { Text } from 'native-base';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/** @package */
export const ErrorText: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Text mt="2" color={colors.error}>
      {props.children}
    </Text>
  );
};
