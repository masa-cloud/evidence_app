import { useTheme } from '@react-navigation/native';
import React, { FC, FunctionComponent } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button, Text } from 'tamagui';

type Props = {
  iconComponent: JSX.Element | FunctionComponent | null;
  mb?: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
};

// TODO:Icon変更できるように
/** @package */
export const LeftIconButton: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <Button
      // TODO:Iconを動的にimportしてできれば良い
      icon={props.iconComponent}
      bg={colors.primary}
      {...{
        ...props,
      }}
    >
      <Text color={colors.text} fontSize="lg">
        {props.text}
      </Text>
    </Button>
  );
};
