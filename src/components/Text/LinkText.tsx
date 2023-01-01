import { useTheme } from '@react-navigation/native';
import { Box, Text } from 'native-base';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

type Props = {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
};

/** @package */
export const LinkText: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Box alignItems="center">
      <Text
        onPress={props.onPress}
        fontWeight="bold"
        fontSize="16"
        underline={true}
        mt="6"
        color={colors.link}
      >
        {props.children}
      </Text>
    </Box>
  );
};
