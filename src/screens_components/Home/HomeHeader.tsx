import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { XStack } from 'tamagui';

import { useColors } from '~/lib/constants';

import { useSideTree } from './hook/useSideTree';

/** @package */
export const HomeHeader = (): JSX.Element => {
  const { colors } = useColors();
  const { onPress } = useSideTree();

  return (
    <XStack
      pos="absolute"
      top={0}
      opacity={0.5}
      left={0}
      px={12}
      py={12}
      zIndex="1"
      alignItems="center"
      w={'100%'}
      backgroundColor={colors.background}
      justifyContent="space-between"
    >
      <Ionicons name="ios-menu-sharp" size={30} color={colors.text} />
      <XStack alignItems="center" justifyContent="space-between">
        <Ionicons
          name="search-sharp"
          style={{ marginHorizontal: 8 }}
          size={30}
          color={colors.text}
        />
        <MaterialIcons
          name="menu-book"
          onPress={onPress}
          style={{ marginHorizontal: 8 }}
          size={30}
          color={colors.text}
        />
      </XStack>
    </XStack>
  );
};
