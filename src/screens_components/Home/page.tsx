import { useFocusEffect } from 'expo-router';
import React, { FC, useCallback, useRef, useState } from 'react';
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
import { selectFocusNote } from '~/slices/focusNoteSlice';
import { fetchAsyncNotes, selectNote, updateAsyncNoteOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { ScrollDownNoteMenu, ScrollUpGlobalMenu, ToggleMenuButton } from './Menu';
import { NoteCard } from './NoteCard';
import { SideTree } from './SideTree';

/** @package */
export const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes } = useSelector(selectNote);
  const flatListRef = useRef<any>(undefined);
  const [orderedList, setOrderedList] = useState<boolean>(false);
  const { focusNote } = useSelector(selectFocusNote);
  const [showElement, setShowElement] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY < scrollY && !showElement) {
      setShowElement(true);
    } else if (currentScrollY > scrollY && showElement) {
      setShowElement(false);
    }

    setScrollY(currentScrollY);
  };

  useFocusEffect(
    useCallback(() => {
      // APIを叩く処理を記述
      const fetchNotes = async (): Promise<void> => {
        try {
          await dispatch(fetchAsyncNotes());
        } catch (e) {
          console.log({ e });
          // Handle error
        }
      };
      void fetchNotes();
    }, [dispatch]),
  );

  // TODO: 子要素もスクロールできるようにする。
  const onNoteNavigate = (orders: number[]): void => {
    flatListRef?.current?.scrollToIndex({ animated: true, index: orders[0] });
  };

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Note>): JSX.Element => {
      return (
        <OpacityDecorator>
          <NoteCard note={item} dragDisabled={!orderedList || isActive} drag={drag} ids={[item.id]} orderedList={orderedList} />
        </OpacityDecorator>
      );
    },
    [orderedList],
  );

  const NoteFlatList = useCallback(() => {
    return (
      <DraggableFlatList
        data={notes}
        ref={flatListRef}
        scrollEnabled={focusNote.level === 0}
        onScrollEndDrag={handleScroll}
        onScrollBeginDrag={handleScroll}
        ListFooterComponent={<Stack h={80} />}
        onDragEnd={({ data, from, to }) => {
          const id = data[to]?.id;
          if (id !== undefined) {
            const updateOrder = async (): Promise<void> => {
              try {
                await dispatch(
                  updateAsyncNoteOrder({
                    ids: [id],
                    isIncreased: from > to,
                    parentId: data[to]?.parentId,
                    targetOrderNumber: to,
                  }),
                );
              } catch (e) {
                console.log({ e });
                // Handle error
              }
            };
            void updateOrder();
          }
        }}
        keyExtractor={(item, index) => `item-${item.id}-${index}`}
        renderItem={renderItem}
      />
    );
  }, [dispatch, renderItem]);

  // TODO:データが無い時のハンドリング
  if (notes.length === 0) return <></>;

  return (
    <SafeAreaView>
      <ImageBackground source={Images.background} resizeMode="cover" style={{ height: '100%', width: '100%' }}>
        <ToggleMenuButton showElement={showElement} setShowElement={setShowElement} />
        {showElement ? <ScrollUpGlobalMenu /> : <ScrollDownNoteMenu setOrderedList={setOrderedList} orderedList={orderedList} />}
        <SideTree notes={notes} onNoteNavigate={onNoteNavigate} />
        <NoteFlatList />
      </ImageBackground>
    </SafeAreaView>
  );
};
