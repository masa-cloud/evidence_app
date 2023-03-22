import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { FC, memo, useCallback, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import RenderHTML from 'react-native-render-html';
import { useDispatch } from 'react-redux';
import { Adapt, Dialog, Sheet, Stack, Unspaced, XStack, YStack } from 'tamagui';

import { useColors, width } from '~/lib/constants';
import { updateFucusId } from '~/slices/focusNoteSlice';
import { updateAsyncNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { useAnimeRichDescriptionEditor } from './hook/useAnimeRichDescriptionEditor';

type RichDescriptionDialogProps = {
  ids: string[];
  note: Note;
  setDescriptionHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const snapPointHeight: [number, number, number] = [80, 95, 65];

export const actionList = [
  actions.insertImage,
  actions.checkboxList,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.insertLink,
  actions.setItalic,
  actions.setUnderline,
  actions.undo,
  actions.redo,
  actions.keyboard,
] as string[];

export const RichDescriptionDialog: FC<RichDescriptionDialogProps> = memo((props: RichDescriptionDialogProps) => {
  const richText = useRef<RichEditor | null>();
  const { colors } = useColors();
  const dispatch: AppDispatch = useDispatch();
  const [draftDescription, setDraftDescription] = useState<string>(props.note.description);
  const [snapPointNumber, setSnapPointNumber] = useState<number>(0);
  const isAndroid = Platform.OS === 'android';
  const [savedDescription, setSavedDescription] = useState<string>(props.note.description);
  const { position } = useAnimeRichDescriptionEditor(snapPointNumber);

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
  useFocusEffect(
    useCallback(() => {
      const didShowSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
      const didHideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
      return () => {
        didShowSubscription.remove();
        didHideSubscription.remove();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Dialog modal>
      <Dialog.Trigger
        asChild
        onPress={() => {
          dispatch(
            updateFucusId({
              focusChildrenLength: props.note.children?.length ?? 0,
              focusId: props.note.id,
              ids: props.ids,
              level: props.note.level,
              orderNumber: props.note.orderNumber,
              parentId: props.note.parentId,
            }),
          );
        }}
      >
        <Stack minHeight={48} onLayout={(event) => props.setDescriptionHeight(event.nativeEvent.layout.height)}>
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
        <Dialog.Overlay key="overlay" animation="bouncy" o={0.5} enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'bouncy',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ o: 0, scale: 0.9, x: 0, y: -20 }}
          exitStyle={{ o: 0, scale: 0.95, x: 0, y: 10 }}
          space
          f={1}
        >
          <YStack animation={'bouncy'} fullscreen {...position} bg="transparent" ai="stretch">
            <Stack animation={'bouncy'} fb={'auto'} fg={1} fs={0} bg="transparent" w={'100%'}>
              <RichEditor
                ref={(r) => (richText.current = r)}
                initialFocus={true}
                initialContentHTML={draftDescription ?? ''}
                onChange={(description) => {
                  setDraftDescription(description);
                }}
                style={styles.richEditor}
                editorStyle={{
                  backgroundColor: 'transparent',
                  contentCSSText: `
                      padding-top: 40px;
                      display: flex;
                      overflow-y: scroll;
                      flex-direction: column;
                      position: absolute;
                      top: 0; right: 0; bottom: 0; left: 0;
                      flex: 1:`,
                }}
              />
            </Stack>
            <XStack animation={'bouncy'} h={44} ai="center">
              <RichToolbar
                style={styles.richBar}
                flatContainerStyle={styles.flatStyle}
                editor={richText}
                selectedIconTint={'#2095F2'}
                disabledIconTint={colors.primary}
                unselectedButtonStyle={styles.richToolBarIcon}
                selectedButtonStyle={styles.richToolBarIcon}
                disabledButtonStyle={styles.richToolBarIcon}
                actions={actionList}
                // TODO:不要かなー
                // actions.checkboxList,
                // actions.indent,
                // actions.outdent,
                // TODO
                // actions.insertImage,
              />
              <Dialog.Close m={0} ml={16} displayWhenAdapted asChild pos="relative" onPress={() => onDone()}>
                <Stack h={44} w={44} bg={colors.secondary} br={8} mr={8} jc={'center'} ai={'center'}>
                  <Ionicons name="pencil" size={24} color={colors.text} />
                </Stack>
              </Dialog.Close>
            </XStack>
            <Stack bg="transparent" h={keyboardHeight} />
          </YStack>
          <Unspaced>
            <Dialog.Close pos="absolute" t={12} r={12} asChild m={0} displayWhenAdapted>
              <FontAwesome5
                size={24}
                name="times"
                // TODO:色変更
                color={colors.primary}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});

RichDescriptionDialog.displayName = 'RichDescriptionDialog';

const styles = StyleSheet.create({
  flatStyle: {
    paddingHorizontal: 12,
  },
  richBar: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  richEditor: {
    backgroundColor: 'transparent',
    flex: 1,
    fontSize: 14,
    margin: 0,
    overflowY: 'scroll',
    padding: 0,
    width: '100%',
  },
  richToolBarIcon: {
    fontSize: 28,
    width: 40,
  },
});
