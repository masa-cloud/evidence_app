import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import { Stack, Text } from 'tamagui';

import { updateEmoji } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

type EmojiProps = {
  ids: number[];
  storeEmoji: string | undefined;
};

/** @package */
export const Emoji: FC<EmojiProps> = (props) => {
  const { colors } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePick = useCallback(
    (emojiObject: EmojiType): void => {
      // setEmoji(emojiObject.emoji)
      dispatch(updateEmoji({ emoji: emojiObject.emoji, ids: props.ids }));
    },
    [props.ids],
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
        {props.storeEmoji ? (
          <Text
            onPress={() => setIsOpen(true)}
            textAlign="center"
            fontSize="lg"
            lineHeight="28"
          >
            {props.storeEmoji}
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
