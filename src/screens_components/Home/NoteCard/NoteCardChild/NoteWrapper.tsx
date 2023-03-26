import React, { FC, ReactNode } from 'react';
import { Stack } from 'tamagui';

import { useColors } from '~/lib/constants';

type NoteWrapperProps = {
  children: ReactNode;
  onFocus: () => void;
};

/** @package */
export const NoteWrapper: FC<NoteWrapperProps> = (props) => {
  const { colors } = useColors();

  return (
    <Stack
      // TODO:入れ子の順番入れ替えできたけど、親と順番交換するのはどうする？なんか境界線超えれるのあったようなDragFlatListに
      onTouchStart={props.onFocus}
      animation="bouncy"
      enterStyle={{ scale: 0.9, y: -50 }}
      scale={1}
      y={0}
      mt={0}
      mb={8}
      ml={8}
      mr={2}
      bw={2}
      boc={colors.primary}
      br={8}
    >
      {props.children}
    </Stack>
  );
};
