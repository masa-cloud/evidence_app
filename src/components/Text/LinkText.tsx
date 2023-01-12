import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Stack, Text } from 'tamagui';

type Props = {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
};

/** @package */
export const LinkText: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Stack alignItems="center">
      <Text
        onPress={props.onPress}
        fontWeight="bold"
        fontSize="16"
        bbw={2}
        bbc={colors.link}
        mt={24}
        color={colors.link}
      >
        {props.children}
      </Text>
    </Stack>
  );
};
