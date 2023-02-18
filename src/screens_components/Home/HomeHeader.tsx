import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Stack, XStack } from 'tamagui';

import { Images } from '~/assets/images';
import { useColors } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import { addBrotherNote, addChildNote, deleteNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

import { useSideTree } from './hook/useSideTree';

/** @package */
export const HomeHeader = (): JSX.Element => {
  const { colors } = useColors();
  const dispatch: AppDispatch = useDispatch();
  const { onPress } = useSideTree();
  const { focusNote } = useSelector(selectFocusNote);

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
        <MaterialIcons
          name="delete"
          onPress={() => {
            void (async () => {
              await dispatch(
                deleteNote({
                  id: focusNote.focusId,
                }),
              );
            })();
          }}
          style={{ marginHorizontal: 8 }}
          size={30}
          color={colors.text}
        />
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
        <TouchableOpacity
          onPress={() => {
            void (async () => {
              await dispatch(
                addBrotherNote({
                  focusLevel: focusNote.level,
                  ids: focusNote.ids,
                  orderNumber: focusNote.orderNumber,
                  parentId: focusNote.parentId,
                }),
              );
            })();
          }}
        >
          <Stack mx={8}>
            <Image height={24} width={24} src={Images.plusPare} />
          </Stack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            void (async () => {
              await dispatch(
                addChildNote({
                  id: focusNote.focusId,
                  childrenLength: focusNote.focusChildrenLength,
                  focusLevel: focusNote.level,
                  ids: focusNote.ids,
                }),
              );
            })();
          }}
        >
          <Stack mx={8}>
            <Image height={24} width={24} src={Images.plusChild} />
          </Stack>
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
};
