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
      bottom={8}
      left={'5%'}
      h={60}
      enterStyle={{
        backgroundColor: colors.primary,
        opacity: 0.5,
      }}
      opacity={1}
      scale={1}
      y={0}
      zIndex="1"
      alignItems="center"
      shadowColor={colors.primary}
      shadowOffset={{
        height: 3,
        width: 0,
      }}
      shadowRadius={6}
      borderRadius={32}
      w={'90%'}
      backgroundColor={colors.text}
      justifyContent="space-between"
    >
      <XStack
        flex={1}
        mx={20}
        alignItems="center"
        justifyContent="space-between"
      >
        <Ionicons name="ios-menu-sharp" size={36} color={colors.primary} />
        <Ionicons name="settings" size={36} color={colors.primary} />
        <YStack position="relative" h={80} alignItems={'center'} px={20}>
          <Stack
            position="absolute"
            scaleX={1.1}
            rotate="45deg"
            t={8}
            h={64}
            w={64}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={20}
            backgroundColor={colors.text}
          ></Stack>
          <Stack
            position="absolute"
            translateY={50}
            translateX={-50}
            rotate="45deg"
            t={14}
            h={52}
            w={52}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={20}
            backgroundColor={colors.secondary}
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
