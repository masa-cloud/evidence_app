import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { FlatList } from '@stream-io/flat-list-mvcp';
import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import { Stack, Text, TextArea, XStack } from 'tamagui';

import { useColors } from '~/lib/constants';
import { updateFucusId } from '~/slices/focusNoteSlice';
import {
  selectNoteHeight,
  updateContentsHeight,
} from '~/slices/noteHeightSlice';
import {
  addAsyncEmoji,
  updateAsyncEmoji,
  updateAsyncNote,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpand } from './hook/useAnimeExpand';
import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type NoteCardProps = {
  ids: string[];
  note: Note;
  parentExpanded?: boolean;
};

/** @package */
export const NoteCard = ({
  ids,
  note,
  parentExpanded = true,
}: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useColors();
  // useState
  // const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [description, setDescription] = useState<string>(note.description);
  const [title, setTitle] = useState<string>(note.title);
  const [emoji, setEmoji] = useState<string | undefined>(note.emoji?.name);
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  const { noteHeights } = useSelector(selectNoteHeight);
  const noteHeight = noteHeights.find(
    (noteHeight) => noteHeight.id === note.id,
  );

  // customHook
  const { animatedValue, fadeIn, fadeOut } = useAnimeExpand({
    descriptionHeight: noteHeight?.contentsHeight ?? 32,
    expanded,
    ids,
    level: note.level,
  });
  const { position } = useAnimeExpandedRotate(expanded);
  const renderItem = useCallback(
    ({ item }: { item: Note }): JSX.Element => {
      return (
        <NoteCard
          note={item}
          ids={[item.id, ...ids]}
          parentExpanded={expanded}
        />
      );
    },
    [ids, expanded],
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <Stack
          h={28}
          w={28}
          borderRadius={4}
          backgroundColor={colors.text}
          focusStyle={{ backgroundColor: '#c1d4f0' }}
          mr={8}
        >
          {emoji ? (
            <Text
              onPress={() => setIsOpen(true)}
              textAlign="center"
              fos={22}
              lineHeight="28"
            >
              {emoji}
            </Text>
          ) : (
            <AntDesign
              onPress={() => setIsOpen(true)}
              name="plus"
              size={24}
              color={colors.primary}
              style={{ lineHeight: 26, textAlign: 'center' }}
            />
          )}
        </Stack>
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  }, [colors.primary, colors.text, emoji, handlePick, isOpen]);

  const NoteChildCard = useCallback((): JSX.Element => {
    if (note.children !== undefined) {
      const NoteChild = note.children;
      return (
        <FlatList
          data={NoteChild}
          keyExtractor={(item, index) => `child-item-${item.id}-${index}`}
          renderItem={renderItem}
        />
      );
    } else {
      return <></>;
    }
  }, [note.children, renderItem]);

  if (!parentExpanded) {
    return <></>;
  }
  // TODO:なんかスクロールしづらそう。。。
  return (
    <Stack focusStyle={styles.focusNoteStyle}>
      <Stack
        // onLayout={({
        //   nativeEvent: {
        //     layout: { height },
        //   },
        // // TODO:↓の行移動
        // }) => dispatch(updateHeight({ id: note.id, height }))
        // }
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
        mt={0}
        mb={8}
        ml={8}
        mr={2}
        borderWidth={2}
        borderColor={colors.primary}
        borderRadius={8}
      >
        <XStack
          position="relative"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor={colors.primary}
          px={8}
          py={4}
        >
          <XStack alignItems="center" f={1}>
            {/* TODO:絵文字の箇所型など修正 */}
            <Emoji />
            <TextArea
              style={[styles.titleTextInputStyle, { color: colors.text }]}
              focusStyle={styles.focusBorderNoneStyle}
              bg={colors.primary}
              py={10}
              lineHeight={8}
              px={4}
              bw={0}
              value={title ?? ''}
              multiline={true}
              onChangeText={(title) => setTitle(title)}
              autoCapitalize="none"
              onEndEditing={() => {
                void (async () => {
                  // TODO idsが無い時のハンドリング ここのasync awaitの書き方どうなん
                  await dispatch(
                    updateAsyncNote({
                      ids,
                      updateNoteData: { id: ids[0] ?? 'aaa', title },
                    }),
                  );
                })();
              }}
            />
          </XStack>
          {/* TODO:Expandedはアニメーション終わったあとにコンポーネント化 */}
          <Stack boc={colors.primary}>
            <Stack animation={'bouncy'} {...position}>
              <SimpleLineIcons
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
                name="arrow-up"
                size={20}
                color={colors.text}
                px={12 - 4 * (note.level + 1)}
              />
            </Stack>
          </Stack>
        </XStack>
        <Animated.View
          style={[styles.animatedExpandedView, { height: animatedValue }]}
        >
          <TextArea
            bg={'transparent'}
            py={2}
            px={4}
            color={colors.primary}
            fontSize={14}
            bw={0}
            focusStyle={styles.focusBorderNoneStyle}
            boc={colors.primary}
            value={description ?? ''}
            lineHeight={16}
            height={noteHeight?.contentsHeight ?? 32}
            multiline={true}
            onContentSizeChange={(event) => {
              // level0 2回ずつ
              // level1 ?回ずつ
              if (
                event.nativeEvent.contentSize.height !== 16 &&
                event.nativeEvent.contentSize.height !==
                  noteHeight?.contentsHeight
              ) {
                dispatch(
                  updateContentsHeight({
                    id: note.id,
                    contentsHeight: event.nativeEvent.contentSize.height + 30,
                  }),
                );
              }
            }}
            onChangeText={(description) => {
              setDescription(description);
            }}
            autoCapitalize="none"
            onEndEditing={() => {
              void (async () => {
                // TODO idsが無い時のハンドリング ここのasync awaitの書き方どうなん
                await dispatch(
                  updateAsyncNote({
                    ids,
                    updateNoteData: { id: ids[0] ?? '', description },
                  }),
                );
              })();
            }}
          />
        </Animated.View>
        <NoteChildCard />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  animatedExpandedView: {
    overflow: 'scroll',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  focusBorderNoneStyle: {
    borderWidth: 0,
  },
  focusNoteStyle: {
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    mb: 8,
    ml: 4,
    mr: 2,
    paddingTop: 8,
  },
  titleTextInputStyle: {
    alignItems: 'center',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});
