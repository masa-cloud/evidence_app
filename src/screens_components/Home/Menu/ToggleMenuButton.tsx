import { Entypo } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Stack } from 'tamagui';

import { useColors } from '~/lib/constants';

type ToggleMenuButtonProps = {
  setShowElement: React.Dispatch<React.SetStateAction<boolean>>;
  showElement: boolean;
};

/** @package */
export const ToggleMenuButton: FC<ToggleMenuButtonProps> = (props) => {
  const { colors } = useColors();

  return (
    <Stack
      animation="bouncy"
      pressStyle={{ scale: 0.9 }}
      onPress={() => props.setShowElement((prevShowElement) => !prevShowElement)}
      pos="absolute"
      b={80}
      r="8.5%"
      zi={100}
    >
      <Stack
        pos="absolute"
        br={50}
        bg={props.showElement ? colors.text : colors.primary}
        t={-5}
        l={-6}
        h={52}
        w={52}
        shac={colors.primary}
        shof={{
          height: 3,
          width: 0,
        }}
        shar={4}
      />
      <Entypo name="cycle" size={40} color={props.showElement ? colors.primary : colors.text} />
    </Stack>
  );
};
