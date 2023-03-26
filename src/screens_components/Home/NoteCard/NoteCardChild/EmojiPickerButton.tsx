import { AntDesign } from '@expo/vector-icons';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/src/types';
import { Stack, Text } from 'tamagui';

import { useColors } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import { addAsyncEmoji, updateAsyncEmoji } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

type EmojiPickerButtonProps = {
  ids: string[];
  noteEmoji: Note['emoji'];
  noteId: Note['id'];
};

// /** @package */
export const EmojiPickerButton: FC<EmojiPickerButtonProps> = (props) => {
  const { colors } = useColors();
  const { focusNote } = useSelector(selectFocusNote);
  const [emoji, setEmoji] = useState<string | undefined>(props.noteEmoji?.name);
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePick = useCallback(
    (emojiObject: EmojiType): void => {
      // setEmoji(emojiObject.emoji)
      if (emoji) {
        const updateEmoji = async (): Promise<void> => {
          try {
            setEmoji(emojiObject.emoji);
            await dispatch(
              updateAsyncEmoji({
                emoji: emojiObject.emoji,
                ids: props.ids,
                updateEmojiId: props.noteEmoji?.id ?? '',
              }),
            );
          } catch (e) {
            console.log({ e });
            // Handle error
          }
        };
        void updateEmoji();
      } else {
        const createEmoji = async (): Promise<void> => {
          try {
            setEmoji(emojiObject.emoji);
            await dispatch(addAsyncEmoji({ emoji: emojiObject.emoji, ids: props.ids }));
          } catch (e) {
            console.log({ e });
            // Handle error
          }
        };
        void createEmoji();
      }
    },
    [dispatch, emoji, props.ids, props.noteEmoji?.id],
  );

  return (
    <>
      {focusNote.focusId === props.noteId ? (
        <Stack
          pl={8}
          enterStyle={
            emoji
              ? {}
              : {
                  o: 0,
                  x: -40,
                }
          }
          o={1}
          x={0}
          onPress={() => setIsOpen(true)}
          h={44}
          w={44}
          justifyContent="center"
        >
          <Stack focusStyle={{ bg: '#c1d4f0' }} h={28} w={28} br={4} bg={colors.text} mr={8}>
            {emoji ? (
              <Text ta="center" fos={22} lh="28">
                {emoji}
              </Text>
            ) : (
              <AntDesign name="plus" size={24} color={colors.primary} style={{ lineHeight: 26, textAlign: 'center' }} />
            )}
          </Stack>
        </Stack>
      ) : (
        !!emoji && (
          <Stack onPress={() => setIsOpen(true)} pl={8} h={44} w={44} justifyContent="center">
            <Stack focusStyle={{ bg: '#c1d4f0' }} h={28} w={28} br={4} bg={colors.text} mr={8}>
              <Text ta="center" fos={22} lh="28">
                {emoji}
              </Text>
            </Stack>
          </Stack>
        )
      )}
      <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
