import { useTheme } from '@react-navigation/native';
import React, { Suspense, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Stack, XStack } from 'tamagui';

import { height, width } from '~/lib/constants';
import { updateOrder } from '~/slices/noteSlice';
import { selectSideTree } from '~/slices/sideTreeSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { useSideTree } from './hook/useSideTree';
import { SideTreeItem } from './SideTreeItem';

/** @package */
export const SideTree = ({
  notes,
  onNoteNavigate,
}: {
  notes: Notes[];
  onNoteNavigate: (height: number) => void;
}): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  const { position } = useSelector(selectSideTree);
  const { onPress } = useSideTree();

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <SideTreeItem
              onNoteNavigate={onNoteNavigate}
              note={item}
              ids={[item.id]}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [],
  );

  return (
    <Suspense fallback={<Spinner />}>
      <XStack
        animation={'bouncy'}
        h={height}
        w={width}
        pos={'absolute'}
        zIndex={1}
        {...position}
      >
        <Stack
          h={height}
          br="$4"
          pt={30}
          w={(width / 4) * 1}
          onPress={onPress}
        />
        <Stack
          bc={colors.primary}
          h={height}
          br="$4"
          pt={30}
          btrr={0}
          w={(width / 4) * 3}
        >
          <DraggableFlatList
            data={notes}
            activationDistance={10}
            onDragEnd={({ data, from, to }) => {
              const id = data[to]?.id;
              if (id !== undefined) {
                dispatch(updateOrder({ from, ids: [id], to }));
              }
            }}
            keyExtractor={(item) => `item-${item.id}`}
            renderItem={renderItem}
          />
        </Stack>
      </XStack>
    </Suspense>
  );
};
