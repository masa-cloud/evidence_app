import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { GestureResponderEvent } from 'react-native';

type Props = {
  iconName: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
};

// TODO:Icon変更できるように
/** @package */
export const LeftIconButton = (props: Props): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Button
      onPress={props.onPress}
      leftIcon={
        <Icon
          as={FontAwesome}
          name={props.iconName}
          size={6}
          color={colors.text}
        />
      }
      bgColor={colors.primary}
    >
      <Text color={colors.text} fontSize="lg">
        {props.text}
      </Text>
    </Button>
  );
};
