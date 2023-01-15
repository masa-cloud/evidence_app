import { useTheme } from '@react-navigation/native';
import React, { Suspense, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Stack } from 'tamagui';

import { height, width } from '~/lib/constants';
import { updateOrder } from '~/slices/noteSlice';
import { selectSideTree } from '~/slices/sideTreeSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { SideTreeItem } from './SideTreeItem';

/** @package */
export const SideTree = ({ notes }: { notes: Notes[] }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  const { position } = useSelector(selectSideTree);

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <SideTreeItem note={item} ids={[item.id]} />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [],
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        animation={'bouncy'}
        h={height}
        pos={'absolute'}
        t={55}
        zIndex={1}
        {...position}
      >
        <Stack bc={colors.primary} h={height - 55} br="$10" pt={30} w={width}>
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
      </Stack>
    </Suspense>
  );
};
