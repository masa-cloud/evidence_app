import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { FC, memo, useCallback, useState } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Adapt, Dialog, Sheet, SizableText, Stack, TextArea, Unspaced, XStack, YStack } from 'tamagui';

import { useColors } from '~/lib/constants';
import { updateFucusId } from '~/slices/focusNoteSlice';
import { updateAsyncNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

type TitleDialogProps = {
  ids: string[];
  note: Note;
};

export const TitleDialog: FC<TitleDialogProps> = memo((props: TitleDialogProps) => {
  const { colors } = useColors();
  const dispatch: AppDispatch = useDispatch();
  const [draftTitle, setDraftTitle] = useState<string>(props.note.title);
  const isAndroid = Platform.OS === 'android';
  const [savedTitle, setSavedTitle] = useState<string>(props.note.title);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const onDone = useCallback((): void => {
    void (async () => {
      // TODO idsが無い時のハンドリング ここのasync awaitの書き方どうなん
      await dispatch(
        updateAsyncNote({
          ids: props.ids,
          updateNoteData: {
            id: props.ids[0] ?? '',
            title: draftTitle,
          },
        }),
      );
      setSavedTitle(draftTitle);
    })();
  }, [dispatch, draftTitle, props.ids]);
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
        <SizableText
          ai="center"
          f={1}
          fos={18}
          fow="bold"
          py={4}
          lh={24}
          bg="trans"
          px={4}
          bw={0}
          mih={36}
          jc="center"
          col={colors.text}
          pl={props.note.emoji ? 0 : 8}
        >
          {savedTitle}
        </SizableText>
      </Dialog.Trigger>

      <Adapt platform="touch">
        {/* TODO: SnapPointは永続化したほうが使いやすいのでは？ */}
        <Sheet zIndex={200000} modal dismissOnSnapToBottom snapPoints={[70]} disableDrag>
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
          <YStack animation={'bouncy'} fullscreen backgroundColor="transparent" alignItems="stretch">
            <XStack animation={'bouncy'} fb={'auto'} f={1} mt={40} fs={0} bg="transparent" w={'100%'} ai="center">
              <TextArea multiline={true} onChangeText={(title) => setDraftTitle(title)} style={styles.richEditor} mx={8} autoCapitalize="none">
                {draftTitle}
              </TextArea>
              <Dialog.Close displayWhenAdapted asChild onPress={() => onDone()}>
                <Stack h={44} w={44} bg={colors.secondary} borderRadius={8} mx={8} jc={'center'} ai={'center'}>
                  <Ionicons name="pencil" size={24} color={colors.text} />
                </Stack>
              </Dialog.Close>
            </XStack>
            <Stack bg="transparent" h={keyboardHeight} />
          </YStack>
          <Unspaced>
            <Dialog.Close pos="absolute" t={12} l={12} asChild m={0} displayWhenAdapted>
              <FontAwesome5
                size="24"
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

TitleDialog.displayName = 'TitleDialog';

const styles = StyleSheet.create({
  richEditor: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    flex: 1,
    fontSize: 14,
    margin: 0,
    marginLeft: 8,
    padding: 0,
    width: '100%',
  },
});
