import { SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import { Stack, XStack } from 'tamagui';

import { updateFucusId, updateOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { DescriptionInput, Emoji, TitleInput } from './NoteCardChild';

export type NoteCardProps = {
  ids: number[];
  note: Notes;
  parentExpanded?: boolean;
};

// NOTE:icloudに保存はできるのか？
// TODO:サイドメニュー作成 storeは別にした方が良いかも
// TODO:styleSheetの引数に色渡せて外だしできるように
// TODO:アニメーションをtamaguiにする
// TODO:パフォーマンス測るもの入れときたい
// ↓リリース後
// TODO:ログインできるように
// TODO:GraphQL使用
// TODO:検索できるように
// TODO:文字を書けるように
// TODO:画像を使えるようにする
/** @package */
export const NoteCard = ({
  ids,
  note,
  parentExpanded = true,
}: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  // useRef
  const animatedValue = useRef(new Animated.Value(0)).current;
  // useState
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const duration = useMemo(() => 200 - 50 * note.level, [note.level]);
  // ここを親で定義すると？
  // Animatedのリファクタ
  // useCallbackでComponent化 関心の分離

  const fadeIn = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeOut = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: descriptionHeight + 16,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionHeight]);

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <NoteCard
              note={item}
              ids={[item.id, ...ids]}
              parentExpanded={expanded}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [expanded],
  );

  const NoteChildCard = useCallback((): JSX.Element => {
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
  }, [note.children, expanded]);

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
          <Emoji ids={ids} storeEmoji={note.emoji} />
          <TitleInput ids={ids} storeTitle={note.title} />
        </XStack>
        {/* TODO:Expandedはアニメーション終わったあとにコンポーネント化 */}
        <Stack boc={colors.primary}>
          {expanded ? (
            <SimpleLineIcons
              onPress={() => {
                setExpanded((prevExpanded) => !prevExpanded);
                fadeIn();
              }}
              name="arrow-up"
              size={20}
              color={colors.text}
              px={12 - 4 * (note.level + 1)}
            />
          ) : (
            <SimpleLineIcons
              onPress={() => {
                setExpanded((prevExpanded) => !prevExpanded);
                fadeOut();
              }}
              name="arrow-down"
              size={20}
              color={colors.text}
              px={12 - 4 * (note.level + 1)}
            />
          )}
        </Stack>
      </XStack>
      <DescriptionInput
        descriptionHeight={descriptionHeight}
        expanded={expanded}
        ids={ids}
        setDescriptionHeight={setDescriptionHeight}
        storeDescription={note.description}
      />
      <NoteChildCard />
      {/* { */}
      {/* // TODO:key一位なkeyになるように修正
        //   return <NoteCard key={index} note={note} parentExpanded={expanded} ids={[note.id, ...ids]} />
        // })
      // } */}
    </Stack>
  );
};
