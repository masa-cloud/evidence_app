import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useControllableState } from 'tamagui';

import { width } from '~/lib/constants';
import { updatePosition } from '~/slices/sideTreeSlice';
import { AppDispatch } from '~/store';

type useSideTreeReturn = {
  onPress: () => void;
  position:
    | {
        pressStyle?: never;
        x: number;
        y: number;
      }
    | {
        pressStyle: {
          scale: number;
        };
        x: number;
        y: number;
      }
    | undefined;
  positionI: number;
  useControllableState: typeof useControllableState;
};

export const useSideTree = (): useSideTreeReturn => {
  const dispatch: AppDispatch = useDispatch();
  const [positionI, setPositionI] = useControllableState({
    defaultProp: 0,
    strategy: 'most-recent-wins',
  });
  const position = useMemo(() => positions[positionI], [positionI]);
  const onPress = (): void => {
    setPositionI(Number(!positionI));
  };

  useEffect(() => {
    dispatch(updatePosition({ position }));
  }, [dispatch, position]);

  return {
    onPress,
    position,
    positionI,
    useControllableState,
  };
};

const positions = [
  {
    x: width,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
];
