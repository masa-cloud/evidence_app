import React, { FC, ReactNode } from 'react';
import { Text } from 'tamagui';

import { useColors } from '~/lib/constants';

type Props = {
  children: ReactNode;
};

/** @package */
export const ErrorText: FC<Props> = (props) => {
  const { colors } = useColors();
  return (
    <Text mt={8} color={colors.error}>
      {props.children}
    </Text>
  );
};
