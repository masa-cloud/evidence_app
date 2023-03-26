import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialog, Button, Image, Stack, XStack, YStack } from 'tamagui';

import { Images } from '~/assets/images';
import { useColors } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import { addAsyncBrotherNote, addAsyncChildNote, deleteAsyncNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

type ScrollDownNoteMenuProps = {
  orderedList: boolean;
  setOrderedList: React.Dispatch<React.SetStateAction<boolean>>;
};

/** @package */
export const ScrollDownNoteMenu: FC<ScrollDownNoteMenuProps> = (props) => {
  const { colors } = useColors();
  const { focusNote } = useSelector(selectFocusNote);
  const dispatch: AppDispatch = useDispatch();

  return (
    <XStack
      animation={'bouncy'}
      pos="absolute"
      b={8}
      l={'5%'}
      h={60}
      o={1}
      enterStyle={{
        bg: colors.text,
        o: 0.5,
      }}
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
      bg={colors.primary}
      jc="space-between"
    >
      <XStack f={1} mx={20} ai="center" jc="space-between">
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
              ai="center"
              size={36}
              color={colors.text}
            />
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay key="overlay" animation="bouncy" o={0.5} enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} />
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
              enterStyle={{ o: 0, scale: 0.9, x: 0, y: -20 }}
              exitStyle={{ o: 0, scale: 0.95, x: 0, y: 10 }}
              x={0}
              scale={1}
              o={1}
              y={0}
            >
              <YStack space>
                <AlertDialog.Title>ヒント</AlertDialog.Title>
                <AlertDialog.Description>ゴミ箱アイコンを長押しすると、選択された項目を削除します。</AlertDialog.Description>
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
          style={props.orderedList && { backgroundColor: colors.secondary }}
          br={40}
          h={44}
          w={44}
          ai="center"
          jc="center"
          rotate="90deg"
          onPress={() => (props.orderedList ? props.setOrderedList(false) : props.setOrderedList(true))}
        >
          <Octicons name="arrow-switch" size={36} color={colors.text} />
        </Stack>
        <YStack pos="relative" h={80} ai={'center'} px={20}>
          <Stack pos="absolute" scaleX={1.1} rotate="45deg" t={8} h={64} w={64} jc={'center'} ai={'center'} br={20} bg={colors.primary} />
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
          <Stack h={36} w={36} ai={'center'}>
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
          <Stack h={36} w={36} ai={'center'}>
            <Image height={32} width={32} src={Images.plusChild} />
          </Stack>
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
};
