import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { HStack, Text, View } from 'native-base';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';

import {
  selectNote,
  updateDescription,
  updateEmoji,
  updateFucusId,
  updateFucusInputType,
  updateOrder,
  updateTitle,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

export enum FocusInputType {
  None,
  Title,
  Description,
  Emoji,
  Expanded,
}

export type NoteCardProps = {
  ids: number[];
  note: Notes;
  parentExpanded?: boolean;
};

/** @package */
export const NoteCard = ({
  ids,
  note,
  parentExpanded = true,
}: NoteCardProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { colors } = useTheme();
  // useRef
  const animatedValue = useRef(new Animated.Value(0)).current;
  // useState
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(note.expanded);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const duration = useMemo(() => 200 - 50 * note.level, [note.level]);
  const {
    focusNote: { focusId, focusInputType },
  } = useSelector(selectNote);
  const isNoteFocus = useMemo(() => focusId === note.id, [focusId, note.id]);
  const isFocusInputDescription = useMemo(
    () => isNoteFocus && focusInputType === FocusInputType.Description,
    [focusInputType, isNoteFocus],
  );
  const isFocusInputTitle = useMemo(
    () => isNoteFocus && focusInputType === FocusInputType.Title,
    [focusInputType, isNoteFocus],
  );
  const isFocusInputEmoji = useMemo(
    () => isNoteFocus && focusInputType === FocusInputType.Emoji,
    [focusInputType, isNoteFocus],
  );
  const isFocusInputExpanded = useMemo(
    () => isNoteFocus && focusInputType === FocusInputType.Expanded,
    [focusInputType, isNoteFocus],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        animatedExpandedView: {
          overflow: 'scroll',
          paddingHorizontal: 6,
          paddingVertical: 2,
        },
        descriptionInput: {
          color: colors.primary,
          fontSize: 14,
          paddingHorizontal: 2,
          paddingVertical: 2,
        },
        expanded: {
          paddingHorizontal: 12 - 4 * (note.level + 1),
        },
        focusBorderStyle: {
          borderColor: isFocusInputTitle
            ? colors.text
            : isFocusInputExpanded
            ? colors.text
            : colors.primary,
          borderRadius: 4,
          borderStyle: isFocusInputExpanded ? 'solid' : 'dashed',
          borderWidth: 2,
        },
        titleTextInputStyle: {
          alignItems: 'center',
          color: colors.text,
          flex: 1,
          fontSize: 18,
          fontWeight: 'bold',
          paddingVertical: isFocusInputTitle ? 0 : 4,
        },
      }),
    [isFocusInputTitle, isFocusInputExpanded],
  );

  useEffect(() => {
    if (note.expanded) {
      animatedValue.setValue(descriptionHeight + 16);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionHeight]);

  const handlePick = useCallback(
    (emojiObject: EmojiType): void => {
      // setEmoji(emojiObject.emoji)
      dispatch(updateEmoji({ emoji: emojiObject.emoji, ids }));
    },
    [ids],
  );

  const fadeIn = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeOut = useCallback((): void => {
    Animated.timing(animatedValue, {
      duration,
      toValue: descriptionHeight + 16,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionHeight]);

  // TODO: tamaguiを使用するリファクタリング
  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <NoteCard
              note={item}
              ids={[item.id, ...ids]}
              parentExpanded={expanded}
            />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [expanded],
  );

  const NoteChildCard = useCallback((): JSX.Element => {
    if (note.children !== undefined) {
      const NoteChild = note.children;
      return (
        <DraggableFlatList
          data={NoteChild}
          onDragEnd={({ data, from, to }) => {
            // setStateNotes(data)
            const id = data[to]?.id;
            if (id !== undefined) {
              dispatch(updateOrder({ from, ids: [id, ...ids], to }));
            }
          }}
          keyExtractor={(item) => `item-${item.id}`}
          renderItem={renderItem}
        />
      );
    } else {
      return <></>;
    }
  }, [note.children, expanded]);

  if (!parentExpanded) {
    return <></>;
  }

  // TODO:なんかスクロールしづらそう。。。
  return (
    <View
      // TODO:入れ子のスクロールできたけど、交換するのはどうする？
      onTouchStart={() =>
        dispatch(updateFucusId({ focusId: note.id, ids, level: note.level }))
      }
      mt="0"
      mb="2"
      ml="2"
      mr="0.5"
      borderWidth={2}
      borderColor={colors.primary}
      borderRadius={8}
    >
      <HStack
        position="relative"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={colors.primary}
        px="2"
        py="1"
      >
        <HStack alignItems="center" flex="1">
          <View
            h="7"
            w="7"
            borderRadius="4"
            backgroundColor={isFocusInputEmoji ? '#c1d4f0' : colors.text}
            mr="2"
          >
            {note.emoji ? (
              <Text
                onPress={() => {
                  setIsOpen(true);
                  dispatch(
                    updateFucusInputType({
                      focusInputType: FocusInputType.Emoji,
                    }),
                  );
                }}
                textAlign="center"
                fontSize="lg"
                lineHeight="28"
              >
                {note.emoji}
              </Text>
            ) : (
              <AntDesign
                onPress={() => {
                  setIsOpen(true);
                  dispatch(
                    updateFucusInputType({
                      focusInputType: FocusInputType.Emoji,
                    }),
                  );
                }}
                name="plus"
                size={24}
                color={colors.primary}
                style={{ lineHeight: 26, textAlign: 'center' }}
              />
            )}
          </View>
          <TextInput
            style={[
              isFocusInputTitle && styles.focusBorderStyle,
              styles.titleTextInputStyle,
            ]}
            value={note.title ?? ''}
            multiline={true}
            onChangeText={(title) => dispatch(updateTitle({ title, ids }))}
            // autoCapitalize="none"
            onFocus={() =>
              dispatch(
                updateFucusInputType({ focusInputType: FocusInputType.Title }),
              )
            }
          />
        </HStack>
        <View style={isFocusInputExpanded && styles.focusBorderStyle}>
          {expanded ? (
            <SimpleLineIcons
              onPress={() => {
                setExpanded((prevExpanded) => !prevExpanded);
                fadeIn();
                dispatch(
                  updateFucusInputType({
                    focusInputType: FocusInputType.Expanded,
                  }),
                );
              }}
              name="arrow-up"
              size={20}
              color={colors.text}
              style={styles.expanded}
            />
          ) : (
            <SimpleLineIcons
              onPress={() => {
                setExpanded((prevExpanded) => !prevExpanded);
                fadeOut();
                dispatch(
                  updateFucusInputType({
                    focusInputType: FocusInputType.Expanded,
                  }),
                );
              }}
              name="arrow-down"
              size={20}
              color={colors.text}
              style={styles.expanded}
            />
          )}
        </View>
      </HStack>
      <Animated.View
        style={[styles.animatedExpandedView, { height: animatedValue }]}
      >
        <TextInput
          style={[
            isFocusInputDescription && styles.focusBorderStyle,
            styles.descriptionInput,
          ]}
          value={note.description ?? ''}
          multiline={true}
          onContentSizeChange={(event) => {
            setDescriptionHeight(event.nativeEvent.contentSize.height);
          }}
          onFocus={() =>
            dispatch(
              updateFucusInputType({
                focusInputType: FocusInputType.Description,
              }),
            )
          }
          onChangeText={(description) => {
            // setDescription(description)
            dispatch(updateDescription({ description, ids }));
          }}
          autoCapitalize="none"
        />
      </Animated.View>
      <NoteChildCard />
      {/* { */}
      {/* // TODO:key一位なkeyになるように修正
        //   return <NoteCard key={index} note={note} parentExpanded={expanded} ids={[note.id, ...ids]} />
        // })
      // } */}
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};
