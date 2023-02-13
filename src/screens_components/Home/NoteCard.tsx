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
import { Note } from '~/types/types';

import { useAnimeExpand } from './hook/useAnimeExpand';
import { useAnimeExpandedRotate } from './hook/useAnimeExpandedRotate';

export type NoteCardProps = {
  ids: string[];
  note: Note;
  parentExpanded?: boolean;
};

// NOTE:icloudに保存はできるのか？ 一旦断念
// NOTE:APIを叩く前に処理を実施 APIがfalseだったらStateの処理を戻すようにする
// NOTE:見えなくなったNoteのデータは削除した方がヌルヌル動くのでは？
// TODO:[graphQL]取得する
// TODO:focusの処理を直す
// TODO:addBrotherを階層事にできるようにする
// TODO:開いているもののみ処理するように修正する
// TODO:[graphQL]アップデートする
// TODO:[graphQL]削除する
// TODO:[graphQL]NoteをUserIdと紐付ける
// TODO:[graphQL]をユーザーと紐付けれるようにする
// TODO:設計見直す
// TODO:https://alexsidorenko.com/blog/react-render-children-prop/
// TODO:https://alexsidorenko.com/blog/react-optimize-rerenders-without-refs-memo/
// TODO:コマンドZってどうやってやるん？
// TODO:Googleの広告をつっこむ
// TODO:↑の方どうなってるん？SafetyScrollAreaが微妙？な感じに思える
// TODO:パフォーマンス測るもの入れときたい
// TODO:styleのcolor動的↓に書けるように
// const iconStyle = (props: {
//   focused: boolean;
//   size: number;
//   color: string;
// }): StyleProp<ImageStyle> => ({
//   width: props.size,
//   height: props.size,
//   tintColor: props.color,
// });
// TODO:子供を追加した時はexpandedを1にする
// TODO:関心の分離化
// TODO:なんかサイドツリー２回押さないと動作しない
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
  // const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [description, setDescription] = useState<string>(note.description);
  const [title, setTitle] = useState<string>(note.title);
  const { noteHeights } = useSelector(selectNoteHeight);
  const noteHeight = noteHeights.find(
    (noteHeight) => noteHeight.id === note.id,
  );
  // console.log({noteHeight})
  // customHook
  const { animatedValue, fadeIn, fadeOut } = useAnimeExpand({
    descriptionHeight: noteHeight?.contentsHeight ?? 32,
    expanded: note.expanded,
    ids,
    level: note.level,
  });
  const { position } = useAnimeExpandedRotate(note.expanded);

  const renderItem = useCallback(
    ({ item }: { item: Note }): JSX.Element => {
      return (
        <NoteCard
          note={item}
          ids={[item.id, ...ids]}
          parentExpanded={note.expanded}
        />
      );
    },
    [ids, note.expanded],
  );

  const Emoji = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handlePick = useCallback((emojiObject: EmojiType): void => {
      // setEmoji(emojiObject.emoji)
      dispatch(updateEmoji({ emoji: emojiObject.emoji, ids }));
    }, []);

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
  }, [note.children, renderItem]);

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
      onTouchStart={() => {
        console.log('note.level', note.level);
        dispatch(
          updateFucusId({
            focusChildrenLength: note.children?.length ?? 0,
            focusId: note.id,
            ids,
            level: note.level,
            orderNumber: note.orderNumber,
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
          {/* <Emoji /> */}
          <TextArea
            style={[styles.titleTextInputStyle, { color: colors.text }]}
            focusStyle={{ ...styles.focusTitleStyle, borderColor: colors.text }}
            bg={colors.primary}
            py={10}
            lineHeight={8}
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
          height={noteHeight?.contentsHeight ?? 32}
          multiline={true}
          onContentSizeChange={(event) => {
            // level0 2回ずつ
            // level1 ?回ずつ
            if (
              event.nativeEvent.contentSize.height !== 16 &&
              event.nativeEvent.contentSize.height !==
                noteHeight?.contentsHeight
            ) {
              dispatch(
                updateContentsHeight({
                  id: note.id,
                  contentsHeight: event.nativeEvent.contentSize.height + 30,
                }),
              );
            }
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
    paddingVertical: 10,
  },
  titleTextInputStyle: {
    alignItems: 'center',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});
