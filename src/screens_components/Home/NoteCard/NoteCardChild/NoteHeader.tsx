import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Stack, XStack } from 'tamagui';

import { useColors } from '~/lib/constants';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import { Note } from '~/types/types';

import { TitleDialog } from './TitleDialog';

type NoteHeaderProps = {
  children: ReactNode;
  handleExpand: () => Promise<void>;
  ids: string[];
  note: Note;
  orderedList: boolean;
  position:
    | {
        rotate: string;
      }
    | undefined;
};

/** @package */
export const NoteHeader: FC<NoteHeaderProps> = (props) => {
  const { colors } = useColors();
  const { focusNote } = useSelector(selectFocusNote);

  return (
    <XStack pos="relative" ai="center" jc="space-between" bg={colors.primary} pt={4} pb={5}>
      <XStack alignItems="center" f={1}>
        {/* TODO:絵文字の箇所型など修正 */}
        {props.children}
        <TitleDialog ids={props.ids} note={props.note} />
      </XStack>
      {props.orderedList && (
        <Stack
          animation="bouncy"
          enterStyle={{
            o: 0,
            y: -40,
          }}
          pressStyle={{ scale: 0.8 }}
          bg={focusNote.focusId === props.note.id ? colors.secondary : 'transparent'}
          px={10}
          py={10}
          o={1}
          y={0}
          br={40}
          scale={1}
        >
          <SimpleLineIcons name="menu" size={24} color={colors.text} />
        </Stack>
      )}
      {!props.orderedList && (
        <Stack
          animation="bouncy"
          enterStyle={{
            o: 0,
            y: -40,
          }}
          pressStyle={{ scale: 0.8 }}
          px={10}
          py={10}
          o={1}
          y={0}
          br={40}
          bg={focusNote.focusId === props.note.id ? colors.secondary : 'transparent'}
          scale={1}
        >
          <MaterialCommunityIcons name="cursor-pointer" size={24} color={colors.text} />
        </Stack>
      )}
      <Stack
        onPress={() => {
          void props.handleExpand();
        }}
        px={10}
        py={10}
      >
        <Stack animation={'bouncy'} {...props.position}>
          <SimpleLineIcons name="arrow-up" size={24} color={colors.text} pr={12 - 4 * (props.note.level + 1)} />
        </Stack>
      </Stack>
    </XStack>
  );
};
