import React, { Suspense, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Stack, XStack } from 'tamagui';

import { _HEIGHT, useColors, width } from '~/lib/constants';
import { updateAsyncNoteOrder } from '~/slices/noteSlice';
import { selectSideTree } from '~/slices/sideTreeSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useSideTree } from '../hook/useSideTree';
import { SideTreeItem } from './SideTreeChild';

/** @package */
export const SideTree = ({ notes, onNoteNavigate }: { notes: Note[]; onNoteNavigate: (orders: number[]) => void }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useColors();
  const { position } = useSelector(selectSideTree);
  const { onPress } = useSideTree();

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Note>): JSX.Element => {
      return (
        <Stack>
          <OpacityDecorator>
            <TouchableOpacity onLongPress={drag} disabled={isActive}>
              <SideTreeItem onNoteNavigate={onNoteNavigate} note={item} ids={[item?.id ?? '']} />
            </TouchableOpacity>
          </OpacityDecorator>
        </Stack>
      );
    },
    [onNoteNavigate],
  );

  if (notes.length === 0) return <></>;

  return (
    <Suspense fallback={<Spinner />}>
      <XStack animation={'bouncy'} h={_HEIGHT} w={width} pos={'absolute'} zIndex="2" {...position}>
        <Stack h={_HEIGHT} br="$4" pt={30} w={(width / 4) * 1} onPress={() => onPress()} />
        <Stack bc={colors.primary} h={_HEIGHT} br="$4" pt={30} btrr={0} w={width}>
          <DraggableFlatList
            data={notes}
            activationDistance={10}
            onDragEnd={({ data, from, to }) => {
              const id = data[to]?.id;
              if (id !== undefined) {
                const updateOrder = async (): Promise<void> => {
                  try {
                    await dispatch(
                      updateAsyncNoteOrder({
                        ids: [id],
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
            // TODO:不要だったらそれでいい
            // extraData={notes}
            keyExtractor={(item, index) => `side-tree-${item?.id ?? index}-${index}`}
            // getItemLayout={getItemLayout}
            renderItem={renderItem}
          />
        </Stack>
      </XStack>
    </Suspense>
  );
};
