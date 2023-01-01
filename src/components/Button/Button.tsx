import { useTheme } from '@react-navigation/native';
import { Button as BaseButton } from 'native-base';
import React, { FC } from 'react';

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
      // TODO:style簡潔に書く
      _text={{
        color: props.isWhite ? colors.primary : colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        lineHeight: 21,
      }}
      color={colors.text}
      backgroundColor={props.isWhite ? colors.text : colors.primary}
      py="4"
      mt={props.isNoneMarginTop ? 0 : 10}
      borderRadius="8"
      onPress={props.onPress}
    >
      {props.children}
    </BaseButton>
  );
};
