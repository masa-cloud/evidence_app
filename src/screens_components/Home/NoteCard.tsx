import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/src/types';
import { Stack, Text, XStack } from 'tamagui';

import { useColors } from '~/lib/constants';
import { selectFocusNote, updateFucusId } from '~/slices/focusNoteSlice';
import { addAsyncEmoji, updateAsyncEmoji, updateAsyncNote, updateAsyncNoteOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpand } from './hook/useAnimeExpand';
import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';
import { RichDescriptionDialog } from './RichDescriptionDialog';
import { TitleDialog } from './TitleDialog';

export type NoteCardProps = {
  ids: string[];
  note: Note;
  orderedList: boolean;
  parentExpanded?: boolean;
};

/** @package */
export const NoteCard = ({ ids, note, orderedList, parentExpanded = true }: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  // reducer.
  const { focusNote } = useSelector(selectFocusNote);
  // state
  const [descriptionHeight, setDescriptionHeight] = useState<number>(48);
  const [emoji, setEmoji] = useState<string | undefined>(note.emoji?.name);
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // custom hook
  const { colors } = useColors();
  const { animatedValue, fadeIn, fadeOut } = useAnimeExpand({
    descriptionHeight,
    expanded,
    ids,
    level: note.level,
  });
  const { position } = useAnimeExpandedRotate(expanded);

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Note>): JSX.Element => {
      return (
        <OpacityDecorator>
          <TouchableOpacity onLongPress={drag} disabled={!orderedList || isActive}>
            <NoteCard note={item} orderedList={orderedList} ids={[item.id, ...ids]} parentExpanded={expanded} />
          </TouchableOpacity>
        </OpacityDecorator>
      );
    },
    [ids, expanded, orderedList],
  );

  const handlePick = useCallback(
    (emojiObject: EmojiType): void => {
      // setEmoji(emojiObject.emoji)
      if (emoji) {
        const updateEmoji = async (): Promise<void> => {
          try {
            setEmoji(emojiObject.emoji);
            await dispatch(
              updateAsyncEmoji({
                emoji: emojiObject.emoji,
                ids,
                updateEmojiId: note.emoji?.id ?? '',
              }),
            );
          } catch (e) {
            console.log({ e });
            // Handle error
          }
        };
        void updateEmoji();
      } else {
        const createEmoji = async (): Promise<void> => {
          try {
            setEmoji(emojiObject.emoji);
            await dispatch(addAsyncEmoji({ emoji: emojiObject.emoji, ids }));
          } catch (e) {
            console.log({ e });
            // Handle error
          }
        };
        void createEmoji();
      }
    },
    [dispatch, ids],
  );

  const Emoji = useCallback((): JSX.Element => {
    return (
      <>
        {focusNote.focusId === note.id ? (
          <Stack
            pl={8}
            enterStyle={
              emoji
                ? {}
                : {
                    o: 0,
                    x: -40,
                  }
            }
            o={1}
            x={0}
            animation="bouncy"
            onPress={() => setIsOpen(true)}
            h={44}
            w={44}
            justifyContent="center"
          >
            <Stack focusStyle={{ bg: '#c1d4f0' }} h={28} w={28} br={4} bg={colors.text} mr={8}>
              {emoji ? (
                <Text ta="center" fos={22} lh="28">
                  {emoji}
                </Text>
              ) : (
                <AntDesign name="plus" size={24} color={colors.primary} style={{ lineHeight: 26, textAlign: 'center' }} />
              )}
            </Stack>
          </Stack>
        ) : (
          !!emoji && (
            <Stack onPress={() => setIsOpen(true)} pl={8} h={44} w={44} justifyContent="center">
              <Stack focusStyle={{ bg: '#c1d4f0' }} h={28} w={28} br={4} bg={colors.text} mr={8}>
                <Text ta="center" fos={22} lh="28">
                  {emoji}
                </Text>
              </Stack>
            </Stack>
          )
        )}
        <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }, [focusNote.focusId, note.id, colors.text, colors.primary, emoji, handlePick, isOpen]);

  const NoteChildCard = useCallback((): JSX.Element => {
    if (note.children !== undefined) {
      const NoteChild = note.children;
      return (
        <DraggableFlatList
          data={NoteChild}
          onDragEnd={({ data, from, to }) => {
            const id = data[to]?.id;
            if (id !== undefined) {
              const updateOrder = async (): Promise<void> => {
                try {
                  await dispatch(
                    updateAsyncNoteOrder({
                      ids: [id, ...ids],
                      isIncreased: from > to,
                      parentId: data[to]?.parentId,
                      targetOrderNumber: to,
                    }),
                  );
                } catch (e) {
                  console.log({ e });
                  // Handle error
                }
              };
              void updateOrder();
            }
          }}
          keyExtractor={(item, index) => `child-item-${item.id}-${index}`}
          renderItem={renderItem}
        />
      );
    } else {
      return <></>;
    }
  }, [dispatch, note.children, renderItem]);

  if (!parentExpanded) {
    return <></>;
  }

  return (
    <Stack
      // TODO:入れ子の順番入れ替えできたけど、親と順番交換するのはどうする？なんか境界線超えれるのあったようなDragFlatListに
      onTouchStart={() => {
        dispatch(
          updateFucusId({
            focusChildrenLength: note.children?.length ?? 0,
            focusId: note.id,
            ids,
            level: note.level,
            orderNumber: note.orderNumber,
            parentId: note.parentId,
          }),
        );
      }}
      animation="bouncy"
      enterStyle={{ scale: 0.9, y: -50 }}
      scale={1}
      y={0}
      mt={0}
      mb={8}
      ml={8}
      mr={2}
      bw={2}
      boc={colors.primary}
      br={8}
    >
      <XStack pos="relative" ai="center" jc="space-between" bg={colors.primary} pt={4} pb={5}>
        <XStack alignItems="center" f={1}>
          {/* TODO:絵文字の箇所型など修正 */}
          <Emoji />
          <TitleDialog ids={ids} note={note} />
        </XStack>
        {orderedList && (
          <Stack
            animation="bouncy"
            enterStyle={{
              o: 0,
              y: -40,
            }}
            pressStyle={{ scale: 0.8 }}
            bg={focusNote.focusId === note.id ? colors.secondary : 'transparent'}
            px={10}
            py={10}
            o={1}
            y={0}
            br={40}
            scale={1}
          >
            <SimpleLineIcons name="menu" size={24} color={colors.text} />
          </Stack>
        )}
        {!orderedList && (
          <Stack
            animation="bouncy"
            enterStyle={{
              o: 0,
              y: -40,
            }}
            pressStyle={{ scale: 0.8 }}
            px={10}
            py={10}
            o={1}
            y={0}
            br={40}
            bg={focusNote.focusId === note.id ? colors.secondary : 'transparent'}
            scale={1}
          >
            <MaterialCommunityIcons name="cursor-pointer" size={24} color={colors.text} />
          </Stack>
        )}
        <Stack
          onPress={() => {
            void (async () => {
              expanded ? fadeIn() : fadeOut();
              setExpanded((prevExpanded) => !prevExpanded);
              // TODO idsが無い時のハンドリング ここのasync awaitの書き方どうなん 更新されていそう
              await dispatch(
                updateAsyncNote({
                  ids,
                  updateNoteData: {
                    id: ids[0] ?? '',
                    expanded: !expanded,
                  },
                }),
              );
            })();
          }}
          px={10}
          py={10}
        >
          <Stack animation={'bouncy'} {...position}>
            <SimpleLineIcons name="arrow-up" size={24} color={colors.text} pr={12 - 4 * (note.level + 1)} />
          </Stack>
        </Stack>
      </XStack>
      <Animated.View style={[styles.animatedExpandedView, { height: animatedValue }]}>
        <RichDescriptionDialog ids={ids} note={note} setDescriptionHeight={setDescriptionHeight} />
      </Animated.View>
      <NoteChildCard />
    </Stack>
  );
};

const styles = StyleSheet.create({
  animatedExpandedView: {
    overflow: 'scroll',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
