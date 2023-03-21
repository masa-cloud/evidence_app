import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Stack, XStack, YStack } from 'tamagui';

import { useColors } from '~/lib/constants';

import { useSideTree } from './hook/useSideTree';

/** @package */
export const ScrollUpGlobalMenu = (): JSX.Element => {
  const { colors } = useColors();
  const { onPress } = useSideTree();

  return (
    <XStack
      animation={'bouncy'}
      pos="absolute"
      b={8}
      l={'5%'}
      h={60}
      enterStyle={{
        bg: colors.primary,
        o: 0.5,
      }}
      o={1}
      scale={1}
      y={0}
      zi="1"
      ai="center"
      shac={colors.primary}
      shof={{
        height: 3,
        width: 0,
      }}
      shar={6}
      br={32}
      w={'90%'}
      bg={colors.text}
      jc="space-between"
    >
      <XStack f={1} mx={20} ai="center" jc="space-between">
        <Ionicons name="ios-menu-sharp" size={36} col={colors.primary} />
        <Ionicons name="settings" size={36} col={colors.primary} />
        <YStack pos="relative" h={80} ai={'center'} px={20}>
          <Stack pos="absolute" scaleX={1.1} rotate="45deg" t={8} h={64} w={64} jc={'center'} ai={'center'} br={20} bg={colors.text} />
          <Stack
            pos="absolute"
            translateY={50}
            translateX={-50}
            rotate="45deg"
            t={14}
            h={52}
            w={52}
            jc={'center'}
            ai={'center'}
            br={20}
            bg={colors.secondary}
          >
            <Stack rotate="-45deg">
              <Ionicons name="pencil" size={32} color={colors.text} />
            </Stack>
          </Stack>
        </YStack>
        <Ionicons name="search-sharp" size={36} color={colors.primary} />
        <MaterialIcons
          name="menu-book"
          onPress={() => {
            onPress();
          }}
          size={36}
          color={colors.primary}
        />
      </XStack>
    </XStack>
  );
};
