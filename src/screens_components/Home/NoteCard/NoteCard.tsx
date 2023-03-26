import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';

import { updateFucusId } from '~/slices/focusNoteSlice';
import { updateAsyncNoteOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeExpand } from '../hook/useAnimeExpand';
import { useAnimeExpandedRotate } from '../hook/useAnimeExpandedRotate';
import { EmojiPickerButton, NoteHeader, NoteWrapper, RichDescriptionDialog } from './NoteCardChild';

export type NoteCardProps = {
  ids: string[];
  note: Note;
  orderedList: boolean;
  parentExpanded?: boolean;
};

/** @package */
export const NoteCard = ({ ids, note, orderedList, parentExpanded = true }: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  // state
  const [descriptionHeight, setDescriptionHeight] = useState<number>(48);
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  // custom hook
  const flatListRef = useRef<any>(undefined);
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

  const NoteChildCard = useCallback((): JSX.Element => {
    if (note.children !== undefined) {
      const NoteChild = note.children;
      return (
        <DraggableFlatList
          data={NoteChild}
          ref={flatListRef}
          // TODO:スクロールが上手く行かない
          // scrollEnabled={focusNote.level - 1 === note.level}
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
  }, [dispatch, ids, note.children, renderItem]);

  if (!parentExpanded) {
    return <></>;
  }

  return (
    <NoteWrapper
      // TODO:入れ子の順番入れ替えできたけど、親と順番交換するのはどうする？なんか境界線超えれるのあったようなDragFlatListに
      onFocus={() => {
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
    >
      {/* TODO:絵文字の箇所型など修正 */}
      <NoteHeader
        setExpanded={setExpanded}
        expanded={expanded}
        fadeIn={fadeIn}
        fadeOut={fadeOut}
        ids={ids}
        note={note}
        orderedList={orderedList}
        position={position}
      >
        <EmojiPickerButton ids={ids} noteEmoji={note.emoji} noteId={note.id} />
      </NoteHeader>
      <RichDescriptionDialog ids={ids} note={note} setDescriptionHeight={setDescriptionHeight} animatedValue={animatedValue} />
      <NoteChildCard />
    </NoteWrapper>
  );
};
