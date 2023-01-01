import { useTheme } from '@react-navigation/native';
import { Box, Text } from 'native-base';
import React, { FC, ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  description?: string;
};

/** @package */
export const PageContainer: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Box pt="4" px="4">
      {!!props.title && (
        <Text mb="6" color={colors.text} fontSize="30" fontWeight="bold">
          {props.title}
        </Text>
      )}
      {!!props.description && (
        <Text color={colors.text} fontSize="16">
          {props.description}
        </Text>
      )}
      {props.children}
    </Box>
  );
};
