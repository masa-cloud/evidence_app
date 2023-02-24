import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Circle, Stack, Text, XStack } from 'tamagui';

import { useColors, width } from '~/lib/constants';
import { selectNoteHeight } from '~/slices/noteHeightSlice';
import {
  selectNote,
  updateAsyncNote,
  updateAsyncNoteOrder,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type SieTreeItemProps = {
  ids: string[];
  note: Note;
  onNoteNavigate: (height: number) => void;
  parentExpanded?: boolean;
};

/** @package */
export const SideTreeItem = ({
  ids,
  note,
  onNoteNavigate,
  parentExpanded = true,
}: SieTreeItemProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useColors();
  // customHook
  const { position } = useAnimeExpandedRotate(note?.expanded ?? false);
  const { noteHeights } = useSelector(selectNoteHeight);
  const { notes } = useSelector(selectNote);

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Note>): JSX.Element => {
      if (item === undefined) return <></>;
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <SideTreeItem
              note={item}
              onNoteNavigate={onNoteNavigate}
              ids={[item.id, ...ids]}
              parentExpanded={note?.expanded ?? false}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [note.expanded],
  );

  const getHeight = (): number => {
    // levelと何番目の要素か取得
    // looopが何回必要か0番目の要素かどうか判定する
    const totalLoopCount = ids.length - 1;
    const sumHeight = (
      notes: Note[],
      loopCount: number,
      targetHeight: number,
      prevTargetNoteHeight?: number,
    ): number => {
      const targetIndex = notes.findIndex((storeNote) => {
        return storeNote.id === ids[loopCount];
      });
      if (loopCount === 0) {
        if (targetIndex === 0 && prevTargetNoteHeight) {
          return targetHeight + prevTargetNoteHeight;
        }
        const prevNotes = notes.filter(
          (storeNote, index) => index < targetIndex,
        );
        const sumPrevHeight = prevNotes.reduce(function (sum, prevNote) {
          const prevNoteHeight =
            noteHeights.find((NoteHeight) => NoteHeight.id === prevNote.id)
              ?.height ?? 0;
          return sum + prevNoteHeight + 8;
        }, 0);
        return targetHeight + sumPrevHeight + (prevTargetNoteHeight ?? 0);
      } else {
        const targetNote = notes.find((note) => note.id === ids[loopCount]);
        const targetNoteHeight =
          loopCount === 1
            ? 8 * targetIndex +
              (noteHeights.find(
                (targetHeight) => targetHeight.id === targetNote?.id,
              )?.contentsHeight ?? 0)
            : 0;
        if (targetIndex === 0 && targetNote?.children?.length) {
          const targetNoteChildren = targetNote.children;
          return sumHeight(
            targetNoteChildren,
            loopCount - 1,
            targetHeight,
            targetNoteHeight,
          );
        }
        const prevNotes = notes.filter(
          (storeNote, index) => index < targetIndex,
        );
        const sumPrevHeight = prevNotes.reduce(function (sum, prevNote) {
          const prevNoteHeight =
            noteHeights.find((noteHeight) => noteHeight.id === prevNote.id)
              ?.height ?? 0;
          return sum + prevNoteHeight;
        }, 0);
        if (targetNote?.children?.length) {
          const targetNoteChildren = targetNote.children;
          return sumHeight(
            targetNoteChildren,
            loopCount - 1,
            targetHeight + sumPrevHeight,
            targetNoteHeight,
          );
        }
        return targetHeight + sumPrevHeight;
      }
    };
    const sum = sumHeight(notes, totalLoopCount, 0);
    return sum;
  };

  const SideTreeChildItem = useCallback((): JSX.Element => {
    if (note?.children?.length) {
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
          extraData={notes}
          keyExtractor={(item, index) => `side-tree-item-${item.id}-${index}`}
          renderItem={renderItem}
        />
      );
    } else {
      return <></>;
    }
  }, [dispatch, note.children, notes, renderItem]);

  const Emoji = (): JSX.Element => {
    return (
      <>
        <Stack
          h={24}
          w={24}
          borderRadius={4}
          backgroundColor={
            note.emoji !== undefined ? colors.text : 'transparent'
          }
          mr={4}
        >
          {note.emoji?.name.length ? (
            <Text textAlign="center" fontSize="lg" lineHeight="24">
              {note.emoji?.name}
            </Text>
          ) : (
            <>
              <Circle size={24} bg={colors.text} />
            </>
          )}
        </Stack>
      </>
    );
  };

  if (!parentExpanded) {
    return <></>;
  }

  return (
    <Stack
      w={(width / 4) * 3 - note.level * 10}
      pl={note.level ? 24 : 8}
      pr={2}
      borderWidth={2}
      borderColor={colors.primary}
      borderRadius={8}
    >
      <XStack
        position="relative"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={colors.primary}
        py={2}
        onPress={() => onNoteNavigate(getHeight())}
        pressStyle={{ opacity: 0.7, scale: 0.9 }}
        animation="bouncy"
      >
        <XStack alignItems="center" f={1}>
          {/* TODO:絵文字の型など修正 */}
          <Emoji />
          <Text
            style={[styles.titleTextInputStyle, { color: colors.text }]}
            focusStyle={{ ...styles.focusTitleStyle, borderColor: colors.text }}
            py={2}
            px={4}
            bw={0}
          >
            {note.title}
          </Text>
        </XStack>
        <Stack boc={colors.primary}>
          {!!note.children?.length && (
            <Stack animation={'bouncy'} {...position}>
              <SimpleLineIcons
                onPress={() => {
                  // TODO:サイドツリーでも開閉できるようにする
                  void (async () => {
                    await dispatch(
                      updateAsyncNote({
                        ids,
                        updateNoteData: {
                          id: ids[0] ?? '',
                          expanded: !note.expanded,
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
          )}
        </Stack>
      </XStack>
      <SideTreeChildItem />
    </Stack>
  );
};

const styles = StyleSheet.create({
  animatedExpandedView: {
    overflow: 'scroll',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  focusDescriptionStyle: {
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  focusTitleStyle: {
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 2,
    paddingVertical: 0,
  },
  titleTextInputStyle: {
    alignItems: 'center',
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});
