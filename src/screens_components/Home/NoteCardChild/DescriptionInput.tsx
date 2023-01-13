import { useTheme } from '@react-navigation/native';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextArea } from 'tamagui';

import { updateDescription } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';

type DescriptionInputProps = {
  descriptionHeight: number;
  expanded: boolean;
  ids: number[];
  setDescriptionHeight: React.Dispatch<React.SetStateAction<number>>;
  storeDescription: string;
};

/** @package */
export const DescriptionInput: FC<DescriptionInputProps> = (props) => {
  const { colors } = useTheme();
  const [description, setDescription] = useState<string>(
    props.storeDescription,
  );
  // useRef
  const dispatch: AppDispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        animatedExpandedView: {
          overflow: 'scroll',
          paddingHorizontal: 6,
          paddingVertical: 2,
        },
        focusDescriptionStyle: {
          borderColor: colors.primary,
          borderRadius: 4,
          borderStyle: 'dashed',
          borderWidth: 2,
        },
      }),
    [],
  );
  useEffect(() => {
    if (props.expanded) {
      animatedValue.setValue(props.descriptionHeight + 16);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.descriptionHeight]);
  return (
    <Animated.View
      style={[styles.animatedExpandedView, { height: animatedValue }]}
    >
      <TextArea
        bg={'transparent'}
        py={2}
        px={4}
        color={colors.primary}
        fontSize={14}
        bw={0}
        focusStyle={styles.focusDescriptionStyle}
        boc={colors.primary}
        value={description ?? ''}
        multiline={true}
        onContentSizeChange={(event) => {
          props.setDescriptionHeight(event.nativeEvent.contentSize.height);
        }}
        onChangeText={(description) => {
          setDescription(description);
        }}
        autoCapitalize="none"
        onEndEditing={() =>
          dispatch(updateDescription({ description, ids: props.ids }))
        }
      />
    </Animated.View>
  );
};
