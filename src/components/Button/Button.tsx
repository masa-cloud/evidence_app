import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button as BaseButton, SizableText } from 'tamagui';

type Props = {
  children: string;
  isLoading?: boolean;
  isNoneMarginTop?: boolean;
  isWhite?: boolean;
  onPress: () => void;
};

/** @package */
export const Button: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <BaseButton
      color={colors.text}
      backgroundColor={props.isWhite ? colors.text : colors.primary}
      py="4"
      mt={props.isNoneMarginTop ? 0 : 10}
      borderRadius="8"
      onPress={props.onPress}
    >
      {/* // style={{
        // fontSize: 16,
      // }} */}
      <SizableText
        lineHeight="21"
        letterSpacing="0.5"
        fontWeight="bold"
        color={props.isWhite ? colors.primary : colors.text}
        size="$4"
      >
        {props.children}
      </SizableText>
    </BaseButton>
  );
};
