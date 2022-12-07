import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Badge, Flex, Icon, Text } from 'native-base';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  index: number;
};

// TODO:Icon変更できるように
/** @package */
export const LeftIconBadge: FC<Props> = (props) => {
  const { colors } = useTheme();
  const themeContent = [
    { color: '#171717', iconName: 'cloud-upload' },
    { color: '#215b7c', colorScheme: 'info', iconName: 'cloud-upload' },
    { color: '#964242', colorScheme: 'error', iconName: 'cloud-upload' },
    { color: '#185730', colorScheme: 'success', iconName: 'cloud-upload' },
    { color: '#8c452a', colorScheme: 'warning', iconName: 'cloud-upload' },
  ];
  return (
    <Badge
      colorScheme={themeContent[props.index]?.colorScheme ?? undefined}
      variant="subtle"
      width={120}
    >
      <Flex width="100%" align="center" direction="row" justify="space-evenly">
        <Icon
          as={FontAwesome}
          name={themeContent[props.index]?.iconName ?? ''}
          size={6}
          color={themeContent[props.index]?.color}
        />
        <Text fontSize="20" color={themeContent[props.index]?.color}>
          {/* {props.children} */}
          DEFAULT
        </Text>
      </Flex>
    </Badge>
  );
};
