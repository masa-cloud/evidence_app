import { useRef } from 'react';

type useFlatListReturn = {
  flatListRef: React.MutableRefObject<any>;
  onPress: (height: number) => void;
};

export const useFlatList = (): useFlatListReturn => {
  const flatListRef = useRef<any>(undefined);

  const onPress = (height: number): void => {
    flatListRef.current.scrollToOffset({ animated: true, offset: height });
  };

  return {
    flatListRef,
    onPress,
  };
};
