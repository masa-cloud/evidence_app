import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { HStack, Image } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { Images } from '~/assets/images';
import { addBrotherNote, addChildNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

/** @package */
export const HomeHeader = (): JSX.Element => {
  const { colors } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  return (
    <HStack
      position="fixed"
      top="0"
      opacity={0.5}
      left="0"
      px="3"
      py="3"
      alignItems="center"
      width="full"
      backgroundColor={colors.background}
      justifyContent="space-between"
    >
      <Ionicons name="ios-menu-sharp" size={30} color={colors.text} />
      <HStack alignItems="center" justifyContent="space-between">
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
          <Image size={6} mx="2" source={Images.plusPare} alt="兄弟要素追加" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(addChildNote())}>
          <Image size={6} mx="2" source={Images.plusChild} alt="子要素追加" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};
