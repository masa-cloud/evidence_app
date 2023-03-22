import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Circle, Stack, Text, XStack } from 'tamagui';

import { useColors, width } from '~/lib/constants';
import { selectNote, updateAsyncNote, updateAsyncNoteOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type SieTreeItemProps = {
  ids: string[];
  note: Note;
  onNoteNavigate: (orders: number[]) => void;
  orderNumbers?: number[];
  parentExpanded?: boolean;
};

/** @package */
export const SideTreeItem = ({ ids, note, onNoteNavigate, orderNumbers, parentExpanded = true }: SieTreeItemProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useColors();
  // customHook
  const { position } = useAnimeExpandedRotate(note?.expanded ?? false);
  const { notes } = useSelector(selectNote);
  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Note>): JSX.Element => {
      if (item === undefined) return <></>;
      return (
        <OpacityDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <SideTreeItem
              note={item}
              onNoteNavigate={onNoteNavigate}
              ids={[item.id, ...ids]}
              orderNumbers={orderNumbers !== undefined ? [...orderNumbers, note.orderNumber] : [note.orderNumber]}
              parentExpanded={note?.expanded ?? false}
            />
          </TouchableOpacity>
        </OpacityDecorator>
      );
    },
    [ids, note?.expanded, onNoteNavigate],
  );

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
  }, [dispatch, ids, note.children, notes, renderItem]);

  const Emoji = (): JSX.Element => {
    return (
      <>
        <Stack h={24} w={24} br={4} bg={note.emoji !== undefined ? colors.text : 'transparent'} mr={4}>
          {note.emoji?.name.length ? (
            <Text ta="center" fos={'lg'} lh={24}>
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
    <Stack w={(width / 4) * 3 - note.level * 10} pl={note.level ? 24 : 8} pr={2} bw={2} boc={colors.primary} br={8}>
      <XStack
        animation="bouncy"
        pressStyle={{ opacity: 0.7, scale: 0.9 }}
        onPress={() => onNoteNavigate(orderNumbers !== undefined ? [...orderNumbers, note.orderNumber] : [note.orderNumber])}
        pos="relative"
        ai="center"
        jc="space-between"
        bg={colors.primary}
        py={2}
      >
        <XStack alignItems="center" f={1}>
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
                col={colors.text}
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
