import { SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import { Circle, Stack, Text, XStack } from 'tamagui';

import { width } from '~/lib/constants';
import { updateExpanded, updateFucusId, updateOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type SieTreeItemProps = {
  ids: number[];
  note: Notes;
  parentExpanded?: boolean;
};

/** @package */
export const SideTreeItem = ({
  ids,
  note,
  parentExpanded = true,
}: SieTreeItemProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  // customHook
  const { position } = useAnimeExpandedRotate(note.expanded);

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <SideTreeItem
              note={item}
              ids={[item.id, ...ids]}
              parentExpanded={note.expanded}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [note.expanded],
  );

  const SideTreeChildItem = useCallback((): JSX.Element => {
    if (note.children !== undefined) {
      const NoteChild = note.children;
      return (
        <DraggableFlatList
          data={NoteChild}
          onDragEnd={({ data, from, to }) => {
            // setStateNotes(data)
            const id = data[to]?.id;
            if (id !== undefined) {
              dispatch(updateOrder({ from, ids: [id, ...ids], to }));
            }
          }}
          keyExtractor={(item) => `item-${item.id}`}
          renderItem={renderItem}
        />
      );
    } else {
      return <></>;
    }
  }, [note.children, note.expanded]);

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
          {note.emoji !== undefined ? (
            <Text textAlign="center" fontSize="lg" lineHeight="24">
              {note.emoji}
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

  // TODO:なんかスクロールしづらそう。。。
  return (
    <Stack
      // focusStyle={styles.focusStyle}
      // TODO:入れ子の順番入れ替えできたけど、親と順番交換するのはどうする？なんか境界線超えれるのあったようなDragFlatListに
      onTouchStart={() =>
        dispatch(updateFucusId({ focusId: note.id, ids, level: note.level }))
      }
      w={(width / 4) * 3 - note.level * 10}
      pl={8}
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
        {/* TODO:Expandedはアニメーション終わったあとにコンポーネント化 */}
        <Stack boc={colors.primary}>
          {!!note.children?.length && (
            <Stack animation={'bouncy'} {...position}>
              <SimpleLineIcons
                onPress={() => {
                  dispatch(updateExpanded({ expanded: !note.expanded, ids }));
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
