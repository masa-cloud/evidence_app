import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
  descriptionHeight: number;
  expanded: boolean;
  ids: number[];
  level: number;
};

type useAnimeExpandReturn = {
  animatedValue: Animated.Value;
  fadeIn: () => void;
  fadeOut: () => void;
};

export const useAnimeExpand = (props: Props): useAnimeExpandReturn => {
  // useRef
  const animatedValue = useRef(new Animated.Value(0)).current;
  const duration = useMemo(() => 200 - 50 * props.level, [props.level]);
  useEffect(() => {
    if (props.expanded) {
      animatedValue.setValue(props.descriptionHeight + 16);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.descriptionHeight]);

  const fadeOut = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: props.descriptionHeight + 16,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.descriptionHeight]);

  const fadeIn = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    animatedValue,
    fadeIn,
    fadeOut,
  };
};
