import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import RenderHTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import {
  Adapt,
  AlertDialog,
  Button,
  Dialog,
  Image,
  Sheet,
  Stack,
  Unspaced,
  XStack,
  YStack,
} from 'tamagui';

import { Images } from '~/assets/images';
import { _HEIGHT, useColors, width } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import {
  addAsyncBrotherNote,
  addAsyncChildNote,
  deleteAsyncNote,
  updateAsyncNote,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

type RichDescriptionDialogProps = {
  ids: string[];
  note: Note;
  setDescriptionHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const RichDescriptionDialog: FC<RichDescriptionDialogProps> = (
  props,
): JSX.Element => {
  const richText = useRef<RichEditor | null>();
  const { colors } = useColors();
  const dispatch: AppDispatch = useDispatch();
  const [draftDescription, setDraftDescription] = useState<string>(
    props.note.description,
  );
  const [snapPointNumber, setSnapPointNumber] = useState<number>(0);
  const isAndroid = Platform.OS === 'android';
  const snapPointHeight = [80, 95, 65];
  const [savedDescription, setSavedDescription] = useState<string>(
    props.note.description,
  );
  const { focusNote } = useSelector(selectFocusNote);
  const thisNoteFocus = useMemo(
    () => focusNote.focusId === props.note.id,
    [focusNote.focusId, props.note.id],
  );
  // const [saveDoneContentHeight, setSaveDoneContentHeight] = useState<number>(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const onDone = (): void => {
    richText.current?.blurContentEditor();
    void (async () => {
      // TODO idsが無い時のハンドリング ここのasync awaitの書き方どうなん
      await dispatch(
        updateAsyncNote({
          ids: props.ids,
          updateNoteData: {
            id: props.ids[0] ?? '',
            description: draftDescription,
          },
        }),
      );
      setSavedDescription(draftDescription);
      // await dispatch(
      //   updateContentsHeight({
      //     id: note.id,
      //     contentsHeight: saveDoneContentHeight,
      //   }),
      // );
    })();
  };
  const onKeyboardDidShow = useCallback(
    (e: any): void => {
      let height = Platform.OS === 'android' ? 0 : e.endCoordinates.height;
      if (isAndroid) {
        height = 0;
      }
      if (!isAndroid) {
        height = e.endCoordinates.height;
      }
      setKeyboardHeight(height);
    },
    [isAndroid],
  );

  const onKeyboardDidHide = useCallback((): void => {
    setKeyboardHeight(0);
  }, []);
  const scrollRef = useRef();
  useFocusEffect(
    useCallback(() => {
      const didShowSubscription = Keyboard.addListener(
        'keyboardDidShow',
        onKeyboardDidShow,
      );
      const didHideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        onKeyboardDidHide,
      );
      return () => {
        didShowSubscription.remove();
        didHideSubscription.remove();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const handleCursorPosition = useCallback((offsetY: number) => {
    // Positioning scroll bar
    scrollRef?.current?.scrollTo({ animated: true, y: offsetY - 30 });
  }, []);

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Stack px={6.5} minHeight={48} f={1}>
          <Stack
            onLayout={(event) =>
              props.setDescriptionHeight(
                event.nativeEvent.layout.height !== 0
                  ? event.nativeEvent.layout.height
                  : 40,
              )
            }
          >
            <RenderHTML
              source={{
                html: savedDescription,
              }}
              tagsStyles={{
                code: {
                  backgroundColor: colors.background,
                  borderRadius: 4,
                  color: colors.text,
                  padding: 4,
                },
                div: { fontSize: 18 },
                html: {
                  backgroundColor: colors.background,
                },
                p: { fontSize: 18 },
                span: { fontSize: 18 },
              }}
              contentWidth={width}
            />
          </Stack>
          {thisNoteFocus && (
            <>
              <YStack
                pos="absolute"
                py={8}
                b={0}
                right={0}
                ai="center"
                w={40}
                backgroundColor={colors.primary}
                ml={8}
                br={8}
              >
                <TouchableOpacity
                  onPress={() => {
                    void (async () => {
                      await dispatch(
                        addAsyncBrotherNote({
                          focusLevel: props.note.level,
                          ids: props.ids,
                          orderNumber: props.note.orderNumber,
                          parentId: props.note.parentId,
                        }),
                      );
                    })();
                  }}
                >
                  <Stack mx={8} pb={4}>
                    <Image height={24} width={24} src={Images.plusPare} />
                  </Stack>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    void (async () => {
                      await dispatch(
                        addAsyncChildNote({
                          id: props.note.id,
                          childrenLength: props.note.children?.length ?? 0,
                          focusLevel: props.note.level,
                          ids: props.ids,
                        }),
                      );
                    })();
                  }}
                >
                  <Stack mx={8} pt={4}>
                    <Image height={24} width={24} src={Images.plusChild} />
                  </Stack>
                </TouchableOpacity>
              </YStack>
              <Stack pos="absolute" bc={colors.primary} br={8} b={0} p={4}>
                <AlertDialog native>
                  <AlertDialog.Trigger asChild>
                    <MaterialIcons
                      onLongPress={() => {
                        void (async () => {
                          await dispatch(
                            deleteAsyncNote({
                              id: props.note.id,
                            }),
                          );
                        })();
                      }}
                      name="delete"
                      pt={4}
                      alignItems="center"
                      size={30}
                      color={colors.text}
                    />
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay
                      key="overlay"
                      animation="quick"
                      o={0.5}
                      enterStyle={{ o: 0 }}
                      exitStyle={{ o: 0 }}
                    />
                    <AlertDialog.Content
                      bordered
                      elevate
                      key="content"
                      animation={[
                        'quick',
                        {
                          opacity: {
                            overshootClamping: true,
                          },
                        },
                      ]}
                      enterStyle={{ opacity: 0, scale: 0.9, x: 0, y: -20 }}
                      exitStyle={{ opacity: 0, scale: 0.95, x: 0, y: 10 }}
                      x={0}
                      scale={1}
                      opacity={1}
                      y={0}
                    >
                      <YStack space>
                        <AlertDialog.Title>ヒント</AlertDialog.Title>
                        <AlertDialog.Description>
                          ゴミ箱アイコンを長押しすると、選択された項目を削除します。
                        </AlertDialog.Description>

                        <XStack space="$3" jc="flex-end">
                          <AlertDialog.Cancel asChild>
                            <Button>キャンセル</Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action
                            asChild
                            onPress={() => {
                              void (async () => {
                                await dispatch(
                                  deleteAsyncNote({
                                    id: props.note.id,
                                  }),
                                );
                              })();
                            }}
                          >
                            <Button theme="alt2">削除</Button>
                          </AlertDialog.Action>
                        </XStack>
                      </YStack>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog>
              </Stack>
            </>
          )}
        </Stack>
      </Dialog.Trigger>

      <Adapt platform="touch">
        {/* TODO: SnapPointは永続化したほうが使いやすいのでは？ */}
        <Sheet
          onPositionChange={(snapPoint) => setSnapPointNumber(snapPoint)}
          zIndex={200000}
          modal
          dismissOnSnapToBottom
          snapPoints={[...snapPointHeight]}
          disableDrag
        >
          <Sheet.Frame padding="$4" space>
            <Sheet.Handle h={12} bc={colors.primary} />
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="bouncy"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          onLayout={(event) => console.warn({ event })}
          key="content"
          animation={[
            'bouncy',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0.9, x: 0, y: -20 }}
          exitStyle={{ opacity: 0, scale: 0.95, x: 0, y: 10 }}
          space
          f={1}
        >
          <YStack
            h={_HEIGHT * ((snapPointHeight[snapPointNumber] ?? 95) * 0.01)}
          >
            <Stack
              flexBasis={'auto'}
              flexGrow={1}
              flexShrink={1}
              backgroundColor={colors.link}
              w={'100%'}
            >
              <RichEditor
                ref={(r) => (richText.current = r)}
                initialFocus={true}
                initialContentHTML={draftDescription ?? ''}
                onChange={(description) => {
                  setDraftDescription(description);
                }}
                onCursorPosition={handleCursorPosition}
                style={[styles.richEditor]}
                editorStyle={{
                  backgroundColor: colors.border,
                  // color: theme.richEditor.textColor,
                  // placeholderColor: theme.richEditor.placeholderColor,
                  contentCSSText: `
                      display: flex;
                      flex-direction: column;
                      flex: 1:`,
                }}
              />
            </Stack>
            <XStack
              flexBasis={44}
              flexGrow={0}
              flexShrink={0}
              alignItems="center"
            >
              <RichToolbar
                // TODO: ダークモード対応目調整
                // style={[styles.richBar, dark && styles.richBarDark]}
                style={[styles.richBar]}
                flatContainerStyle={styles.flatStyle}
                editor={richText}
                selectedIconTint={'#2095F2'}
                disabledIconTint={'#bfbfbf'}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setStrikethrough,
                  actions.insertLink,
                  actions.insertOrderedList,
                  actions.insertBulletsList,
                  actions.blockquote,
                  actions.code,
                  // TODO:不要かなー
                  // actions.checkboxList,
                  // actions.indent,
                  // actions.outdent,
                  // TODO
                  // actions.insertImage,
                ]}
              />
              <Dialog.Close
                m={0}
                ml={16}
                displayWhenAdapted
                asChild
                onPress={() => onDone()}
              >
                <FontAwesome5
                  size="50"
                  backgroundColor={colors.primary}
                  name="pen-square"
                  color={colors.primary}
                />
              </Dialog.Close>
            </XStack>
            <Stack
              flexBasis={keyboardHeight + 55}
              flexGrow={0}
              flexShrink={0}
            />
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <MaterialIcons
                pos="absolute"
                t="0"
                left="0"
                onLongPress={() => {
                  void (async () => {
                    await dispatch(
                      deleteAsyncNote({
                        id: props.note.id,
                      }),
                    );
                  })();
                }}
                name="delete"
                pt={4}
                alignItems="center"
                size={30}
                color={colors.text}
              />
              {/* <Button pos="absolute" color={colors.primary} t="0" left="0" size="$8" zIndex={10000000000} circular icon={X} /> */}
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  flatStyle: {
    paddingHorizontal: 12,
  },
  richBar: {
    backgroundColor: 'black',
    borderColor: '#efefef',
    borderRadius: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  richEditor: {
    borderColor: '#e3e3e3',
    borderRadius: 8,
    flex: 1,
    fontSize: 14,
    margin: 0,
    padding: 0,
    width: '100%',
  },
});
