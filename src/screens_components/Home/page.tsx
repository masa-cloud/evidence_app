import { useFocusEffect, useRouter } from 'expo-router';
import React, { FC, useCallback, useRef } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
import {
  fetchAsyncNotes,
  selectNote,
  updateAsyncNoteOrder,
} from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { HomeHeader } from './HomeHeader';
import { NoteCard } from './NoteCard';
import { SideTree } from './SideTree';

/** @package */
export const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { notes } = useSelector(selectNote);
  const flatListRef = useRef<any>(undefined);
  const flatListChildRef = useRef<any>(undefined);

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
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <NoteCard
              note={item}
              ids={[item.id]}
              flatListChildRef={flatListChildRef}
            />
          </TouchableOpacity>
        </OpacityDecorator>
      );
    },
    [],
  );

  // TODO:データが無い時のハンドリング
  // if ( notes.length === 0 ) return <></>

  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}
      >
        <HomeHeader />
        <SideTree notes={notes} onNoteNavigate={onNoteNavigate} />
        <TouchableOpacity
          onPress={() => router.push('/MyPageScreen')}
        ></TouchableOpacity>
        <Stack h={60} />
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <DraggableFlatList
          data={notes}
          ref={flatListRef}
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
        {/* </TouchableWithoutFeedback> */}
        {/* </Stack> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
