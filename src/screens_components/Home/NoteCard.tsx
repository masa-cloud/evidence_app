import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { FlatList } from '@stream-io/flat-list-mvcp';
import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import { Stack, Text, TextArea, XStack } from 'tamagui';

import {
  selectNoteHeight,
  updateContentsHeight,
} from '~/slices/noteHeightSlice';
import {
  updateDescription,
  updateEmoji,
  updateExpanded,
  updateFucusId,
  updateTitle,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { useAnimeExpand } from './hook/useAnimeExpand';
import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type NoteCardProps = {
  ids: number[];
  note: Notes;
  parentExpanded?: boolean;
};

// NOTE:icloudに保存はできるのか？

// TODO:sideTreeはDragFlatList使って、NoteはFlatList使う！ただExpo対応していなかったらどうしよう。。。
// TODO:↑に追加できるが、おかしく見せない動きはできるのか？？？ 追加されたらその分スクロールするとか？FlatList ↑に要素追加とかで調べてみるのも良いかも？
// TODO:グラフQL導入グラフQL導入
// TODO:Googleの広告をつっこむ
// TODO:↑の方どうなってるん？SafetyScrollAreaが微妙？な感じに思える
// TODO:パフォーマンス測るもの入れときたい
// TODO:関心の分離化
// TODO:会員登録は必須にする
// TODO:Storageの設定(保存方法と最大容量など)考えないといけないのでは？
// TODO:dispatch(updateHeight)をcontentsHeightのところに移動 height = contentsHeight + ???px
// TODO:何回も起きる高さupdateのdispatchをレンダリングを1回にする
// ↓リリース後
// TODO:updateテーマで色変えるのから、サブスクもあり(赤青黃以外はサブスクみたいな)
// TODO:広めるためのシェア活動とかも必要 twitterにシェアで1週間広告非表示とか
// TODO:背景画像変えれるように
// TODO:皆のテンプレ動画導入 本日、1日前、2日前、週間(サブスク)、月間(サブスク)
// TODO:ログインできるように
// TODO:GraphQL使用
// TODO:パスワードの強さ
// TODO:検索できるように
// TODO:文字を書けるように
// TODO:サブスク導入
// TODO:画像を使えるようにする
/** @package */
export const NoteCard = ({
  ids,
  note,
  parentExpanded = true,
}: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  // useState
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [description, setDescription] = useState<string>(note.description);
  const [title, setTitle] = useState<string>(note.title);
  const { noteHeights } = useSelector(selectNoteHeight);
  const noteHeight = noteHeights.find(
    (noteHeight) => noteHeight.id === note.id,
  );
  // customHook
  const { animatedValue, fadeIn, fadeOut } = useAnimeExpand({
    descriptionHeight,
    expanded: note.expanded,
    ids,
    level: note.level,
  });
  const { position } = useAnimeExpandedRotate(note.expanded);

  const renderItem = useCallback(
    ({ item }: { item: Notes }): JSX.Element => {
      return (
        <NoteCard
          note={item}
          ids={[item.id, ...ids]}
          parentExpanded={note.expanded}
        />
      );
    },
    [note.expanded],
  );

  const Emoji = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handlePick = useCallback(
      (emojiObject: EmojiType): void => {
        // setEmoji(emojiObject.emoji)
        dispatch(updateEmoji({ emoji: emojiObject.emoji, ids }));
      },
      [ids],
    );

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
          {note.emoji ? (
            <Text
              onPress={() => setIsOpen(true)}
              textAlign="center"
              fos={22}
              lineHeight="28"
            >
              {note.emoji}
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
  };

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
  }, [note.children, note.expanded]);

  if (!parentExpanded) {
    return <></>;
  }
  // TODO:なんかスクロールしづらそう。。。
  return (
    <Stack
      // onLayout={({
      //   nativeEvent: {
      //     layout: { height },
      //   },
      // // TODO:↓の行移動
      // }) => dispatch(updateHeight({ id: note.id, height }))
      // }
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
          <Emoji />
          <TextArea
            style={[styles.titleTextInputStyle, { color: colors.text }]}
            focusStyle={{ ...styles.focusTitleStyle, borderColor: colors.text }}
            bg={colors.primary}
            py={2}
            lineHeight={20}
            px={4}
            bw={0}
            value={title ?? ''}
            multiline={true}
            onChangeText={(title) => setTitle(title)}
            autoCapitalize="none"
            onEndEditing={() => dispatch(updateTitle({ title, ids }))}
          />
        </XStack>
        {/* TODO:Expandedはアニメーション終わったあとにコンポーネント化 */}
        <Stack boc={colors.primary}>
          <Stack animation={'bouncy'} {...position}>
            <SimpleLineIcons
              onPress={() => {
                dispatch(updateExpanded({ expanded: !note.expanded, ids }));
                note.expanded ? fadeIn() : fadeOut();
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
          focusStyle={{
            ...styles.focusDescriptionStyle,
            borderColor: colors.primary,
          }}
          boc={colors.primary}
          value={description ?? ''}
          lineHeight={16}
          multiline={true}
          onContentSizeChange={(event) => {
            setDescriptionHeight(event.nativeEvent.contentSize.height);
            // level0 2回ずつ
            // level1 ?回ずつ
            if (
              event.nativeEvent.contentSize.height !== 16 &&
              event.nativeEvent.contentSize.height !==
                noteHeight?.contentsHeight
            ) {
              console.log(note.id, event.nativeEvent.contentSize.height);
              dispatch(
                updateContentsHeight({
                  id: note.id,
                  contentsHeight: event.nativeEvent.contentSize.height + 50,
                }),
              );
            }
            // note.id === 16 &&
            //   console.log(event.nativeEvent.contentSize.height, note.id, note.title);
            // note.id === 6 &&
            //   console.log(event.nativeEvent.contentSize.height, note.id, note.title);
            // note.id === 2 &&
            //   console.log(event.nativeEvent.contentSize.height, note.id, note.title);
          }}
          onChangeText={(description) => {
            setDescription(description);
          }}
          autoCapitalize="none"
          onEndEditing={() => dispatch(updateDescription({ description, ids }))}
        />
      </Animated.View>
      <NoteChildCard />
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});
