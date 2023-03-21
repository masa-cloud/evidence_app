import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialog, Button, Image, Stack, XStack, YStack } from 'tamagui';

import { Images } from '~/assets/images';
import { useColors } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import {
  addAsyncBrotherNote,
  addAsyncChildNote,
  deleteAsyncNote,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

/** @package */
export const ScrollDownNoteMenu = ({
  orderedList,
  setOrderedList,
}: {
  orderedList: boolean;
  setOrderedList: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { colors } = useColors();
  const { focusNote } = useSelector(selectFocusNote);
  const dispatch: AppDispatch = useDispatch();

  return (
    <XStack
      animation={'bouncy'}
      pos="absolute"
      bottom={8}
      left={'5%'}
      h={60}
      enterStyle={{
        backgroundColor: colors.text,
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
      backgroundColor={colors.primary}
      justifyContent="space-between"
    >
      <XStack
        flex={1}
        mx={20}
        alignItems="center"
        justifyContent="space-between"
      >
        <AlertDialog native>
          <AlertDialog.Trigger asChild>
            <MaterialIcons
              onLongPress={() => {
                void (async () => {
                  await dispatch(
                    deleteAsyncNote({
                      id: focusNote.focusId,
                      ids: focusNote.ids,
                    }),
                  );
                })();
              }}
              name="delete"
              pt={4}
              alignItems="center"
              size={36}
              color={colors.text}
            />
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="bouncy"
              o={0.5}
              enterStyle={{ o: 0 }}
              exitStyle={{ o: 0 }}
            />
            <AlertDialog.Content
              bordered
              elevate
              key="content"
              animation={[
                'bouncy',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ opacity: 0, scale: 0.9, x: 0, y: -20 }}
              exitStyle={{ opacity: 0, scale: 0.95, x: 0, y: 10 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack space>
                <AlertDialog.Title>ヒント</AlertDialog.Title>
                <AlertDialog.Description>
                  ゴミ箱アイコンを長押しすると、選択された項目を削除します。
                </AlertDialog.Description>

                <XStack space="$3" jc="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button>キャンセル</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    asChild
                    onPress={() => {
                      void (async () => {
                        await dispatch(
                          deleteAsyncNote({
                            id: focusNote.focusId,
                            ids: focusNote.ids,
                          }),
                        );
                      })();
                    }}
                  >
                    <Button theme="alt2">削除</Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
        <Stack
          style={orderedList && { backgroundColor: colors.secondary }}
          borderRadius={40}
          h={44}
          w={44}
          alignItems="center"
          justifyContent="center"
          rotate="90deg"
          onPress={() =>
            orderedList ? setOrderedList(false) : setOrderedList(true)
          }
        >
          <Octicons name="arrow-switch" size={36} color={colors.text} />
        </Stack>
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
            backgroundColor={colors.primary}
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
              <Ionicons name="book" size={32} color={colors.text} />
            </Stack>
          </Stack>
        </YStack>
        <TouchableOpacity
          onPress={() => {
            void (async () => {
              await dispatch(
                addAsyncBrotherNote({
                  focusLevel: focusNote.level,
                  ids: focusNote.ids,
                  orderNumber: focusNote.orderNumber,
                  parentId: focusNote.parentId,
                }),
              );
            })();
          }}
        >
          <Stack h={36} w={36} alignItems={'center'}>
            <Image height={32} width={32} src={Images.plusPare} />
          </Stack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            void (async () => {
              await dispatch(
                addAsyncChildNote({
                  id: focusNote.focusId,
                  childrenLength: focusNote.focusChildrenLength,
                  focusLevel: focusNote.level,
                  ids: focusNote.ids,
                }),
              );
            })();
          }}
        >
          <Stack h={36} w={36} alignItems={'center'}>
            <Image height={32} width={32} src={Images.plusChild} />
          </Stack>
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
};
