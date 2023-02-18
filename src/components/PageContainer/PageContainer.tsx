import React, { FC, ReactNode } from 'react';
import { Stack, Text } from 'tamagui';

import { useColors } from '~/lib/constants';

type Props = {
  title?: string;
  children: ReactNode;
  description?: string;
};

/** @package */
export const PageContainer: FC<Props> = (props) => {
  const { colors } = useColors();
  return (
    <Stack pt={16} px={16}>
      {!!props.title && (
        <Text mb={24} color={colors.text} fontSize={30} fontWeight="bold">
          {props.title}
        </Text>
      )}
      {!!props.description && (
        <Text color={colors.text} fontSize={16}>
          {props.description}
        </Text>
      )}
      {props.children}
    </Stack>
  );
};
