import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Image, Stack, XStack } from 'tamagui';

import { Images } from '~/assets/images';
import { addBrotherNote, addChildNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

/** @package */
export const HomeHeader = (): JSX.Element => {
  const { colors } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  return (
    <XStack
      // pos="fixed"
      top={0}
      opacity={0.5}
      left={0}
      px={12}
      py={12}
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
          style={{ marginHorizontal: 8 }}
          size={30}
          color={colors.text}
        />
        <TouchableOpacity onPress={() => dispatch(addBrotherNote())}>
          <Stack mx={8}>
            <Image height={24} width={24} src={Images.plusPare} />
          </Stack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(addChildNote())}>
          <Stack mx={8}>
            <Image height={24} width={24} src={Images.plusChild} />
          </Stack>
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
};
