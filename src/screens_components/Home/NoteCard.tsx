import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { FlatList } from '@stream-io/flat-list-mvcp';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import { Stack, Text, TextArea, XStack } from 'tamagui';

import { useColors } from '~/lib/constants';
import { updateFucusId } from '~/slices/focusNoteSlice';
import {
  addAsyncEmoji,
  updateAsyncEmoji,
  updateAsyncNote,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpand } from './hook/useAnimeExpand';
import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';
import { RichDescriptionDialog } from './RichDescriptionDialog';

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
  // reducer.
  // const { focusNote } = useSelector(selectFocusNote);
  // state
  const [title, setTitle] = useState<string>(note.title);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(48);
  const [emoji, setEmoji] = useState<string | undefined>(note.emoji?.name);
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // ref
  // memo
  // const thisNoteFocus = useMemo(
  //   () => focusNote.focusId === note.id,
  //   [focusNote.focusId, note.id],
  // );
  // custom hook
  const { colors } = useColors();
  const { animatedValue, fadeIn, fadeOut } = useAnimeExpand({
    // descriptionHeight: thisNoteFocus
    // ? descriptionHeight + 50
    // : descriptionHeight,
    descriptionHeight: descriptionHeight + 50,
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
  useEffect(() => {
    console.warn({ descriptionHeight });
  }, [descriptionHeight]);
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

  return (
    <>
      <Stack focusStyle={styles.focusNoteStyle}>
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
                lineHeight={18}
                px={4}
                bw={0}
                h={36}
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
            <RichDescriptionDialog
              ids={ids}
              note={note}
              setDescriptionHeight={setDescriptionHeight}
            />
          </Animated.View>
          <NoteChildCard />
        </Stack>
      </Stack>
    </>
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
